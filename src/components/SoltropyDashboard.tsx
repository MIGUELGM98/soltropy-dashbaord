import React, { useState } from 'react';
import { Home, TrendingUp, FileText, Bell, Wrench, Users, Settings, LogOut, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const SoltropyDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeView, setActiveView] = useState('overview');

  const LoginScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-black">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">SOLTROPY</h1>
          <p className="text-gray-700">IoT Integrated Platform</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Email</label>
            <input 
              type="email" 
              placeholder="usuario@example.com"
              className="w-full px-4 py-2 border-2 border-black rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 border-2 border-black rounded-lg"
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
                className="p-4 border-2 border-black rounded-lg hover:bg-gray-100"
              >
                <Home className="w-6 h-6 mx-auto mb-2 text-black" />
                <div className="text-sm font-medium">Homeowner</div>
              </button>
              
              <button
                onClick={() => {
                  setUserRole('technician');
                  setIsLoggedIn(true);
                }}
                className="p-4 border-2 border-black rounded-lg hover:bg-gray-100"
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
      <div className="min-h-screen bg-white flex">
        <div className="w-64 bg-white border-r-2 border-black flex flex-col">
          <div className="p-6 border-b-2 border-black">
            <h1 className="text-2xl font-bold text-black">SOLTROPY</h1>
            <p className="text-sm text-gray-700 mt-1">
              {userRole === 'homeowner' ? 'Client Portal' : 'Technician Portal'}
            </p>
          </div>

          <nav className="p-4 flex-1">
            <div className="space-y-1">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors border ${
                    activeView === item.id 
                      ? 'bg-black text-white border-black' 
                      : 'text-black hover:bg-gray-100 border-transparent'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t-2 border-black bg-white">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setUserRole('');
                setActiveView('overview');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <MainLayout>
      {userRole === 'homeowner' ? <HomeownerContent activeView={activeView} /> : <TechnicianContent activeView={activeView} />}
    </MainLayout>
  );
};

