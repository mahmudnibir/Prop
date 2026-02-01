
import React, { useEffect, useRef, useState } from 'react';
import { ScrollIcon, DownloadIcon } from './Icons';

interface AcceptedViewProps {
  recipientName: string;
  senderName: string;
}

const AcceptedView: React.FC<AcceptedViewProps> = ({ recipientName, senderName }) => {
  const [stamped, setStamped] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playStampThud = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      
      // Heavier mechanical thud for a rubber stamp
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

      // Noise for the paper impact
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
      playStampThud();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#F2ECE4] overflow-y-auto flex flex-col items-center py-4 sm:py-8 px-4 no-print-bg">
        
        {/* Certificate Container */}
        <div 
          id="proposal-certificate" 
          className={`relative w-full max-w-2xl aspect-[1/1.4] bg-[#FCFAF7] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rounded-sm border-[1px] border-[#D4AF37]/30 p-8 sm:p-12 font-serif-classic text-[#2C2C2C] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-[100vw] print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[shake_0.2s_ease-out]' : ''}`}
        >
            
            {/* Subtle Parchment Texture */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Elegant Double Border */}
            <div className="absolute inset-2 sm:inset-4 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>
            <div className="absolute inset-4 sm:inset-6 border-[2px] border-[#D4AF37]/20 pointer-events-none"></div>

            {/* CLASSIC RUBBER STAMP - "APPROVED" STYLE */}
            <div className="absolute bottom-24 right-10 sm:bottom-40 sm:right-16 z-[50] pointer-events-none select-none opacity-80">
                <div className={`relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center transform transition-all duration-[250ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                  ${stamped 
                    ? 'scale-100 opacity-100 rotate-[-12deg]' 
                    : 'scale-[6] opacity-0 rotate-[20deg] blur-2xl translate-y-[-150px]'}
                `}>
                    {/* Distressed Stamp SVG */}
                    <div className="relative text-[#C41E3A]">
                        <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(196,30,58,0.3)]">
                            {/* Inner and Outer Circles */}
                            <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 2 15 3" />
                            <circle cx="100" cy="100" r="76" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                            
                            {/* Curved Text - Top */}
                            <path id="curveTop" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
                            <text className="font-sans font-black uppercase tracking-[0.2em] text-[18px] fill-current">
                                <textPath xlinkHref="#curveTop" startOffset="50%" textAnchor="middle">APPROVED</textPath>
                            </text>

                            {/* Curved Text - Bottom */}
                            <path id="curveBottom" d="M 30,100 A 70,70 0 0,0 170,100" fill="none" />
                            <text className="font-sans font-black uppercase tracking-[0.2em] text-[18px] fill-current">
                                <textPath xlinkHref="#curveBottom" startOffset="50%" textAnchor="middle">APPROVED</textPath>
                            </text>

                            {/* Center Bar with main text */}
                            <rect x="15" y="78" width="170" height="44" fill="white" stroke="currentColor" strokeWidth="4" />
                            <text x="100" y="112" textAnchor="middle" className="font-sans font-black uppercase tracking-tight text-[32px] fill-current">
                                APPROVED
                            </text>

                            {/* Distressing Overlays (Simulating ink skips) */}
                            <g className="opacity-40 pointer-events-none">
                                <circle cx="40" cy="40" r="2" fill="white" />
                                <circle cx="150" cy="140" r="3" fill="white" />
                                <rect x="90" y="85" width="20" height="1" fill="white" />
                                <rect x="30" y="110" width="10" height="1" fill="white" />
                                <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="2" strokeDasharray="1 15" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="relative z-10 space-y-10 print:space-y-6">
                <header className="text-center space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-[9px] font-bold text-[#8C7B6B] uppercase tracking-[0.8em] font-sans">Formal Proclamation</h2>
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-serif-display italic font-medium text-[#1A1A1A] tracking-tight leading-tight">
                        Decree of Union
                    </h1>
                </header>

                <section className="text-center space-y-8 py-2 print:py-0">
                    <p className="text-lg sm:text-2xl text-[#4A4A4A] font-light leading-relaxed max-w-lg mx-auto">
                        Be it known to all that on this exceptional day, a sacred bond of affection has been established between:
                    </p>

                    <div className="space-y-4">
                        <p className="text-3xl sm:text-5xl font-serif-display font-bold text-[#1A1A1A] tracking-tighter uppercase">
                            {recipientName}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-10 h-[1px] bg-[#D4AF37]/40"></div>
                            <span className="text-[9px] uppercase tracking-[0.4em] text-[#8C7B6B] font-bold">and</span>
                            <div className="w-10 h-[1px] bg-[#D4AF37]/40"></div>
                        </div>
                        <p className="text-3xl sm:text-5xl font-serif-display font-bold text-[#1A1A1A] tracking-tighter uppercase">
                            {senderName}
                        </p>
                    </div>

                    <div className="max-w-md mx-auto space-y-2">
                        <p className="text-base sm:text-lg text-[#5C5C5C] italic leading-relaxed font-light">
                            "A testament to a future filled with shared wisdom, enduring patience, and unconditional love."
                        </p>
                    </div>
                </section>

                {/* Signatures Section */}
                <div className="pt-8 flex flex-col items-start justify-end gap-6 relative print:pt-4 min-h-[160px]">
                    <div className="w-full sm:w-1/2 space-y-8 print:space-y-4">
                        <div className="border-b-[1px] border-[#D4AF37]/30 pb-2 relative">
                            <span className="text-[7px] uppercase font-bold text-[#8C7B6B] block mb-1 tracking-[0.3em] font-sans">The Beloved</span>
                            <span className="font-serif-display text-3xl text-[#1A1A1A] italic leading-none">{recipientName}</span>
                        </div>
                        <div className="border-b-[1px] border-[#D4AF37]/30 pb-2">
                            <span className="text-[7px] uppercase font-bold text-[#8C7B6B] block mb-1 tracking-[0.3em] font-sans">The Devoted</span>
                            <span className="font-serif-display text-3xl text-[#1A1A1A] italic leading-none">{senderName}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Faint Decorative Background Scroll */}
            <div className="absolute -bottom-16 -left-16 text-[#EFE7DC] pointer-events-none opacity-[0.2] -rotate-12 z-0">
                <ScrollIcon className="w-64 h-64 sm:w-80 sm:h-80" />
            </div>
        </div>
        
        {/* Actions UI */}
        <div className="mt-8 flex flex-col items-center gap-6 z-10 no-print pb-12">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-6 px-12 py-5 bg-[#1A1A1A] text-[#F2ECE4] font-medium rounded-sm shadow-2xl hover:bg-[#000] transform transition-all active:scale-95 hover:-translate-y-1"
            >
                <DownloadIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform opacity-70" />
                <span className="tracking-[0.5em] text-[10px] uppercase font-bold">Download This Decree</span>
            </button>
            <div className="flex flex-col items-center gap-3 opacity-30">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-[1px] bg-[#8C7B6B]"></div>
                    <span className="text-[9px] font-bold text-[#8C7B6B] uppercase tracking-[0.5em]">For Petni, Always</span>
                    <div className="w-8 h-[1px] bg-[#8C7B6B]"></div>
                </div>
            </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            @media print {
                @page {
                  size: portrait;
                  margin: 0;
                }
                html, body { 
                  margin: 0 !important; 
                  padding: 0 !important; 
                  width: 100% !important; 
                  height: 100% !important; 
                  overflow: hidden !important;
                }
                .no-print { display: none !important; }
                .no-print-bg { background: white !important; padding: 0 !important; }
                #proposal-certificate { 
                    box-shadow: none !important; 
                    margin: 0 !important; 
                    width: 100vw !important;
                    height: 100vh !important;
                    max-width: none !important;
                    border: none !important;
                    border-radius: 0 !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                    padding: 4cm !important;
                }
            }
            @keyframes shake {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(-3px, 3px); }
                50% { transform: translate(3px, -3px); }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
