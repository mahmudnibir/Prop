
import React, { useEffect, useRef, useState } from 'react';
import { ScrollIcon, DownloadIcon, HeartIcon } from './Icons';
import { generateFuturePrediction } from '../services/geminiService';

interface AcceptedViewProps {
  recipientName: string;
  senderName: string;
}

const AcceptedView: React.FC<AcceptedViewProps> = ({ recipientName, senderName }) => {
  const [stamped, setStamped] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [prediction, setPrediction] = useState<string>("Gazing into the stars to find your destiny...");
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(true);
  
  const audioContextRef = useRef<AudioContext | null>(null);

  const playStampThud = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 44100 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(60, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.8, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.3);

      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < ctx.sampleRate * 0.15; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
    } catch (e) {
      console.warn("Audio Context playback failed", e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStamped(true);
      setShowParticles(true);
      playStampThud();
    }, 1200);

    // AI Prediction
    generateFuturePrediction(senderName, recipientName).then(text => {
      setPrediction(text);
      setIsLoadingPrediction(false);
    });

    return () => clearTimeout(timer);
  }, [recipientName, senderName]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#F2ECE4] flex flex-col items-center py-6 md:py-10 px-4 no-print-bg">
        
        {/* Certificate Wrapper */}
        <div className="w-full max-w-xl flex flex-col items-center justify-start relative">
            
            {/* Certificate Container */}
            <div 
              id="proposal-certificate" 
              className={`relative w-full min-h-[500px] sm:min-h-[600px] h-auto aspect-auto sm:aspect-[1/1.41] bg-[#FCFAF7] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-sm border-[1px] border-[#D4AF37]/60 p-6 sm:p-10 md:p-12 font-serif-classic text-[#1A1A1A] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-[100vw] print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[shake_0.2s_ease-out]' : ''}`}
            >
                
                {/* Subtle Parchment Texture */}
                <div className="absolute inset-0 opacity-[0.25] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                
                {/* Elegant Double Border */}
                <div className="absolute inset-2 sm:inset-4 border-[2px] border-[#D4AF37]/70 pointer-events-none"></div>
                <div className="absolute inset-4 sm:inset-6 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>

                {/* RESPONSIVE ENHANCED APPROVED SEAL */}
                <div className="absolute bottom-12 right-2 sm:bottom-24 sm:right-4 md:bottom-28 md:right-10 z-[50] pointer-events-none select-none">
                    <div className={`relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center transform transition-all duration-[400ms] ease-[cubic-bezier(0.175, 0.885, 0.32, 1.275)]
                      ${stamped 
                        ? 'scale-100 opacity-90 rotate-[-15deg]' 
                        : 'scale-[8] opacity-0 rotate-[25deg] blur-3xl translate-y-[-200px]'}
                    `}>
                        <div className="relative text-[#C41E3A] w-full h-full drop-shadow-[0_10px_15px_rgba(196,30,58,0.4)]">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                <defs>
                                    <filter id="roughInk">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                                    </filter>
                                    <path id="circlePathSeal" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                                </defs>
                                
                                <g filter="url(#roughInk)">
                                    <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 4" opacity="0.5" />
                                    <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="5" />
                                    <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                    
                                    <text className="fill-current text-[11px] font-black tracking-[0.2em] uppercase">
                                        <textPath href="#circlePathSeal" startOffset="0%">
                                            Forever Bound • Forever Yours • Forever Bound •
                                        </textPath>
                                    </text>

                                    <rect x="20" y="75" width="160" height="50" fill="white" stroke="currentColor" strokeWidth="4" />
                                    <text x="100" y="112" textAnchor="middle" className="font-sans font-black uppercase tracking-tighter text-[28px] sm:text-[32px] fill-current">
                                        APPROVED
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="relative z-10 flex flex-col h-full space-y-6 sm:space-y-10 py-4 sm:py-6 print:py-0">
                    <header className="text-center space-y-2 sm:space-y-3">
                        <div className="space-y-1 sm:space-y-1.5">
                            <h2 className="text-[8px] sm:text-[11px] font-black text-[#4A3D2E] uppercase tracking-[0.5em] sm:tracking-[0.7em] font-sans">Eternal Decree</h2>
                            <div className="w-12 sm:w-20 h-[1px] sm:h-[2px] bg-[#D4AF37]/70 mx-auto"></div>
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-cursive font-bold text-[#000000] tracking-tight leading-tight">
                            A Covenant of Love
                        </h1>
                    </header>

                    <section className="space-y-4 sm:space-y-6 text-center">
                        <p className="text-xs sm:text-base md:text-lg text-[#1A1A1A] font-medium italic leading-relaxed max-w-xs sm:max-w-md mx-auto">
                            Let it be known that on this day, the question of a lifetime was met with the most beautiful answer.
                        </p>

                        <div className="space-y-2 sm:space-y-4">
                            <div className="space-y-0.5 sm:space-y-1">
                                <p className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-black text-[#000000] uppercase tracking-tighter">
                                    {recipientName}
                                </p>
                                <span className="text-[7px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#B48F00] font-sans">The Beloved</span>
                            </div>
                            
                            <div className="text-[#D4AF37] font-serif italic text-xl sm:text-2xl md:text-3xl font-bold">&</div>

                            <div className="space-y-0.5 sm:space-y-1">
                                <p className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-black text-[#000000] uppercase tracking-tighter">
                                    {senderName}
                                </p>
                                <span className="text-[7px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#B48F00] font-sans">The Devoted</span>
                            </div>
                        </div>
                    </section>

                    {/* AI FUTURE PREDICTION BOX */}
                    <div className="relative p-4 sm:p-6 md:p-8 border border-dashed border-[#D4AF37]/40 bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-1 sm:p-2 opacity-5 sm:opacity-10">
                            <HeartIcon className="w-8 h-8 sm:w-12 sm:h-12 rotate-12" />
                        </div>
                        <h3 className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#D4AF37] mb-2 sm:mb-3 font-sans">Vision of the Future</h3>
                        <p className={`text-xs sm:text-base md:text-lg italic leading-relaxed text-[#4A3D2E] transition-opacity duration-500 ${isLoadingPrediction ? 'opacity-30' : 'opacity-100'}`}>
                            "{prediction}"
                        </p>
                        {isLoadingPrediction && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                                <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>

                    {/* Signatures Section */}
                    <div className="flex flex-col items-center sm:items-start w-full mt-auto pt-4 sm:pt-6">
                        <div className="w-full sm:w-3/4 md:w-2/3 space-y-4 sm:space-y-8">
                            <div className="border-b-[1px] sm:border-b-[1.5px] border-[#D4AF37]/50 pb-1 sm:pb-2 w-full">
                                <span className="text-[7px] sm:text-[9px] uppercase font-black text-[#2C241B] block mb-1 sm:mb-2 tracking-[0.3em] sm:tracking-[0.4em] font-sans opacity-60">Verified Acceptance</span>
                                <span className="font-cursive text-2xl sm:text-3xl md:text-4xl text-[#000000] leading-tight block">{recipientName}</span>
                            </div>
                            <div className="border-b-[1px] sm:border-b-[1.5px] border-[#D4AF37]/50 pb-1 sm:pb-2 w-full">
                                <span className="text-[7px] sm:text-[9px] uppercase font-black text-[#2C241B] block mb-1 sm:mb-2 tracking-[0.3em] sm:tracking-[0.4em] font-sans opacity-60">Attested by</span>
                                <span className="font-cursive text-2xl sm:text-3xl md:text-4xl text-[#000000] leading-tight block">{senderName}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute -bottom-10 -left-10 sm:-bottom-16 sm:-left-16 text-[#EFE7DC] pointer-events-none opacity-[0.2] sm:opacity-[0.25] -rotate-12 z-0">
                    <ScrollIcon className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80" />
                </div>
            </div>
        </div>
        
        {/* Actions UI */}
        <div className="mt-8 flex flex-col items-center gap-6 z-10 no-print pb-16 w-full">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-4 sm:gap-6 px-8 sm:px-12 py-4 sm:py-5 bg-[#1A1A1A] text-[#F2ECE4] font-bold rounded-sm shadow-2xl hover:bg-[#000] transform transition-all active:scale-95 hover:-translate-y-1"
            >
                <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform opacity-100 stroke-[3]" />
                <span className="tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-[12px] uppercase font-black">Secure Keepsake</span>
            </button>
            
            <div className="flex flex-col items-center gap-3 sm:gap-4 px-4 text-center">
                 <p className="text-[10px] sm:text-xs text-[#8A4A5D] font-serif-classic font-bold opacity-60 italic">Share this page to keep our moment alive.</p>
                 <div className="flex items-center gap-3 sm:gap-4 opacity-70">
                    <div className="w-6 sm:w-8 h-[1px] sm:h-[2px] bg-[#4A3D2E]"></div>
                    <span className="text-[8px] sm:text-[10px] font-black text-[#4A3D2E] uppercase tracking-[0.4em] sm:tracking-[0.6em]">A Legacy of Love</span>
                    <div className="w-6 sm:w-8 h-[1px] sm:h-[2px] bg-[#4A3D2E]"></div>
                </div>
            </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            @media print {
                @page { size: portrait; margin: 0; }
                html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
                .no-print { display: none !important; }
                .no-print-bg { background: white !important; padding: 0 !important; }
                #proposal-certificate { 
                    box-shadow: none !important; margin: 0 !important; 
                    width: 100vw !important; height: 100vh !important;
                    max-width: none !important; border: none !important;
                    border-radius: 0 !important; padding: 2.5cm !important;
                }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
