
import React, { useState, useEffect } from 'react';
import SetupView from './components/LoadingView';
import ProposalView from './components/ProposalInput';
import AcceptedView from './components/ProposalDisplay';

type AppState = 'setup' | 'proposal' | 'accepted';
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

    if (question && recipient && sender) {
      setDetails({ question, recipient, sender, password });
      setAppState('proposal');
    } else {
      setAppState('setup');
    }
  }, []);

  const handleCreate = (newDetails: ProposalDetails) => {
    setDetails(newDetails);
    setAppState('proposal');
  };
  
  const handleAccept = () => {
    setAppState('accepted');
  };

  const renderContent = () => {
    switch (appState) {
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
