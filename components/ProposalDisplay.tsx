
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
    <div className="min-h-screen w-full bg-[#F2ECE4] flex flex-col items-center py-6 sm:py-10 px-4 no-print-bg">
        
        {/* Certificate Wrapper for screen sizing */}
        <div className="w-full max-w-xl flex flex-col items-center justify-center relative">
            
            {/* Certificate Container */}
            <div 
              id="proposal-certificate" 
              className={`relative w-full aspect-[1/1.41] bg-[#FCFAF7] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm border-[1px] border-[#D4AF37]/50 p-6 sm:p-12 font-serif-classic text-[#1A1A1A] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-[100vw] print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[shake_0.2s_ease-out]' : ''}`}
            >
                
                {/* Subtle Parchment Texture */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                
                {/* Elegant Double Border */}
                <div className="absolute inset-2 sm:inset-4 border-[1.5px] border-[#D4AF37]/60 pointer-events-none"></div>
                <div className="absolute inset-4 sm:inset-6 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>

                {/* APPROVED STAMP */}
                <div className="absolute bottom-16 right-4 sm:bottom-24 sm:right-8 z-[50] pointer-events-none select-none">
                    <div className={`relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center transform transition-all duration-[250ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                      ${stamped 
                        ? 'scale-100 opacity-90 rotate-[-12deg]' 
                        : 'scale-[6] opacity-0 rotate-[20deg] blur-2xl translate-y-[-80px]'}
                    `}>
                        <div className="relative text-[#C41E3A] w-full h-full">
                            <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(196,30,58,0.3)]">
                                <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 10" />
                                <rect x="18" y="78" width="164" height="44" fill="white" stroke="currentColor" strokeWidth="4" />
                                <text x="100" y="112" textAnchor="middle" className="font-sans font-black uppercase tracking-tight text-[32px] fill-current">
                                    APPROVED
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="relative z-10 flex flex-col h-full justify-between py-2 sm:py-4 print:py-0">
                    <header className="text-center space-y-4">
                        <div className="space-y-1.5">
                            <h2 className="text-[10px] sm:text-[11px] font-black text-[#5C4D3E] uppercase tracking-[0.7em] font-sans">Covenant of Perpetual Affection</h2>
                            <div className="w-20 h-[2px] bg-[#D4AF37]/60 mx-auto"></div>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-serif-display italic font-medium text-[#1A1A1A] tracking-tight leading-tight">
                            Decree of Lifelong Union
                        </h1>
                    </header>

                    <section className="space-y-6 text-center">
                        <p className="text-sm sm:text-lg text-[#2A2A2A] font-medium leading-relaxed max-w-md mx-auto">
                            This agreement witnesses the unreserved acceptance of a proposal between:
                        </p>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-2xl sm:text-4xl font-serif-display font-black text-[#1A1A1A] uppercase">
                                    {recipientName}
                                </p>
                                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.5em] text-[#5C4D3E] font-sans">The Beloved</span>
                            </div>
                            
                            <div className="text-[#D4AF37] font-serif italic text-xl sm:text-2xl">&</div>

                            <div className="space-y-1">
                                <p className="text-2xl sm:text-4xl font-serif-display font-black text-[#1A1A1A] uppercase">
                                    {senderName}
                                </p>
                                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.5em] text-[#5C4D3E] font-sans">The Devoted</span>
                            </div>
                        </div>
                    </section>

                    {/* Highly Condensed Articles */}
                    <section className="space-y-4 sm:space-y-5 text-[11px] sm:text-[13px] text-[#2A2A2A] font-medium border-t border-b border-[#D4AF37]/40 py-6 sm:py-8">
                        <div className="flex gap-4">
                            <span className="font-black text-[#1A1A1A] min-w-[40px]">ART. I</span>
                            <p>Lifelong devotion, unyielding support, and the prioritization of shared happiness.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="font-black text-[#1A1A1A] min-w-[40px]">ART. II</span>
                            <p>Immediate forgiveness for all minor grievances and a commitment to daily kindness.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="font-black text-[#1A1A1A] min-w-[40px]">ART. III</span>
                            <p>A covenant sealed by unshakeable choice, witnessed by the stars, for all time.</p>
                        </div>
                    </section>

                    {/* Signatures Section */}
                    <div className="flex flex-col items-center sm:items-start w-full mt-4">
                        <div className="w-full sm:w-2/3 space-y-4 sm:space-y-6">
                            <div className="border-b-[2px] border-[#D4AF37]/50 pb-1 w-full">
                                <span className="text-[8px] uppercase font-black text-[#5C4D3E] block mb-1 tracking-[0.35em] font-sans">Signed by the Beloved</span>
                                <span className="font-serif-display text-xl sm:text-2xl text-[#1A1A1A] italic leading-none">{recipientName}</span>
                            </div>
                            <div className="border-b-[2px] border-[#D4AF37]/50 pb-1 w-full">
                                <span className="text-[8px] uppercase font-black text-[#5C4D3E] block mb-1 tracking-[0.35em] font-sans">Signed by the Devoted</span>
                                <span className="font-serif-display text-xl sm:text-2xl text-[#1A1A1A] italic leading-none">{senderName}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Faint Decorative Background Scroll */}
                <div className="absolute -bottom-12 -left-12 text-[#EFE7DC] pointer-events-none opacity-[0.3] -rotate-12 z-0">
                    <ScrollIcon className="w-48 h-48 sm:w-64 sm:h-64" />
                </div>
            </div>
        </div>
        
        {/* Actions UI */}
        <div className="mt-8 flex flex-col items-center gap-6 z-10 no-print pb-12 w-full">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-6 px-12 py-4 sm:py-5 bg-[#1A1A1A] text-[#F2ECE4] font-medium rounded-sm shadow-xl hover:bg-[#000] transform transition-all active:scale-95 hover:-translate-y-1"
            >
                <DownloadIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform opacity-100" />
                <span className="tracking-[0.5em] text-[10px] sm:text-[11px] uppercase font-black">Download Certificate</span>
            </button>
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4 opacity-60">
                    <div className="w-8 h-[1.5px] bg-[#6B5A4B]"></div>
                    <span className="text-[9px] font-black text-[#6B5A4B] uppercase tracking-[0.6em]">For Petni, Always</span>
                    <div className="w-8 h-[1.5px] bg-[#6B5A4B]"></div>
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
                    padding: 2.5cm !important;
                }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
