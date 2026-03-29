import { useState, useEffect } from 'react';
import IntakeForm from './components/IntakeForm';
import RoadmapDisplay from './components/RoadmapDisplay'; 
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard'; 
import LandingPage from './components/LandingPage'; // <-- Import the new page
import { LogOut, LayoutDashboard, BrainCircuit } from 'lucide-react';

function App() {
  const [roadmapData, setRoadmapData] = useState(null);
  const [user, setUser] = useState(null);
  const [isCreatingForm, setIsCreatingForm] = useState(false); 
  
  // NEW STATE: Control when to show the Login screen
  const [showAuthScreen, setShowAuthScreen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setRoadmapData(null);
    setIsCreatingForm(false);
    setShowAuthScreen(false); // Reset to landing page on logout
  };

  // IF NO USER IS LOGGED IN
  if (!user) {
    return showAuthScreen ? (
      <div className="min-h-screen bg-[#fafafa]">
        {/* Simple navbar for the auth screen so they can go back */}
        <nav className="p-6">
          <button 
            onClick={() => setShowAuthScreen(false)} 
            className="font-extrabold text-xl tracking-tighter text-gray-900 flex items-center hover:opacity-80 transition-opacity"
          >
            <BrainCircuit className="text-indigo-600 mr-2" size={24} />
            Path<span className="text-indigo-600">AI</span>
          </button>
        </nav>
        <AuthScreen onLogin={setUser} />
      </div>
    ) : (
      <LandingPage onGetStarted={() => setShowAuthScreen(true)} />
    );
  }

  // IF USER IS LOGGED IN (Your existing dashboard logic)
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="font-extrabold text-2xl tracking-tighter text-gray-900 flex items-center cursor-pointer" 
            onClick={() => { setRoadmapData(null); setIsCreatingForm(false); }}
          >
            <div className="font-serif text-2xl tracking-tight font-medium">
            PathAI.
          </div>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => { setRoadmapData(null); setIsCreatingForm(false); }}
              className="flex items-center text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors mr-2"
            >
              <LayoutDashboard size={18} className="mr-1" /> Dashboard
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center text-sm font-bold bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Screen Routing Logic */}
      {roadmapData ? (
        <RoadmapDisplay roadmapData={roadmapData} setRoadmapData={setRoadmapData} />
      ) : isCreatingForm ? (
        <IntakeForm setRoadmapData={setRoadmapData} userId={user.id} /> 
      ) : (
        <Dashboard 
          user={user} 
          onSelectRoadmap={setRoadmapData} 
          onCreateNew={() => setIsCreatingForm(true)} 
        />
      )}
    </div>
  );
}

export default App;