// components/CSVVisualizer.jsx
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
  const [chartTheme, setChartTheme] = useState({
    primary: '#6366f1',    // Primary color (purple)
    secondary: '#4f46e5',  // Secondary color (darker purple)
    hover: '#818cf8',      // Hover color (lighter purple)
    background: '#1e1e2f', // Dark background
    text: '#f1f5f9',       // Light text
    grid: '#334155',       // Grid lines
  });

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
          <BarChart data={visualizationData} xAxis={selectedXAxis} yAxis={selectedYAxis} theme={chartTheme} />
        )}
        {visualizationType === 'line' && (
          <LineChart data={visualizationData} xAxis={selectedXAxis} yAxis={selectedYAxis} theme={chartTheme} />
        )}
        {visualizationType === 'scatter' && (
          <ScatterPlot data={visualizationData} xAxis={selectedXAxis} yAxis={selectedYAxis} theme={chartTheme} />
        )}
        {visualizationType === 'pie' && (
          <PieChart data={visualizationData} labelField={selectedXAxis} valueField={selectedYAxis} theme={chartTheme} />
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

// Bar Chart Component with improved styling
function BarChart({ data, xAxis, yAxis, theme }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length || !xAxis || !yAxis) return;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Filter out non-numeric values and sort data in ascending order by yAxis value
    const processedData = data
      .filter(d => !isNaN(+d[yAxis]))
    
    const margin = { top: 40, right: 40, bottom: 120, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // X axis - using the sorted data
    const x = d3.scaleBand()
      .domain(processedData.map(d => d[xAxis]))
      .range([0, width])
      .padding(0.3);
    
    // Only show a subset of x-axis labels for better readability
    const showEveryNthLabel = Math.ceil(processedData.length / 20);
    
    const xAxisGenerator = d3.axisBottom(x)
      .tickFormat((d, i) => i % showEveryNthLabel === 0 ? d : '');
    
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxisGenerator)
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px')
      .style('fill', theme.text);
    
    // Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(processedData, d => +d[yAxis]) * 1.1])
      .range([height, 0]);
    
    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', theme.text)
      .style('font-size', '12px');
    
    // Simplified Y grid lines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat('')
        .ticks(5))
      .selectAll('line')
      .style('stroke', theme.grid)
      .style('stroke-opacity', 0.3);
    
    // Remove grid path
    svg.selectAll('.grid path').style('stroke', 'none');
    
    // Simplified bars with less styling - using the sorted data
    svg.selectAll('.bar')
      .data(processedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d[xAxis]))
      .attr('width', x.bandwidth())
      .attr('y', d => y(+d[yAxis]))
      .attr('height', d => height - y(+d[yAxis]))
      .attr('fill', theme.primary)
      .attr('rx', 2);
    
    // Enhanced hover effect with both x and y information
    svg.selectAll('.bar')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', theme.hover);
        
        // Enhanced tooltip with background
        const tooltip = svg.append('g')
          .attr('class', 'tooltip')
          .attr('transform', `translate(${x(d[xAxis]) + x.bandwidth()/2}, ${y(+d[yAxis]) - 30})`);
        
        // Add background rectangle for tooltip
        tooltip.append('rect')
          .attr('x', -60)
          .attr('y', -30)
          .attr('width', 120)
          .attr('height', 40)
          .attr('fill', 'rgba(0,0,0,0.7)')
          .attr('rx', 4);
        
        // Add x-axis value (label)
        tooltip.append('text')
          .text(`${xAxis}: ${parseFloat(d[xAxis])}`)
          .attr('text-anchor', 'middle')
          .attr('y', -18)
          .attr('fill', 'white')
          .style('font-size', '12px');
        
        // Add y-axis value (metric)
        tooltip.append('text')
          .text(`${yAxis}: ${parseFloat(d[yAxis])}`)
          .attr('text-anchor', 'middle')
          .attr('y', -4)
          .attr('fill', 'white')
          .style('font-size', '12px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', theme.primary);
        svg.selectAll('.tooltip').remove();
      });
    
    // Chart title
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', -15)
      .text(`${yAxis} by ${xAxis}`)
      .style('font-size', '16px')
      .style('fill', theme.text);
    
    // X Axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 60)
      .text(xAxis)
      .style('font-size', '14px')
      .style('fill', theme.text);
    
    // Y Axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -height / 2)
      .text(yAxis)
      .style('font-size', '14px')
      .style('fill', theme.text);
      
  }, [data, xAxis, yAxis, theme]);
  
  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <svg ref={svgRef}></svg>
    </div>
  );
}

