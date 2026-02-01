
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
      
      // Low frequency "Heavy Hammer" thud
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(80, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(1.0, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.2);

      // Higher frequency "Mechanical Click/Hammer Contact"
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(600, ctx.currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      clickGain.gain.setValueAtTime(0.4, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start();
      clickOsc.stop(ctx.currentTime + 0.05);

      // Paper snap noise
      const noiseBufferSize = ctx.sampleRate * 0.15;
      const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      whiteNoise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start();
    } catch (e) {
      console.warn("Audio context failed or blocked by browser", e);
    }
  };

  useEffect(() => {
    // The delay allows the certificate to fade in before the "Hammer" strikes
    const timer = setTimeout(() => {
      setStamped(true);
      playStampThud();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#F2ECE4] overflow-y-auto overflow-x-hidden flex flex-col items-center py-6 sm:py-16 px-4 sm:px-6">
        
        {/* Old Money Premium Certificate */}
        <div id="proposal-certificate" className={`relative w-full max-w-2xl bg-[#FCFAF7] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] rounded-sm border-[1px] border-[#D4AF37]/30 p-8 sm:p-20 font-serif-classic text-[#2C2C2C] leading-relaxed overflow-hidden transition-all duration-75 ${stamped ? 'animate-[impact_0.2s_ease-out]' : ''}`}>
            
            {/* Subtle Parchment Texture */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Elegant Double Border */}
            <div className="absolute inset-4 sm:inset-6 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>
            <div className="absolute inset-6 sm:inset-10 border-[3px] border-[#D4AF37]/20 pointer-events-none"></div>

            {/* Content Body */}
            <div className="relative z-10 space-y-16">
                <header className="text-center space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-[10px] font-bold text-[#8C7B6B] uppercase tracking-[0.8em] font-sans">Formal Proclamation</h2>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-serif-display italic font-medium text-[#1A1A1A] tracking-tight leading-tight">
                        Decree of Union
                    </h1>
                </header>

                <section className="text-center space-y-12 py-4">
                    <p className="text-xl sm:text-2xl text-[#4A4A4A] font-light leading-relaxed max-w-lg mx-auto">
                        Be it known to all that on this exceptional day, a sacred bond of affection has been established between:
                    </p>

                    <div className="space-y-6">
                        <p className="text-4xl sm:text-6xl font-serif-display font-bold text-[#1A1A1A] tracking-tighter uppercase">
                            {recipientName}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-[1px] bg-[#D4AF37]/40"></div>
                            <span className="text-[11px] uppercase tracking-[0.4em] text-[#8C7B6B] font-bold">and</span>
                            <div className="w-12 h-[1px] bg-[#D4AF37]/40"></div>
                        </div>
                        <p className="text-4xl sm:text-6xl font-serif-display font-bold text-[#1A1A1A] tracking-tighter uppercase">
                            {senderName}
                        </p>
                    </div>

                    <div className="max-w-md mx-auto space-y-4">
                        <p className="text-lg text-[#5C5C5C] italic leading-relaxed font-light">
                            "A testament to a future filled with shared wisdom, enduring patience, and unconditional love."
                        </p>
                    </div>
                </section>

                {/* Signatures and Classic Grunge Stamp */}
                <div className="pt-12 flex flex-col sm:flex-row items-end justify-between gap-12 sm:gap-4 relative">
                    <div className="w-full sm:w-1/2 space-y-10">
                        <div className="border-b-[1px] border-[#D4AF37]/30 pb-2 relative">
                            <span className="text-[8px] uppercase font-bold text-[#8C7B6B] block mb-2 tracking-[0.3em] font-sans">The Beloved</span>
                            <span className="font-serif-display text-4xl text-[#1A1A1A] italic leading-none">{recipientName}</span>
                        </div>
                        <div className="border-b-[1px] border-[#D4AF37]/30 pb-2">
                            <span className="text-[8px] uppercase font-bold text-[#8C7B6B] block mb-2 tracking-[0.3em] font-sans">The Devoted</span>
                            <span className="font-serif-display text-4xl text-[#1A1A1A] italic leading-none">{senderName}</span>
                        </div>
                    </div>

                    {/* GREEN GRUNGE STAMP WITH HAMMER SLAM IMPACT */}
                    <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center select-none perspective-1000">
                        <div className={`relative w-full h-full flex items-center justify-center transform 
                          ${stamped 
                            ? 'scale-100 opacity-100 rotate-[-12deg]' 
                            : 'scale-[8] opacity-0 rotate-0 blur-md translate-z-[100px]'} 
                          transition-all duration-[120ms] ease-in-impact`}
                        >
                            {/* Grunge texture overlay via mask */}
                            <div className="absolute inset-0 bg-[#2E7D32] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]" 
                                 style={{ maskImage: 'url("https://www.transparenttextures.com/patterns/p6.png")', WebkitMaskImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}>
                                
                                {/* Inner distressed borders */}
                                <div className="absolute inset-2 border-[4px] border-[#FFFFFF]/90 rounded-full"></div>
                                <div className="absolute inset-4 border-[2px] border-[#FFFFFF]/80 rounded-full"></div>

                                {/* Circular text logic - FIXED (No Rotation) */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <svg className="w-[85%] h-[85%]" viewBox="0 0 100 100">
                                    <path id="stampPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                                    <text className="text-[8.5px] font-sans font-black tracking-[0.35em] fill-white uppercase">
                                      <textPath xlinkHref="#stampPath" startOffset="0%">
                                        FINAL CONFIRMATION • {recipientName} & {senderName} • 
                                      </textPath>
                                    </text>
                                  </svg>
                                </div>

                                {/* Main Stamp Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="px-4 py-1.5 border-y-[4px] border-white text-white font-sans font-black text-3xl sm:text-4xl tracking-tighter transform -rotate-1 shadow-sm">
                                        ACCEPTED
                                    </div>
                                    <div className="text-white/90 font-mono text-[9px] font-bold tracking-[0.5em] mt-2 uppercase">
                                        OFFICIAL SEAL
                                    </div>
                                </div>
                            </div>
                            
                            {/* Inner distressing shadow to give 2D depth after impact */}
                            {stamped && <div className="absolute inset-0 rounded-full shadow-inner opacity-40 pointer-events-none"></div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Faint Decorative Background */}
            <div className="absolute -bottom-16 -left-16 text-[#EFE7DC] pointer-events-none opacity-20 -rotate-12 z-0">
                <ScrollIcon className="w-96 h-96" />
            </div>
        </div>
        
        {/* Actions UI */}
        <div className="mt-16 flex flex-col items-center gap-8 z-10 no-print">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-6 px-16 py-7 bg-[#1A1A1A] text-[#F2ECE4] font-medium rounded-sm shadow-2xl hover:bg-[#000] transform transition-all active:scale-95 hover:-translate-y-1"
            >
                <DownloadIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform opacity-70" />
                <span className="tracking-[0.5em] text-[10px] uppercase font-bold">Archive This Decree</span>
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
                body { background: white !important; padding: 0 !important; margin: 0 !important; }
                .no-print { display: none !important; }
                #proposal-certificate { 
                    box-shadow: none !important; 
                    margin: 0 !important; 
                    width: 100vw !important;
                    height: 100vh !important;
                    max-width: none !important;
                    border: none !important;
                }
            }
            .ease-in-impact {
                transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            @keyframes impact {
                0% { transform: scale(1); }
                10% { transform: scale(0.96) translateY(2px); }
                30% { transform: scale(1.04) translateY(-4px); }
                50% { transform: scale(0.98) translateY(2px); }
                100% { transform: scale(1) translateY(0); }
            }
            .perspective-1000 {
                perspective: 1000px;
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
