import { useState, useEffect, useMemo } from 'react';
import { useOrder } from '../hooks/useOrder';
import { totalNutrition, getPipMood, getLetterGrade } from '../utils/nutrition';
import Pip from './Pip';

function GoldStar({ size = 80, delay = 0 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ animationDelay: `${delay}ms` }}>
      <defs>
        <linearGradient id={`starGrad${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE44D" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>
      </defs>
      <polygon
        points="50,8 61,35 90,38 68,58 74,87 50,73 26,87 32,58 10,38 39,35"
        fill={`url(#starGrad${delay})`}
        stroke="#B8860B"
        strokeWidth="2"
      >
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${delay}ms`} fill="freeze" />
        <animateTransform attributeName="transform" type="scale" values="0.3;1.15;1" dur="0.6s" begin={`${delay}ms`} fill="freeze" additive="sum" />
      </polygon>
      {/* Shine */}
      <polygon
        points="50,18 55,33 44,33"
        fill="white" opacity="0.3"
      />
    </svg>
  );
}

function ConfettiBurst() {
  const colors = ['#FFD700', '#e94560', '#53c5ab', '#4AAEE0', '#B088E8', '#FF6B35'];
  const pieces = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: 50 + (Math.random() - 0.5) * 80,
    endX: (Math.random() - 0.5) * 300,
    endY: Math.random() * 400 + 100,
    rotation: Math.random() * 720,
    delay: Math.random() * 300,
    size: 4 + Math.random() * 6,
  })), []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      width: '100%', height: '100vh', pointerEvents: 'none', zIndex: 50, overflow: 'hidden',
    }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: -10,
          width: p.size, height: p.size * 1.4,
          background: p.color, borderRadius: 1,
          animation: `confetti-fall 1.8s ease-out ${p.delay}ms forwards`,
          '--end-x': `${p.endX}px`,
          '--end-y': `${p.endY}px`,
          '--rotation': `${p.rotation}deg`,
        }} />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--end-x), var(--end-y)) rotate(var(--rotation)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function TrophyBadge() {
  return (
    <svg viewBox="0 0 100 120" width="90" height="108">
      {/* Cup body */}
      <path d="M30,25 L30,60 C30,78 45,90 50,90 C55,90 70,78 70,60 L70,25 Z"
        fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
      {/* Cup rim */}
      <rect x="25" y="20" width="50" height="8" rx="3" fill="#FFE44D" stroke="#DAA520" strokeWidth="1.5" />
      {/* Left handle */}
      <path d="M30,32 C18,32 14,45 24,52 L30,48" fill="none" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" />
      {/* Right handle */}
      <path d="M70,32 C82,32 86,45 76,52 L70,48" fill="none" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" />
      {/* Shine */}
      <path d="M40,30 L40,55 C40,65 45,72 50,72" fill="none" stroke="white" strokeWidth="3" opacity="0.3" strokeLinecap="round" />
      {/* Base */}
      <rect x="38" y="90" width="24" height="6" rx="2" fill="#DAA520" />
      <rect x="33" y="96" width="34" height="8" rx="3" fill="#B8860B" />
      {/* Heart on cup */}
      <path d="M50,45 C50,41 56,41 56,47 C56,51 50,55 50,55 C50,55 44,51 44,47 C44,41 50,41 50,45Z"
        fill="#e94560" opacity="0.8" />
    </svg>
  );
}

function ThumbsUpBadge() {
  return (
    <svg viewBox="0 0 100 100" width="80" height="80">
      {/* Circle background */}
      <circle cx="50" cy="50" r="45" fill="#4AAEE0" stroke="#2C5A7A" strokeWidth="2" />
      <circle cx="50" cy="50" r="38" fill="#F0FAFF" stroke="#7BD4F5" strokeWidth="2" />
      {/* Thumbs up */}
      <g transform="translate(50, 50)">
        {/* Thumb */}
        <rect x="-8" y="-18" width="16" height="20" rx="8" fill="#2C5A7A" />
        {/* Hand base */}
        <rect x="-12" y="2" width="24" height="28" rx="4" fill="#2C5A7A" />
      </g>
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 100 100" width="70" height="70">
      {/* Triangle warning */}
      <path d="M 50 10 L 90 80 L 10 80 Z" fill="#FFC107" stroke="#FF9800" strokeWidth="2" />
      {/* Exclamation mark */}
      <circle cx="50" cy="60" r="5" fill="#FF6F00" />
      <rect x="48" y="35" width="4" height="18" rx="2" fill="#FF6F00" />
    </svg>
  );
}

function SadPipIcon() {
  return <Pip mood="worried" size={80} />;
}

export default function OrderFinalized() {
  const { state, dispatch } = useOrder();
  const { orderItems, restaurant, sodiumTarget, calorieTarget, satFatTarget } = state;
  const totals = useMemo(() => totalNutrition(orderItems), [orderItems]);
  const mood = getPipMood(totals, sodiumTarget);

  const perMealNa = Math.round(sodiumTarget / 3);
  const naGrade = getLetterGrade(totals.sodium, perMealNa);
  const calGrade = getLetterGrade(totals.calories, Math.round(calorieTarget / 3));

  const [showConfetti, setShowConfetti] = useState(false);

  // Determine tier based on sodium mg thresholds
  let tier = 'needsWork';
  let rewardTitle = '';
  let rewardMessage = '';
  let bgColor = '';
  let titleColor = '';
  let badgeComponent = null;
  let pipMood = 'thinking';

  if (totals.sodium <= 350) {
    tier = 'goldStar';
    rewardTitle = 'Heart-Healthy Champion!';
    rewardMessage = `Outstanding! Your order at ${restaurant.restaurant} has under 350mg of sodium. Your heart thanks you!`;
    bgColor = 'linear-gradient(180deg, #FFF8DC 0%, #FFFDE4 30%, #FFF9C4 60%, #FFE082 100%)';
    titleColor = '#8B6914';
    badgeComponent = (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
        <GoldStar size={50} delay={0} />
        <TrophyBadge />
        <GoldStar size={50} delay={200} />
      </div>
    );
    pipMood = 'thrilled';
  } else if (totals.sodium <= 500) {
    tier = 'thumbsUp';
    rewardTitle = 'Great Choices!';
    rewardMessage = `Well done! Your order has ${totals.sodium}mg sodium and is within a good target. Keep it up!`;
    bgColor = 'linear-gradient(180deg, #C8E6C9 0%, #A5D6A7 30%, #81C784 60%, #66BB6A 100%)';
    titleColor = '#2d5a4a';
    badgeComponent = <ThumbsUpBadge />;
    pipMood = 'happy';
  } else if (totals.sodium <= 750) {
    tier = 'caution';
    rewardTitle = 'Caution: High Sodium';
    rewardMessage = `Your order has ${totals.sodium}mg sodium—about half your daily target (750mg). You can finalize this order, but eat very low-sodium meals for the rest of the day.`;
    bgColor = 'linear-gradient(180deg, #FFF9C4 0%, #FFF59D 30%, #FFF176 60%, #FFEE58 100%)';
    titleColor = '#F57F17';
    badgeComponent = <WarningIcon />;
    pipMood = 'concerned';
  } else {
    tier = 'needsWork';
    rewardTitle = 'Needs Work';
    rewardMessage = `Your order has ${totals.sodium}mg sodium, which is above 750mg. This is quite high! We encourage you to try again with lower-sodium options. You'll need very low-sodium meals for the rest of the day if you continue.`;
    bgColor = 'linear-gradient(180deg, #FFCCBC 0%, #FFAB91 30%, #FF8A65 60%, #FF7043 100%)';
    titleColor = '#BF360C';
    badgeComponent = <SadPipIcon />;
    pipMood = 'worried';
  };

  useEffect(() => {
    if (tier === 'goldStar') {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(t);
    }
  }, [tier]);

  return (
    <div className="fade-in" style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start',
      padding: '24px 20px 60px',
      background: bgColor,
      overflowY: 'auto',
    }}>
      {showConfetti && <ConfettiBurst />}

      <div style={{ width: '100%', maxWidth: 420, textAlign: 'center', marginTop: 20 }}>
        {/* Reward badge */}
        <div style={{ marginBottom: 12 }}>
          {badgeComponent}
        </div>

        {/* Pip reaction for gold star */}
        {tier === 'goldStar' && (
          <div style={{ marginBottom: 12 }}>
            <Pip mood="thrilled" size={80} />
          </div>
        )}

        <h1 className="heading" style={{
          fontSize: 28, color: titleColor,
          marginBottom: 8,
        }}>
          {rewardTitle}
        </h1>

        <div className={`bubble ${tier === 'goldStar' ? 'happy' : tier === 'thumbsUp' ? 'happy' : 'warn'}`}
          style={{ fontSize: 13, marginBottom: 20, textAlign: 'center' }}>
          {rewardMessage}
        </div>

        {/* Stats summary */}
        <div className="game-card" style={{ marginBottom: 20, textAlign: 'left' }}>
          <div className="heading" style={{ fontSize: 13, marginBottom: 8, textAlign: 'center' }}>Order Summary</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Fredoka', fontSize: 20, fontWeight: 700, color: '#e94560' }}>{naGrade}</div>
              <div style={{ color: '#8a7e6a' }}>Sodium</div>
              <div style={{ fontSize: 10, color: '#b0a890' }}>{totals.sodium}mg</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Fredoka', fontSize: 20, fontWeight: 700, color: '#e9a345' }}>{calGrade}</div>
              <div style={{ color: '#8a7e6a' }}>Calories</div>
              <div style={{ fontSize: 10, color: '#b0a890' }}>{totals.calories}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Fredoka', fontSize: 20, fontWeight: 700, color: '#4AAEE0' }}>{orderItems.length}</div>
              <div style={{ color: '#8a7e6a' }}>Items</div>
              <div style={{ fontSize: 10, color: '#b0a890' }}>{restaurant.restaurant}</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
          {tier === 'needsWork' ? (
            <button className="game-btn game-btn-green"
              onClick={() => dispatch({ type: 'TRY_AGAIN' })}>
              Try Again at {restaurant.restaurant}
            </button>
          ) : (
            <button className="game-btn game-btn-green"
              onClick={() => dispatch({ type: 'TRY_AGAIN' })}>
              Order Again at {restaurant.restaurant}
            </button>
          )}
          <button className="game-btn game-btn-outline"
            onClick={() => dispatch({ type: 'GO_TO_SCREEN', payload: 'restaurant' })}>
            Try Another Restaurant
          </button>
          <button className="game-btn game-btn-outline"
            onClick={() => dispatch({ type: 'RESET' })}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