// PieChart Component with full implementation
function PieChart({ data, labelField, valueField, theme }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length || !labelField || !valueField) return;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Filter out non-numeric values for the value field
    const processedData = data.filter(d => !isNaN(+d[valueField]))
      .map(d => ({
        label: d[labelField],
        value: +d[valueField]
      }))
      // Filter out zero or negative values
      .filter(d => d.value > 0);
    
    // Create a sum for percentage calculations
    const total = d3.sum(processedData, d => d.value);
    
    const margin = { top: 50, right: 150, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left + width/2},${margin.top + height/2})`);
    
    // Generate a color scale
    const color = d3.scaleOrdinal()
      .domain(processedData.map(d => d.label))
      .range(d3.quantize(t => d3.interpolateBlues(t * 0.8 + 0.1), processedData.length));
    
    // Create the pie layout
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null); // Don't sort by value
    
    // Create the arcs
    const arc = d3.arc()
      .innerRadius(0) // Full pie (not donut)
      .outerRadius(radius * 0.8);
    
    // Create the outer arc for label positioning
    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);
    
    // Add the slices
    const slices = svg.selectAll('path')
      .data(pie(processedData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(d.data.label))
      .attr('stroke', theme.background)
      .attr('stroke-width', 2)
      .style('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('opacity', 1)
          .attr('stroke', theme.hover)
          .attr('stroke-width', 3);
        
        // Highlight corresponding legend item
        svg.select(`.legend-item-${d.index}`)
          .style('font-weight', 'bold');
        
        // Show tooltip
        const percentage = (d.data.value / total * 100).toFixed(1);
        const tooltip = svg.append('g')
          .attr('class', 'tooltip');
        
        // Position tooltip at arc centroid
        const centroid = arc.centroid(d);
        
        // Add background
        tooltip.append('rect')
          .attr('x', centroid[0] - 60)
          .attr('y', centroid[1] - 40)
          .attr('width', 120)
          .attr('height', 50)
          .attr('fill', 'rgba(0,0,0,0.7)')
          .attr('rx', 5);
        
        // Add value and percentage text
        tooltip.append('text')
          .attr('x', centroid[0])
          .attr('y', centroid[1] - 20)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .style('font-size', '12px')
          .text(`${d.data.value.toLocaleString()}`);
        
        tooltip.append('text')
          .attr('x', centroid[0])
          .attr('y', centroid[1])
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .style('font-size', '12px')
          .text(`${percentage}%`);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .style('opacity', 0.8)
          .attr('stroke', theme.background)
          .attr('stroke-width', 2);
        
        // Reset legend item
        svg.select(`.legend-item-${d.index}`)
          .style('font-weight', 'normal');
        
        // Remove tooltip
        svg.selectAll('.tooltip').remove();
      });
    
    // Animate pie slices
    slices
      .transition()
      .duration(800)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });
    
    // Add labels
    svg.selectAll('text.value-label')
      .data(pie(processedData))
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('transform', d => {
        // Only add labels for slices big enough to fit text
        if (d.endAngle - d.startAngle < 0.3) return 'translate(0,0)';
        const pos = arc.centroid(d);
        return `translate(${pos})`;
      })
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .text(d => {
        // Only add labels for slices big enough to fit text
        if (d.endAngle - d.startAngle < 0.3) return '';
        const percentage = (d.data.value / total * 100).toFixed(0);
        return percentage > 5 ? `${percentage}%` : '';
      })
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);
    
    // Create legend
    const legend = svg.selectAll('.legend')
      .data(pie(processedData))
      .enter()
      .append('g')
      .attr('class', (d, i) => `legend legend-item-${i}`)
      .attr('transform', (d, i) => `translate(${radius + 20}, ${-radius + 20 + i * 25})`)
      .on('mouseover', function(event, d) {
        // Highlight pie slice
        svg.selectAll('path')
          .filter((path, i) => i === d.index)
          .style('opacity', 1)
          .attr('stroke', theme.hover)
          .attr('stroke-width', 3);
          
        d3.select(this)
          .style('font-weight', 'bold');
      })
      .on('mouseout', function(event, d) {
        // Reset pie slice
        svg.selectAll('path')
          .filter((path, i) => i === d.index)
          .style('opacity', 0.8)
          .attr('stroke', theme.background)
          .attr('stroke-width', 2);
          
        d3.select(this)
          .style('font-weight', 'normal');
      });
    
    // Add colored squares
    legend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d, i) => color(d.data.label));
    
    // Add labels
    legend.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .style('font-size', '12px')
      .style('fill', theme.text)
      .text(d => {
        const percentage = (d.data.value / total * 100).toFixed(1);
        return `${d.data.label} (${percentage}%)`;
      })
      .style('alignment-baseline', 'middle');
    
    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -height/2 - 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', theme.text)
      .text(`${valueField} Distribution by ${labelField}`);
    
    // Add total in center
    svg.append('text')
      .attr('class', 'total-label')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', theme.text)
      .style('opacity', 0)
      .text(`Total: ${total.toLocaleString()}`)
      .transition()
      .delay(1200)
      .duration(500)
      .style('opacity', 1);
      
  }, [data, labelField, valueField, theme]);
  
  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <svg ref={svgRef}></svg>
    </div>
  );
}

// Line Chart Component with full implementation
function LineChart({ data, xAxis, yAxis, theme }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length || !xAxis || !yAxis) return;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Filter out non-numeric values
    const processedData = data.filter(d => !isNaN(+d[yAxis]));
    
    // Sort data by x-axis if it's a date or number
    if (processedData.length > 0) {
      const firstValue = processedData[0][xAxis];
      // Check if values are dates
      if (!isNaN(Date.parse(firstValue))) {
        processedData.sort((a, b) => new Date(a[xAxis]) - new Date(b[xAxis]));
      } 
      // Check if values are numbers
      else if (!isNaN(+firstValue)) {
        processedData.sort((a, b) => +a[xAxis] - +b[xAxis]);
      }
    }
    
    const margin = { top: 40, right: 40, bottom: 80, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add chart background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', theme.background)
      .attr('rx', 5);
    
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
      .style('text-anchor', 'end')
      .style('font-size', '12px')
      .style('fill', theme.text);
    
    // Style the axis
    svg.selectAll('.domain')
      .style('stroke', theme.grid);
    svg.selectAll('.tick line')
      .style('stroke', theme.grid);
    
    // Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(processedData, d => +d[yAxis]) * 1.1]) // Add 10% padding
      .nice()
      .range([height, 0]);
    
    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', theme.text)
      .style('font-size', '12px');
    
    // Add Y grid lines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(''))
      .selectAll('line')
      .style('stroke', theme.grid)
      .style('stroke-opacity', 0.3)
      .style('stroke-dasharray', '3,3');
    
    // Remove the grid axis path
    svg.selectAll('.grid path').style('stroke', 'none');
    
    // Create gradient for the line
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', y(d3.min(processedData, d => +d[yAxis])))
      .attr('x2', 0)
      .attr('y2', y(d3.max(processedData, d => +d[yAxis])));
      
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', theme.secondary);
      
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', theme.primary);
    
    // Add the line
    const line = d3.line()
      .x(d => x(d[xAxis]) + x.bandwidth() / 2)
      .y(d => y(+d[yAxis]))
      .curve(d3.curveMonotoneX); // Smoother line
    
    // Create path element and animate it
    const path = svg.append('path')
      .datum(processedData)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 3)
      .attr('d', line);
    
    // Animate the line drawing
    const totalLength = path.node().getTotalLength();
    path
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);
    
    // Create a group for all data points
    const points = svg.append('g')
      .attr('class', 'data-points');
    
    // Add data points with animation
    points.selectAll('.point')
      .data(processedData)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => x(d[xAxis]) + x.bandwidth() / 2)
      .attr('cy', d => y(+d[yAxis]))
      .attr('r', 0) // Start with radius 0
      .attr('fill', theme.primary)
      .attr('stroke', theme.background)
      .attr('stroke-width', 2)
      .transition()
      .delay((d, i) => 1000 + i * 50) // Stagger the appearance after line is drawn
      .duration(300)
      .attr('r', 5); // Final radius
    
    // Add point hover effects
    svg.selectAll('.point')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('r', 7)
          .attr('fill', theme.hover);
        
        // Show tooltip with value
        const tooltip = svg.append('g')
          .attr('class', 'tooltip')
          .attr('transform', `translate(${x(d[xAxis]) + x.bandwidth()/2}, ${y(+d[yAxis]) - 15})`);
        
        tooltip.append('rect')
          .attr('x', -40)
          .attr('y', -30)
          .attr('width', 80)
          .attr('height', 25)
          .attr('fill', 'rgba(0,0,0,0.7)')
          .attr('rx', 4);
        
        tooltip.append('text')
          .text(`${d[yAxis]}`)
          .attr('text-anchor', 'middle')
          .attr('y', -14)
          .attr('fill', 'white')
          .style('font-size', '12px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('r', 5)
          .attr('fill', theme.primary);
        
        svg.selectAll('.tooltip').remove();
      });
    
    // Chart title
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', -15)
      .text(`${yAxis} over ${xAxis}`)
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', theme.text);
    
    // X Axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .text(xAxis)
      .style('font-size', '14px')
      .style('fill', theme.text);
    
    // Y Axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -height / 2)
      .text(yAxis)
      .style('font-size', '14px')
      .style('fill', theme.text);
    
  }, [data, xAxis, yAxis, theme]);
  
  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <svg ref={svgRef}></svg>
    </div>
  );
}

// Scatter Plot Component
function ScatterPlot({ data, xAxis, yAxis, theme }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length || !xAxis || !yAxis) return;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Filter out non-numeric values for both axes
    const processedData = data.filter(d => !isNaN(+d[xAxis]) && !isNaN(+d[yAxis]));
    
    // Check if we have any data after filtering
    if (!processedData.length) {
      // Display a message if no valid data points exist
      const svg = d3.select(svgRef.current)
        .attr('width', 800)
        .attr('height', 400);
        
      svg.append('text')
        .attr('x', 400)
        .attr('y', 200)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('fill', theme.text)
        .text('No valid numeric data points available for the selected axes');
        
      return;
    }
    
    const margin = { top: 40, right: 40, bottom: 80, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add chart background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', theme.background)
      .attr('rx', 5);
    
    // X axis - using scaleLinear for scatter plot
    const x = d3.scaleLinear()
      .domain([
        d3.min(processedData, d => +d[xAxis]) * 0.9, // Add 10% padding
        d3.max(processedData, d => +d[xAxis]) * 1.1
      ])
      .nice()
      .range([0, width]);
    
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.text);
    
    // Style the axis
    svg.selectAll('.domain')
      .style('stroke', theme.grid);
    svg.selectAll('.tick line')
      .style('stroke', theme.grid);
    
    // Y axis
    const y = d3.scaleLinear()
      .domain([
        d3.min(processedData, d => +d[yAxis]) * 0.9, // Add 10% padding
        d3.max(processedData, d => +d[yAxis]) * 1.1
      ])
      .nice()
      .range([height, 0]);
    
    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', theme.text)
      .style('font-size', '12px');
    
    // Add grid lines
    svg.append('g')
      .attr('class', 'grid x-grid')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickSize(-height)
        .tickFormat(''))
      .selectAll('line')
      .style('stroke', theme.grid)
      .style('stroke-opacity', 0.3)
      .style('stroke-dasharray', '3,3');
    
    svg.append('g')
      .attr('class', 'grid y-grid')
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(''))
      .selectAll('line')
      .style('stroke', theme.grid)
      .style('stroke-opacity', 0.3)
      .style('stroke-dasharray', '3,3');
    
    // Remove the grid axis paths
    svg.selectAll('.grid path').style('stroke', 'none');
    
    // Create a custom color scale based on a third variable if available
    // Or use a static color if no third variable
    let colorScale, colorVariable;
    
    // Check if processedData[0] exists before trying to use Object.keys on it
    const numericalColumns = processedData[0] ? Object.keys(processedData[0]).filter(col => 
      col !== xAxis && col !== yAxis && !isNaN(+processedData[0][col])
    ) : [];
    
    // Create tooltip div if it doesn't exist
    let tooltip = d3.select('body').select('.tooltip');
    if (tooltip.empty()) {
      tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0,0,0,0.7)')
        .style('color', 'white')
        .style('padding', '8px')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .style('font-size', '12px')
        .style('box-shadow', '0 2px 10px rgba(0,0,0,0.2)')
        .style('display', 'none')
        .style('z-index', 1000);
    }
    
    if (numericalColumns.length > 0) {
      colorVariable = numericalColumns[0]; // Use first available numerical column
      colorScale = d3.scaleSequential()
        .domain([
          d3.min(processedData, d => +d[colorVariable]),
          d3.max(processedData, d => +d[colorVariable])
        ])
        .interpolator(d3.interpolateBlues); // Using Blues color scheme
      
      // Add points with color based on the chosen variable
      svg.selectAll('.data-point')
        .data(processedData)
        .enter()
        .append('circle')
        .attr('class', 'data-point')
        .attr('cx', d => x(+d[xAxis]))
        .attr('cy', d => y(+d[yAxis]))
        .attr('r', 5)
        .attr('fill', d => colorScale(+d[colorVariable]))
        .attr('stroke', theme.background)
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.7)
        .on('mouseover', function(event, d) {
          d3.select(this)
            .attr('r', 8)
            .attr('stroke-width', 2)
            .attr('opacity', 1);
          
          // Add tooltip
          tooltip.style('display', 'block')
            .html(`
              <strong>${xAxis}:</strong> ${d[xAxis]}<br>
              <strong>${yAxis}:</strong> ${d[yAxis]}<br>
              <strong>${colorVariable}:</strong> ${d[colorVariable]}
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 20) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('r', 5)
            .attr('stroke-width', 0.5)
            .attr('opacity', 0.7);
          
          tooltip.style('display', 'none');
        });
    } else {
      // If no third variable, use a static color
      svg.selectAll('.data-point')
        .data(processedData)
        .enter()
        .append('circle')
        .attr('class', 'data-point')
        .attr('cx', d => x(+d[xAxis]))
        .attr('cy', d => y(+d[yAxis]))
        .attr('r', 5)
        .attr('fill', theme.primary)
        .attr('stroke', theme.background)
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.7)
        .on('mouseover', function(event, d) {
          d3.select(this)
            .attr('r', 8)
            .attr('stroke-width', 2)
            .attr('opacity', 1);
          
          // Add tooltip
          tooltip.style('display', 'block')
            .html(`
              <strong>${xAxis}:</strong> ${d[xAxis]}<br>
              <strong>${yAxis}:</strong> ${d[yAxis]}
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 20) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('r', 5)
            .attr('stroke-width', 0.5)
            .attr('opacity', 0.7);
          
          tooltip.style('display', 'none');
        });
    }
    
    // Add axis labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 20)
      .attr('text-anchor', 'middle')
      .style('fill', theme.text)
      .style('font-size', '14px')
      .text(xAxis);
    
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('text-anchor', 'middle')
      .style('fill', theme.text)
      .style('font-size', '14px')
      .text(yAxis);
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', theme.text) // Using theme text color instead of title color
      .text(`${yAxis} vs ${xAxis}${colorVariable ? ` (colored by ${colorVariable})` : ''}`);
    
    // Add color legend if using a third variable
    if (colorVariable) {
      const legendWidth = 200;
      const legendHeight = 15;
      
      // Create gradient for legend
      const defs = svg.append('defs');
      const linearGradient = defs.append('linearGradient')
        .attr('id', 'colorGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      
      // Add color stops
      linearGradient.selectAll('stop')
        .data([0, 0.2, 0.4, 0.6, 0.8, 1])
        .enter()
        .append('stop')
        .attr('offset', d => d * 100 + '%')
        .attr('stop-color', d => d3.interpolateBlues(d));
      
      // Create legend rect with gradient
      const legend = svg.append('g')
        .attr('transform', `translate(${width - legendWidth}, ${height + 50})`);
      
      legend.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#colorGradient)');
      
      // Add min and max labels to legend
      const minVal = d3.min(processedData, d => +d[colorVariable]);
      const maxVal = d3.max(processedData, d => +d[colorVariable]);
      
      legend.append('text')
        .attr('x', 0)
        .attr('y', legendHeight + 15)
        .style('font-size', '12px')
        .style('fill', theme.text)
        .text(minVal.toFixed(1));
      
      legend.append('text')
        .attr('x', legendWidth)
        .attr('y', legendHeight + 15)
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .style('fill', theme.text)
        .text(maxVal.toFixed(1));
      
      legend.append('text')
        .attr('x', legendWidth / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', theme.text)
        .text(colorVariable);
    }
  }, [data, xAxis, yAxis, theme]);
  
  return <svg ref={svgRef}></svg>;
}