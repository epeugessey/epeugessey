
import React from 'react';

export default function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9D976" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A773C" />
          <stop offset="100%" stopColor="#1B3B1B" />
        </linearGradient>
      </defs>

      {/* The letter E (Serif Style) */}
      <path 
        d="M80 135 H180 V155 H105 V200 H165 V220 H105 V265 H185 V285 H80 V135 Z" 
        fill="#D66D67" 
      />
      {/* Small serifs for the E */}
      <rect x="75" y="135" width="10" height="150" fill="#D66D67" />
      <rect x="175" y="135" width="15" height="10" fill="#D66D67" />
      <rect x="160" y="200" width="15" height="10" fill="#D66D67" />
      <rect x="180" y="275" width="15" height="10" fill="#D66D67" />

      {/* The letter J (Vine style) */}
      {/* Main Stem */}
      <path 
        d="M100 130 C90 150 85 180 85 220 C85 260 90 270 70 275 C50 280 20 270 15 240 C10 210 30 240 40 250 C50 260 70 260 70 230 C70 180 85 130 110 90" 
        stroke="url(#greenGradient)" 
        strokeWidth="12" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Branching Gold Stem */}
      <path 
        d="M110 90 C120 70 110 40 100 20" 
        stroke="url(#goldGradient)" 
        strokeWidth="4" 
        strokeLinecap="round"
        fill="none"
      />
      <path 
        d="M110 90 C130 80 140 60 145 40" 
        stroke="url(#goldGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
        fill="none"
      />

      {/* Leaves on the Gold Stem */}
      <ellipse cx="100" cy="20" rx="8" ry="15" fill="url(#goldGradient)" transform="rotate(-20 100 20)"/>
      <ellipse cx="115" cy="45" rx="7" ry="13" fill="url(#goldGradient)" transform="rotate(30 115 45)"/>
      <ellipse cx="130" cy="30" rx="6" ry="12" fill="url(#goldGradient)" transform="rotate(-10 130 30)"/>
      <ellipse cx="145" cy="45" rx="7" ry="14" fill="url(#goldGradient)" transform="rotate(45 145 45)"/>
      <ellipse cx="120" cy="70" rx="8" ry="16" fill="url(#goldGradient)" transform="rotate(-30 120 70)"/>
      <ellipse cx="135" cy="85" rx="7" ry="14" fill="url(#goldGradient)" transform="rotate(10 135 85)"/>
      
      {/* Leaves on the Upper Stem */}
      <ellipse cx="90" cy="110" rx="9" ry="18" fill="url(#goldGradient)" transform="rotate(-40 90 110)"/>
      <ellipse cx="75" cy="140" rx="8" ry="16" fill="url(#goldGradient)" transform="rotate(-45 75 140)"/>
      <ellipse cx="65" cy="180" rx="7" ry="14" fill="url(#goldGradient)" transform="rotate(-50 65 180)"/>
      <ellipse cx="105" cy="145" rx="6" ry="12" fill="url(#goldGradient)" transform="rotate(20 105 145)"/>
    </svg>
  );
}
