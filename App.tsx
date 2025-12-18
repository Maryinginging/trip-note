
import React, { useState, useCallback } from 'react';
import { AppStatus, TravelNote } from './types';
import Editor from './components/Editor';
import TravelNoteRenderer from './components/TravelNoteRenderer';
import { transformItinerary } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [note, setNote] = useState<TravelNote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = useCallback(async (text: string) => {
    setStatus('processing');
    setError(null);
    try {
      const result = await transformItinerary(text);
      setNote(result);
      setStatus('viewing');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setStatus('idle');
    }
  }, []);

  const handleBack = useCallback(() => {
    setStatus('idle');
  }, []);

  return (
    <div className="min-h-screen selection:bg-stone-200 selection:text-stone-900">
      {status === 'viewing' && note ? (
        <TravelNoteRenderer note={note} onBack={handleBack} />
      ) : (
        <div className="bg-[#fdfcfb]">
          {error && (
            <div className="max-w-3xl mx-auto mt-8 px-6">
              <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          )}
          <Editor onProcess={handleProcess} isLoading={status === 'processing'} />
          
          {/* Subtle decoration elements for idle state */}
          <div className="fixed top-0 right-0 w-64 h-64 bg-stone-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 -z-10" />
          <div className="fixed bottom-0 left-0 w-96 h-96 bg-stone-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50 -z-10" />
        </div>
      )}

      {/* Loading Overlay with subtle animation */}
      {status === 'processing' && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-[2px] z-[100] flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-stone-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-stone-900 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-stone-900 rounded-full animate-bounce"></div>
          </div>
          <p className="font-serif-journal text-stone-500 italic">Thinking about your journey...</p>
        </div>
      )}
    </div>
  );
};

export default App;
