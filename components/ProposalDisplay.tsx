
import React from 'react';
import { ScrollIcon, EngravedHeartIcon, DownloadIcon } from './Icons';

interface AcceptedViewProps {
  recipientName: string;
  senderName: string;
}

const AcceptedView: React.FC<AcceptedViewProps> = ({ recipientName, senderName }) => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#F2ECE4] overflow-y-auto overflow-x-hidden flex flex-col items-center py-6 sm:py-16 px-4 sm:px-6">
        
        {/* Old Money Premium Certificate */}
        <div id="proposal-certificate" className="relative w-full max-w-2xl bg-[#FCFAF7] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] rounded-sm border-[1px] border-[#D4AF37]/30 p-8 sm:p-20 font-serif-classic text-[#2C2C2C] leading-relaxed overflow-hidden">
            
            {/* Subtle Parchment Texture */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Elegant Double Border */}
            <div className="absolute inset-4 sm:inset-6 border-[1px] border-[#D4AF37]/40 pointer-events-none"></div>
            <div className="absolute inset-6 sm:inset-10 border-[3px] border-[#D4AF37]/20 pointer-events-none"></div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-8 left-8 text-[#D4AF37]/40 text-2xl">✧</div>
            <div className="absolute top-8 right-8 text-[#D4AF37]/40 text-2xl">✧</div>
            <div className="absolute bottom-8 left-8 text-[#D4AF37]/40 text-2xl">✧</div>
            <div className="absolute bottom-8 right-8 text-[#D4AF37]/40 text-2xl">✧</div>

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

                {/* Signatures and Classic Wax Seal */}
                <div className="pt-12 flex flex-col sm:flex-row items-end justify-between gap-12 sm:gap-4">
                    <div className="w-full sm:w-1/2 space-y-10">
                        <div className="border-b-[1px] border-[#D4AF37]/30 pb-2 relative group">
                            <span className="text-[8px] uppercase font-bold text-[#8C7B6B] block mb-2 tracking-[0.3em] font-sans">The Beloved</span>
                            <span className="font-serif-display text-4xl text-[#1A1A1A] italic leading-none">{recipientName}</span>
                        </div>
                        <div className="border-b-[1px] border-[#D4AF37]/30 pb-2">
                            <span className="text-[8px] uppercase font-bold text-[#8C7B6B] block mb-2 tracking-[0.3em] font-sans">The Devoted</span>
                            <span className="font-serif-display text-4xl text-[#1A1A1A] italic leading-none">{senderName}</span>
                        </div>
                        <p className="text-[9px] text-[#A68F7B] uppercase tracking-[0.5em] font-medium font-sans">Authenticated by the Heart</p>
                    </div>

                    {/* CLASSIC OLD MONEY WAX SEAL */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 stamp-in select-none group cursor-pointer">
                        {/* Realistic Poured Wax Shape */}
                        <div className="absolute inset-0 bg-[#8B0000] shadow-[inset_-4px_-8px_12px_rgba(0,0,0,0.6),inset_2px_4px_10px_rgba(255,255,255,0.1),10px_20px_40px_rgba(0,0,0,0.4)] 
                                      rounded-[55%_45%_52%_48%_/_47%_53%_45%_55%] transform rotate-[-5deg] group-hover:rotate-0 transition-all duration-1000">
                            
                            {/* Inner Stamp Detail */}
                            <div className="absolute inset-4 border-[2px] border-[#660000]/60 rounded-full flex flex-col items-center justify-center bg-[#7A0000] shadow-[inset_4px_8px_12px_rgba(0,0,0,0.7),inset_-2px_-4px_6px_rgba(255,255,255,0.05)]">
                                <div className="text-[#660000] font-sans text-[7px] font-black uppercase tracking-[0.4em] absolute top-5 opacity-40">SEALED</div>
                                
                                <div className="relative flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                    <EngravedHeartIcon className="w-14 h-14 text-[#550000] opacity-90 drop-shadow-[1px_2px_1px_rgba(255,255,255,0.05)]" />
                                    <span className="absolute text-[#330000]/40 font-serif-display italic font-black text-xl tracking-tighter mt-1">YES</span>
                                </div>

                                <div className="text-[#660000] font-sans text-[7px] font-black uppercase tracking-[0.5em] absolute bottom-5 opacity-40">MMXXIV</div>
                            </div>
                            
                            {/* Wax Shine Reflection */}
                            <div className="absolute top-4 left-10 w-1/3 h-1/4 bg-white/10 rounded-full blur-xl rotate-[-25deg] pointer-events-none"></div>
                        </div>
                        
                        {/* Ground Shadow */}
                        <div className="absolute -bottom-4 left-10 right-10 h-4 bg-black/10 blur-xl rounded-full"></div>
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
                    <span className="text-[9px] font-bold text-[#8C7B6B] uppercase tracking-[0.5em]">For Petna, Always</span>
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
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
