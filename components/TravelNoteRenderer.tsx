
import React from 'react';
import { TravelNote } from '../types';
import { MapPin, Briefcase, Info, Download, ArrowLeft, Heart } from 'lucide-react';

interface Props {
  note: TravelNote;
  onBack: () => void;
}

const TravelNoteRenderer: React.FC<Props> = ({ note, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  // Helper to get consistent images from a description seed
  const getImageUrl = (seed: string, width = 1200, height = 800) => {
    const encoded = encodeURIComponent(seed.slice(0, 30));
    return `https://picsum.photos/seed/${encoded}/${width}/${height}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm min-h-screen print:shadow-none print:w-full">
      {/* Navigation - Hidden on Print */}
      <nav className="no-print flex items-center justify-between px-8 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-stone-100">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Editor</span>
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            <Download size={16} />
            Save as PDF
          </button>
        </div>
      </nav>

      <article className="print-padding">
        {/* Header Section */}
        <header className="px-8 pt-12 pb-16 md:px-16 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-stone-900 mb-4 leading-tight italic">
            {note.title}
          </h1>
          <p className="font-sans-ui text-stone-400 uppercase tracking-[0.2em] text-xs font-semibold mb-12">
            {note.subtitle}
          </p>
          <div className="relative h-[400px] w-full mb-12 rounded-lg overflow-hidden shadow-xl ring-1 ring-stone-200">
            <img 
              src={getImageUrl(note.headerImageDescription)} 
              alt={note.headerImageDescription}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white text-[10px] italic opacity-60">
               Suggested Image: {note.headerImageDescription}
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="font-serif-journal text-xl md:text-2xl leading-relaxed text-stone-700 italic">
              "{note.introduction}"
            </p>
          </div>
        </header>

        {/* Itinerary Body */}
        <div className="px-8 pb-20 md:px-16 space-y-24">
          {note.days.map((day, idx) => (
            <section key={idx} className="relative group">
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-sans-ui text-sm font-bold text-stone-300 tracking-widest uppercase">
                  {day.dayLabel}
                </span>
                <h2 className="font-display text-3xl text-stone-800 border-b border-stone-100 pb-2 flex-grow">
                  {day.title}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-7 space-y-6">
                  <div className="font-serif-journal text-lg leading-relaxed text-stone-600 first-letter:text-5xl first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 whitespace-pre-wrap">
                    {day.narrative}
                  </div>
                  
                  <div className="bg-stone-50 p-6 rounded-sm border-l-4 border-stone-200">
                    <h4 className="flex items-center gap-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">
                      <MapPin size={14} className="text-stone-400" />
                      Day Highlights
                    </h4>
                    <ul className="space-y-2">
                      {day.keyDetails.map((detail, dIdx) => (
                        <li key={dIdx} className="font-serif-journal text-stone-700 flex items-start gap-2">
                          <span className="text-stone-300 mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-6">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-md group-hover:shadow-lg transition-shadow">
                    <img 
                      src={getImageUrl(day.imageDescription, 600, 750)} 
                      alt={day.imageDescription}
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <p className="font-serif-journal text-xs italic text-stone-400 text-center px-4">
                    {day.imageDescription}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer Sidebar / Essentials */}
        <div className="bg-stone-900 text-stone-100 py-20 px-8 md:px-16 print:bg-white print:text-stone-900 print:border-t print:border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="flex items-center gap-3 font-display text-2xl mb-8 italic">
                <Briefcase size={24} className="text-stone-500" />
                Packing Essentials
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {note.packingEssentials.map((item, idx) => (
                  <li key={idx} className="font-sans-ui text-sm border-b border-stone-800 pb-2 flex justify-between items-center group cursor-default">
                    <span>{item}</span>
                    <Heart size={14} className="text-stone-800 group-hover:text-stone-500 transition-colors" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-3 font-display text-2xl mb-8 italic">
                <Info size={24} className="text-stone-500" />
                Wise Words
              </h3>
              <div className="space-y-6">
                {note.travelerTips.map((tip, idx) => (
                  <p key={idx} className="font-serif-journal italic leading-relaxed text-stone-300 print:text-stone-600">
                    "{tip}"
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 pt-16 border-t border-stone-800 text-center max-w-2xl mx-auto">
            <p className="font-serif-journal text-2xl leading-relaxed mb-8 italic text-stone-400">
              {note.conclusion}
            </p>
            <div className="inline-block p-1 bg-white rounded-full">
              <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center text-white font-display text-xl">
                W
              </div>
            </div>
            <p className="mt-4 font-sans-ui text-[10px] uppercase tracking-[0.3em] text-stone-600">
              WanderJournal — 2024
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TravelNoteRenderer;
