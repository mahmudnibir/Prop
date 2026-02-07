
import React, { useState, useEffect } from 'react';
import { HeartIcon, ClipboardIcon, LockIcon } from './Icons';

interface SetupViewProps {
  onCreate: (details: { question: string, recipient: string, sender: string, password?: string }) => void;
  onSkipToCertificate: (details: { question: string, recipient: string, sender: string, password?: string }) => void;
}

const FloatingHeart: React.FC<{ delay: number, left: number, size: number }> = ({ delay, left, size }) => (
    <div 
        className="absolute bottom-[-20px] animate-[heart-fly_4s_linear_infinite] opacity-0 pointer-events-none"
        style={{ 
            left: `${left}%`, 
            animationDelay: `${delay}s`,
            width: `${size}px`,
            height: `${size}px`,
            color: '#FFB3C1'
        }}
    >
        <HeartIcon className="w-full h-full opacity-20" />
    </div>
);

const SetupView: React.FC<SetupViewProps> = ({ onCreate, onSkipToCertificate }) => {
    const sender = "Argho"; 
    const recipient = "Fatyha"; 
    const [question, setQuestion] = useState('Will you be mine forever?');
    const [password, setPassword] = useState('');
    const [link, setLink] = useState('');
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
    const [hearts, setHearts] = useState<{id: number, left: number, delay: number, size: number}[]>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            size: 15 + Math.random() * 25
        }));
        setHearts(newHearts);
    }, []);

    const handleGenerateLink = () => {
        if (!question) {
            alert("Please enter your heartfelt question!");
            return;
        }
        const params = new URLSearchParams({
            q: question,
            r: recipient,
            s: sender,
        });
        if (password) {
            params.append('p', password);
        }
        const generatedLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        setLink(generatedLink);
    };

    const handleGoToProposal = () => {
        onCreate({ question, recipient, sender, password: password || undefined });
    };

    const handleDirectSkip = () => {
        onSkipToCertificate({ question, recipient, sender, password: password || undefined });
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
    };

    const inputClasses = "w-full p-4 bg-white/60 backdrop-blur-sm text-[#5C1D2E] border border-pink-100 focus:border-[#FF8FA3] focus:ring-4 focus:ring-pink-100 rounded-2xl outline-none transition-all duration-300 placeholder-pink-200 font-medium shadow-sm";
    const labelClasses = "block text-[10px] font-black text-[#FF8FA3] mb-2 ml-2 uppercase tracking-[0.3em] font-sans";

    if (link) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#FFF5F7] to-[#FFE5EC] relative overflow-hidden">
                {hearts.map(h => <FloatingHeart key={h.id} {...h} />)}
                
                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-14 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(255,143,163,0.25)] max-w-lg w-full border border-white/50 relative z-10 text-center modal-fade-in">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#FF8FA3] rounded-3xl rotate-12 flex items-center justify-center shadow-xl">
                        <HeartIcon className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    
                    <h2 className="text-4xl font-serif-display italic font-bold text-[#5C1D2E] mt-6 mb-3">Pure Magic.</h2>
                    <p className="text-[#8A4A5D] font-serif-classic text-lg mb-10 leading-relaxed">
                        Your proposal for <span className="font-bold text-[#FF4D6D]">{recipient}</span> is ready to be shared with the world.
                    </p>
                    
                    <div className="group relative mb-8">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-rose-200 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative flex items-center bg-white rounded-xl border border-pink-50 p-1 pl-4">
                            <input 
                                readOnly 
                                value={link} 
                                className="flex-1 bg-transparent border-none focus:ring-0 text-pink-600 font-mono text-sm overflow-hidden text-ellipsis outline-none"
                            />
                            <button 
                                onClick={handleCopy}
                                className="p-3 text-[#FF8FA3] hover:text-[#FF4D6D] hover:bg-pink-50 rounded-lg transition-all"
                                title="Copy to clipboard"
                            >
                                <ClipboardIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {copyStatus === 'copied' && (
                        <div className="flex items-center justify-center gap-2 text-green-500 font-bold text-xs mb-6 animate-bounce">
                            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            LINK COPIED TO CLIPBOARD
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={handleGoToProposal}
                            className="w-full py-5 bg-[#FF8FA3] text-white font-bold font-display rounded-2xl shadow-lg hover:bg-[#FF758F] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            <HeartIcon className="w-5 h-5" />
                            PREVIEW PROPOSAL
                        </button>
                        
                        <div className="flex flex-col gap-3 mt-4">
                            <button 
                                onClick={handleDirectSkip}
                                className="text-[#FF8FA3] text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#FF4D6D] transition-colors border border-pink-50 rounded-full py-2 px-4 inline-block mx-auto"
                            >
                                View Certificate Directly
                            </button>
                            <button 
                                onClick={() => setLink('')}
                                className="text-pink-300 text-[10px] font-bold uppercase tracking-widest hover:text-pink-400 transition-colors"
                            >
                                Edit Your Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#FFF5F7] to-[#FFE5EC] relative overflow-hidden">
            {/* Background Decorations */}
            {hearts.map(h => <FloatingHeart key={h.id} {...h} />)}
            <div className="absolute top-20 left-20 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>

            <div className="w-full max-w-xl bg-white/70 backdrop-blur-md p-10 md:p-14 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(255,143,163,0.15)] border border-white relative z-10 transition-all">
                <div className="text-center mb-12">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-pink-100 rounded-full scale-150 blur-xl opacity-50"></div>
                        <div className="relative p-5 bg-gradient-to-br from-white to-pink-50 rounded-full shadow-inner">
                            <HeartIcon className="w-12 h-12 text-[#FF8FA3] animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-serif-display italic font-bold text-[#5C1D2E] tracking-tight">The Proposal</h1>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <div className="h-[1px] w-8 bg-pink-200"></div>
                        <p className="text-[#8A4A5D] font-serif-classic italic text-lg uppercase tracking-widest">For our beautiful Fatyha</p>
                        <div className="h-[1px] w-8 bg-pink-200"></div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="group">
                            <label className={labelClasses}>From</label>
                            <div className="px-5 py-4 bg-white/40 border border-pink-100 rounded-2xl text-[#FF8FA3] font-serif-classic italic text-xl opacity-80 cursor-not-allowed shadow-sm">
                                {sender}
                            </div>
                        </div>
                        
                        <div className="group">
                            <label className={labelClasses}>To</label>
                            <div className="px-5 py-4 bg-white/40 border border-pink-100 rounded-2xl text-[#FF8FA3] font-serif-classic italic text-xl opacity-80 cursor-not-allowed shadow-sm">
                                {recipient}
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <label className={labelClasses}>The Ultimate Question</label>
                        <textarea 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type your heartfelt question here..."
                            className={`${inputClasses} resize-none h-32 leading-relaxed pt-5 font-serif-classic text-xl italic`}
                        />
                        <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
                            <HeartIcon className="w-12 h-12" />
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Privacy Password <span className="text-[8px] opacity-40 lowercase">(Optional)</span></label>
                        <div className="relative group">
                            <input 
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="A secret key for her eyes only..."
                                className={`${inputClasses} pr-14 font-mono text-sm tracking-widest`}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-pink-50 rounded-xl">
                                <LockIcon className="w-5 h-5 text-[#FF8FA3]" />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleGenerateLink}
                        className="w-full py-6 bg-[#FF8FA3] text-white font-bold font-display rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(255,143,163,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(255,143,163,0.6)] hover:bg-[#FF758F] hover:-translate-y-1 transform transition-all active:scale-95 flex items-center justify-center gap-4 group"
                    >
                        <span className="tracking-[0.2em] text-sm uppercase">Create The Moment</span>
                        <HeartIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </button>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] text-pink-300 font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4">
                        <span className="w-4 h-[1px] bg-pink-100"></span>
                        Handcrafted with Love
                        <span className="w-4 h-[1px] bg-pink-100"></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SetupView;
