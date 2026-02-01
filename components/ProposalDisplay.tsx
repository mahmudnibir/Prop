
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
    <div className="min-h-screen w-full bg-[#FFF5F7] overflow-y-auto overflow-x-hidden flex flex-col items-center py-6 sm:py-10 px-4 sm:px-6">
        
        {/* Traditional Paper Document */}
        <div id="proposal-certificate" className="relative w-full max-w-xl bg-[#FDFBF9] shadow-[0_30px_80px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] rounded-sm border-double border-[12px] border-[#E8D9C9] p-8 sm:p-12 font-serif text-[#333] leading-relaxed overflow-hidden">
            
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {/* Elegant Header */}
            <div className="text-center mb-8 relative z-10">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#D9C4AF] bg-white shadow-sm">
                        <HeartIcon className="w-6 h-6 text-[#FF8FA3]" />
                    </div>
                </div>
                <h2 className="text-[10px] font-bold text-[#998675] uppercase tracking-[0.6em] mb-2 italic">Ministry of Eternal Devotion</h2>
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D9C4AF] to-transparent mx-auto mb-6"></div>
                
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#4A2D35] tracking-tight mb-2">
                    Decree of Union
                </h1>
                <p className="text-[9px] font-mono text-[#C4A484] uppercase tracking-widest font-bold">Document Registry ID: {Date.now().toString().slice(-8)}</p>
            </div>

            {/* Content Body */}
            <div className="relative z-10 space-y-8">
                <section className="text-center px-4">
                    <p className="text-sm sm:text-lg text-[#555] font-medium italic leading-relaxed">
                        By mutual resonance of heart and spirit, let it be entered into the record that:
                    </p>
                </section>

                <section className="relative py-4">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E8D9C9] opacity-40"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E8D9C9] opacity-40"></div>
                    
                    <div className="text-center py-6 px-4">
                        <p className="text-2xl sm:text-4xl font-display font-black text-[#8E44AD] tracking-tight leading-tight mb-4 drop-shadow-sm uppercase">
                            {recipientName}
                        </p>
                        <p className="text-[10px] text-[#777] uppercase tracking-[0.5em] font-bold mb-4">has graciously accepted the hand of</p>
                        <p className="text-2xl sm:text-4xl font-display font-black text-[#D63384] tracking-tight leading-tight drop-shadow-sm uppercase">
                            {senderName}
                        </p>
                    </div>
                </section>

                <section className="text-center space-y-4">
                    <div className="h-px w-24 bg-[#E8D9C9] mx-auto opacity-30"></div>
                    <div className="text-[12px] sm:text-base text-[#555] italic leading-loose max-w-sm mx-auto px-4">
                        "From this digital epoch forward, a life of shared joy, infinite tenderness, and an unbreakable covenant of love is established."
                    </div>
                </section>

                {/* Signature Area with Wax Seal */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-10 relative">
                    {/* Official Signatures */}
                    <div className="w-full sm:w-1/2 space-y-6">
                        <div className="border-b-2 border-[#D9C4AF] pb-1 relative">
                            <span className="text-[8px] uppercase font-bold text-[#A88C94] block mb-1">Authenticated Recipient</span>
                            <span className="font-display text-2xl text-[#8E44AD] italic leading-none">{recipientName}</span>
                            <span className="absolute -top-6 -right-2 text-3xl text-pink-200 opacity-30 select-none">✍️</span>
                        </div>
                        <div className="border-b-2 border-[#D9C4AF] pb-1 relative">
                            <span className="text-[8px] uppercase font-bold text-[#A88C94] block mb-1">Chief Petitioner</span>
                            <span className="font-display text-2xl text-[#D63384] italic leading-none">{senderName}</span>
                        </div>
                        <p className="text-[8px] text-[#C4A484] italic mt-2 uppercase tracking-tighter">This bond is eternal and legally adorable.</p>
                    </div>

                    {/* TRADITIONAL RED WAX SEAL - Overlapping signatures for realism */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 z-30 stamp-in -mt-12 sm:-mt-0 sm:-mr-10">
                        {/* Glow/Shadow */}
                        <div className="absolute inset-0 bg-[#A61C2E]/10 rounded-full blur-2xl"></div>
                        
                        {/* Seal Body */}
                        <div className="absolute inset-0 flex items-center justify-center transform rotate-[-8deg] hover:rotate-0 transition-transform duration-700 select-none">
                            <div className="relative w-full h-full p-2 group cursor-pointer drop-shadow-2xl">
                                {/* The irregular wax puddle edge */}
                                <div className="absolute inset-0 bg-[#9A192A] shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),inset_4px_4px_10px_rgba(255,255,255,0.2),5px_15px_30px_rgba(0,0,0,0.4)] 
                                              rounded-[48%_52%_45%_55%_/_52%_48%_55%_45%] border-[3px] border-[#821422] group-hover:scale-105 transition-transform duration-500"></div>
                                
                                {/* Inner Stamp Impression */}
                                <div className="absolute inset-4 border-[2px] border-[#821422] rounded-full flex flex-col items-center justify-center shadow-inner overflow-hidden">
                                     <div className="text-white/10 font-serif text-[9px] uppercase tracking-widest absolute top-5">AUTHORIZED</div>
                                     
                                     {/* Center Symbol */}
                                     <div className="relative flex flex-col items-center">
                                        <HeartIcon className="w-14 h-14 text-[#75121F] drop-shadow-[0_2px_2px_rgba(255,255,255,0.1)] opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white font-display font-black text-3xl drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)] tracking-tighter">YES</span>
                                        </div>
                                     </div>

                                     <div className="text-white/20 font-serif text-[8px] uppercase tracking-[0.3em] absolute bottom-5">EST. 2024</div>
                                </div>
                                
                                {/* Realistic Highlights */}
                                <div className="absolute top-4 left-8 w-1/4 h-1/6 bg-white/10 rounded-full blur-lg rotate-[-30deg] pointer-events-none"></div>
                                <div className="absolute bottom-6 right-8 w-1/5 h-1/10 bg-white/5 rounded-full blur-md rotate-[45deg] pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Icon Detail */}
            <div className="absolute -bottom-16 -left-16 text-[#E8D9C9] pointer-events-none opacity-20 -rotate-45 z-0">
                <ScrollIcon className="w-64 h-64" />
            </div>
        </div>
        
        {/* Interaction Actions */}
        <div className="mt-10 flex flex-col items-center gap-5 z-10 no-print">
            <button 
                onClick={handleDownload}
                className="group flex items-center gap-3 px-12 py-5 bg-[#4A2D35] text-white font-bold rounded-full shadow-2xl hover:bg-[#331F25] transform transition-all active:scale-95"
            >
                <DownloadIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                <span className="tracking-widest text-sm">ARCHIVE MY DECREE</span>
            </button>
            <div className="flex flex-col items-center gap-1">
                <p className="text-[11px] text-[#998675] font-black uppercase tracking-[0.3em]">One-Shot Screenshot Ready</p>
                <div className="flex items-center gap-1.5 opacity-60">
                    <span className="text-[9px] font-bold text-[#A88C94] uppercase tracking-tighter italic">"Forever starts today"</span>
                    <HeartIcon className="w-3 h-3 text-[#FF8FA3]" />
                </div>
            </div>
        </div>

        {/* CSS for specialized Print / Screenshot view */}
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
