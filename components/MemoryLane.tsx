
import React, { useState, useEffect } from 'react';
import { HeartIcon } from './Icons';

interface MemoryLaneProps {
    recipient: string;
    sender: string;
    onFinish: () => void;
}

const slides = [
    { text: "It all started with a feeling I couldn't quite describe...", delay: 3000 },
    { text: "Every moment with you has become a treasure in my heart.", delay: 3500 },
    { text: "And now, I have one very important thing to ask you.", delay: 3000 },
];

const MemoryLane: React.FC<MemoryLaneProps> = ({ recipient, sender, onFinish }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFade(false);
            setTimeout(() => {
                if (currentSlide < slides.length - 1) {
                    setCurrentSlide(prev => prev + 1);
                    setFade(true);
                } else {
                    onFinish();
                }
            }, 1000);
        }, slides[currentSlide].delay);

        return () => clearTimeout(timer);
    }, [currentSlide, onFinish]);

    return (
        <div className="min-h-screen w-full bg-[#1A050D] flex items-center justify-center p-8 overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,143,163,0.1)_0%,transparent_70%)] pointer-events-none"></div>
             
             <div className={`transition-all duration-1000 flex flex-col items-center max-w-2xl text-center ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="mb-12 relative">
                    <HeartIcon className="w-16 h-16 text-[#FF8FA3] animate-pulse" />
                    <div className="absolute inset-0 blur-xl bg-pink-500/20 rounded-full animate-ping"></div>
                </div>

                <p className="text-2xl md:text-4xl font-serif-display italic text-[#FFB3C1] leading-relaxed tracking-tight px-4 font-medium">
                    {slides[currentSlide].text.replace('${recipient}', recipient).replace('${sender}', sender)}
                </p>

                <div className="mt-16 flex gap-2">
                    {slides.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-[#FF8FA3]' : 'w-2 bg-pink-900/40'}`}
                        />
                    ))}
                </div>
             </div>
        </div>
    );
};

export default MemoryLane;
