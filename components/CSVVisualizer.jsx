import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Main component to visualize CSV data using backend-processed data
export default function CSVVisualizer({ reportData, csvUrl }) {
  const [visualizationType, setVisualizationType] = useState('bar');
  const [columns, setColumns] = useState([]);
  const [selectedXAxis, setSelectedXAxis] = useState('');
  const [selectedYAxis, setSelectedYAxis] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from the report data or fetch from CSV URL
  useEffect(() => {
    if (reportData) {
      // Use the pre-processed data from the backend
      setColumns(Object.keys(reportData.sampleRows[0] || {}));
      setCsvData(reportData.sampleRows);
      
      // Find default columns for visualization based on column stats
      const columnStats = reportData.columnStats || {};
      
      // Find the first categorical column for X-axis
      const categoricalColumn = Object.keys(columnStats).find(col => 
        columnStats[col].type !== 'numeric'
      ) || Object.keys(columnStats)[0] || '';
      
      // Find the first numeric column for Y-axis
      const numericColumn = Object.keys(columnStats).find(col => 
        columnStats[col].type === 'numeric'
      ) || Object.keys(columnStats)[1] || '';
      
      setSelectedXAxis(categoricalColumn);
      setSelectedYAxis(numericColumn);
      setIsLoading(false);
    } else if (csvUrl) {
      // If no pre-processed data is available, fetch from CSV URL
      fetchDataFromCSV(csvUrl);
    } else {
      setError("No data source provided");
      setIsLoading(false);
    }
  }, [reportData, csvUrl]);

  // Fetch data directly from CSV if needed
  const fetchDataFromCSV = async (url) => {
    try {
      setIsLoading(true);
      const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
      const response = await fetch(fullUrl);
      
      if (!response.ok) throw new Error(`Failed to fetch CSV data: ${response.statusText}`);
      
      const text = await response.text();
      const parsedData = d3.csvParse(text);
      
      if (!parsedData || parsedData.length === 0) throw new Error('CSV file is empty or invalid');
      
      setCsvData(parsedData);
      const cols = Object.keys(parsedData[0]);
      setColumns(cols);
      
      // Set default columns for visualization
      if (cols.length >= 2) {
        setSelectedXAxis(cols[0]);
        setSelectedYAxis(cols[1]);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching CSV:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleVisualizationTypeChange = (e) => {
    setVisualizationType(e.target.value);
  };

  const handleXAxisChange = (e) => {
    setSelectedXAxis(e.target.value);
  };

  const handleYAxisChange = (e) => {
    setSelectedYAxis(e.target.value);
  };

  // Get visualization data based on the selected type
  const getVisualizationData = () => {
    if (!reportData || !reportData.visualizationData) {
      return csvData; // Use raw data if no pre-processed data available
    }
    
    switch (visualizationType) {
      case 'bar':
        return reportData.visualizationData.barChart;
      case 'line':
        return reportData.visualizationData.lineChart;
      case 'scatter':
        return reportData.visualizationData.scatterPlot;
      case 'pie':
        return reportData.visualizationData.pieChart;
      default:
        return csvData;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-white">Loading visualization...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-gray-700 text-red-300 rounded-lg">
        <p className="font-bold">Error loading visualization:</p>
        <p>{error}</p>
        <p className="mt-2 text-gray-300">Check that the CSV file exists and is properly formatted.</p>
      </div>
    );
  }

  const visualizationData = getVisualizationData();

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-3 text-purple-400">Data Visualization</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Visualization Type</label>
          <select 
            value={visualizationType}
            onChange={handleVisualizationTypeChange}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="scatter">Scatter Plot</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">X-Axis</label>
          <select 
            value={selectedXAxis}
            onChange={handleXAxisChange}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {columns.map(col => (
              <option key={`x-${col}`} value={col}>{col}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Y-Axis</label>
          <select 
            value={selectedYAxis}
            onChange={handleYAxisChange}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={visualizationType === 'pie'}
          >
            {columns.map(col => (
              <option key={`y-${col}`} value={col}>{col}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-gray-700 rounded-lg p-4 bg-gray-900">
        {visualizationType === 'bar' && (
          <BarChart data={visualizationData} xAxis={selectedXAxis} yAxis={selectedYAxis} />
        )}
        {visualizationType === 'line' && (
          <LineChart data={visualizationData} xAxis={selectedXAxis} yAxis={selectedYAxis} />
        )}
        {visualizationType === 'scatter' && (
          <ScatterPlot data={visualizationData} xAxis={selectedXAxis} yAxis={selectedYAxis} />
        )}
        {visualizationType === 'pie' && (
          <PieChart data={visualizationData} labelField={selectedXAxis} valueField={selectedYAxis} />
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3 text-white">Data Preview</h3>
        <div className="overflow-x-auto bg-gray-900 rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-800">
            <thead>
              <tr>
                {columns.map((column, idx) => (
                  <th 
                    key={idx}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {csvData.slice(0, 5).map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((column, colIdx) => (
                    <td 
                      key={`${rowIdx}-${colIdx}`}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-300"
                    >
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {csvData.length > 5 && (
            <p className="text-sm text-gray-400 p-2">Showing 5 of {csvData.length} rows</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Chart components remain the same, but they'll use pre-processed data from the backend when available
// Bar Chart Component
function BarChart({ data, xAxis, yAxis }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length || !xAxis || !yAxis) return;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Filter out non-numeric values
    const processedData = data.filter(d => !isNaN(+d[yAxis]));
    
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // X axis
    const x = d3.scaleBand()
      .domain(processedData.map(d => d[xAxis]))
      .range([0, width])
      .padding(0.1);
    
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');
    
    // Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(processedData, d => +d[yAxis])])
      .nice()
      .range([height, 0]);
    
    svg.append('g')
      .call(d3.axisLeft(y));
    
    // Bars
    svg.selectAll('.bar')
      .data(processedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d[xAxis]))
      .attr('y', d => y(+d[yAxis]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(+d[yAxis]))
      .attr('fill', '#4f46e5')
      .attr('rx', 3)
      .on('mouseover', function() {
        d3.select(this).attr('fill', '#6366f1');
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', '#4f46e5');
      });
    
    // X Axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .text(xAxis);
    
    // Y Axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -height / 2)
      .text(yAxis);
      
  }, [data, xAxis, yAxis]);
  
  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <svg ref={svgRef}></svg>
    </div>
  );
}

// Line Chart Component - implementation stays the same
function LineChart({ data, xAxis, yAxis }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length || !xAxis || !yAxis) return;
    
    // Chart implementation remains the same
    // ...
    // Implementation code from original CSVVisualizer.jsx
    // ...
      
  }, [data, xAxis, yAxis]);
  
  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <svg ref={svgRef}></svg>
    </div>
  );
}

// Scatter Plot Component - implementation stays the same
function ScatterPlot({ data, xAxis, yAxis }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length || !xAxis || !yAxis) return;
    
    // Chart implementation remains the same
    // ...
    // Implementation code from original CSVVisualizer.jsx
    // ...
      
  }, [data, xAxis, yAxis]);
  
  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <svg ref={svgRef}></svg>
    </div>
  );
}

// Pie Chart Component - implementation stays the same
function PieChart({ data, labelField, valueField }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length || !labelField || !valueField) return;
    
    // Chart implementation remains the same
    // ...
    // Implementation code from original CSVVisualizer.jsx
    // ...
      
  }, [data, labelField, valueField]);
  
  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <svg ref={svgRef}></svg>
    </div>
  );
}