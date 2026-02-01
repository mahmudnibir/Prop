
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
      oscillator.frequency.setValueAtTime(70, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1, ctx.currentTime + 0.25);
      
      gainNode.gain.setValueAtTime(1.0, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.25);

      // Higher frequency contact sound
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(500, ctx.currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
      
      clickGain.gain.setValueAtTime(0.5, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start();
      clickOsc.stop(ctx.currentTime + 0.08);

      // Paper rattle
      const noiseBufferSize = ctx.sampleRate * 0.2;
      const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      whiteNoise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start();
    } catch (e) {
      console.warn("Audio context playback inhibited", e);
    }
  };

  useEffect(() => {
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
    <div className="min-h-screen w-full bg-[#F2ECE4] overflow-y-auto overflow-x-hidden flex flex-col items-center py-6 sm:py-16 px-4 sm:px-6 no-print-bg">
        
        {/* Old Money Premium Certificate */}
        <div 
          id="proposal-certificate" 
          className={`relative w-full max-w-2xl bg-[#FCFAF7] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] rounded-sm border-[1px] border-[#D4AF37]/30 p-8 sm:p-20 font-serif-classic text-[#2C2C2C] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-full print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[impact_0.25s_ease-out]' : ''}`}
        >
            
            {/* Subtle Parchment Texture */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Elegant Double Border */}
            <div className="absolute inset-4 sm:inset-6 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>
            <div className="absolute inset-6 sm:inset-10 border-[3px] border-[#D4AF37]/20 pointer-events-none"></div>

            {/* THE SEAL - CENTERED IN THE MIDDLE OF THE CERTIFICATE BODY */}
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none select-none">
                <div className={`relative w-64 h-64 sm:w-96 sm:h-96 flex items-center justify-center transition-all duration-[150ms] ease-out
                  ${stamped 
                    ? 'scale-100 opacity-90 rotate-[-12deg]' 
                    : 'scale-[5] opacity-0 rotate-0 blur-md translate-y-[-50px]'}
                `}>
                    {/* Dark Green Ink Circle */}
                    <div className="absolute inset-0 bg-[#06402B] rounded-full border-[8px] border-[#06402B] shadow-[0_10px_30px_rgba(0,0,0,0.2)]" 
                         style={{ maskImage: 'url("https://www.transparenttextures.com/patterns/p6.png")', WebkitMaskImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}>
                        
                        {/* Inner distressed white rings for classic stamp look */}
                        <div className="absolute inset-2 border-[4px] border-[#FFFFFF]/60 rounded-full"></div>
                        <div className="absolute inset-5 border-[1px] border-[#FFFFFF]/40 rounded-full"></div>

                        {/* Circular Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-[88%] h-[88%]" viewBox="0 0 100 100">
                            <path id="stampPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                            <text className="text-[9px] font-sans font-black tracking-[0.42em] fill-white uppercase">
                              <textPath xlinkHref="#stampPath" startOffset="0%">
                                OFFICIAL DECREE • {recipientName} & {senderName} • 
                              </textPath>
                            </text>
                          </svg>
                        </div>

                        {/* Main Center Stamp Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="px-5 py-2 border-y-[6px] border-white text-white font-sans font-black text-4xl sm:text-6xl tracking-tighter transform -rotate-1">
                                ACCEPTED
                            </div>
                            <div className="text-white/90 font-mono text-[10px] sm:text-[12px] font-bold tracking-[0.7em] mt-4 uppercase">
                                PETNI'S CHOICE
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="relative z-10 space-y-16 print:space-y-12">
                <header className="text-center space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-[10px] font-bold text-[#8C7B6B] uppercase tracking-[0.8em] font-sans">Formal Proclamation</h2>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-serif-display italic font-medium text-[#1A1A1A] tracking-tight leading-tight">
                        Decree of Union
                    </h1>
                </header>

                <section className="text-center space-y-12 py-4 print:py-2">
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

                {/* Signatures */}
                <div className="pt-12 flex flex-col sm:flex-row items-end justify-between gap-12 sm:gap-4 relative print:pt-6">
                    <div className="w-full sm:w-1/2 space-y-10 print:space-y-6">
                        <div className="border-b-[1px] border-[#D4AF37]/30 pb-2 relative">
                            <span className="text-[8px] uppercase font-bold text-[#8C7B6B] block mb-2 tracking-[0.3em] font-sans">The Beloved</span>
                            <span className="font-serif-display text-4xl text-[#1A1A1A] italic leading-none">{recipientName}</span>
                        </div>
                        <div className="border-b-[1px] border-[#D4AF37]/30 pb-2">
                            <span className="text-[8px] uppercase font-bold text-[#8C7B6B] block mb-2 tracking-[0.3em] font-sans">The Devoted</span>
                            <span className="font-serif-display text-4xl text-[#1A1A1A] italic leading-none">{senderName}</span>
                        </div>
                    </div>
                    <div className="hidden sm:block w-1/2 h-20"></div>
                </div>
            </div>

            {/* Faint Decorative Background Scroll */}
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
                }
            }
            @keyframes impact {
                0% { transform: scale(1); }
                15% { transform: scale(0.95) translateY(4px); }
                40% { transform: scale(1.05) translateY(-6px); }
                60% { transform: scale(0.97) translateY(2px); }
                100% { transform: scale(1) translateY(0); }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
