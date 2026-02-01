
import React, { useState } from 'react';
import { HeartIcon, ClipboardIcon, LockIcon } from './Icons';

interface SetupViewProps {
  onCreate: (details: { question: string, recipient: string, sender: string, password?: string }) => void;
}

const SetupView: React.FC<SetupViewProps> = ({ onCreate }) => {
    const sender = "Habla"; 
    const recipient = "Petni"; 
    const [question, setQuestion] = useState('Will you be mine forever?');
    const [password, setPassword] = useState('');
    const [link, setLink] = useState('');
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

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
    
    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
    };

    const inputClasses = "w-full p-4 bg-[#FFF0F3] text-[#D63384] border-2 border-transparent focus:border-[#FF8FA3]/30 focus:bg-white rounded-2xl outline-none transition-all duration-200 placeholder-pink-300 font-medium";
    const labelClasses = "block text-xs font-bold text-[#FF8FA3] mb-2 ml-1 uppercase tracking-[0.2em]";

    if (link) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-[#FFF5F7] modal-fade-in">
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl max-w-lg w-full border border-pink-50">
                    <HeartIcon className="w-16 h-16 text-[#FF8FA3] mx-auto mb-6 heart-beat" />
                    <h2 className="text-3xl font-display font-bold text-[#5C1D2E] mb-2">Link Generated!</h2>
                    <p className="text-[#8A4A5D] mb-8">Send this secret link to {recipient} and wait for the magic to happen.</p>
                    
                    <div className="relative mb-6">
                        <input 
                            readOnly 
                            value={link} 
                            className="w-full p-4 pr-12 bg-pink-50/50 rounded-xl border border-pink-100 text-pink-600 font-mono text-sm overflow-hidden text-ellipsis"
                        />
                        <button 
                            onClick={handleCopy}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#FF8FA3] hover:text-[#FF4D6D] transition-colors"
                        >
                            <ClipboardIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {copyStatus === 'copied' && (
                        <p className="text-xs font-bold text-green-500 mb-4 animate-bounce">Copied to clipboard!</p>
                    )}

                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={handleGoToProposal}
                            className="w-full py-4 bg-[#FF8FA3] text-white font-bold font-display rounded-2xl shadow-lg hover:bg-[#FF758F] transition-all"
                        >
                            Preview My Proposal
                        </button>
                        <button 
                            onClick={() => setLink('')}
                            className="text-pink-300 text-sm hover:underline"
                        >
                            Edit Question
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#FFF5F7]">
            <div className="w-full max-md:max-w-md space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-pink-50">
                <div className="text-center">
                    <div className="inline-block p-4 bg-pink-50 rounded-full mb-4">
                        <HeartIcon className="w-10 h-10 text-[#FF8FA3]" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-[#5C1D2E]">The Proposal</h1>
                    <p className="text-[#8A4A5D] mt-2">Create a special moment for {recipient}</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className={labelClasses}>From</label>
                        <input disabled value={sender} className={`${inputClasses} opacity-60 cursor-not-allowed`} />
                    </div>
                    
                    <div>
                        <label className={labelClasses}>To</label>
                        <input disabled value={recipient} className={`${inputClasses} opacity-60 cursor-not-allowed`} />
                    </div>

                    <div>
                        <label className={labelClasses}>Your Question</label>
                        <textarea 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="e.g. Will you be mine forever?"
                            className={`${inputClasses} resize-none h-24`}
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Privacy Password (Optional)</label>
                        <div className="relative">
                            <input 
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="e.g. PetniLover123"
                                className={`${inputClasses} pr-12`}
                            />
                            <LockIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                        </div>
                    </div>

                    <button 
                        onClick={handleGenerateLink}
                        className="w-full py-5 bg-[#FF8FA3] text-white font-bold font-display rounded-[2rem] shadow-[0_15px_30px_-5px_rgba(255,143,163,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(255,143,163,0.6)] transform transition-all active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        <span>GENERATE MAGIC LINK</span>
                        <HeartIcon className="w-5 h-5 group-hover:scale-125 transition-transform" />
                    </button>
                </div>

                <p className="text-center text-xs text-pink-300 font-medium italic">
                    "A proposal they simply cannot say no to."
                </p>
            </div>
        </div>
    );
};

export default SetupView;
