
import React, { useEffect, useRef, useState } from 'react';
import { DownloadIcon, HeartIcon } from './Icons';
import { generateFuturePrediction } from '../services/geminiService';

interface AcceptedViewProps {
  recipientName: string;
  senderName: string;
}

const AcceptedView: React.FC<AcceptedViewProps> = ({ recipientName, senderName }) => {
  const [stamped, setStamped] = useState(false);
  const [prophecy, setProphecy] = useState<string>("Writing our story...");
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number}[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const fetchProphecy = async () => {
        const text = await generateFuturePrediction(senderName, recipientName);
        setProphecy(text);
    };
    fetchProphecy();

    const timer = setTimeout(() => {
      setStamped(true);
      playStampThud();
    }, 2000);

    return () => clearTimeout(timer);
  }, [senderName, recipientName]);

  const playStampThud = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (Math.random() > 0.8) {
          const newSparkle = { id: Date.now(), x: e.clientX, y: e.clientY };
          setSparkles(prev => [...prev.slice(-15), newSparkle]);
      }
  };

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen w-full bg-[#110A0F] flex flex-col items-center py-8 px-4 no-print-bg overflow-x-hidden relative">
        {/* Cursor Sparkles */}
        {sparkles.map(s => (
            <div 
                key={s.id} 
                className="fixed pointer-events-none w-1 h-1 bg-[#D4AF37] rounded-full animate-ping z-50"
                style={{ top: s.y, left: s.x }}
            />
        ))}

        <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-900/10 blur-[150px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full animate-pulse"></div>
        </div>

        <div className="w-full max-w-2xl flex flex-col items-center justify-start relative print:max-w-none z-10 animate-[fade-in_1s_ease-out]">
            <div 
              id="proposal-certificate" 
              className={`relative w-full min-h-[950px] bg-[#FCFAF7] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.6)] rounded-sm border-[1px] border-[#D4AF37]/40 p-10 md:p-14 font-serif-classic text-[#1A1A1A] leading-relaxed overflow-hidden transition-all duration-700 print:shadow-none print:m-0 print:border-none print:h-[297mm] ${stamped ? 'scale-[1.01]' : ''}`}
            >
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                <div className="absolute inset-6 border-[2px] border-[#D4AF37]/30 pointer-events-none"></div>

                {/* GOLD SEAL */}
                <div className="absolute bottom-[10%] right-12 z-[50] pointer-events-none">
                    <div className={`w-36 h-36 md:w-40 md:h-40 flex items-center justify-center transform transition-all duration-[1000ms] cubic-bezier(0.34, 1.56, 0.64, 1)
                      ${stamped ? 'scale-100 opacity-100 rotate-[-12deg]' : 'scale-[8] opacity-0 rotate-[45deg] blur-3xl'}
                    `}>
                        <div className="text-[#D4AF37] w-full h-full drop-shadow-[0_15px_25px_rgba(212,175,55,0.4)]">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                                <path d="M100,20 A80,80 0 0,1 180,100 A80,80 0 0,1 100,180 A80,80 0 0,1 20,100 A80,80 0 0,1 100,20" fill="white" fillOpacity="0.05" />
                                <text x="100" y="95" textAnchor="middle" className="font-serif-display italic font-black text-[22px] fill-current">Signed</text>
                                <text x="100" y="120" textAnchor="middle" className="font-sans font-black uppercase tracking-[0.6em] text-[13px] fill-current">FOREVER</text>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col h-full items-center text-center">
                    <header className="mb-10">
                        <h2 className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.8em] mb-4">A Promise Kept</h2>
                        <h1 className="text-5xl md:text-7xl font-cursive text-black mb-2">Our Forever</h1>
                        <div className="w-20 h-[1px] bg-[#D4AF37]/40 mx-auto mt-4"></div>
                    </header>

                    <section className="mb-12 space-y-8">
                        <p className="text-lg italic opacity-70 max-w-sm mx-auto">
                            Let this paper bear witness to the moment we chose to become each other's home.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <p className="text-3xl md:text-5xl font-serif-display font-medium text-black uppercase tracking-tight">{recipientName}</p>
                                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#B48F00]">The Beloved</span>
                            </div>
                            
                            <HeartIcon className="w-8 h-8 text-[#D4AF37] animate-pulse" />

                            <div>
                                <p className="text-3xl md:text-5xl font-serif-display font-medium text-black uppercase tracking-tight">{senderName}</p>
                                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#B48F00]">The Devoted</span>
                            </div>
                        </div>
                    </section>

                    <div className="w-full max-w-md py-12 px-10 border-[1px] border-[#D4AF37]/20 bg-[#FAF7F2]/40 backdrop-blur-[2px] mb-12 shadow-inner">
                        <p className="font-serif-classic italic text-xl md:text-2xl text-black leading-relaxed">
                           "{prophecy}"
                        </p>
                    </div>

                    <div className="mt-auto w-full flex justify-between px-4 pb-4 gap-8">
                        <div className="flex-1 text-left border-b border-[#D4AF37]/40 pb-2">
                            <span className="font-cursive text-3xl text-black">{recipientName}</span>
                            <div className="text-[8px] uppercase tracking-widest text-[#B48F00] mt-1">Accepted</div>
                        </div>
                        <div className="flex-1 text-left border-b border-[#D4AF37]/40 pb-2">
                            <span className="font-cursive text-3xl text-black">{senderName}</span>
                            <div className="text-[8px] uppercase tracking-widest text-[#B48F00] mt-1">Witnessed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="mt-12 no-print flex flex-col items-center gap-4 z-20">
            <button 
                onClick={() => window.print()}
                className="group flex items-center gap-3 px-12 py-5 bg-white text-black font-bold rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95"
            >
                <DownloadIcon className="w-5 h-5" />
                <span className="tracking-[0.3em] text-[10px] uppercase">Archive Our Love</span>
            </button>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] animate-pulse">Created with love by {senderName}</p>
        </div>
    </div>
  );
};

export default AcceptedView;
