interface IconProps {
  className?: string;
}

export function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13.2 21v-7.2h2.2l.35-2.6h-2.55V9.5c0-.75.2-1.26 1.28-1.26h1.37V5.9c-.24-.03-1.05-.1-2-.1-1.98 0-3.34 1.2-3.34 3.42v1.98H8v2.6h2.24V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function YouTubeIcon({ className = "" }: IconProps) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" />
    </svg>
  );
}
