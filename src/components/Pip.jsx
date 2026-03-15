export default function Pip({ mood = 'happy', size = 80 }) {
  const s = size;
  const isSwimming = mood === 'thrilled' || mood === 'happy';
  const swimSpeed = mood === 'thrilled' ? '0.8s' : '1.4s';

  const bodyColor = mood === 'worried' ? '#5AA8D0' : '#4AAEE0';
  const stripeColor = mood === 'worried' ? '#2C5A7A' : '#1E4A6E';
  const finColor = mood === 'worried' ? '#7ABDE0' : '#7BD4F5';
  const bellyColor = mood === 'worried' ? '#FFF0F0' : '#F0FAFF';

  return (
    <svg viewBox="0 0 120 140" width={s} height={s * 1.17} xmlns="http://www.w3.org/2000/svg">
      {/* Sparkles for thrilled */}
      {mood === 'thrilled' && (
        <g fill="#FFD700" opacity="0.9">
          <polygon points="15,15 17,21 23,21 18,25 20,31 15,27 10,31 12,25 7,21 13,21" />
          <polygon points="105,15 107,21 113,21 108,25 110,31 105,27 100,31 102,25 97,21 103,21" />
          <polygon points="10,115 12,118 15,118 13,120 14,123 10,121 6,123 7,120 5,118 8,118" />
          <polygon points="110,120 112,123 115,123 113,125 114,128 110,126 106,128 107,125 105,123 108,123" />
        </g>
      )}

      {/* Warning marks for worried */}
      {mood === 'worried' && (
        <g>
          <text x="8" y="35" fontFamily="Fredoka" fontSize="22" fill="#e94560" fontWeight="700" opacity="0.7">!</text>
          <text x="104" y="35" fontFamily="Fredoka" fontSize="22" fill="#e94560" fontWeight="700" opacity="0.7">!</text>
        </g>
      )}

      {/* Think dots for thinking */}
      {mood === 'thinking' && (
        <g>
          <circle cx="100" cy="25" r="3" fill="#e9a345" opacity="0.6"/>
          <circle cx="110" cy="18" r="4" fill="#e9a345" opacity="0.5"/>
          <circle cx="118" cy="8" r="5" fill="#e9a345" opacity="0.4"/>
        </g>
      )}

      {/* Bubbles for swimming */}
      {isSwimming && (
        <g>
          <circle cx="8" cy="50" r="2.5" fill="#D0EEFF" opacity="0.5">
            <animate attributeName="cy" values="50;30;50" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="112" cy="60" r="2" fill="#D0EEFF" opacity="0.4">
            <animate attributeName="cy" values="60;40;60" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </g>
      )}

      {/* Main body group */}
      <g>
        {isSwimming && (
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0;0,2;0,0" dur={swimSpeed} repeatCount="indefinite"/>
        )}

        {/* Body - egg shape facing forward, wider at top */}
        <ellipse cx="60" cy="65" rx="35" ry="42" fill={bodyColor} />

        {/* Belly - lighter area on lower front */}
        <ellipse cx="60" cy="85" rx="25" ry="28" fill={bellyColor} opacity="0.6" />

        {/* Vertical stripes - symmetrical from both sides */}
        <g opacity="0.65">
          {/* Left side stripes */}
          <path d="M42,25 Q40,50 42,105" stroke={stripeColor} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M35,30 Q33,50 35,105" stroke={stripeColor} strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M28,35 Q27,55 28,105" stroke={stripeColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>

          {/* Right side stripes */}
          <path d="M78,25 Q80,50 78,105" stroke={stripeColor} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M85,30 Q87,50 85,105" stroke={stripeColor} strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M92,35 Q93,55 92,105" stroke={stripeColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </g>

        {/* Dorsal fin - small fin on top of head */}
        <path d="M52,18 C56,8 64,8 68,18" fill={finColor} opacity="0.8">
          {isSwimming && <animateTransform attributeName="transform" type="rotate" values="-2,60,18;2,60,18;-2,60,18" dur="1.2s" repeatCount="indefinite"/>}
        </path>

        {/* Left pectoral fin - sticking out to left side */}
        <path d="M30,55 C18,48 15,60 22,70 C28,72 32,68 32,62Z" fill={finColor} opacity="0.75">
          {isSwimming && <animateTransform attributeName="transform" type="rotate" values="-8,30,62;12,30,62;-8,30,62" dur={swimSpeed} repeatCount="indefinite"/>}
        </path>

        {/* Right pectoral fin - sticking out to right side */}
        <path d="M90,55 C102,48 105,60 98,70 C92,72 88,68 88,62Z" fill={finColor} opacity="0.75">
          {isSwimming && <animateTransform attributeName="transform" type="rotate" values="8,90,62;-12,90,62;8,90,62" dur={swimSpeed} repeatCount="indefinite"/>}
        </path>

        {/* Bottom fin - at base of body */}
        <path d="M55,110 C58,120 62,120 65,110" fill={finColor} opacity="0.7"/>

        {/* Tail fin - peeking out at bottom */}
        <path d="M60,125 C55,130 65,135 60,125" fill={finColor} opacity="0.8"/>

        {/* Left eye */}
        {mood === 'thrilled' ? (
          <path d="M42,50 Q45,46 48,50" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round"/>
        ) : (
          <>
            <circle cx="45" cy={mood === 'worried' ? 50 : 49} r={mood === 'worried' ? 4.5 : 4} fill="white"/>
            <circle cx="45" cy={mood === 'worried' ? 50 : 49} r={mood === 'worried' ? 3 : 2.5} fill="#2d3748"/>
            <circle cx="45.8" cy={mood === 'worried' ? 48.5 : 48} r="1" fill="white"/>
          </>
        )}

        {/* Right eye */}
        {mood === 'thrilled' ? (
          <path d="M72,50 Q75,46 78,50" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round"/>
        ) : (
          <>
            <circle cx="75" cy={mood === 'worried' ? 50 : 49} r={mood === 'worried' ? 4.5 : 4} fill="white"/>
            <circle cx="75" cy={mood === 'worried' ? 50 : 49} r={mood === 'worried' ? 3 : 2.5} fill="#2d3748"/>
            <circle cx="75.8" cy={mood === 'worried' ? 48.5 : 48} r="1" fill="white"/>
          </>
        )}

        {/* Left eyebrow for worried */}
        {mood === 'worried' && (
          <path d="M40,43 Q45,40 50,43" stroke="#2d3748" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        )}

        {/* Right eyebrow for worried */}
        {mood === 'worried' && (
          <path d="M70,43 Q75,40 80,43" stroke="#2d3748" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        )}

        {/* Left eyebrow raised for thinking */}
        {mood === 'thinking' && (
          <path d="M40,42 Q45,38 50,42" stroke="#2d3748" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        )}

        {/* Left blush circle */}
        <circle cx="33" cy="68" r="5" fill="#FF9999" opacity="0.35"/>

        {/* Right blush circle */}
        <circle cx="87" cy="68" r="5" fill="#FF9999" opacity="0.35"/>

        {/* Mouth - centered below */}
        {mood === 'happy' || mood === 'thrilled' ? (
          <path d="M56,88 Q60,92 64,88" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round"/>
        ) : mood === 'worried' ? (
          <path d="M56,92 Q60,88 64,92" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round"/>
        ) : (
          <path d="M57,90 Q60,88.5 63,90" stroke="#2d3748" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        )}

        {/* Sweat drop for worried */}
        {mood === 'worried' && (
          <ellipse cx="50" cy="35" rx="2.5" ry="4" fill="#87CEEB" opacity="0.7"/>
        )}

        {/* Heart above head for thrilled */}
        {mood === 'thrilled' && (
          <path d="M54,18 C54,15 58,15 58,19 C58,22 54,25 54,25 C54,25 50,22 50,19 C50,15 54,15 54,18Z" fill="#e94560" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite"/>
          </path>
        )}
      </g>
    </svg>
  );
}

export function PipSmall({ mood = 'happy' }) {
  return (
    <svg viewBox="0 0 40 50" width="32" height="40" style={{ flexShrink: 0 }}>
      {/* Body - oval shape facing forward */}
      <ellipse cx="20" cy="25" rx="13" ry="17" fill="#4AAEE0" />

      {/* Belly */}
      <ellipse cx="20" cy="32" rx="9" ry="11" fill="#F0FAFF" opacity="0.5" />

      {/* Vertical stripes - simplified */}
      <g opacity="0.5">
        <path d="M12,10 Q11,25 12,42" stroke="#1E4A6E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M20,8 Q20,25 20,43" stroke="#1E4A6E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M28,10 Q29,25 28,42" stroke="#1E4A6E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>

      {/* Dorsal fin */}
      <path d="M16,8 C18,3 22,3 24,8" fill="#7BD4F5" opacity="0.7" />

      {/* Left pectoral fin */}
      <path d="M8,22 C4,19 3,25 7,30 C10,30 12,27 12,24Z" fill="#7BD4F5" opacity="0.7" />

      {/* Right pectoral fin */}
      <path d="M32,22 C36,19 37,25 33,30 C30,30 28,27 28,24Z" fill="#7BD4F5" opacity="0.7" />

      {/* Bottom fin */}
      <path d="M18,42 C19,46 21,46 22,42" fill="#7BD4F5" opacity="0.7" />

      {/* Left eye */}
      {mood === 'thrilled' ? (
        <path d="M14,20 Q16,18 18,20" stroke="#2d3748" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      ) : (
        <>
          <circle cx="15" cy={mood === 'worried' ? 20 : 19.5} r="2" fill="white" />
          <circle cx="15" cy={mood === 'worried' ? 20 : 19.5} r="1.2" fill="#2d3748" />
          <circle cx="15.4" cy={mood === 'worried' ? 19 : 18.5} r="0.5" fill="white" />
        </>
      )}

      {/* Right eye */}
      {mood === 'thrilled' ? (
        <path d="M22,20 Q24,18 26,20" stroke="#2d3748" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      ) : (
        <>
          <circle cx="25" cy={mood === 'worried' ? 20 : 19.5} r="2" fill="white" />
          <circle cx="25" cy={mood === 'worried' ? 20 : 19.5} r="1.2" fill="#2d3748" />
          <circle cx="25.4" cy={mood === 'worried' ? 19 : 18.5} r="0.5" fill="white" />
        </>
      )}

      {/* Left eyebrow for worried */}
      {mood === 'worried' && (
        <path d="M12,16 Q15,14.5 18,16" stroke="#2d3748" strokeWidth="1" fill="none" strokeLinecap="round"/>
      )}

      {/* Right eyebrow for worried */}
      {mood === 'worried' && (
        <path d="M22,16 Q25,14.5 28,16" stroke="#2d3748" strokeWidth="1" fill="none" strokeLinecap="round"/>
      )}

      {/* Left blush */}
      <circle cx="8" cy="28" r="2" fill="#FF9999" opacity="0.4" />

      {/* Right blush */}
      <circle cx="32" cy="28" r="2" fill="#FF9999" opacity="0.4" />

      {/* Mouth */}
      {mood === 'happy' || mood === 'thrilled' ? (
        <path d="M17,35 Q20,37 23,35" stroke="#2d3748" strokeWidth="1" fill="none" strokeLinecap="round"/>
      ) : mood === 'worried' ? (
        <path d="M17,37 Q20,35 23,37" stroke="#2d3748" strokeWidth="1" fill="none" strokeLinecap="round"/>
      ) : (
        <path d="M18,36 Q20,35 22,36" stroke="#2d3748" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      )}
    </svg>
  );
}
