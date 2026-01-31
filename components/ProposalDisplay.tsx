
import React from 'react';
import { ScrollIcon, HeartIcon, DownloadIcon } from './Icons';

interface AcceptedViewProps {
  recipientName: string;
  senderName: string;
}

const AcceptedView: React.FC<AcceptedViewProps> = ({ recipientName, senderName }) => {
  const handleDownload = () => {
    // Standard print function is the most reliable way to "download" a high-res PDF or image preview
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF5F7] overflow-y-auto overflow-x-hidden flex flex-col items-center py-4 sm:py-10 px-4 sm:px-6">
        
        {/* The Paper Document */}
        <div id="proposal-certificate" className="relative w-full max-w-xl bg-[#FCFAF7] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] rounded-md border-t-[12px] border-pink-200 p-6 sm:p-12 font-serif text-[#2D2D2D] leading-relaxed overflow-hidden">
            
            {/* Subtle Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

            {/* Header / Letterhead */}
            <div className="text-center mb-8 relative z-10">
                <div className="flex justify-center mb-4">
                    <div className="p-2 border border-pink-100 rounded-full">
                        <HeartIcon className="w-8 h-8 text-[#FF8FA3]" />
                    </div>
                </div>
                <h2 className="text-[10px] font-bold text-[#A88C94] uppercase tracking-[0.5em] mb-1">Office of Eternal Affection</h2>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-100 to-transparent mb-6"></div>
                
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#5C1D2E] tracking-tight mb-1">
                    Official Declaration
                </h1>
                <p className="text-[10px] font-mono text-pink-300 uppercase tracking-widest">Certificate No: PETNI-{Math.floor(Math.random() * 1000000)}</p>
            </div>

            {/* Main Content Body - Condensed for one-shot screenshotting */}
            <div className="relative z-10 space-y-6">
                <section>
                    <p className="text-sm sm:text-lg text-[#4A4A4A] text-center px-4">
                        This digital testament confirms that on this day, a bond of significant emotional magnitude has been formally established.
                    </p>
                </section>

                <section className="bg-white/40 p-5 sm:p-8 border-l-4 border-pink-200 rounded-r-lg shadow-sm text-center">
                    <p className="text-base sm:text-xl italic leading-snug">
                        "I, <strong className="font-sans font-black text-[#D63384] not-italic underline decoration-pink-100">{recipientName}</strong>, do hereby acknowledge and accept the proposal brought forth by <strong className="font-sans font-bold text-[#8A4A5D] not-italic">{senderName}</strong>."
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5C1D2E] border-b border-pink-50 pb-1 inline-block">Provisions of Bond</h3>
                    <ul className="space-y-2 text-[11px] sm:text-sm text-[#5A5A5A]">
                        <li className="flex gap-3">
                            <span className="text-pink-300 font-bold">•</span>
                            <span>The recipient is formally recognized as the world's most precious person.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-pink-300 font-bold">•</span>
                            <span>Mandatory daily quotas of hugs and sweet whispers are now in effect.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-pink-300 font-bold">•</span>
                            <span>This agreement is eternal, irrevocable, and powered by pure devotion.</span>
                        </li>
                    </ul>
                </section>

                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    {/* Signatures */}
                    <div className="w-full sm:w-1/2 space-y-4">
                        <div className="border-b border-gray-200 pb-1">
                            <span className="text-[8px] uppercase font-bold text-gray-400 block mb-1">Authorized Recipient</span>
                            <span className="font-display text-xl text-[#D63384] italic">{recipientName} ❤️</span>
                        </div>
                        <div className="border-b border-gray-200 pb-1">
                            <span className="text-[8px] uppercase font-bold text-gray-400 block mb-1">Chief Petitioner</span>
                            <span className="font-display text-xl text-[#8A4A5D] italic">{senderName}</span>
                        </div>
                    </div>

                    {/* THE SEAL - Overlapping slightly */}
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 z-20 stamp-in shrink-0">
                        <div className="absolute inset-0 bg-[#FF4D6D]/5 rounded-full blur-xl"></div>
                        <div className="absolute inset-0 flex items-center justify-center transform rotate-[-8deg] hover:rotate-0 transition-all duration-500">
                            <div className="w-full h-full border-2 border-[#FF4D6D]/40 rounded-full p-1.5">
                                <div className="w-full h-full border-[4px] border-[#FF4D6D] rounded-full flex flex-col items-center justify-center bg-white shadow-lg">
                                    <div className="text-[#FF4D6D] font-display font-black text-[10px] tracking-[0.2em] uppercase">Validated</div>
                                    <div className="h-px w-1/2 bg-[#FF4D6D]/30 my-1"></div>
                                    <div className="text-[#FF4D6D] font-display font-black text-3xl sm:text-4xl leading-none">YES!</div>
                                    <div className="h-px w-1/2 bg-[#FF4D6D]/30 my-1"></div>
                                    <HeartIcon className="w-4 h-4 text-[#FF4D6D]" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 rounded-full overflow-hidden opacity-20 pointer-events-none">
                            <div className="w-full h-full shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Corner Decoration */}
            <div className="absolute -bottom-10 -left-10 text-pink-50/20 pointer-events-none -rotate-12 z-0">
                <ScrollIcon className="w-40 h-40" />
            </div>
        </div>
        
        {/* Actions for the user */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 z-10 no-print">
            <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-8 py-4 bg-[#FF8FA3] text-white font-bold rounded-full shadow-lg hover:bg-[#FF758F] transform transition-all active:scale-95"
            >
                <DownloadIcon className="w-5 h-5" />
                <span>DOWNLOAD CERTIFICATE</span>
            </button>
            <p className="text-[10px] text-[#A88C94] font-bold text-center sm:text-left mt-2 flex items-center justify-center gap-1 uppercase tracking-widest">
                <span>Tip: Take a screenshot for the world!</span>
                <HeartIcon className="w-3 h-3" />
            </p>
        </div>

        {/* Global styles for printing to ensure "one shot" PDF generation */}
        <style dangerouslySetInnerHTML={{ __html: `
            @media print {
                body { background: white !important; }
                .no-print { display: none !important; }
                #proposal-certificate { 
                    box-shadow: none !important; 
                    margin: 0 !important; 
                    width: 100% !important;
                    border: none !important;
                }
                .min-h-screen { min-height: auto !important; height: auto !important; }
            }
        `}} />
    </div>
  );
};

export default AcceptedView;
