import React, { useState, useEffect } from 'react';
import { Home, TrendingUp, FileText, Bell, Wrench, Users, Settings, LogOut, Activity, AlertTriangle, CheckCircle, Thermometer, Zap, Droplets, Gauge, LucideIcon } from 'lucide-react';

const SoltropyDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeView, setActiveView] = useState('overview');
  const [telemetryData, setTelemetryData] = useState({
    solarTemp: 68.2,
    flowRate: 12.3,
    powerGen: 42.3,
    efficiency: 87.5,
    pressure: 2.1,
    heatPumpCOP: 3.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData(prev => ({
        solarTemp: parseFloat((prev.solarTemp + (Math.random() - 0.5) * 2).toFixed(1)),
        flowRate: parseFloat((prev.flowRate + (Math.random() - 0.5) * 0.5).toFixed(1)),
        powerGen: parseFloat((prev.powerGen + (Math.random() - 0.5) * 3).toFixed(1)),
        efficiency: parseFloat((prev.efficiency + (Math.random() - 0.5) * 2).toFixed(1)),
        pressure: parseFloat((prev.pressure + (Math.random() - 0.5) * 0.1).toFixed(2)),
        heatPumpCOP: parseFloat((prev.heatPumpCOP + (Math.random() - 0.5) * 0.2).toFixed(1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const LoginScreen = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md border border-gray-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">SOLTROPY</h1>
          <p className="text-gray-600">IoT Platform - ThingsBoard Integration</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Email</label>
            <input 
              type="email" 
              placeholder="user@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Select Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setUserRole('homeowner');
                  setIsLoggedIn(true);
                }}
                className="p-4 border border-gray-300 rounded hover:bg-gray-50"
              >
                <Home className="w-6 h-6 mx-auto mb-2 text-black" />
                <div className="text-sm font-medium">Client</div>
              </button>
              
              <button
                onClick={() => {
                  setUserRole('technician');
                  setIsLoggedIn(true);
                }}
                className="p-4 border border-gray-300 rounded hover:bg-gray-50"
              >
                <Wrench className="w-6 h-6 mx-auto mb-2 text-black" />
                <div className="text-sm font-medium">Technician</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TelemetryWidget = ({ title, value, unit, icon: Icon, trend }: { title: string; value: number; unit: string; icon: LucideIcon; trend?: number }) => (
    <div className="bg-white border border-gray-300 rounded p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        {trend && (
          <span className="text-xs px-2 py-1 rounded bg-gray-100">
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-black">{value}</span>
        <span className="text-sm text-gray-600">{unit}</span>
      </div>
      <div className="mt-2 text-xs text-gray-500">Last updated: now</div>
    </div>
  );

  const TimeSeriesChart = ({ title, data }: { title: string; data: number[] }) => (
    <div className="bg-white border border-gray-300 rounded p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-4">{title}</h3>
      <div className="h-40 flex items-end justify-between gap-1">
        {data.map((value: number, i: number) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div 
              className="w-full bg-gray-800 rounded-t transition-all duration-500" 
              style={{height: `${value}%`}}
            ></div>
            <span className="text-xs text-gray-500">{i}h</span>
          </div>
        ))}
      </div>
    </div>
  );

  const GaugeWidget = ({ title, value, max, unit }: { title: string; value: number; max: number; unit: string }) => {
    const percentage = (value / max) * 100;
    const rotation = (percentage / 100) * 180 - 90;
    
    return (
      <div className="bg-white border border-gray-300 rounded p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
        <div className="relative w-full aspect-square flex items-center justify-center">
          <svg viewBox="0 0 100 60" className="w-full">
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#000"
              strokeWidth="8"
              strokeDasharray={`${percentage * 1.25} 125`}
            />
            <circle cx="50" cy="50" r="3" fill="#000"/>
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="20"
              stroke="#000"
              strokeWidth="2"
              transform={`rotate(${rotation} 50 50)`}
            />
          </svg>
          <div className="absolute bottom-0 text-center">
            <div className="text-2xl font-bold text-black">{value}</div>
            <div className="text-xs text-gray-600">{unit}</div>
          </div>
        </div>
      </div>
    );
  };

  const DeviceTable = () => (
    <div className="bg-white border border-gray-300 rounded overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-300 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700">Device Telemetry</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Device</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Type</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Value</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-900">Solar-Thermal-01</td>
              <td className="px-4 py-2 text-gray-600">Temperature</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Active</span>
              </td>
              <td className="px-4 py-2 font-mono text-gray-900">{telemetryData.solarTemp}°C</td>
              <td className="px-4 py-2 text-gray-500">2s ago</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-900">Flow-Meter-01</td>
              <td className="px-4 py-2 text-gray-600">Flow Rate</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Active</span>
              </td>
              <td className="px-4 py-2 font-mono text-gray-900">{telemetryData.flowRate} L/min</td>
              <td className="px-4 py-2 text-gray-500">2s ago</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-900">PV-Inverter-01</td>
              <td className="px-4 py-2 text-gray-600">Power</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Active</span>
              </td>
              <td className="px-4 py-2 font-mono text-gray-900">{telemetryData.powerGen} kW</td>
              <td className="px-4 py-2 text-gray-500">2s ago</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-900">HeatPump-01</td>
              <td className="px-4 py-2 text-gray-600">COP</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">Warning</span>
              </td>
              <td className="px-4 py-2 font-mono text-gray-900">{telemetryData.heatPumpCOP}</td>
              <td className="px-4 py-2 text-gray-500">2s ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const AlarmWidget = () => (
    <div className="bg-white border border-gray-300 rounded">
      <div className="px-4 py-3 border-b border-gray-300 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700">Active Alarms</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-4 py-3 hover:bg-gray-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-gray-600 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">Heat Pump COP Low</span>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
              <p className="text-xs text-gray-600">Device: HeatPump-01 | Value: 2.1</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 hover:bg-gray-50">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">All Solar Systems Normal</span>
                <span className="text-xs text-gray-500">5m ago</span>
              </div>
              <p className="text-xs text-gray-600">All devices operating within range</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const menuItems = userRole === 'homeowner' ? [
      { id: 'overview', label: 'Overview', icon: Home },
      { id: 'trends', label: 'Trends', icon: TrendingUp },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'alerts', label: 'Alerts', icon: Bell },
    ] : [
      { id: 'diagnostics', label: 'Diagnostics', icon: Activity },
      { id: 'fleet', label: 'Fleet', icon: Users },
      { id: 'maintenance', label: 'Maintenance', icon: Wrench },
      { id: 'installations', label: 'Setup', icon: Settings },
    ];

    return (
      <div className="min-h-screen bg-gray-100 flex">
        <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
          <div className="p-6 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-black">SOLTROPY</h1>
            <p className="text-sm text-gray-600 mt-1">
              {userRole === 'homeowner' ? 'Client Portal' : 'Technician Portal'}
            </p>
          </div>

          <nav className="p-4 flex-1">
            <div className="space-y-1">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                    activeView === item.id 
                      ? 'bg-black text-white' 
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-300">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setUserRole('');
                setActiveView('overview');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-100 rounded"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const renderContent = () => {
    if (activeView === 'overview') {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black">Dashboard Overview</h2>
            <div className="text-sm text-gray-600">Last update: {new Date().toLocaleTimeString()}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TelemetryWidget 
              title="Solar Temperature" 
              value={telemetryData.solarTemp}
              unit="°C"
              icon={Thermometer}
              trend={2.3}
            />
            <TelemetryWidget 
              title="Power Generation" 
              value={telemetryData.powerGen}
              unit="kW"
              icon={Zap}
              trend={5.1}
            />
            <TelemetryWidget 
              title="Flow Rate" 
              value={telemetryData.flowRate}
              unit="L/min"
              icon={Droplets}
              trend={-1.2}
            />
            <TelemetryWidget 
              title="System Efficiency" 
              value={telemetryData.efficiency}
              unit="%"
              icon={Gauge}
              trend={3.4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TimeSeriesChart 
              title="Power Generation - Last 24 Hours"
              data={[45, 52, 48, 65, 70, 68, 75, 82, 78, 85, 88, 90, 87, 83, 80, 75, 70, 65, 58, 50, 45, 40, 35, 30]}
            />
            <TimeSeriesChart 
              title="Energy Consumption - Last 24 Hours"
              data={[30, 32, 35, 40, 45, 50, 55, 60, 65, 70, 68, 65, 60, 58, 55, 52, 50, 48, 45, 42, 40, 38, 35, 32]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <GaugeWidget 
              title="Heat Pump COP"
              value={telemetryData.heatPumpCOP}
              max={5}
              unit="COP"
            />
            <GaugeWidget 
              title="System Pressure"
              value={telemetryData.pressure}
              max={3}
              unit="bar"
            />
            <GaugeWidget 
              title="Efficiency Rating"
              value={telemetryData.efficiency}
              max={100}
              unit="%"
            />
          </div>

          <DeviceTable />
          <AlarmWidget />
        </div>
      );
    }

    if (activeView === 'trends') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black">Historical Data</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TimeSeriesChart 
              title="Daily Generation - Last 7 Days"
              data={[65, 72, 68, 81, 78, 85, 81]}
            />
            <TimeSeriesChart 
              title="Daily Consumption - Last 7 Days"
              data={[58, 64, 60, 73, 70, 76, 72]}
            />
          </div>

          <div className="bg-white border border-gray-300 rounded p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Daily Generation</span>
                <span className="text-sm font-bold text-black">72.8 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Peak Power Output</span>
                <span className="text-sm font-bold text-black">85 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-sm font-bold text-black">99.2%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeView === 'reports') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black">Reports</h2>
          
          <div className="bg-white border border-gray-300 rounded p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">Monthly ESG Report - October 2025</h3>
                <p className="text-sm text-gray-600 mt-1">Generated: Nov 1, 2025</p>
              </div>
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm">
                Download
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-xs text-gray-600 mb-1">Generation</p>
                <p className="text-xl font-bold text-black">2,430 kWh</p>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-xs text-gray-600 mb-1">Carbon Offset</p>
                <p className="text-xl font-bold text-black">973 kg</p>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-xs text-gray-600 mb-1">Savings</p>
                <p className="text-xl font-bold text-black">£340</p>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-xs text-gray-600 mb-1">Uptime</p>
                <p className="text-xl font-bold text-black">99.2%</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeView === 'alerts') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black">Alarms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-300 rounded p-4">
              <p className="text-2xl font-bold text-black mb-1">1</p>
              <p className="text-sm text-gray-600">Critical</p>
            </div>
            <div className="bg-white border border-gray-300 rounded p-4">
              <p className="text-2xl font-bold text-black mb-1">3</p>
              <p className="text-sm text-gray-600">Warning</p>
            </div>
            <div className="bg-white border border-gray-300 rounded p-4">
              <p className="text-2xl font-bold text-black mb-1">5</p>
              <p className="text-sm text-gray-600">Info</p>
            </div>
          </div>

          <AlarmWidget />
        </div>
      );
    }

    if (activeView === 'diagnostics') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black">Device Diagnostics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TelemetryWidget 
              title="Temp Sensor 1" 
              value={telemetryData.solarTemp}
              unit="°C"
              icon={Thermometer}
            />
            <TelemetryWidget 
              title="Flow Sensor" 
              value={telemetryData.flowRate}
              unit="L/min"
              icon={Droplets}
            />
            <TelemetryWidget 
              title="Pressure" 
              value={telemetryData.pressure}
              unit="bar"
              icon={Gauge}
            />
            <TelemetryWidget 
              title="Power Output" 
              value={telemetryData.powerGen}
              unit="kW"
              icon={Zap}
            />
          </div>

          <DeviceTable />
        </div>
      );
    }

    if (activeView === 'fleet') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black">Fleet Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-300 rounded p-4">
              <p className="text-sm text-gray-600 mb-1">Total</p>
              <p className="text-3xl font-bold text-black">24</p>
            </div>
            <div className="bg-white border border-gray-300 rounded p-4">
              <p className="text-sm text-gray-600 mb-1">Online</p>
              <p className="text-3xl font-bold text-black">21</p>
            </div>
            <div className="bg-white border border-gray-300 rounded p-4">
              <p className="text-sm text-gray-600 mb-1">Warning</p>
              <p className="text-3xl font-bold text-black">2</p>
            </div>
            <div className="bg-white border border-gray-300 rounded p-4">
              <p className="text-sm text-gray-600 mb-1">Offline</p>
              <p className="text-3xl font-bold text-black">1</p>
            </div>
          </div>

          <DeviceTable />
        </div>
      );
    }

    if (activeView === 'maintenance') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black">Maintenance Schedule</h2>
          
          <div className="bg-white border border-gray-300 rounded p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Upcoming Tasks</h3>
            <div className="space-y-2">
              <div className="p-3 border border-gray-200 rounded hover:bg-gray-50">
                <p className="text-sm font-medium text-black">Annual Inspection - John Smith</p>
                <p className="text-xs text-gray-600">Solar Thermal | Nov 7, 2025</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeView === 'installations') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black">New Installation</h2>
          
          <div className="bg-white border border-gray-300 rounded p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Setup Wizard</h3>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Step 1 of 4</span>
                <span className="text-sm font-bold">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-black h-2 rounded-full" style={{width: '25%'}}></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Customer Name</label>
              <input 
                type="text" 
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <MainLayout>
      {renderContent()}
    </MainLayout>
  );
};

export default SoltropyDashboard;
