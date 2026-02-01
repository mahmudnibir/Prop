
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
          className={`relative w-full max-w-2xl aspect-[1/1.41] bg-[#FCFAF7] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rounded-sm border-[1px] border-[#D4AF37]/40 p-8 sm:p-14 font-serif-classic text-[#2C2C2C] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-[100vw] print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[shake_0.2s_ease-out]' : ''}`}
        >
            
            {/* Subtle Parchment Texture */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Elegant Double Border */}
            <div className="absolute inset-2 sm:inset-4 border-[1px] border-[#D4AF37]/50 pointer-events-none"></div>
            <div className="absolute inset-4 sm:inset-6 border-[2px] border-[#D4AF37]/30 pointer-events-none"></div>

            {/* REFINED SMALL RUBBER STAMP */}
            <div className="absolute bottom-16 right-6 sm:bottom-20 sm:right-10 z-[50] pointer-events-none select-none opacity-90">
                <div className={`relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center transform transition-all duration-[250ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                  ${stamped 
                    ? 'scale-100 opacity-100 rotate-[-15deg]' 
                    : 'scale-[8] opacity-0 rotate-[30deg] blur-2xl translate-y-[-100px]'}
                `}>
                    <div className="relative text-[#C41E3A] w-full h-full">
                        <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_1px_4px_rgba(196,30,58,0.3)]">
                            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="40 5 60 2 30 8" />
                            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                            <path id="curveTop" d="M 35,100 A 65,65 0 0,1 165,100" fill="none" />
                            <text className="font-sans font-black uppercase tracking-[0.25em] text-[18px] fill-current">
                                <textPath xlinkHref="#curveTop" startOffset="50%" textAnchor="middle">APPROVED</textPath>
                            </text>
                            <path id="curveBottom" d="M 35,100 A 65,65 0 0,0 165,100" fill="none" />
                            <text className="font-sans font-black uppercase tracking-[0.25em] text-[18px] fill-current">
                                <textPath xlinkHref="#curveBottom" startOffset="50%" textAnchor="middle">APPROVED</textPath>
                            </text>
                            <circle cx="32" cy="100" r="3" fill="currentColor" />
                            <circle cx="168" cy="100" r="3" fill="currentColor" />
                            <rect x="18" y="78" width="164" height="44" fill="white" stroke="currentColor" strokeWidth="4" />
                            <text x="100" y="112" textAnchor="middle" className="font-sans font-extrabold uppercase tracking-tight text-[30px] fill-current">
                                APPROVED
                            </text>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="relative z-10 space-y-10 print:space-y-8">
                <header className="text-center space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-[11px] font-black text-[#6B5A4B] uppercase tracking-[0.7em] font-sans">Official Covenant of Perpetual Affection</h2>
                        <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-serif-display italic font-medium text-[#1A1A1A] tracking-tight leading-tight">
                        Decree of Lifelong Union
                    </h1>
                </header>

                <section className="space-y-8 py-2">
                    <p className="text-center text-base sm:text-xl text-[#3D3D3D] font-light leading-relaxed max-w-lg mx-auto">
                        This formal agreement witnesses the unreserved acceptance of a proposal between:
                    </p>

                    <div className="text-center space-y-4">
                        <div className="space-y-1">
                            <p className="text-3xl sm:text-4xl font-serif-display font-bold text-[#1A1A1A] tracking-tighter uppercase">
                                {recipientName}
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-8 h-[1px] bg-[#D4AF37]/60"></div>
                                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#5C4D3E] font-sans">The Beloved</span>
                                <div className="w-8 h-[1px] bg-[#D4AF37]/60"></div>
                            </div>
                        </div>
                        
                        <div className="text-[#D4AF37] font-serif italic text-xl">&</div>

                        <div className="space-y-1">
                            <p className="text-3xl sm:text-4xl font-serif-display font-bold text-[#1A1A1A] tracking-tighter uppercase">
                                {senderName}
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-8 h-[1px] bg-[#D4AF37]/60"></div>
                                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#5C4D3E] font-sans">The Devoted</span>
                                <div className="w-8 h-[1px] bg-[#D4AF37]/60"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Simplified Articles Section */}
                <section className="space-y-6 text-[12px] sm:text-[14px] text-[#4A4A4A] font-light border-t border-b border-[#D4AF37]/30 py-8">
                    <div className="flex gap-4">
                        <span className="font-bold text-[#1A1A1A] whitespace-nowrap">ART. I</span>
                        <p>The Parties pledge to prioritize each other’s happiness above all material gains, promising a lifetime of support, loyalty, and shared dreams.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-bold text-[#1A1A1A] whitespace-nowrap">ART. II</span>
                        <p>All minor grievances shall be settled with immediate forgiveness, a mandatory hug, and an unwavering commitment to kindness.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-bold text-[#1A1A1A] whitespace-nowrap">ART. III</span>
                        <p>This covenant remains in full force across all timelines and dimensions, witnessed by the stars and sealed by unshakeable choice.</p>
                    </div>
                </section>

                <div className="text-center pt-2">
                    <p className="text-sm italic text-[#5C4D3E] leading-relaxed font-serif">
                        "Two hearts, one journey, starting this very moment."
                    </p>
                </div>

                {/* Signatures Section */}
                <div className="pt-6 flex flex-col items-center sm:items-start w-full">
                    <div className="w-full sm:w-2/3 space-y-6">
                        <div className="border-b-[1.5px] border-[#D4AF37]/40 pb-1 w-full">
                            <span className="text-[8px] uppercase font-black text-[#5C4D3E] block mb-1 tracking-[0.35em] font-sans">Hand-signed by the Beloved</span>
                            <span className="font-serif-display text-2xl text-[#1A1A1A] italic leading-none">{recipientName}</span>
                        </div>
                        <div className="border-b-[1.5px] border-[#D4AF37]/40 pb-1 w-full">
                            <span className="text-[8px] uppercase font-black text-[#5C4D3E] block mb-1 tracking-[0.35em] font-sans">Hand-signed by the Devoted</span>
                            <span className="font-serif-display text-2xl text-[#1A1A1A] italic leading-none">{senderName}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Faint Decorative Background Scroll */}
            <div className="absolute -bottom-16 -left-16 text-[#EFE7DC] pointer-events-none opacity-[0.25] -rotate-12 z-0">
                <ScrollIcon className="w-64 h-64 sm:w-80 sm:h-80" />
            </div>
        </div>
        
        {/* Actions UI */}
        <div className="mt-8 flex flex-col items-center gap-6 z-10 no-print pb-12">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-6 px-14 py-5 bg-[#1A1A1A] text-[#F2ECE4] font-medium rounded-sm shadow-2xl hover:bg-[#000] transform transition-all active:scale-95 hover:-translate-y-1"
            >
                <DownloadIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform opacity-90" />
                <span className="tracking-[0.5em] text-[11px] uppercase font-black">Download Certificate</span>
            </button>
            <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4 opacity-40">
                    <div className="w-10 h-[1.5px] bg-[#6B5A4B]"></div>
                    <span className="text-[10px] font-black text-[#6B5A4B] uppercase tracking-[0.6em]">For Petni, Always</span>
                    <div className="w-10 h-[1.5px] bg-[#6B5A4B]"></div>
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
                    padding: 3cm !important;
                }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
