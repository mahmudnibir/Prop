
import React, { useState, useEffect } from 'react';
import { HeartIcon } from './Icons';

interface MemoryLaneProps {
    recipient: string;
    sender: string;
    onFinish: () => void;
    onSkipAll?: () => void;
}

const slides = [
    { text: "In the vastness of time and space...", delay: 3500 },
    { text: "Our paths crossed, and the world changed forever.", delay: 4000 },
    { text: "Every shared heartbeat has led to this single moment.", delay: 4000 },
    { text: "And now, I have one question that will define our future...", delay: 4500 },
];

const MemoryLane: React.FC<MemoryLaneProps> = ({ recipient, sender, onFinish, onSkipAll }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [isEntering, setIsEntering] = useState(true);

    useEffect(() => {
        const slideTimer = setTimeout(() => {
            setIsEntering(false);
            
            // Wait for exit animation
            const exitTimer = setTimeout(() => {
                if (currentSlide < slides.length - 1) {
                    setCurrentSlide(prev => prev + 1);
                    setIsEntering(true);
                } else {
                    setIsExiting(true);
                    setTimeout(onFinish, 1500);
                }
            }, 1000);

            return () => clearTimeout(exitTimer);
        }, slides[currentSlide].delay);

        return () => clearTimeout(slideTimer);
    }, [currentSlide, onFinish]);

    return (
        <div className={`min-h-screen w-full bg-[#0A050A] flex flex-col items-center justify-center p-8 overflow-hidden transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
            {/* Cinematic Letterboxing */}
            <div className="fixed top-0 left-0 w-full h-[10vh] bg-black z-50"></div>
            <div className="fixed bottom-0 left-0 w-full h-[10vh] bg-black z-50"></div>

            {/* Skip Controls */}
            <div className="fixed top-[12vh] right-8 z-[60] flex flex-col gap-4">
                <button 
                    onClick={onFinish}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-200/30 hover:text-pink-200 transition-colors border border-white/5 bg-white/5 backdrop-blur-md rounded-full px-6 py-2.5"
                >
                    Skip Intro
                </button>
                {onSkipAll && (
                    <button 
                        onClick={onSkipAll}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4D6D]/40 hover:text-[#FF4D6D] transition-colors border border-[#FF4D6D]/10 bg-white/5 backdrop-blur-md rounded-full px-6 py-2.5"
                    >
                        Skip to Certificate
                    </button>
                )}
            </div>

            {/* Stardust Background Particles */}
            <div className="absolute inset-0 z-0">
                {[...Array(40)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-white opacity-40 animate-pulse"
                        style={{
                            width: Math.random() * 3 + 'px',
                            height: Math.random() * 3 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 5 + 's',
                            animationDuration: 3 + Math.random() * 4 + 's'
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A050D] via-transparent to-black opacity-60"></div>

            <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center">
                <div className={`transition-all duration-1000 flex flex-col items-center ${isEntering ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-95'}`}>
                    <div className="mb-16 relative">
                        <HeartIcon className="w-12 h-12 text-[#FF8FA3] opacity-80" />
                        <div className="absolute inset-0 blur-2xl bg-pink-500/10 rounded-full animate-pulse"></div>
                    </div>

                    <p className="text-2xl md:text-5xl font-serif-display italic text-[#FFE5EC] leading-[1.3] tracking-tight font-light px-4 drop-shadow-[0_0_15px_rgba(255,179,193,0.3)]">
                        {slides[currentSlide].text.replace('${recipient}', recipient).replace('${sender}', sender)}
                    </p>
                </div>

                <div className="mt-24 flex gap-3">
                    {slides.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-[1px] transition-all duration-700 rounded-full ${i === currentSlide ? 'w-12 bg-pink-300' : 'w-4 bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Fog Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default MemoryLane;
