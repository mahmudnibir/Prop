
import React, { useState, useEffect } from 'react';

interface MemoryLaneProps {
    recipient: string;
    sender: string;
    onFinish: () => void;
    onSkipAll?: () => void;
}

const slides = [
    { text: "They say that life is measured in moments...", duration: 3500 },
    { text: "And since I met you, every single one has mattered.", duration: 4000 },
    { text: "From the quiet nights to the big adventures...", duration: 4000 },
    { text: "I've known you were the one I wanted by my side.", duration: 4500 },
    { text: "So, I have something very important to ask you.", duration: 3500 },
];

const MemoryLane: React.FC<MemoryLaneProps> = ({ onFinish, onSkipAll }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let startTime = Date.now();
        const duration = slides[index].duration;
        
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);
            
            if (elapsed >= duration) {
                clearInterval(interval);
                setFade(false);
                setTimeout(() => {
                    if (index < slides.length - 1) {
                        setIndex(prev => prev + 1);
                        setProgress(0);
                        setFade(true);
                    } else {
                        onFinish();
                    }
                }, 800);
            }
        }, 16);

        return () => clearInterval(interval);
    }, [index, onFinish]);

    return (
        <div className="min-h-screen w-full bg-[#FAF7F2] flex flex-col items-center justify-center p-8 overflow-hidden relative font-serif-classic">
            {/* Floating Keepsakes Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(15)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    >
                        <svg className="text-[#C24D5F] w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                ))}
            </div>

            {/* Story Progress Bars */}
            <div className="fixed top-8 left-0 w-full px-6 flex gap-2 z-50">
                {slides.map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-black/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#C24D5F] transition-all duration-[16ms] ease-linear"
                            style={{ 
                                width: i < index ? '100%' : i === index ? `${progress}%` : '0%' 
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="relative z-10 text-center max-w-2xl px-4">
                <div className={`transition-all duration-1000 transform ${fade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
                    <p className="text-3xl md:text-5xl italic text-[#2C2C2C] leading-relaxed tracking-tight font-light drop-shadow-sm">
                        {slides[index].text}
                    </p>
                </div>
            </div>

            <div className="fixed bottom-12 flex flex-col items-center gap-2">
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8C7A6B] opacity-40">A Journey Shared</p>
            </div>

            {onSkipAll && (
                <button onClick={onSkipAll} className="fixed bottom-8 right-8 z-[60] text-[9px] font-bold uppercase tracking-[0.2em] text-[#8C7A6B] hover:text-black transition-all bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-black/5">
                    Skip Intro
                </button>
            )}
        </div>
    );
};

export default MemoryLane;
