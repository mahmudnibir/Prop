
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
      
      // Heavy mechanical thud sound
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(60, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1, ctx.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(1.0, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.3);

      // Metal impact click
      const metalOsc = ctx.createOscillator();
      const metalGain = ctx.createGain();
      metalOsc.type = 'square';
      metalOsc.frequency.setValueAtTime(400, ctx.currentTime);
      metalOsc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
      metalGain.gain.setValueAtTime(0.3, ctx.currentTime);
      metalGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      metalOsc.connect(metalGain);
      metalGain.connect(ctx.destination);
      metalOsc.start();
      metalOsc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio Context playback failed", e);
    }
  };

  useEffect(() => {
    // Immediate trigger for visual feedback, slight delay for the impact effect
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
        
        {/* Old Money Premium Certificate */}
        <div 
          id="proposal-certificate" 
          className={`relative w-full max-w-2xl aspect-[1/1.4] bg-[#FCFAF7] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rounded-sm border-[1px] border-[#D4AF37]/30 p-8 sm:p-12 font-serif-classic text-[#2C2C2C] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-[100vw] print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[shake_0.2s_ease-out]' : ''}`}
        >
            
            {/* Subtle Parchment Texture */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Elegant Double Border */}
            <div className="absolute inset-2 sm:inset-4 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>
            <div className="absolute inset-4 sm:inset-6 border-[2px] border-[#D4AF37]/20 pointer-events-none"></div>

            {/* THE SEAL - POSITIONED BOTTOM RIGHT IN OPEN SPACE */}
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] pointer-events-none select-none">
                <div className={`relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center transform transition-all duration-[150ms] ease-out
                  ${stamped 
                    ? 'scale-100 opacity-100 rotate-[-12deg]' 
                    : 'scale-[6] opacity-0 rotate-[10deg] blur-md translate-y-[-50px]'}
                `}>
                    {/* High Visibility Dark Green Stamp - Solid colors to prevent disappearance */}
                    <div className="absolute inset-0 bg-[#06402B] rounded-full border-[8px] border-[#06402B] shadow-[0_12px_35px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden">
                        
                        {/* Internal Borders */}
                        <div className="absolute inset-2 border-[3px] border-white/40 rounded-full"></div>
                        <div className="absolute inset-4 border-[1px] border-white/20 rounded-full"></div>

                        {/* Circular Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-[88%] h-[88%] overflow-visible" viewBox="0 0 100 100">
                            <path id="sealPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                            <text className="text-[9px] font-sans font-black tracking-[0.4em] fill-white uppercase">
                              <textPath xlinkHref="#sealPath" startOffset="0%">
                                DECREE OF UNION • {recipientName.toUpperCase()} & {senderName.toUpperCase()} • 
                              </textPath>
                            </text>
                          </svg>
                        </div>

                        {/* Main Stamp Center */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <div className="px-4 py-1.5 border-y-[4px] border-white text-white font-sans font-black text-3xl sm:text-4xl tracking-tighter transform -rotate-2">
                                ACCEPTED
                            </div>
                            <div className="text-white/80 font-mono text-[9px] font-bold tracking-[0.5em] mt-3 uppercase">
                                OFFICIAL SEAL
                            </div>
                        </div>
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

                {/* Signatures Section - Kept on left to leave right side open for seal */}
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
