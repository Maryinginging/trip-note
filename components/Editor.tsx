
import React, { useState } from 'react';
import { PenTool, Sparkles, Loader2 } from 'lucide-react';

interface Props {
  onProcess: (text: string) => void;
  isLoading: boolean;
}

const DEFAULT_ITINERARY = `Day 1: Arrive in Kyoto. Check into Ryokan near Gion. Walk to Yasaka Shrine. Dinner at Pontocho Alley.
Day 2: Morning visit to Fushimi Inari. Late afternoon Arashiyama Bamboo Grove. Evening bath at Onsen.
Day 3: Day trip to Nara. Feed deer in the park. Visit Todai-ji. Return to Kyoto for Kaiseki dinner.
Day 4: Take Shinkansen to Tokyo. Shibuya Crossing. Harajuku shopping. Izakaya crawling in Shinjuku.`;

const Editor: React.FC<Props> = ({ onProcess, isLoading }) => {
  const [text, setText] = useState(DEFAULT_ITINERARY);

  return (
    <div className="max-w-3xl mx-auto pt-16 px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-900 mb-6 shadow-sm border border-stone-200">
          <PenTool size={28} />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-stone-900 mb-4 italic">
          Draft Your Journey
        </h1>
        <p className="font-serif-journal text-lg text-stone-500 max-w-lg mx-auto leading-relaxed">
          Paste your rough itinerary below. We'll weave it into a rich narrative note that captures the essence of your travel.
        </p>
      </div>

      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your itinerary here..."
          className="w-full h-[400px] p-8 rounded-2xl bg-white border border-stone-200 shadow-xl focus:ring-2 focus:ring-stone-900/5 focus:border-stone-400 transition-all font-serif-journal text-lg text-stone-700 leading-relaxed outline-none resize-none"
        />
        <div className="absolute inset-x-0 -bottom-8 flex justify-center">
          <button
            onClick={() => onProcess(text)}
            disabled={isLoading || !text.trim()}
            className="flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full font-sans-ui font-semibold text-sm tracking-wide shadow-2xl hover:bg-stone-800 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Crafting Narrative...
              </>
            ) : (
              <>
                <Sparkles size={18} className="text-yellow-400" />
                Transform to Rich Note
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-8 text-stone-400 pb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-stone-200 rounded-full" />
          Storytelling
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-stone-200 rounded-full" />
          Visual Flair
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-stone-200 rounded-full" />
          Print Ready
        </div>
      </div>
    </div>
  );
};

export default Editor;
