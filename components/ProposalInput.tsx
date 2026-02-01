
import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon, LockIcon } from './Icons';

interface ProposalViewProps {
  question: string;
  recipient: string;
  sender: string;
  password?: string;
  onAccept: () => void;
}

const noButtonResponses = [
  "No", "Petna, really?", "Think again ❤️", "Error: Try Yes", "So close!", "Not possible!", "Try again!", "Just give up", "Yes is better!"
];

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
                    <HeartIcon className="w-6 h-6 md:w-10 md:h-10" style={{ color: `rgba(255, 143, 163, ${Math.random() * 0.4 + 0.3})`}} />
                </div>
            ))}
        </div>
    );
};

const Modal: React.FC<{onClose: () => void}> = ({onClose}) => {
    const [confirmPos, setConfirmPos] = useState<React.CSSProperties>({ position: 'relative' });

    const handleConfirmHover = () => {
        setConfirmPos({
            position: 'absolute',
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            transition: 'all 0.2s ease',
            zIndex: 100
        })
    }

    return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 text-center max-w-sm w-full modal-fade-in relative overflow-hidden border border-pink-100 min-h-[300px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-200"></div>
            <h2 className="text-3xl font-display font-bold text-[#5C1D2E]">Petna, wait!</h2>
            <p className="mt-4 text-[#8A4A5D] text-lg">Are you absolutely sure? This could be the most beautiful "Yes" ever!</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4">
                <button 
                    onClick={onClose}
                    className="w-full px-6 py-4 bg-[#FF8FA3] text-white font-bold font-display rounded-2xl shadow-lg transform transition-transform hover:scale-105 active:scale-95"
                >
                    I'll say Yes!
                </button>
                <div className="h-12 w-full flex items-center justify-center relative">
                    <button 
                        onMouseEnter={handleConfirmHover}
                        onTouchStart={handleConfirmHover}
                        onClick={onClose}
                        style={confirmPos as React.CSSProperties}
                        className="text-sm text-pink-300 hover:text-pink-500 underline px-4 py-2 whitespace-nowrap"
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
  
  const [introStage, setIntroStage] = useState<IntroStage>(password ? 'verify' : 'countdown');
  const [countdown, setCountdown] = useState(3);
  const [inputPassword, setInputPassword] = useState('');
  const [passError, setPassError] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
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
        const transitionTimer = setTimeout(() => setIntroStage('done'), 1000);
        return () => clearTimeout(transitionTimer);
    }
  }, [introStage, countdown]);


  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (isModalVisible) return;
    
    setHeartKey(prev => prev + 1);
    
    setHoverCount(prev => prev + 1);
    if(hoverCount > 4 && !isModalVisible) {
        setModalVisible(true);
        setHoverCount(0);
        return;
    }

    setYesButtonScale((prev) => Math.min(prev + 0.12, 3));
    setNoScale(prev => Math.max(0.4, prev - 0.06));
    setNoButtonIndex((prev) => (prev + 1) % noButtonResponses.length);

    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const padding = 60;
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
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 50
        });
    }
  };

  const handleAcceptClick = () => {
      setIsLoading(true);
      setTimeout(() => {
          onAccept();
      }, 2500);
  }

  const handleVerifyPassword = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputPassword === password) {
          setIntroStage('syncing');
      } else {
          setPassError(true);
          setTimeout(() => setPassError(false), 2000);
      }
  }

  const renderIntro = () => {
    switch(introStage) {
        case 'verify':
            return (
                <div className="flex flex-col items-center justify-center p-6 fade-in-up w-full max-sm:max-w-xs">
                    <p className="text-lg md:text-xl text-pink-300/80 mb-8 font-display font-bold tracking-[0.3em] uppercase">Security Clearance Required</p>
                    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-[2.5rem] border border-white/20 w-full shadow-2xl">
                        <div className="mb-8 flex justify-center">
                            <div className="p-4 bg-pink-500/20 rounded-full">
                                <LockIcon className="w-10 h-10 text-[#FF8FA3]" />
                            </div>
                        </div>
                        <form onSubmit={handleVerifyPassword} className="space-y-6">
                            <div>
                                <input 
                                    autoFocus
                                    type="password"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    placeholder="Enter Private Pass..."
                                    className={`w-full p-4 bg-black/30 text-white rounded-2xl border-2 transition-all outline-none text-center font-mono tracking-widest ${passError ? 'border-red-500 animate-shake' : 'border-pink-500/30 focus:border-pink-500'}`}
                                />
                                {passError && <p className="text-red-400 text-xs mt-2 font-mono">INCORRECT ACCESS CODE</p>}
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-4 bg-[#FF8FA3] text-white font-bold font-display rounded-2xl hover:bg-[#FF4D6D] transition-all transform active:scale-95 shadow-lg"
                            >
                                UNLOCK PROPOSAL
                            </button>
                        </form>
                    </div>
                    <p className="mt-8 text-xs text-pink-100/30 font-mono tracking-widest">PRIVATE ENCRYPTION ACTIVE</p>
                </div>
            );
        case 'syncing':
            return (
                <div className="w-full max-w-2xl flex flex-col items-center p-6 fade-in-up">
                    <p className="text-xl md:text-2xl text-pink-200 font-display mb-8 font-bold tracking-widest uppercase">Checking Bio-Signals...</p>
                    <div className="relative mb-8">
                        <HeartIcon className="w-24 h-24 text-[#FF8FA3] drop-shadow-[0_0_15px_rgba(255,143,163,0.5)]" style={{ animation: `heart-beat 0.8s infinite`}}/>
                    </div>
                    <svg width="200" height="40" viewBox="0 0 250 60" className="mb-8 opacity-60">
                        <path d="M0 30 L50 30 L60 10 L80 50 L100 20 L120 40 L130 30 L250 30" stroke="#FF8FA3" strokeWidth="4" fill="none" className="ekg-path" />
                    </svg>
                    <div className="px-6 py-2 bg-pink-500/20 rounded-full border border-pink-500/30">
                        <p className="text-sm md:text-base text-white font-mono tracking-tighter">AUTHENTICATED: PETNA</p>
                    </div>
                </div>
            );
        case 'decrypting':
            return (
                 <div className="text-center fade-in-up p-6">
                    <p className="text-3xl md:text-5xl text-[#FFB3C1] font-display font-bold mb-4 text-scramble"></p>
                    <p className="text-pink-300/40 text-xs font-mono uppercase">Unlocking secure layer...</p>
                </div>
            );
        case 'countdown':
             return (
                <div className="fade-in-up text-center p-6">
                    <p className="text-xl md:text-2xl mb-6 text-pink-300/60 font-medium">Ready for this, Petna?</p>
                    <div className="w-40 h-40 md:w-56 md:h-56 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mx-auto shadow-2xl">
                         <p className="text-7xl md:text-9xl font-display font-extrabold text-white">{countdown > 0 ? countdown : '❤️'}</p>
                    </div>
                </div>
            );
        default:
            return null;
    }
  }


  if (introStage !== 'done') {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-[#3D0C1A] via-[#2D0A14] to-[#1A050D] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,143,163,0.05)_0%,transparent_70%)] pointer-events-none"></div>
            {renderIntro()}
        </div>
    );
  }

  if(isLoading) {
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-[#FFF5F7]">
              <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-pink-200/50 rounded-full"></div>
                  <HeartIcon className="relative w-24 h-24 text-[#FF8FA3] mb-8 animate-bounce" />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#5C1D2E] mb-2">Sealing the promise...</h2>
              <p className="text-[#8A4A5D] mb-8">This is going to be amazing!</p>
              <div className="w-full max-w-xs bg-[#FFC2D1]/30 rounded-full h-3 overflow-hidden shadow-inner border border-pink-100">
                  <div className="bg-gradient-to-r from-[#FF8FA3] to-[#FF4D6D] h-3 rounded-full loading-progress"></div>
              </div>
          </div>
      );
  }

  return (
    <div 
        ref={containerRef}
        className="min-h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-[#FFF5F7] overflow-hidden relative"
    >
      {isModalVisible && <Modal onClose={() => setModalVisible(false)} />}
      <HeartShower heartKey={heartKey} />
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center overflow-hidden select-none">
          <span className="text-[25vw] font-display font-black whitespace-nowrap">PETNA ❤️ {sender.toUpperCase()}</span>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-4xl px-2">
        <div className="mb-8 py-2.5 px-6 bg-white rounded-full shadow-md border border-pink-100 inline-block transform hover:scale-105 transition-transform">
             <span className="text-xs md:text-sm font-bold text-[#FF8FA3] tracking-[0.3em] uppercase">To our beautiful Petna</span>
        </div>
        
        <p className="text-lg md:text-3xl text-[#8A4A5D] font-display font-medium leading-relaxed mb-8">
          {sender} has been waiting for the perfect moment <br className="hidden md:block" /> to ask you this...
        </p>

        <h1 className="text-4xl md:text-8xl font-display font-extrabold text-[#5C1D2E] tracking-tight drop-shadow-sm mb-12 md:mb-20 leading-[1.1] max-w-3xl">
          {question}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full" style={{ minHeight: '280px' }}>
          <button
            onClick={handleAcceptClick}
            className="px-10 md:px-16 py-5 md:py-8 bg-[#FF8FA3] text-white font-bold font-display rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(255,143,163,0.5)] transform transition-all duration-300 ease-in-out hover:bg-[#FF758F] active:scale-95"
            style={{ 
              transform: `scale(${yesButtonScale})`,
              fontSize: `${1.2 + yesButtonScale * 0.15}rem`,
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
            className="px-8 py-4 bg-white text-[#FF8FA3] font-bold rounded-2xl border border-pink-100 shadow-lg transition-all duration-300 ease-in-out whitespace-nowrap"
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
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
           <div className="text-[#FF8FA3]/30 text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase px-4 text-center">
              Exclusive for Petna • Made with Love
          </div>
      </div>
    </div>
  );
};

export default ProposalView;
