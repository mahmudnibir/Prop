
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

      // Metal on metal impact (hammer head hitting paper/table)
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

      // Paper snap
      const noiseBufferSize = ctx.sampleRate * 0.1;
      const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.1, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      whiteNoise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start();
    } catch (e) {
      console.warn("Audio Context playback inhibited or failed", e);
    }
  };

  useEffect(() => {
    // Delayed impact to allow page to load
    const timer = setTimeout(() => {
      setStamped(true);
      playStampThud();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#F2ECE4] overflow-y-auto overflow-x-hidden flex flex-col items-center py-4 sm:py-12 px-4 sm:px-6 no-print-bg">
        
        {/* Old Money Premium Certificate */}
        <div 
          id="proposal-certificate" 
          className={`relative w-full max-w-2xl bg-[#FCFAF7] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rounded-sm border-[1px] border-[#D4AF37]/30 p-8 sm:p-16 font-serif-classic text-[#2C2C2C] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-full print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[shake_0.2s_ease-out]' : ''}`}
        >
            
            {/* Subtle Parchment Texture */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Elegant Double Border */}
            <div className="absolute inset-3 sm:inset-4 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>
            <div className="absolute inset-5 sm:inset-7 border-[2px] border-[#D4AF37]/20 pointer-events-none"></div>

            {/* THE SEAL - PLACED AT THE BOTTOM RIGHT */}
            <div className="absolute bottom-4 right-4 sm:bottom-12 sm:right-12 z-[100] pointer-events-none select-none">
                <div className={`relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center transform transition-all duration-[100ms] ease-in-impact
                  ${stamped 
                    ? 'scale-100 opacity-100 rotate-[-15deg]' 
                    : 'scale-[12] opacity-0 rotate-[10deg] blur-xl translate-y-[-100px]'}
                `}>
                    {/* Dark Green Ink Circle - Enhanced visibility colors */}
                    <div className="absolute inset-0 bg-[#0A3D2D] rounded-full border-[6px] border-[#0A3D2D] shadow-[0_15px_40px_rgba(0,0,0,0.3)]" 
                         style={{ maskImage: 'url("https://www.transparenttextures.com/patterns/p6.png")', WebkitMaskImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}>
                        
                        {/* Inner distressed rings */}
                        <div className="absolute inset-2 border-[4px] border-white/60 rounded-full"></div>
                        <div className="absolute inset-4 border-[1px] border-white/30 rounded-full"></div>

                        {/* Circular Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-[88%] h-[88%]" viewBox="0 0 100 100">
                            <path id="sealCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                            <text className="text-[9px] font-sans font-black tracking-[0.45em] fill-white uppercase">
                              <textPath xlinkHref="#sealCirclePath" startOffset="0%">
                                OFFICIAL DECREE • {recipientName.toUpperCase()} & {senderName.toUpperCase()} • 
                              </textPath>
                            </text>
                          </svg>
                        </div>

                        {/* Main Center Stamp Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="px-5 py-2 border-y-[6px] border-white text-white font-sans font-black text-3xl sm:text-5xl tracking-tighter transform -rotate-1">
                                ACCEPTED
                            </div>
                            <div className="text-white/80 font-mono text-[9px] font-bold tracking-[0.6em] mt-3 uppercase">
                                SEALED FOREVER
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="relative z-10 space-y-12 print:space-y-8">
                <header className="text-center space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-[9px] font-bold text-[#8C7B6B] uppercase tracking-[0.8em] font-sans">Formal Proclamation</h2>
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-serif-display italic font-medium text-[#1A1A1A] tracking-tight leading-tight">
                        Decree of Union
                    </h1>
                </header>

                <section className="text-center space-y-10 py-2 print:py-0">
                    <p className="text-lg sm:text-2xl text-[#4A4A4A] font-light leading-relaxed max-w-lg mx-auto">
                        Be it known to all that on this exceptional day, a sacred bond of affection has been established between:
                    </p>

                    <div className="space-y-4">
                        <p className="text-3xl sm:text-5xl font-serif-display font-bold text-[#1A1A1A] tracking-tighter uppercase">
                            {recipientName}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-10 h-[1px] bg-[#D4AF37]/40"></div>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#8C7B6B] font-bold">and</span>
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

                {/* Signatures */}
                <div className="pt-8 flex flex-col sm:flex-row items-end justify-between gap-8 sm:gap-4 relative print:pt-4">
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
            <div className="absolute -bottom-16 -left-16 text-[#EFE7DC] pointer-events-none opacity-[0.15] -rotate-12 z-0">
                <ScrollIcon className="w-72 h-72 sm:w-96 sm:h-96" />
            </div>
        </div>
        
        {/* Actions UI */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-6 z-10 no-print">
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
                  size: auto;
                  margin: 0;
                }
                body { background: white !important; margin: 0 !important; padding: 0 !important; }
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
                    padding: 10% !important;
                }
            }
            .ease-in-impact {
                transition-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.33);
            }
            @keyframes shake {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(-4px, 4px); }
                50% { transform: translate(4px, -4px); }
                75% { transform: translate(-2px, 2px); }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
