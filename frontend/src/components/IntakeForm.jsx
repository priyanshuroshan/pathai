import { useState } from 'react';
import axios from 'axios';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function IntakeForm({ setRoadmapData, userId }) {
  const [formData, setFormData] = useState({ goal: '', currentSkillLevel: 'Beginner', timeCommitment: 5 });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/roadmap/create-path', { ...formData, userId });
      if (response.data.success) setRoadmapData(response.data.roadmap);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 px-6 mb-24">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-[#1A1A1A] mb-3">Architect your curriculum.</h1>
        <p className="text-[#666666] font-light text-lg">Define your objective and parameters. The AI will handle the rest.</p>
      </div>

      <div className="bg-white border border-[#EAE7DC] p-8 md:p-10 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-3">Target Discipline</label>
            <input 
              type="text" placeholder="e.g., Data Structures, MERN Stack, System Design..."
              className="w-full p-4 bg-[#FAF8F5] border border-[#EAE7DC] rounded-md focus:border-[#1A1A1A] outline-none transition-colors text-lg"
              value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-3">Current Baseline</label>
              <select 
                className="w-full p-4 bg-[#FAF8F5] border border-[#EAE7DC] rounded-md focus:border-[#1A1A1A] outline-none transition-colors"
                value={formData.currentSkillLevel} onChange={(e) => setFormData({...formData, currentSkillLevel: e.target.value})}
              >
                <option value="Absolute Beginner">Absolute Beginner</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-3">Weekly Capacity (Hours)</label>
              <input 
                type="number" min="1" max="40"
                className="w-full p-4 bg-[#FAF8F5] border border-[#EAE7DC] rounded-md focus:border-[#1A1A1A] outline-none transition-colors"
                value={formData.timeCommitment} onChange={(e) => setFormData({...formData, timeCommitment: e.target.value})} required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE7DC]">
            <button 
              type="submit" disabled={isLoading}
              className="group w-full md:w-auto px-8 py-4 bg-[#1A1A1A] text-white rounded-md hover:bg-[#333333] transition-colors flex items-center justify-center font-medium"
            >
              {isLoading ? (
                <><Loader2 className="animate-spin mr-3" size={20} /> Synthesizing...</>
              ) : (
                <>Generate Curriculum <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}