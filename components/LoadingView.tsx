
import React, { useState } from 'react';
import { HeartIcon, ClipboardIcon } from './Icons';

interface SetupViewProps {
  onCreate: (details: { question: string, recipient: string, sender: string, password?: string }) => void;
}

const SetupView: React.FC<SetupViewProps> = ({ onCreate }) => {
    const sender = "Argho"; 
    const recipient = "Fatyha"; 
    const [question, setQuestion] = useState('Will you be mine forever?');
    const [password, setPassword] = useState('');
    const [link, setLink] = useState('');
    const [copying, setCopying] = useState(false);

    const handleGenerate = () => {
        const params = new URLSearchParams({ q: question, r: recipient, s: sender });
        if (password) params.append('p', password);
        setLink(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
    };

    if (link) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#FAF7F2] font-serif-classic">
                <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-xl border border-[#D4C4B5]/30 text-center">
                    <HeartIcon className="w-12 h-12 text-[#C24D5F] mx-auto mb-8" />
                    <h2 className="text-3xl font-serif-display font-medium text-black mb-4">Your Letter is Ready</h2>
                    <p className="text-[#8C7A6B] text-sm mb-10 leading-relaxed italic">Share this special link with {recipient} whenever you're ready.</p>
                    
                    <div className="relative mb-8">
                        <input readOnly value={link} className="w-full bg-[#FAF7F2] border border-[#D4C4B5] p-4 rounded-xl text-[#2C2C2C] text-xs font-mono pr-12" />
                        <button onClick={() => { navigator.clipboard.writeText(link); setCopying(true); setTimeout(() => setCopying(false), 2000); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#8C7A6B] hover:text-black transition-all">
                            <ClipboardIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {copying && <p className="text-[#C24D5F] text-[10px] font-bold tracking-widest mb-6 uppercase">Copied to clipboard</p>}

                    <div className="space-y-4">
                        <button onClick={() => onCreate({ question, recipient, sender, password: password || undefined })} className="w-full py-4 bg-[#2C2C2C] text-white font-bold rounded-xl shadow-lg hover:bg-black transition-all uppercase tracking-widest text-[10px]">Preview the Journey</button>
                        <button onClick={() => setLink('')} className="text-[#8C7A6B] text-[10px] uppercase tracking-widest hover:text-black">Edit My Message</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#FAF7F2] font-serif-classic">
            <div className="max-w-lg w-full bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-[#D4C4B5]/30">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif-display font-medium text-black mb-2">Our Story</h1>
                    <p className="text-[#8C7A6B] text-[10px] uppercase tracking-[0.4em]">Create your personal proposal for {recipient}</p>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest">My Question</label>
                        <textarea value={question} onChange={e => setQuestion(e.target.value)} className="w-full p-4 bg-[#FAF7F2] border border-[#D4C4B5] rounded-xl text-black font-serif-classic italic text-xl h-24 outline-none focus:border-[#C24D5F] transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest">Secret Code (Optional)</label>
                        <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Keep it private..." className="w-full p-4 bg-[#FAF7F2] border border-[#D4C4B5] rounded-xl text-black font-mono tracking-widest outline-none focus:border-[#C24D5F]" />
                    </div>

                    <button onClick={handleGenerate} className="w-full py-5 bg-[#C24D5F] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all uppercase tracking-[0.2em] text-[10px] active:scale-95">Create the Experience</button>
                </div>
            </div>
        </div>
    );
};

export default SetupView;
