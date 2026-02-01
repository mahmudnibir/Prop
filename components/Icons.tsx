
import React from 'react';

export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 20.85l-1.35-1.22C5.85 15.39 2.5 12.35 2.5 8.65 2.5 5.62 4.88 3.25 7.9 3.25c1.7 0 3.34.79 4.41 2.05 1.06-1.26 2.7-2.05 4.41-2.05 3.02 0 5.4 2.37 5.4 5.4 0 3.7-3.35 6.74-8.15 10.99L12 20.85z" />
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
