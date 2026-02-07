
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
              className={`relative w-full min-h-[820px] sm:min-h-[950px] h-auto aspect-auto bg-[#FCFAF7] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-sm border-[1px] border-[#D4AF37]/60 p-6 sm:p-8 md:p-12 font-serif-classic text-[#1A1A1A] leading-relaxed overflow-hidden transition-all duration-75 print:shadow-none print:max-w-none print:w-[100vw] print:h-[100vh] print:m-0 print:border-none print:flex print:flex-col print:justify-center ${stamped ? 'animate-[shake_0.2s_ease-out]' : ''}`}
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
                <div className="relative z-10 flex flex-col h-full py-4 sm:py-6 print:py-0">
                    <header className="text-center space-y-1 sm:space-y-4 pt-2 sm:pt-6 mb-6">
                        <div className="space-y-0.5 sm:space-y-1.5">
                            <h2 className="text-[10px] sm:text-[13px] font-black text-[#4A3D2E] uppercase tracking-[0.4em] sm:tracking-[0.7em] font-sans">Eternal Decree</h2>
                            <div className="w-12 sm:w-20 h-[1px] sm:h-[2px] bg-[#D4AF37]/70 mx-auto"></div>
                        </div>
                        <h1 className="text-2xl sm:text-5xl md:text-6xl font-cursive font-bold text-[#000000] tracking-tight leading-tight">
                            A Covenant of Love
                        </h1>
                    </header>

                    <section className="space-y-3 sm:space-y-6 text-center mb-8">
                        <p className="text-[11px] sm:text-lg text-[#1A1A1A] font-medium italic leading-relaxed max-w-[280px] sm:max-w-lg mx-auto opacity-80">
                            Let it be known that on this day, the question of a lifetime was met with the most beautiful answer.
                        </p>

                        <div className="space-y-2 sm:space-y-4">
                            <div className="space-y-0.5">
                                <p className="text-2xl sm:text-5xl font-serif-display font-black text-[#000000] uppercase tracking-tighter">
                                    {recipientName}
                                </p>
                                <span className="text-[8px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.5em] text-[#B48F00] font-sans">The Beloved</span>
                            </div>
                            
                            <div className="text-[#D4AF37] font-serif italic text-xl sm:text-3xl font-bold flex items-center justify-center gap-4">
                                <div className="w-8 sm:w-16 h-[1px] bg-[#D4AF37]/30"></div>
                                <span>&</span>
                                <div className="w-8 sm:w-16 h-[1px] bg-[#D4AF37]/30"></div>
                            </div>

                            <div className="space-y-0.5">
                                <p className="text-2xl sm:text-5xl font-serif-display font-black text-[#000000] uppercase tracking-tighter">
                                    {senderName}
                                </p>
                                <span className="text-[8px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.5em] text-[#B48F00] font-sans">The Devoted</span>
                            </div>
                        </div>
                    </section>

                    {/* FORMAL CONDITIONS SECTION - Clean, Cluster-free Poetic Layout */}
                    <div className="relative py-6 px-4 sm:px-8 border-y-[1px] border-[#D4AF37]/40 bg-[#FCFAF7]/50 mx-1 sm:mx-6 mb-10">
                        <h3 className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-[#B48F00] mb-6 font-sans text-center">Articles of the Heart</h3>
                        
                        <div className="space-y-4 sm:space-y-5 text-center">
                             <div className="space-y-3 font-serif-classic italic">
                                <p className="text-[13px] sm:text-[18px] font-bold leading-tight text-[#1A1A1A]">To be honest, faithful, and loving partners for all of time.</p>
                                <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40 mx-auto"></div>
                                
                                <p className="text-[13px] sm:text-[18px] font-bold leading-tight text-[#1A1A1A]">To honor and cherish one another through every grand adventure.</p>
                                <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40 mx-auto"></div>
                                
                                <p className="text-[13px] sm:text-[18px] font-bold leading-tight text-[#1A1A1A]">To be a guiding light in darkness and a warming comfort in the cold.</p>
                                <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40 mx-auto"></div>
                                
                                <p className="text-[13px] sm:text-[18px] font-bold leading-tight text-[#1A1A1A]">To build a future of shared dreams, catching one another if we stumble.</p>
                                <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40 mx-auto"></div>
                                
                                <p className="text-[13px] sm:text-[18px] font-bold leading-tight text-[#1A1A1A]">To love with a passion that transcends words, forever and always.</p>
                             </div>

                             <div className="pt-6 mt-4">
                                <p className="text-[10px] sm:text-[13px] font-black uppercase tracking-[0.2em] text-[#4A3D2E] font-sans italic">
                                    Bound by these terms for the rest of our lives.
                                </p>
                             </div>
                        </div>
                    </div>

                    {/* Signatures Section - Both aligned to the left side for a formal look */}
                    <div className="mt-auto flex flex-col items-start w-full px-6 sm:px-14 pb-10 gap-8">
                        <div className="flex flex-col items-start text-left space-y-1 w-full max-w-[240px]">
                            <div className="border-b-[1px] border-[#D4AF37]/50 w-full pb-1">
                                <span className="font-cursive text-2xl sm:text-4xl text-[#000000]">{recipientName}</span>
                            </div>
                            <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-[0.2em] text-[#B48F00] font-sans">Verified: The Recipient</span>
                        </div>
                        
                        <div className="flex flex-col items-start text-left space-y-1 w-full max-w-[240px]">
                            <div className="border-b-[1px] border-[#D4AF37]/50 w-full pb-1">
                                <span className="font-cursive text-2xl sm:text-4xl text-[#000000]">{senderName}</span>
                            </div>
                            <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-[0.2em] text-[#B48F00] font-sans">Attested: The Sender</span>
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute bottom-1 left-1 sm:-bottom-10 sm:-left-10 text-[#EFE7DC] pointer-events-none opacity-[0.1] sm:opacity-[0.2] -rotate-12 z-0">
                    <ScrollIcon className="w-24 h-24 sm:w-72 sm:h-72" />
                </div>
            </div>
        </div>
        
        {/* Actions UI */}
        <div className="mt-8 flex flex-col items-center gap-4 z-10 no-print pb-20 w-full">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-3 px-12 sm:px-16 py-4 sm:py-5 bg-[#1A1A1A] text-[#F2ECE4] font-bold rounded-sm shadow-2xl hover:bg-[#000] transform transition-all active:scale-95 hover:-translate-y-1"
            >
                <DownloadIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform stroke-[3]" />
                <span className="tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-[12px] uppercase font-black">Save Your Promise</span>
            </button>
            
            <div className="flex flex-col items-center gap-2 px-4 text-center">
                 <p className="text-[10px] sm:text-xs text-[#8A4A5D] font-serif-classic font-bold opacity-60 italic tracking-wide">Take a screenshot or print this page to keep forever.</p>
                 <div className="flex items-center gap-4 opacity-40">
                    <div className="w-8 h-[1px] bg-[#4A3D2E]"></div>
                    <HeartIcon className="w-3 h-3 text-[#4A3D2E]" />
                    <div className="w-8 h-[1px] bg-[#4A3D2E]"></div>
                </div>
            </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            @media print {
                @page { size: portrait; margin: 0; }
                html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: white !important; }
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
