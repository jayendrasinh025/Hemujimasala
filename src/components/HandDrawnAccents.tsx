import React from 'react';

export function CurvedArrowLeftToCarousel({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 18C48 8 106 16 146 66"
        stroke="#B91C1C"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path
        d="M132 66L148 69L147 52"
        stroke="#B91C1C"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CurvedArrowRightToCarousel({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M168 16C125 8 72 22 34 68"
        stroke="#D97706"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M32 52L32 70L49 66"
        stroke="#D97706"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SpiceStarAniseSketch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6C35 16 35 22 32 32C29 22 29 16 32 6Z" />
        <path d="M32 58C35 48 35 42 32 32C29 42 29 48 32 58Z" />
        <path d="M6 32C16 29 22 29 32 32C22 35 16 35 6 32Z" />
        <path d="M58 32C48 29 42 29 32 32C42 35 48 35 58 32Z" />
        <path d="M13.6 13.6C22 18 26 23 32 32C23 26 18 22 13.6 13.6Z" />
        <path d="M50.4 50.4C42 46 38 41 32 32C41 38 46 42 50.4 50.4Z" />
        <path d="M50.4 13.6C46 22 41 26 32 32C38 23 42 18 50.4 13.6Z" />
        <path d="M13.6 50.4C18 42 23 38 32 32C26 41 22 46 13.6 50.4Z" />
        <circle cx="32" cy="32" r="3.5" fill="currentColor" />
      </g>
    </svg>
  );
}

export function SpiceMortarSketch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M39 10L48 16L35 33L27 29L39 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 31H52C52 44 43 52 32 52C21 52 12 44 12 31Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 52H43L45 57H19L21 52Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 25C22 22 27 23 31 25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
