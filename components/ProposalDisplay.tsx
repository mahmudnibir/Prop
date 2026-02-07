
import React, { useEffect, useRef, useState } from 'react';
import { ScrollIcon, DownloadIcon, HeartIcon } from './Icons';

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
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 44100 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(80, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.4);
      
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.4);

      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < ctx.sampleRate * 0.2; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
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
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#F2ECE4] flex flex-col items-center py-4 md:py-8 px-4 no-print-bg">
        
        {/* Certificate Wrapper */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-start relative">
            
            {/* Certificate Container */}
            <div 
              id="proposal-certificate" 
              className={`relative w-full min-h-[820px] sm:min-h-[920px] h-auto aspect-auto bg-[#FCFAF7] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-sm border-[1px] border-[#D4AF37]/60 p-6 sm:p-8 md:p-12 font-serif-classic text-[#1A1A1A] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-[100vw] print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[shake_0.2s_ease-out]' : ''}`}
            >
                
                {/* Subtle Parchment Texture */}
                <div className="absolute inset-0 opacity-[0.25] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                
                {/* Elegant Double Border */}
                <div className="absolute inset-2 sm:inset-4 border-[2px] border-[#D4AF37]/70 pointer-events-none"></div>
                <div className="absolute inset-4 sm:inset-6 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>

                {/* GOLD FOIL SEAL */}
                <div className="absolute top-[65%] right-2 sm:top-[78%] sm:right-6 md:right-10 z-[50] pointer-events-none select-none">
                    <div className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center transform transition-all duration-[600ms] ease-[cubic-bezier(0.175, 0.885, 0.32, 1.275)]
                      ${stamped 
                        ? 'scale-100 opacity-100 rotate-[-15deg]' 
                        : 'scale-[8] opacity-0 rotate-[45deg] blur-3xl translate-y-[-300px]'}
                    `}>
                        <div className="relative text-[#D4AF37] w-full h-full drop-shadow-[0_10px_20px_rgba(212,175,55,0.4)]">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                <defs>
                                    <filter id="goldGlow">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                                        <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                                        <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="#ffd700" result="specOut">
                                            <fePointLight x="-5000" y="-10000" z="20000" />
                                        </feSpecularLighting>
                                        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                                        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
                                    </filter>
                                    <path id="circlePathSeal" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                                </defs>
                                
                                <g filter="url(#goldGlow)">
                                    <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" opacity="0.6" />
                                    <circle cx="100" cy="100" r="88" fill="white" fillOpacity="0.05" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
                                    <text className="fill-current text-[10px] font-black tracking-[0.25em] uppercase font-sans">
                                        <textPath href="#circlePathSeal" startOffset="0%">
                                            OFFICIALLY SEALED • ETERNAL PROMISE • OFFICIALLY SEALED •
                                        </textPath>
                                    </text>
                                    <circle cx="100" cy="100" r="60" fill="white" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
                                    <path d="M70,100 L130,100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                    <text x="100" y="92" textAnchor="middle" className="font-serif-display italic font-black uppercase tracking-[0.1em] text-[16px] sm:text-[20px] fill-current">
                                        Bonded
                                    </text>
                                    <text x="100" y="118" textAnchor="middle" className="font-sans font-black uppercase tracking-[0.4em] text-[12px] sm:text-[16px] fill-current">
                                        FOREVER
                                    </text>
                                    <HeartIcon className="w-5 h-5 text-current absolute top-[125px] left-[90px]" x="90" y="125" width="20" height="20" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="relative z-10 flex flex-col h-full space-y-3 sm:space-y-6 md:space-y-6 py-4 sm:py-6 print:py-0">
                    <header className="text-center space-y-1 sm:space-y-3 pt-2 sm:pt-6">
                        <div className="space-y-0.5 sm:space-y-1.5">
                            <h2 className="text-[10px] sm:text-[13px] font-black text-[#4A3D2E] uppercase tracking-[0.4em] sm:tracking-[0.7em] font-sans">Eternal Decree</h2>
                            <div className="w-12 sm:w-20 h-[1px] sm:h-[2px] bg-[#D4AF37]/70 mx-auto"></div>
                        </div>
                        <h1 className="text-2xl sm:text-5xl md:text-5xl font-cursive font-bold text-[#000000] tracking-tight leading-tight">
                            A Covenant of Love
                        </h1>
                    </header>

                    <section className="space-y-2 sm:space-y-4 text-center">
                        <p className="text-[11px] sm:text-base text-[#1A1A1A] font-medium italic leading-relaxed max-w-[280px] sm:max-w-md mx-auto">
                            Let it be known that on this day, the question of a lifetime was met with the most beautiful answer.
                        </p>

                        <div className="space-y-1 sm:space-y-3">
                            <div className="space-y-0.5">
                                <p className="text-xl sm:text-4xl font-serif-display font-black text-[#000000] uppercase tracking-tighter">
                                    {recipientName}
                                </p>
                                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[#B48F00] font-sans">The Beloved</span>
                            </div>
                            
                            <div className="text-[#D4AF37] font-serif italic text-lg sm:text-2xl font-bold">&</div>

                            <div className="space-y-0.5">
                                <p className="text-xl sm:text-4xl font-serif-display font-black text-[#000000] uppercase tracking-tighter">
                                    {senderName}
                                </p>
                                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[#B48F00] font-sans">The Devoted</span>
                            </div>
                        </div>
                    </section>

                    {/* FORMAL CONDITIONS SECTION - Optimized content and size for PDF fitting */}
                    <div className="relative p-4 sm:p-6 md:p-8 border-[3px] border-double border-[#D4AF37]/60 bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-inner mx-1 sm:mx-4">
                        <h3 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.3em] text-[#B48F00] mb-4 font-sans text-center">Conditions of Agreement</h3>
                        
                        <div className="space-y-3 sm:space-y-4 text-[12px] sm:text-[15px] md:text-[16px] text-[#1A1A1A] font-serif-classic">
                             <p className="text-center font-black italic mb-2">Now, I hereby agree to the following:</p>
                             <ul className="space-y-2 font-bold text-center italic list-none leading-tight">
                                <li>To be your honest, faithful, and loving partner for the rest of my days</li>
                                <li>To be a wonderful and adventurous lover in bed every time</li>
                                <li>To be your guiding light in the darkness, a warming comfort in the cold, and shoulder to lean on when life is too much to bear on your own</li>
                                <li>To honor, love, and cherish you through all life's adventures - wherever we go, we'll go together.</li>
                                <li>To build my dreams around yours and make them a reality</li>
                                <li>To be there to catch you if you should stumble, carry you over every threshold, and fall in love with you every day</li>
                                <li>To love you with my whole heart and with a passion that cannot be expressed in any words</li>
                                <li>To be here with you and for you, forever and always</li>
                             </ul>
                             <p className="text-center font-black italic mt-4 border-t border-[#D4AF37]/20 pt-4 text-[13px] sm:text-[16px]">
                                I hereby agree to abide by these terms and conditions for the rest of my life.
                             </p>
                        </div>

                        <div className="absolute top-0 right-0 p-1 opacity-[0.03] pointer-events-none">
                            <HeartIcon className="w-8 h-8 sm:w-20 sm:h-20" />
                        </div>
                    </div>

                    {/* Signatures Section */}
                    <div className="flex flex-col items-center sm:items-start w-full mt-auto pb-4 sm:pb-6">
                        <div className="w-full sm:w-2/3 space-y-4 sm:space-y-6 px-2 sm:px-4">
                            <div className="border-b-[1px] border-[#D4AF37]/30 pb-1 w-full relative">
                                <span className="text-[8px] sm:text-[11px] uppercase font-black text-[#2C241B] block mb-0.5 tracking-[0.1em] sm:tracking-[0.2em] font-sans opacity-60">Verified Acceptance</span>
                                <span className="font-cursive text-xl sm:text-3xl text-[#000000] leading-tight block truncate pr-10">{recipientName}</span>
                            </div>
                            <div className="border-b-[1px] border-[#D4AF37]/30 pb-1 w-full relative">
                                <span className="text-[8px] sm:text-[11px] uppercase font-black text-[#2C241B] block mb-0.5 tracking-[0.1em] sm:tracking-[0.2em] font-sans opacity-60">Attested by</span>
                                <span className="font-cursive text-xl sm:text-3xl text-[#000000] leading-tight block truncate pr-10">{senderName}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute bottom-1 left-1 sm:-bottom-10 sm:-left-10 text-[#EFE7DC] pointer-events-none opacity-[0.1] sm:opacity-[0.2] -rotate-12 z-0">
                    <ScrollIcon className="w-24 h-24 sm:w-64 sm:h-64" />
                </div>
            </div>
        </div>
        
        {/* Actions UI */}
        <div className="mt-6 flex flex-col items-center gap-3 z-10 no-print pb-20 w-full">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-3 px-10 sm:px-14 py-3 sm:py-4 bg-[#1A1A1A] text-[#F2ECE4] font-bold rounded-sm shadow-xl hover:bg-[#000] transform transition-all active:scale-95 hover:-translate-y-1"
            >
                <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform opacity-100 stroke-[3]" />
                <span className="tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-[12px] uppercase font-black">Secure Keepsake</span>
            </button>
            
            <div className="flex flex-col items-center gap-1.5 sm:gap-3 px-4 text-center">
                 <p className="text-[9px] sm:text-xs text-[#8A4A5D] font-serif-classic font-bold opacity-60 italic">Share this page to keep our moment alive.</p>
                 <div className="flex items-center gap-2 sm:gap-4 opacity-70">
                    <div className="w-5 sm:w-8 h-[1px] bg-[#4A3D2E]"></div>
                    <span className="text-[8px] sm:text-[10px] font-black text-[#4A3D2E] uppercase tracking-[0.3em] sm:tracking-[0.5em]">A Legacy of Love</span>
                    <div className="w-5 sm:w-8 h-[1px] bg-[#4A3D2E]"></div>
                </div>
            </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            @media print {
                @page { size: portrait; margin: 0; }
                html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
                .no-print { display: none !important; }
                .no-print-bg { background: white !important; padding: 0 !important; }
                #proposal-certificate { 
                    box-shadow: none !important; margin: 0 !important; 
                    width: 100vw !important; height: 100vh !important;
                    max-width: none !important; border: none !important;
                    border-radius: 0 !important; padding: 1.5cm !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                }
                .print\\:py-0 { padding-top: 0 !important; padding-bottom: 0 !important; }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
