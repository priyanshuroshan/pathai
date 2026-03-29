import { ArrowRight, BookOpen, Compass, Layers } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#E8E5D9] selection:text-black">
      
      
      {/* 1. Ultra-Minimal Navbar */}
      <nav className="w-full border-b border-[#EAE7DC] bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-tight font-medium">
            PathAI.
          </div>
          <button 
            onClick={onGetStarted}
            className="text-sm font-medium text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* 2. Editorial Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-[#1A1A1A] mb-8">
            Master any discipline, <br />
            systematically.
          </h1>
          
          <p className="text-lg md:text-xl text-[#5A5A5A] max-w-2xl leading-relaxed mb-12 font-light">
            An AI-driven recommendation system that architects personalized, 
            step-by-step learning curriculums based on your exact proficiency 
            and timeline. No generic courses. Just precision.
          </p>

          <button 
            onClick={onGetStarted}
            className="group flex items-center justify-center bg-[#1A1A1A] text-[#FAF8F5] text-base px-7 py-3.5 rounded-md hover:bg-[#333333] transition-all duration-200 ease-in-out"
          >
            Start your journey <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </div>
      </div>

      {/* 3. Refined Features Grid */}
      <div className="border-t border-[#EAE7DC] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            
            {/* Feature 1 */}
            <div className="flex flex-col">
              <Compass className="text-[#1A1A1A] mb-6 stroke-1" size={32} />
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3">Adaptive Roadmaps</h3>
              <p className="text-[#666666] leading-relaxed font-light text-sm md:text-base">
                Powered by Llama 3, the system generates precise curriculums tailored strictly to your current baseline and weekly availability.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col">
              <BookOpen className="text-[#1A1A1A] mb-6 stroke-1" size={32} />
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3">Curated Resources</h3>
              <p className="text-[#666666] leading-relaxed font-light text-sm md:text-base">
                Seamlessly integrated with the YouTube Data API to automatically source and embed the highest-rated educational content for each node.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col">
              <Layers className="text-[#1A1A1A] mb-6 stroke-1" size={32} />
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3">Permanent Library</h3>
              <p className="text-[#666666] leading-relaxed font-light text-sm md:text-base">
                A secure, JWT-authenticated dashboard allows you to track milestones, save multiple paths, and resume your learning seamlessly.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Minimal Footer */}
      <footer className="border-t border-[#EAE7DC] bg-[#FAF8F5] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="font-serif text-xl tracking-tight text-[#1A1A1A] mb-4 md:mb-0">
            PathAI.
          </div>
          <div className="text-[#888888] text-sm font-light">
            B.Tech CSE Final Year Project • Priyanshu
          </div>
        </div>
      </footer>

    </div>
  );
}