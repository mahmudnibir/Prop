
import React, { useState, useEffect } from 'react';
import SetupView from './components/LoadingView';
import ProposalView from './components/ProposalInput';
import AcceptedView from './components/ProposalDisplay';
import MemoryLane from './components/MemoryLane';

type AppState = 'setup' | 'memory-lane' | 'proposal' | 'accepted';
type ProposalDetails = {
  question: string;
  recipient: string;
  sender: string;
  password?: string;
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [details, setDetails] = useState<ProposalDetails | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const question = params.get('q');
    const recipient = params.get('r');
    const sender = params.get('s');
    const password = params.get('p') || undefined;
    const isAccepted = params.get('a') === 'true';

    if (question && recipient && sender) {
      setDetails({ question, recipient, sender, password });
      if (isAccepted) {
        setAppState('accepted');
      } else {
        setAppState('proposal');
      }
    } else {
      setAppState('setup');
    }
  }, []);

  const handleCreate = (newDetails: ProposalDetails) => {
    setDetails(newDetails);
    setAppState('memory-lane');
  };
  
  const handleStartProposal = () => {
    setAppState('proposal');
  };
  
  const handleAccept = () => {
    // Update URL to include accepted state for shareable keepsake
    try {
      const params = new URLSearchParams(window.location.search);
      params.set('a', 'true');
      // Using a relative query string to avoid origin mismatches in blob/sandboxed environments
      const newUrl = window.location.pathname + '?' + params.toString();
      window.history.replaceState({}, '', newUrl);
    } catch (e) {
      // Silently fail or log warning if the environment (like a blob origin) prevents history manipulation
      console.warn("URL history state could not be updated due to environment restrictions.", e);
    }
    setAppState('accepted');
  };

  const renderContent = () => {
    switch (appState) {
      case 'memory-lane':
        if (details) {
          return <MemoryLane recipient={details.recipient} sender={details.sender} onFinish={handleStartProposal} />;
        }
        return <SetupView onCreate={handleCreate} />;
      case 'proposal':
        if (details) {
          return <ProposalView {...details} onAccept={handleAccept} />;
        }
        return <SetupView onCreate={handleCreate} />; 
      case 'accepted':
        if (details) {
          return <AcceptedView recipientName={details.recipient} senderName={details.sender} />;
        }
        return <SetupView onCreate={handleCreate} />; 
      case 'setup':
      default:
        return <SetupView onCreate={handleCreate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF8F0]">
      {renderContent()}
    </div>
  );
};

export default App;
