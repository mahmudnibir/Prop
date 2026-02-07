
import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon, LockIcon } from './Icons';

// Access confetti from window (loaded in index.html)
declare const confetti: any;

interface ProposalViewProps {
  question: string;
  recipient: string;
  sender: string;
  password?: string;
  onAccept: () => void;
}

const noButtonResponses = [
  "No", "Fatyha, really?", "Think again ❤️", "Error: Try Yes", "So close!", "Not possible!", "Try again!", "Just give up", "Yes is better!", "Stop it! 😂", "Wait... no!", "Click Yes pls", "You can't catch me", "Almost had it!"
];

const Stardust: React.FC = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
            <div 
                key={i}
                className="absolute rounded-full bg-white opacity-20 animate-pulse"
                style={{
                    width: Math.random() * 2 + 'px',
                    height: Math.random() * 2 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 5 + 's',
                    animationDuration: 2 + Math.random() * 3 + 's'
                }}
            />
        ))}
    </div>
);

const HeartShower: React.FC<{ heartKey: number }> = ({ heartKey }) => {
    if (heartKey === 0) return null;
    return (
        <div key={heartKey} className="absolute inset-0 pointer-events-none z-30">
            {Array.from({ length: 15 }).map((_, i) => (
                <div 
                    key={i} 
                    className="heart-shower-piece"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 0.5}s`,
                        animationDuration: `${1.5 + Math.random()}s`,
                    }}
                >
                    <HeartIcon className="w-6 h-6 md:w-10 md:h-10 text-pink-400/40" />
                </div>
            ))}
        </div>
    );
};

const Modal: React.FC<{onClose: () => void}> = ({onClose}) => {
    const [confirmPos, setConfirmPos] = useState<React.CSSProperties>({ position: 'relative' });

    const handleConfirmHover = () => {
        if ('vibrate' in navigator) navigator.vibrate(20);
        setConfirmPos({
            position: 'absolute',
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            transition: 'all 0.2s ease',
            zIndex: 100
        })
    }

    return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[100] p-6">
        <div className="bg-[#1A050D] rounded-[2.5rem] shadow-2xl p-8 text-center max-w-sm w-full modal-fade-in relative overflow-hidden border border-pink-500/20 min-h-[300px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
            <h2 className="text-3xl font-serif-display italic font-bold text-[#FFE5EC]">Fatyha, wait!</h2>
            <p className="mt-4 text-pink-200/60 text-lg font-serif-classic">Are you absolutely sure? This could be the most beautiful "Yes" ever!</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4">
                <button 
                    onClick={onClose}
                    className="w-full px-6 py-4 bg-[#FF4D6D] text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(255,77,109,0.4)] transform transition-transform hover:scale-105 active:scale-95"
                >
                    I'll say Yes!
                </button>
                <div className="h-12 w-full flex items-center justify-center relative">
                    <button 
                        onMouseEnter={handleConfirmHover}
                        onTouchStart={handleConfirmHover}
                        onClick={onClose}
                        style={confirmPos as React.CSSProperties}
                        className="text-sm text-pink-400/40 hover:text-pink-400 underline px-4 py-2 whitespace-nowrap font-mono uppercase tracking-widest"
                    >
                        Confirm heartbreak
                    </button>
                </div>
            </div>
        </div>
    </div>
)};

type IntroStage = 'verify' | 'syncing' | 'decrypting' | 'countdown' | 'done';

const ProposalView: React.FC<ProposalViewProps> = ({ question, recipient, sender, password, onAccept }) => {
  const [noButtonIndex, setNoButtonIndex] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noPosition, setNoPosition] = useState<React.CSSProperties>({ position: 'relative' });
  const [hoverCount, setHoverCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [heartKey, setHeartKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  
  const [introStage, setIntroStage] = useState<IntroStage>(password ? 'verify' : 'countdown');
  const [countdown, setCountdown] = useState(3);
  const [inputPassword, setInputPassword] = useState('');
  const [passError, setPassError] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio('https://www.chosic.com/wp-content/uploads/2021/04/Warm-Memories-Emotional-Inspiring-Piano.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (introStage === 'syncing') {
        const timer = setTimeout(() => setIntroStage('decrypting'), 2500);
        return () => clearTimeout(timer);
    }
    if (introStage === 'decrypting') {
        const timer = setTimeout(() => setIntroStage('countdown'), 1500);
        return () => clearTimeout(timer);
    }
    if (introStage === 'countdown' && countdown > 0) {
        const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
    }
    if (introStage === 'countdown' && countdown === 0) {
        const transitionTimer = setTimeout(() => {
            setIntroStage('done');
            audioRef.current?.play().catch(() => {});
        }, 1000);
        return () => clearTimeout(transitionTimer);
    }
  }, [introStage, countdown]);

  useEffect(() => {
    if (introStage === 'done' && !isTypingDone) {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(question.substring(0, i + 1));
            i++;
            if (i === question.length) {
                clearInterval(interval);
                setIsTypingDone(true);
            }
        }, 60);
        return () => clearInterval(interval);
    }
  }, [introStage, question, isTypingDone]);

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (isModalVisible) return;
    if ('vibrate' in navigator) navigator.vibrate(50);
    setHeartKey(prev => prev + 1);
    setHoverCount(prev => prev + 1);
    
    if(hoverCount > 4 && !isModalVisible) {
        setModalVisible(true);
        setHoverCount(0);
        return;
    }

    setYesButtonScale((prev) => Math.min(prev + 0.15, 4));
    setNoScale(prev => Math.max(0.2, prev - 0.08));
    setNoButtonIndex((prev) => (prev + 1) % noButtonResponses.length);

    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const padding = 100;
        const buttonWidth = 120;
        const buttonHeight = 50;
        const availableWidth = rect.width - buttonWidth - padding * 2;
        const availableHeight = rect.height - buttonHeight - padding * 2;
        const newTop = padding + Math.random() * availableHeight;
        const newLeft = padding + Math.random() * availableWidth;

        setNoPosition({
            position: 'absolute',
            top: `${newTop}px`,
            left: `${newLeft}px`,
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 50
        });
    }
  };

  const handleAcceptClick = () => {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      setIsLoading(true);
      setTimeout(() => {
          onAccept();
      }, 3000);
  }

  const handleVerifyPassword = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputPassword === password) {
          setIntroStage('syncing');
      } else {
          setPassError(true);
          if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
          setTimeout(() => setPassError(false), 2000);
      }
  }

  const renderIntro = () => {
    switch(introStage) {
        case 'verify':
            return (
                <div className="flex flex-col items-center justify-center p-6 fade-in-up w-full max-w-sm">
                    <p className="text-[10px] text-pink-500/40 mb-10 font-mono font-bold tracking-[0.5em] uppercase">Private Encryption Protocol</p>
                    <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 w-full shadow-2xl relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="p-5 bg-[#FF4D6D] rounded-3xl shadow-[0_10px_30px_rgba(255,77,109,0.3)]">
                                <LockIcon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <form onSubmit={handleVerifyPassword} className="space-y-8 mt-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-mono text-pink-300/30 tracking-[0.3em] uppercase block text-center">Identity Verification Required</label>
                                <input 
                                    autoFocus
                                    type="password"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full p-5 bg-black/40 text-white rounded-2xl border transition-all outline-none text-center font-mono tracking-widest text-2xl ${passError ? 'border-red-500/50 animate-shake' : 'border-white/10 focus:border-pink-500/50'}`}
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-5 bg-[#FF8FA3] text-white font-bold rounded-2xl hover:bg-[#FF4D6D] transition-all transform active:scale-95 shadow-xl uppercase tracking-widest text-xs"
                            >
                                Access Heartbeat
                            </button>
                        </form>
                    </div>
                </div>
            );
        case 'syncing':
            return (
                <div className="w-full max-w-2xl flex flex-col items-center p-6 fade-in-up">
                    <p className="text-sm text-pink-200/40 font-mono mb-16 font-bold tracking-[0.6em] uppercase">Syncing Hearts...</p>
                    <div className="relative mb-16">
                        <HeartIcon className="w-24 h-24 text-[#FF4D6D] drop-shadow-[0_0_40px_rgba(255,77,109,0.5)]" style={{ animation: `heart-beat 0.8s infinite`}}/>
                        <div className="absolute inset-0 scale-150 blur-3xl bg-pink-500/10 rounded-full"></div>
                    </div>
                    <svg width="200" height="60" viewBox="0 0 250 60" className="mb-12 opacity-30">
                        <path d="M0 30 L50 30 L60 10 L80 50 L100 20 L120 40 L130 30 L250 30" stroke="#FF4D6D" strokeWidth="3" fill="none" className="ekg-path" />
                    </svg>
                    <div className="px-8 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/5">
                        <p className="text-[10px] text-pink-100/40 font-mono tracking-[0.4em]">FATYHA_VIBRATION_MATCH</p>
                    </div>
                </div>
            );
        case 'decrypting':
            return (
                 <div className="text-center fade-in-up p-6">
                    <p className="text-4xl md:text-6xl text-white font-serif-display italic font-bold mb-6 text-scramble opacity-60 tracking-widest"></p>
                    <p className="text-pink-300/10 text-[10px] font-mono tracking-[0.8em] uppercase">Manifesting Moment...</p>
                </div>
            );
        case 'countdown':
             return (
                <div className="fade-in-up text-center p-6 flex flex-col items-center">
                    <p className="text-lg md:text-xl mb-16 text-pink-200/30 font-serif-classic italic tracking-[0.3em]">Ready for your destiny, Fatyha?</p>
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center relative">
                         <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl border border-white/10 scale-110"></div>
                         <p className="text-8xl md:text-9xl font-serif-display italic font-extrabold text-white relative z-10 transition-all duration-500 scale-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            {countdown > 0 ? countdown : '❤️'}
                         </p>
                    </div>
                </div>
            );
        default:
            return null;
    }
  }


  if (introStage !== 'done') {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-[#0A050A] text-white overflow-hidden relative">
            <Stardust />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A050D] to-black opacity-60"></div>
            {renderIntro()}
        </div>
    );
  }

  if(isLoading) {
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-[#0A050A]">
              <Stardust />
              <div className="relative">
                  <div className="absolute inset-0 blur-3xl bg-pink-500/20 rounded-full scale-150"></div>
                  <HeartIcon className="relative w-20 h-20 text-[#FF4D6D] mb-10 animate-bounce drop-shadow-[0_0_20px_rgba(255,77,109,0.5)]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif-display italic font-bold text-white mb-4">Sealing the promise...</h2>
              <p className="text-pink-200/40 mb-12 font-serif-classic italic text-lg tracking-widest">Writing our names in the stars.</p>
              <div className="w-full max-w-xs bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/10">
                  <div className="bg-gradient-to-r from-[#FF8FA3] to-[#FF4D6D] h-full rounded-full loading-progress shadow-[0_0_15px_rgba(255,143,163,0.5)]"></div>
              </div>
          </div>
      );
  }

  return (
    <div 
        ref={containerRef}
        className="min-h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-[#0A050A] overflow-hidden relative transition-colors duration-1000"
    >
      <Stardust />
      {/* Cinematic Letterboxing */}
      <div className="fixed top-0 left-0 w-full h-[8vh] bg-black z-50"></div>
      <div className="fixed bottom-0 left-0 w-full h-[8vh] bg-black z-50"></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A050D] via-transparent to-black opacity-80 pointer-events-none"></div>

      {isModalVisible && <Modal onClose={() => setModalVisible(false)} />}
      <HeartShower heartKey={heartKey} />
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center overflow-hidden select-none">
          <span className="text-[22vw] font-serif-display italic font-black text-white whitespace-nowrap blur-[2px]">FATYHA ❤️ {sender.toUpperCase()}</span>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-4xl px-2">
        <div className="mb-10 py-2.5 px-8 bg-white/5 backdrop-blur-md rounded-full border border-white/10 inline-block transform hover:scale-105 transition-all shadow-xl">
             <span className="text-[10px] md:text-xs font-bold text-pink-300/60 tracking-[0.5em] uppercase">For our eternal Fatyha</span>
        </div>
        
        <p className="text-lg md:text-3xl text-pink-100/60 font-serif-classic italic leading-relaxed mb-8 px-4 tracking-wide">
          {sender} has been waiting for this exact heartbeat <br className="hidden md:block" /> to ask you...
        </p>

        <h1 className={`text-4xl md:text-7xl font-serif-display italic font-extrabold text-[#FFE5EC] tracking-tight drop-shadow-[0_0_20px_rgba(255,229,236,0.2)] mb-12 md:mb-24 leading-[1.3] max-w-4xl min-h-[120px] ${!isTypingDone ? 'typewriter-cursor' : ''}`}>
          {displayText}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full" style={{ minHeight: '350px' }}>
          <button
            onClick={handleAcceptClick}
            className="px-12 md:px-20 py-6 md:py-10 bg-[#FF4D6D] text-white font-bold rounded-[3rem] shadow-[0_0_50px_rgba(255,77,109,0.5)] transform transition-all duration-300 ease-in-out hover:bg-[#FF1A46] hover:scale-110 active:scale-95 border border-pink-400/30"
            style={{ 
              transform: `scale(${yesButtonScale})`,
              fontSize: `${1.3 + yesButtonScale * 0.15}rem`,
              zIndex: 60,
              animation: 'heart-beat 2s ease-in-out infinite'
            } as React.CSSProperties}
          >
            YES!
          </button>
          
          <button
            onMouseEnter={handleNoInteraction}
            onTouchStart={(e) => { e.preventDefault(); handleNoInteraction(e as any); }}
            onClick={(e) => { e.preventDefault(); handleNoInteraction(e as any); }}
            className={`px-10 py-5 bg-white/5 backdrop-blur-md text-pink-200/40 font-bold rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 ease-in-out whitespace-nowrap uppercase tracking-widest text-xs ${noScale < 0.3 ? 'opacity-20 blur-[2px]' : ''}`}
            style={{ 
              ...noPosition,
              transform: `scale(${noScale})`,
              zIndex: 50
            } as React.CSSProperties}
          >
            {noButtonResponses[noButtonIndex]}
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none z-[60]">
           <div className="text-white/10 text-[9px] md:text-[11px] font-black tracking-[1em] uppercase px-4 text-center">
              A Private Destiny • Shared with Love
          </div>
      </div>
    </div>
  );
};

export default ProposalView;