const HomeownerContent = ({ activeView }: { activeView: string }) => {
  if (activeView === 'overview') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">System Overview</h2>
          <p className="text-gray-700">Consolidated view of all your renewable systems</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-700 mb-1">Solar Thermal</p>
                <p className="text-3xl font-bold text-black">42.3 kWh</p>
                <p className="text-sm text-gray-600 mt-1">Today generation</p>
              </div>
              <Activity className="w-8 h-8 text-black" />
            </div>
            <div className="flex items-center gap-2 text-xs border-t border-gray-300 pt-3">
              <CheckCircle className="w-4 h-4 text-black" />
              <span className="text-gray-700">Operating Normally</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-700 mb-1">Solar PV</p>
                <p className="text-3xl font-bold text-black">38.7 kWh</p>
                <p className="text-sm text-gray-600 mt-1">Today generation</p>
              </div>
              <Activity className="w-8 h-8 text-black" />
            </div>
            <div className="flex items-center gap-2 text-xs border-t border-gray-300 pt-3">
              <CheckCircle className="w-4 h-4 text-black" />
              <span className="text-gray-700">Operating Normally</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-700 mb-1">Heat Pump</p>
                <p className="text-3xl font-bold text-black">COP 3.2</p>
                <p className="text-sm text-gray-600 mt-1">Current efficiency</p>
              </div>
              <Activity className="w-8 h-8 text-black" />
            </div>
            <div className="flex items-center gap-2 text-xs border-t border-gray-300 pt-3">
              <AlertTriangle className="w-4 h-4 text-black" />
              <span className="text-gray-700">Needs Attention</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h3 className="text-lg font-bold text-black mb-4">Combined Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Total Energy Generated</span>
                <span className="font-bold text-black">81.0 kWh</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-400">
                <div className="bg-black h-3 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Carbon Offset</span>
                <span className="font-bold text-black">32.4 kg CO2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-400">
                <div className="bg-black h-3 rounded-full" style={{width: '82%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h3 className="text-lg font-bold text-black mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-100 rounded border-2 border-black">
              <AlertTriangle className="w-5 h-5 text-black mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-black">Heat Pump Efficiency Low</p>
                <p className="text-sm text-gray-700">COP below optimal range - 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-white rounded border border-black">
              <CheckCircle className="w-5 h-5 text-black mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-black">Solar Systems Operating Normally</p>
                <p className="text-sm text-gray-700">All solar systems within expected range</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'trends') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Trends & Analytics</h2>
          <p className="text-gray-700">Historical analysis and predictions</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h3 className="text-lg font-bold text-black mb-4">Energy Generation (Last 7 Days)</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 72, 68, 81, 78, 85, 81].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-black rounded-t border border-black" style={{height: `${height}%`}}></div>
                <span className="text-xs text-gray-700">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <h3 className="text-lg font-bold text-black mb-4">Monthly Comparison</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">This Month</span>
                <span className="font-bold text-black">2,430 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Last Month</span>
                <span className="text-gray-700">2,210 kWh</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-300 pt-3">
                <span className="font-medium text-black">Improvement</span>
                <span className="font-bold text-black">+10%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <h3 className="text-lg font-bold text-black mb-4">Predictions</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Next 7 Days</span>
                <span className="font-bold text-black">580 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Confidence</span>
                <span className="text-gray-700">87%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'reports') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Verified Reports</h2>
          <p className="text-gray-700">Blockchain-verified ESG reports</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-black">Monthly ESG Report - October 2025</h3>
              <p className="text-sm text-gray-700 mt-1">Generated Nov 1, 2025 - Blockchain Verified</p>
            </div>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 border-2 border-black">
              Download
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-100 rounded border-2 border-gray-400">
              <p className="text-sm text-gray-700 mb-1">Generation</p>
              <p className="text-2xl font-bold text-black">2,430 kWh</p>
            </div>
            <div className="p-4 bg-gray-100 rounded border-2 border-gray-400">
              <p className="text-sm text-gray-700 mb-1">Carbon Offset</p>
              <p className="text-2xl font-bold text-black">973 kg</p>
            </div>
            <div className="p-4 bg-gray-100 rounded border-2 border-gray-400">
              <p className="text-sm text-gray-700 mb-1">Savings</p>
              <p className="text-2xl font-bold text-black">£340</p>
            </div>
            <div className="p-4 bg-gray-100 rounded border-2 border-gray-400">
              <p className="text-sm text-gray-700 mb-1">Uptime</p>
              <p className="text-2xl font-bold text-black">99.2%</p>
            </div>
          </div>

          <div className="bg-gray-100 border-2 border-black rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-black mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-black mb-2">Blockchain Verification</p>
                <p className="text-xs font-mono text-gray-700 break-all">
                  Hash: 0x3f2a9b8c4d1e6f7a2b5c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'alerts') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Alerts & Notifications</h2>
          <p className="text-gray-700">System alerts and notifications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-black">
            <p className="text-2xl font-bold text-black mb-1">1</p>
            <p className="text-sm text-gray-700">Critical</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg border-2 border-gray-400">
            <p className="text-2xl font-bold text-black mb-1">3</p>
            <p className="text-sm text-gray-700">Warning</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-gray-400">
            <p className="text-2xl font-bold text-black mb-1">5</p>
            <p className="text-sm text-gray-700">Info</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg border-2 border-black">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-black mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-black">Critical: Heat Pump Malfunction</p>
                <p className="text-sm text-gray-700 mt-1">System stopped - immediate attention required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const TechnicianContent = ({ activeView }: { activeView: string }) => {
  if (activeView === 'diagnostics') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Diagnostic Dashboard</h2>
          <p className="text-gray-700">Detailed sensor readings and remote diagnostics</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h3 className="text-lg font-bold text-black mb-4">Active Systems</h3>
          <div className="space-y-3">
            <div className="p-4 border-2 border-gray-400 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-black" />
                  <div>
                    <p className="font-bold text-black">Solar Thermal - Unit A</p>
                    <p className="text-sm text-gray-700">ID: ST-2025-001</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-black text-sm rounded-full border border-gray-400">Online</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-gray-300 pt-3">
                <div>
                  <p className="text-xs text-gray-700 mb-1">Temp Flow</p>
                  <p className="font-bold text-black">68.2C</p>
                </div>
                <div>
                  <p className="text-xs text-gray-700 mb-1">Temp Return</p>
                  <p className="font-bold text-black">42.5C</p>
                </div>
                <div>
                  <p className="text-xs text-gray-700 mb-1">Flow Rate</p>
                  <p className="font-bold text-black">12.3 L/min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'fleet') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Fleet Overview</h2>
          <p className="text-gray-700">Installation monitoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-2 border-black">
            <p className="text-sm text-gray-700 mb-1">Total</p>
            <p className="text-3xl font-bold text-black">24</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-400">
            <p className="text-sm text-gray-700 mb-1">Online</p>
            <p className="text-3xl font-bold text-black">21</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg border-2 border-gray-400">
            <p className="text-sm text-gray-700 mb-1">Warning</p>
            <p className="text-3xl font-bold text-black">2</p>
          </div>
          <div className="bg-gray-300 p-4 rounded-lg border-2 border-black">
            <p className="text-sm text-gray-700 mb-1">Critical</p>
            <p className="text-3xl font-bold text-black">1</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'maintenance') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Maintenance Tools</h2>
          <p className="text-gray-700">Maintenance schedules and updates</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h3 className="text-lg font-bold text-black mb-4">Upcoming Maintenance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-400 rounded">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center border border-black">
                  <span className="text-lg font-bold text-black">07</span>
                </div>
                <div>
                  <p className="font-bold text-black">Annual Inspection - John Smith</p>
                  <p className="text-sm text-gray-700">Solar Thermal - London</p>
                </div>
              </div>
              <button className="px-4 py-2 border-2 border-black rounded hover:bg-gray-100">Schedule</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'installations') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">New Installation Setup</h2>
          <p className="text-gray-700">Onboarding with auto-discovery</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h3 className="text-lg font-bold text-black mb-4">Setup Wizard</h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Step 1 of 4: Gateway Configuration</span>
              <span className="text-sm font-bold text-black">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 border border-gray-400">
              <div className="bg-black h-2 rounded-full" style={{width: '25%'}}></div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Customer Name</label>
              <input 
                type="text" 
                placeholder="Enter customer name"
                className="w-full px-4 py-2 border-2 border-black rounded-lg"
              />
            </div>

            <div className="bg-gray-100 border-2 border-black rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-black mt-0.5" />
                <div>
                  <p className="font-medium text-black mb-2">Auto-Discovery Active</p>
                  <p className="text-sm text-gray-700 mb-3">Scanning for sensors...</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-black" />
                      <span className="text-black">Found: Sensor #1 (Temperature)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SoltropyDashboard;