
import React from 'react';
import { ScrollIcon, HeartIcon, DownloadIcon } from './Icons';

interface AcceptedViewProps {
  recipientName: string;
  senderName: string;
}

const AcceptedView: React.FC<AcceptedViewProps> = ({ recipientName, senderName }) => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] overflow-y-auto overflow-x-hidden flex flex-col items-center py-6 sm:py-16 px-4 sm:px-6">
        
        {/* Elegant Certificate Container */}
        <div id="proposal-certificate" className="relative w-full max-w-2xl bg-[#FDFBF9] shadow-[0_40px_100px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] rounded-sm border-[20px] border-[#E8D9C9] p-8 sm:p-16 font-serif text-[#333] leading-relaxed overflow-hidden">
            
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Corner Flourishes */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D9C4AF]"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D9C4AF]"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D9C4AF]"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D9C4AF]"></div>

            {/* Content Body */}
            <div className="relative z-10 space-y-12">
                <header className="text-center space-y-4">
                    <div className="flex justify-center">
                        <HeartIcon className="w-10 h-10 text-[#C1354F] drop-shadow-md" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-[11px] font-bold text-[#A68F7B] uppercase tracking-[0.7em] italic">Official Proclamation of Devotion</h2>
                        <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#D9C4AF] to-transparent mx-auto"></div>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#4A2D35] tracking-tight leading-none pt-4">
                        Decree of Eternal Union
                    </h1>
                </header>

                <section className="text-center space-y-8 py-4">
                    <p className="text-lg sm:text-xl text-[#555] font-medium italic leading-relaxed max-w-lg mx-auto">
                        In the presence of the digital cosmos, and with the full resonance of heart and spirit, let it be entered into the eternal record that:
                    </p>

                    <div className="relative py-8 px-4 border-y border-[#F0E6DA]">
                        <p className="text-3xl sm:text-5xl font-display font-black text-[#8E44AD] tracking-tight mb-4 drop-shadow-sm uppercase">
                            {recipientName}
                        </p>
                        <p className="text-[10px] text-[#A68F7B] uppercase tracking-[0.5em] font-bold my-6">Has Most Graciously Promised To Journey Through Life With</p>
                        <p className="text-3xl sm:text-5xl font-display font-black text-[#D63384] tracking-tight drop-shadow-sm uppercase">
                            {senderName}
                        </p>
                    </div>

                    <p className="text-base sm:text-lg text-[#666] italic leading-loose max-w-md mx-auto">
                        "From this momentous second forward, a covenant of shared laughter, infinite tenderness, and unwavering support is established."
                    </p>
                </section>

                {/* Signatures and Wax Seal */}
                <div className="pt-8 flex flex-col sm:flex-row items-end justify-between gap-12 sm:gap-4">
                    {/* Signatures Area */}
                    <div className="w-full sm:w-1/2 space-y-8">
                        <div className="border-b border-[#D9C4AF] pb-1 relative group">
                            <span className="text-[9px] uppercase font-bold text-[#A88C94] block mb-1 tracking-widest">Signatory: The Beloved</span>
                            <span className="font-display text-3xl text-[#8E44AD] italic leading-none">{recipientName}</span>
                            <span className="absolute -top-8 -right-4 text-4xl opacity-0 group-hover:opacity-30 transition-opacity">✍️</span>
                        </div>
                        <div className="border-b border-[#D9C4AF] pb-1">
                            <span className="text-[9px] uppercase font-bold text-[#A88C94] block mb-1 tracking-widest">Petitioner: The Devoted</span>
                            <span className="font-display text-3xl text-[#D63384] italic leading-none">{senderName}</span>
                        </div>
                        <p className="text-[8px] text-[#C4A484] italic uppercase tracking-widest leading-none">Witnessed by the Stars • Established Forever</p>
                    </div>

                    {/* REALISTIC 3D WAX SEAL */}
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 stamp-in select-none">
                        {/* Shadow underneath */}
                        <div className="absolute inset-4 bg-black/20 rounded-full blur-xl transform translate-y-4"></div>
                        
                        {/* Poured Wax Body */}
                        <div className="absolute inset-0 bg-[#A61C2E] shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),inset_4px_4px_10px_rgba(255,255,255,0.2),8px_16px_32px_rgba(0,0,0,0.3)] 
                                      rounded-[52%_48%_55%_45%_/_48%_52%_45%_55%] border-4 border-[#821422] transform rotate-[-8deg] hover:rotate-0 transition-transform duration-700">
                            
                            {/* Inner Stamp Area */}
                            <div className="absolute inset-4 border-2 border-[#821422] rounded-full flex flex-col items-center justify-center bg-[#9A192A] shadow-[inset_2px_4px_8px_rgba(0,0,0,0.6)]">
                                <div className="text-white/20 font-serif text-[8px] uppercase tracking-[0.2em] absolute top-4">ACCEPTED</div>
                                
                                <div className="relative flex flex-col items-center justify-center">
                                    <HeartIcon className="w-12 h-12 text-[#75121F] opacity-70 mb-1" />
                                    <span className="absolute text-white font-display font-black text-2xl drop-shadow-[2px_4px_8px_rgba(0,0,0,0.7)] tracking-tighter">YES</span>
                                </div>

                                <div className="text-white/20 font-serif text-[7px] uppercase tracking-[0.3em] absolute bottom-4">EST. {new Date().getFullYear()}</div>
                            </div>
                            
                            {/* Highlights for Realism */}
                            <div className="absolute top-2 left-8 w-1/3 h-1/5 bg-white/15 rounded-full blur-lg rotate-[-30deg] pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Faint Background Scroll */}
            <div className="absolute -bottom-20 -left-20 text-[#E8D9C9] pointer-events-none opacity-10 -rotate-45 z-0">
                <ScrollIcon className="w-80 h-80" />
            </div>
        </div>
        
        {/* Interaction Actions */}
        <div className="mt-12 flex flex-col items-center gap-6 z-10 no-print">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-4 px-14 py-6 bg-[#4A2D35] text-white font-bold rounded-full shadow-2xl hover:bg-[#331F25] transform transition-all active:scale-95 hover:-translate-y-1"
            >
                <DownloadIcon className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                <span className="tracking-[0.2em] text-xs uppercase">Preserve this Moment</span>
            </button>
            <div className="flex flex-col items-center gap-2 opacity-50">
                <p className="text-[10px] text-[#998675] font-black uppercase tracking-[0.4em]">Official Digital Document</p>
                <div className="flex items-center gap-2">
                    <HeartIcon className="w-3 h-3 text-[#FF8FA3]" />
                    <span className="text-[9px] font-bold text-[#A88C94] uppercase tracking-tighter italic">Forever starts today</span>
                    <HeartIcon className="w-3 h-3 text-[#FF8FA3]" />
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
                    border-top: 15px solid #E8D9C9 !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                }
                .min-h-screen { min-height: auto !important; height: auto !important; }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
