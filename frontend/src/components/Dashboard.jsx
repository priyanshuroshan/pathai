import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';

export default function Dashboard({ user, onSelectRoadmap, onCreateNew }) {
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyRoadmaps = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/roadmap/user/${user.id}`);
        if (response.data.success) setSavedRoadmaps(response.data.roadmaps);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user && user.id) fetchMyRoadmaps();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-[#666666]">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="font-light">Loading library...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-16 px-6 mb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#EAE7DC] pb-6">
        <div>
          <h1 className="font-serif text-4xl text-[#1A1A1A]">Your Library.</h1>
          <p className="text-[#666666] font-light mt-2">Resume your active disciplines.</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="mt-6 md:mt-0 text-sm font-medium bg-[#1A1A1A] text-white px-5 py-2.5 rounded-md hover:bg-[#333333] transition-colors"
        >
          + New Curriculum
        </button>
      </div>

      {savedRoadmaps.length === 0 ? (
        <div className="text-center py-20 border border-[#EAE7DC] bg-white rounded-lg">
          <BookOpen size={48} className="mx-auto text-[#CCCCCC] mb-4 stroke-1" />
          <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">No active curriculums.</h3>
          <p className="text-[#666666] font-light">Start your first learning path today.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedRoadmaps.map((roadmap) => {
            const completed = roadmap.modules.filter(m => m.status === 'completed').length;
            const total = roadmap.modules.length;
            const progress = Math.round((completed / total) * 100);

            return (
              <div key={roadmap._id} className="bg-white border border-[#EAE7DC] p-8 rounded-lg hover:border-[#CCCCCC] transition-colors flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#888888]">{roadmap.currentLevel}</span>
                  <span className="text-xs font-medium bg-[#FAF8F5] px-2 py-1 rounded text-[#1A1A1A]">{progress}% Complete</span>
                </div>
                
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2 line-clamp-2">{roadmap.title || roadmap.goal}</h3>
                <p className="text-[#666666] text-sm mb-8 font-light">{completed} of {total} modules completed.</p>
                
                <div className="mt-auto pt-6 border-t border-[#EAE7DC]">
                  <button 
                    onClick={() => onSelectRoadmap(roadmap)}
                    className="group flex items-center text-sm font-medium text-[#1A1A1A]"
                  >
                    Resume Path <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}