
import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon } from './Icons';

declare const confetti: any;

interface ProposalViewProps {
  question: string;
  recipient: string;
  sender: string;
  password?: string;
  onAccept: () => void;
}

const noButtonResponses = [
  "No", "Are you sure?", "Wait...", "Not this one!", "Try the other button!", "Almost!", "Oops!", "I'll wait ❤️", "Denied!", "Think again!"
];

const ProposalView: React.FC<ProposalViewProps> = ({ question, recipient, sender, password, onAccept }) => {
  const [noIndex, setNoIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noPos, setNoPos] = useState<React.CSSProperties>({ position: 'relative' });
  const [introStage, setIntroStage] = useState<'verify' | 'envelope' | 'revealed'>(password ? 'verify' : 'envelope');
  const [inputPass, setInputPass] = useState('');
  const [passError, setPassError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playChime = (freq: number = 880) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  };

  const handleNo = () => {
    setNoIndex(prev => (prev + 1) % noButtonResponses.length);
    setYesScale(prev => Math.min(prev + 0.35, 8));
    setNoScale(prev => Math.max(0.3, prev - 0.05));
    playChime(440 + Math.random() * 220);

    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.random() * (rect.width - 200) + 100;
        const y = Math.random() * (rect.height - 200) + 100;
        setNoPos({
            position: 'absolute',
            top: `${y}px`,
            left: `${x}px`,
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 10
        });
    }
  };

  const handleYes = () => {
      initAudio();
      playChime(1320);
      const colors = ['#C24D5F', '#E6B8B8', '#ffffff'];
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors });
      setIsProcessing(true);
      setTimeout(onAccept, 1800);
  };

  if (introStage === 'verify') {
      return (
          <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF7F2] p-6">
              <div className="max-w-md w-full p-10 bg-white shadow-xl rounded-3xl border border-[#D4C4B5]/30 text-center animate-[fade-in-up_0.5s_ease-out]">
                  <HeartIcon className="w-12 h-12 text-[#C24D5F] mx-auto mb-8" />
                  <h2 className="text-2xl font-serif-display font-medium mb-8 text-black tracking-tight">For Your Eyes Only</h2>
                  <input 
                      autoFocus
                      type="password"
                      value={inputPass}
                      onChange={(e) => setInputPass(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (inputPass === password ? setIntroStage('envelope') : setPassError(true))}
                      placeholder="Enter Password"
                      className={`w-full p-4 bg-[#FAF7F2] text-black rounded-xl border transition-all text-center mb-6 outline-none ${passError ? 'border-red-400 animate-shake' : 'border-[#D4C4B5] focus:border-[#C24D5F]'}`}
                  />
                  <button 
                      onClick={() => { initAudio(); inputPass === password ? setIntroStage('envelope') : setPassError(true); }}
                      className="w-full py-4 bg-[#2C2C2C] text-white font-bold rounded-xl uppercase tracking-widest text-[10px] hover:bg-black transition-all"
                  >
                      Open Heart
                  </button>
              </div>
          </div>
      );
  }

  if (introStage === 'envelope') {
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF7F2] p-6">
              <div 
                onClick={() => { initAudio(); playChime(660); setIntroStage('revealed'); }}
                className="group cursor-pointer relative w-72 h-48 bg-white border border-[#D4C4B5]/50 shadow-2xl rounded-lg flex items-center justify-center transform transition-all duration-500 hover:scale-105 active:scale-95"
              >
                  <div className="absolute inset-2 border border-[#D4C4B5]/20"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#C24D5F] rounded-full flex items-center justify-center shadow-lg mb-4 animate-bounce">
                        <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.4em]">Tap to Break Seal</p>
                  </div>
              </div>
          </div>
      );
  }

  if (isProcessing) {
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white transition-colors duration-1000">
              <div className="animate-ping">
                <HeartIcon className="w-24 h-24 text-[#C24D5F]" />
              </div>
              <h2 className="mt-8 text-4xl font-serif-display italic font-medium text-black">Yes Forever.</h2>
          </div>
      );
  }

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF7F2] text-black p-6 relative overflow-hidden">
      {/* EKG Heartbeat Line */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center">
          <svg className="w-full h-32" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path 
                className="ekg-path"
                d="M0,50 L100,50 L110,30 L120,70 L130,50 L200,50 L210,10 L220,90 L230,50 L300,50 L310,40 L320,60 L330,50 L400,50 L410,20 L420,80 L430,50 L500,50 L510,45 L520,55 L530,50 L600,50 L610,0 L620,100 L630,50 L700,50 L710,35 L720,65 L730,50 L800,50 L810,15 L820,85 L830,50 L900,50 L910,40 L920,60 L930,50 L1000,50" 
                stroke="#C24D5F" 
                strokeWidth="2" 
                fill="none" 
              />
          </svg>
      </div>

      <div className="z-10 flex flex-col items-center max-w-2xl w-full text-center">
        <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.5em] mb-12 animate-pulse">Dearest {recipient}</p>

        <h1 className="text-4xl md:text-6xl font-serif-display italic font-medium text-black mb-24 leading-snug">
          {question}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full min-h-[300px] relative">
          <button
            onClick={handleYes}
            className="px-20 py-8 bg-[#C24D5F] text-white font-bold rounded-full shadow-[0_20px_60px_rgba(194,77,95,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#A33D4F] active:scale-95 z-20 group relative overflow-hidden"
            style={{ transform: `scale(${yesScale})` }}
          >
            <span className="relative z-10 tracking-[0.3em] text-xl">YES</span>
            <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
          
          <button
            onMouseEnter={handleNo}
            onClick={handleNo}
            className={`px-8 py-4 bg-white text-[#8C7A6B] font-medium rounded-full border border-[#D4C4B5]/40 transition-all text-xs tracking-widest z-10 shadow-sm ${noScale < 0.3 ? 'hidden' : 'block'}`}
            style={{ ...noPos, transform: `scale(${noScale})` }}
          >
            {noButtonResponses[noIndex]}
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-[10px] uppercase tracking-[1em] text-[#8C7A6B] opacity-30 font-bold">Listen to your heart</div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ekg-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: ekg-flow ${3 / yesScale}s linear infinite;
        }
        @keyframes ekg-flow {
            to { stroke-dashoffset: -1000; }
        }
      `}} />
    </div>
  );
};

export default ProposalView;
