
import React from 'react';

export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C8.633 19.45 3.237 15.44 2.308 11.252 1.378 7.065 4.314 3.75 8.165 3.75c1.802 0 3.44.825 4.5 2.122a.75.75 0 0 1 1.06 0c1.06-1.297 2.698-2.122 4.5-2.122 3.85 0 6.788 3.314 5.858 7.502-1.02 4.188-6.326 8.198-8.288 9.658Z" />
  </svg>
);

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.5 3A2.5 2.5 0 0 0 8 5.5v2.33a2.5 2.5 0 0 1 5 0V5.5A2.5 2.5 0 0 0 10.5 3Zm-2.5 5.33V5.5a2.5 2.5 0 0 1 5 0v2.83a4.5 4.5 0 0 0-5 0Zm2.5-2.08a.75.75 0 0 0-1.5 0V7a.75.75 0 0 0 1.5 0V6.25Z" clipRule="evenodd" />
    <path d="M12 10.5a.75.75 0 0 0-1.5 0v2.25a.75.75 0 0 0 1.5 0v-2.25Z" />
    <path d="M8.25 10.5a.75.75 0 0 0-1.5 0v5.25a.75.75 0 0 0 1.5 0v-5.25Z" />
    <path d="M15.75 10.5a.75.75 0 0 0-1.5 0v5.25a.75.75 0 0 0 1.5 0v-5.25Z" />
    <path fillRule="evenodd" d="M3 10.5a2.5 2.5 0 0 0-2.5 2.5v4.5A2.5 2.5 0 0 0 3 20h18a2.5 2.5 0 0 0 2.5-2.5v-4.5A2.5 2.5 0 0 0 21 10.5H3Zm-1.5 2.5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4.5Z" clipRule="evenodd" />
  </svg>
);

export const ScrollIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
  </svg>
);

export const FingerprintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 10a2 2 0 0 0-2 2" />
    <path d="M14 7a5 5 0 0 0-5 5" />
    <path d="M17 4a8 8 0 0 0-8 8" />
    <path d="M20 1a11 11 0 0 0-11 11" />
    <path d="M2 12c0 5.5 4.5 10 10 10" />
    <path d="M5 12a7 7 0 0 0 7 7" />
    <path d="M8 12a4 4 0 0 0 4 4" />
    <path d="M12 12v.01" />
    <path d="M12 12c.5 0 1.5.5 2 1.5s.5 2 0 3" />
    <path d="M15 12c.5-1 2-1 3 0s1 2.5.5 4" />
    <path d="M18 12c.5-2 3-2 4 0s.5 4-1 6" />
    <path d="M12 12c-.5 0-1.5.5-2 1.5s-.5 2 0 3" />
    <path d="M9 12c-.5-1-2-1-3 0s-1 2.5-.5 4" />
    <path d="M6 12c-.5-2-3-2-4 0s-.5 4 1 6" />
    <path d="M12 8c1.5 0 3 1.5 3 4s-1.5 4-3 4-3-1.5-3-4 1.5-4 3-4Z" />
    <path d="M12 4c3 0 6 2.5 6 8s-3 8-6 8-6-2.5-6-8 3-8 6-8Z" opacity="0.4" />
    <path d="M12 1a11 11 0 0 1 11 11c0 6-5 11-11 11S1 18 1 12 6 1 12 1Z" opacity="0.2" />
  </svg>
);
