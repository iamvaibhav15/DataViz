// frontend/app/page.js
"use client";


export default function MainPage() {

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4">
        <div className="py-8 max-w-7xl mx-auto ">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Transform Your <span className="text-purple-400">Data</span>{" "}
                into Actionable{" "}
                <span className="text-purple-400">Insights</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Vizulytics empowers you to unlock the hidden patterns in your
                data through powerful visualizations. Upload, analyze, and share
                your findings all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all">
                  Get Started Now
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-xl bg-gray-800 p-4 shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-purple-400">
                    Dashboard Analytics
                  </h3>
                  <div className="flex gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 mb-4">
                  {/* Mock Line Chart SVG */}
                  <svg
                    className="w-full h-48"
                    viewBox="0 0 300 150"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0,120 L25,85 L50,100 L75,75 L100,90 L125,60 L150,75 L175,40 L200,60 L225,50 L250,20 L275,40 L300,30"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M0,120 L25,85 L50,100 L75,75 L100,90 L125,60 L150,75 L175,40 L200,60 L225,50 L250,20 L275,40 L300,30 L300,150 L0,150 Z"
                      fill="url(#purple-gradient)"
                      fillOpacity="0.2"
                    />
                    <defs>
                      <linearGradient
                        id="purple-gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3B82F6"
                          stopOpacity="0.5"
                        />
                        <stop
                          offset="100%"
                          stopColor="#3B82F6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-900 rounded-lg p-3">
                    {/* Mock Pie Chart SVG */}
                    <svg
                      className="w-full h-32"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="50" cy="50" r="40" fill="#1F2937" />
                      <path
                        d="M50,50 L50,10 A40,40 0 0,1 85,65 Z"
                        fill="#3B82F6"
                      />
                      <path
                        d="M50,50 L85,65 A40,40 0 0,1 15,65 Z"
                        fill="#10B981"
                      />
                      <path
                        d="M50,50 L15,65 A40,40 0 0,1 50,10 Z"
                        fill="#F59E0B"
                      />
                    </svg>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3">
                    {/* Mock Bar Chart SVG */}
                    <svg
                      className="w-full h-32"
                      viewBox="0 0 100 80"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="5"
                        y="10"
                        width="15"
                        height="70"
                        fill="#3B82F6"
                      />
                      <rect
                        x="30"
                        y="20"
                        width="15"
                        height="60"
                        fill="#10B981"
                      />
                      <rect
                        x="55"
                        y="30"
                        width="15"
                        height="50"
                        fill="#F59E0B"
                      />
                      <rect
                        x="80"
                        y="15"
                        width="15"
                        height="65"
                        fill="#EF4444"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Visualize Your Data Like Never Before
            </h2>

            {/* Section Headings - replacing tabs */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-purple-400 mb-4">
                Interactive Charts
              </h2>
              <div className="bg-gray-900 rounded-lg p-6 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-purple-400">
                      Line & Area Charts
                    </h3>
                    <div className="h-40 flex items-center justify-center">
                      <svg
                        className="w-full h-32"
                        viewBox="0 0 300 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0,80 L50,60 L100,70 L150,20 L200,40 L250,10 L300,30"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          fill="none"
                        />
                        <path
                          d="M0,80 L50,60 L100,70 L150,20 L200,40 L250,10 L300,30 L300,100 L0,100 Z"
                          fill="url(#area-gradient)"
                          fillOpacity="0.2"
                        />
                        <defs>
                          <linearGradient
                            id="area-gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#3B82F6"
                              stopOpacity="0.5"
                            />
                            <stop
                              offset="100%"
                              stopColor="#3B82F6"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">
                      Track trends and changes over time with dynamic line
                      charts.
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-purple-400">
                      Bar & Column Charts
                    </h3>
                    <div className="h-40 flex items-center justify-center">
                      <svg
                        className="w-full h-32"
                        viewBox="0 0 200 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="10"
                          y="20"
                          width="20"
                          height="80"
                          fill="#3B82F6"
                        />
                        <rect
                          x="40"
                          y="40"
                          width="20"
                          height="60"
                          fill="#10B981"
                        />
                        <rect
                          x="70"
                          y="10"
                          width="20"
                          height="90"
                          fill="#F59E0B"
                        />
                        <rect
                          x="100"
                          y="30"
                          width="20"
                          height="70"
                          fill="#EF4444"
                        />
                        <rect
                          x="130"
                          y="50"
                          width="20"
                          height="50"
                          fill="#8B5CF6"
                        />
                        <rect
                          x="160"
                          y="35"
                          width="20"
                          height="65"
                          fill="#EC4899"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">
                      Compare values across categories with customizable bar
                      charts.
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-purple-400">
                      Pie & Donut Charts
                    </h3>
                    <div className="h-40 flex items-center justify-center">
                      <svg
                        className="w-32 h-32"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="50" cy="50" r="25" fill="#1F2937" />
                        <path
                          d="M50,50 L50,10 A40,40 0 0,1 90,50 Z"
                          fill="#3B82F6"
                        />
                        <path
                          d="M50,50 L90,50 A40,40 0 0,1 75,85 Z"
                          fill="#10B981"
                        />
                        <path
                          d="M50,50 L75,85 A40,40 0 0,1 25,85 Z"
                          fill="#F59E0B"
                        />
                        <path
                          d="M50,50 L25,85 A40,40 0 0,1 10,50 Z"
                          fill="#EF4444"
                        />
                        <path
                          d="M50,50 L10,50 A40,40 0 0,1 50,10 Z"
                          fill="#8B5CF6"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">
                      Show proportions and percentages with interactive pie
                      charts.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-purple-400 mb-4">
                Geospatial Maps
              </h2>
              <div className="bg-gray-900 rounded-lg p-6 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-purple-400">
                      Interactive World Maps
                    </h3>
                    <div className="h-40 flex items-center justify-center">
                      <svg
                        className="w-full h-32"
                        viewBox="0 0 200 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Simplified world map outline */}
                        <path
                          d="M10,50 Q30,40 50,45 T90,50 T130,40 T170,60 T190,50"
                          stroke="#4B5563"
                          fill="none"
                          strokeWidth="1"
                        />
                        <path
                          d="M30,60 Q40,55 60,65 T100,60 T140,70 T180,65"
                          stroke="#4B5563"
                          fill="none"
                          strokeWidth="1"
                        />
                        <circle cx="50" cy="45" r="4" fill="#3B82F6" />
                        <circle cx="90" cy="50" r="6" fill="#EF4444" />
                        <circle cx="140" cy="40" r="5" fill="#10B981" />
                        <circle cx="170" cy="60" r="3" fill="#F59E0B" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">
                      Visualize global data with interactive heat maps and
                      markers.
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-purple-400">
                      Region-specific Maps
                    </h3>
                    <div className="h-40 flex items-center justify-center">
                      <svg
                        className="w-full h-32"
                        viewBox="0 0 200 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20,20 L60,20 L80,40 L70,70 L40,80 L20,50 Z"
                          fill="#3B82F6"
                          fillOpacity="0.7"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <path
                          d="M90,30 L130,20 L160,40 L150,70 L100,70 Z"
                          fill="#10B981"
                          fillOpacity="0.7"
                          stroke="#065F46"
                          strokeWidth="1"
                        />
                        <path
                          d="M70,80 L100,80 L130,90 L90,100 L60,90 Z"
                          fill="#F59E0B"
                          fillOpacity="0.7"
                          stroke="#B45309"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">
                      Focus on specific countries or regions with detailed maps.
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-purple-400">
                      Choropleth Maps
                    </h3>
                    <div className="h-40 flex items-center justify-center">
                      <svg
                        className="w-full h-32"
                        viewBox="0 0 200 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="20"
                          y="20"
                          width="30"
                          height="30"
                          fill="#BFDBFE"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="50"
                          y="20"
                          width="30"
                          height="30"
                          fill="#93C5FD"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="80"
                          y="20"
                          width="30"
                          height="30"
                          fill="#60A5FA"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="110"
                          y="20"
                          width="30"
                          height="30"
                          fill="#3B82F6"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="140"
                          y="20"
                          width="30"
                          height="30"
                          fill="#2563EB"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="20"
                          y="50"
                          width="30"
                          height="30"
                          fill="#1D4ED8"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="50"
                          y="50"
                          width="30"
                          height="30"
                          fill="#3B82F6"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="80"
                          y="50"
                          width="30"
                          height="30"
                          fill="#93C5FD"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="110"
                          y="50"
                          width="30"
                          height="30"
                          fill="#60A5FA"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                        <rect
                          x="140"
                          y="50"
                          width="30"
                          height="30"
                          fill="#BFDBFE"
                          stroke="#1E40AF"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">
                      Show data variations across geographic areas with color
                      gradients.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-purple-400 mb-4">
                Custom Dashboards
              </h2>
              <div className="mb-12">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="font-medium mb-4 text-purple-400">
                    Interactive Dashboard Builder
                  </h3>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6 md:col-span-2 bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">
                          Revenue Growth
                        </span>
                        <span className="text-xs font-medium text-green-400">
                          +24%
                        </span>
                      </div>
                      <svg
                        className="w-full h-24"
                        viewBox="0 0 200 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0,80 L40,70 L80,60 L120,40 L160,20 L200,10"
                          stroke="#10B981"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div className="col-span-3 md:col-span-2 bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">
                          User Demographics
                        </span>
                      </div>
                      <svg
                        className="w-full h-24"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#4B5563"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="8"
                          strokeDasharray="125.6 125.6"
                          strokeDashoffset="94.2"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="8"
                          strokeDasharray="125.6 125.6"
                          strokeDashoffset="188.4"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="8"
                          strokeDasharray="125.6 125.6"
                          strokeDashoffset="219.8"
                        />
                      </svg>
                    </div>
                    <div className="col-span-3 md:col-span-2 bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">
                          Conversion Rate
                        </span>
                      </div>
                      <div className="h-24 flex flex-col justify-center items-center">
                        <span className="text-3xl font-bold text-purple-400">
                          8.7%
                        </span>
                        <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                          <div
                            className="bg-purple-400 h-2 rounded-full"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">
                          Target: 10%
                        </span>
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-4 bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">
                          Monthly Performance
                        </span>
                      </div>
                      <svg
                        className="w-full h-24"
                        viewBox="0 0 300 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="10"
                          y="40"
                          width="20"
                          height="60"
                          fill="#3B82F6"
                        />
                        <rect
                          x="40"
                          y="30"
                          width="20"
                          height="70"
                          fill="#3B82F6"
                        />
                        <rect
                          x="70"
                          y="50"
                          width="20"
                          height="50"
                          fill="#3B82F6"
                        />
                        <rect
                          x="100"
                          y="20"
                          width="20"
                          height="80"
                          fill="#3B82F6"
                        />
                        <rect
                          x="130"
                          y="35"
                          width="20"
                          height="65"
                          fill="#3B82F6"
                        />
                        <rect
                          x="160"
                          y="45"
                          width="20"
                          height="55"
                          fill="#3B82F6"
                        />
                        <rect
                          x="190"
                          y="15"
                          width="20"
                          height="85"
                          fill="#3B82F6"
                        />
                        <rect
                          x="220"
                          y="25"
                          width="20"
                          height="75"
                          fill="#3B82F6"
                        />
                        <rect
                          x="250"
                          y="35"
                          width="20"
                          height="65"
                          fill="#3B82F6"
                        />
                        <rect
                          x="280"
                          y="10"
                          width="20"
                          height="90"
                          fill="#3B82F6"
                        />
                      </svg>
                    </div>
                    <div className="col-span-6 md:col-span-2 bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">
                          Key Metrics
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-900 rounded p-2">
                          <div className="text-xs text-gray-400">Users</div>
                          <div className="text-lg font-semibold">24.8k</div>
                        </div>
                        <div className="bg-gray-900 rounded p-2">
                          <div className="text-xs text-gray-400">Sessions</div>
                          <div className="text-lg font-semibold">36.2k</div>
                        </div>
                        <div className="bg-gray-900 rounded p-2">
                          <div className="text-xs text-gray-400">Bounce</div>
                          <div className="text-lg font-semibold">42%</div>
                        </div>
                        <div className="bg-gray-900 rounded p-2">
                          <div className="text-xs text-gray-400">Duration</div>
                          <div className="text-lg font-semibold">1:32</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-purple-400 mb-4">
                Automated Reports
              </h2>
              <div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="font-medium mb-4 text-purple-400">
                    Automated Report Generator
                  </h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Weekly Summary</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                      </div>
                      <div className="mt-6 border-t border-gray-700 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">
                            Schedule
                          </span>
                          <span className="text-xs bg-purple-900 text-purple-300 py-1 px-2 rounded">
                            Every Monday
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/3 bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Performance Review</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                      </div>
                      <div className="mt-6 border-t border-gray-700 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">
                            Schedule
                          </span>
                          <span className="text-xs bg-purple-900 text-purple-300 py-1 px-2 rounded">
                            Monthly
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/3 bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Custom Report</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                      <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                          <span className="mt-2 block text-sm font-medium text-gray-400">
                            Create New Template
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h1 className="text-bold text-3xl mb-6">
                Unlock the Power of Your Data
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="w-12 h-12 bg-purple-900 text-purple-400 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Easy Data Import
                  </h3>
                  <p className="text-gray-400">
                    Upload your CSV files with a simple drag-and-drop interface.
                    Connect to popular data sources or APIs.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="w-12 h-12 bg-purple-900 text-purple-400 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Powerful Analytics
                  </h3>
                  <p className="text-gray-400">
                    Transform raw data into meaningful insights with our
                    intuitive analytics tools and customizable visualizations.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="w-12 h-12 bg-purple-900 text-purple-400 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684C9.886 13.938 10.5 13 12 13c1.5 0 2.114.938 2.316 1.342m0-2.684C14.114 11.062 13.5 10 12 10c-1.5 0-2.114 1.062-2.316 1.342m4.632 0a3 3 0 11-4.632 0"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Data Security</h3>
                  <p className="text-gray-400">
                    Enterprise-grade security measures to keep your data safe.
                    Control access with role-based permissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
