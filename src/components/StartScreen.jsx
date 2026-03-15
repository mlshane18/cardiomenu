import { useState } from 'react';
import { useOrder } from '../hooks/useOrder';
import { useAuth } from '../contexts/AuthContext';
import { DEFAULT_DAILY_SODIUM, DEFAULT_DAILY_CALORIES } from '../utils/nutrition';
import Pip from './Pip';

export default function StartScreen() {
  const { dispatch } = useOrder();
  const { profile, isAdmin, logout } = useAuth();
  const [sodiumTarget, setSodiumTarget] = useState(DEFAULT_DAILY_SODIUM);
  const [calorieTarget, setCalorieTarget] = useState(DEFAULT_DAILY_CALORIES);
  const [showSettings, setShowSettings] = useState(false);

  const handleStart = () => {
    dispatch({ type: 'SET_SETTINGS', payload: { sodiumTarget, calorieTarget } });
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="fade-in" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px 60px', background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #98D8A0 75%, #7BC47F 100%)', position: 'relative', overflow: 'hidden' }}>

      {/* Top bar */}
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ fontSize: 11, color: '#2d5a4a', fontWeight: 600, opacity: 0.7 }}>
          {profile?.display_name || profile?.email}
          {isAdmin && <span style={{ background: '#e94560', color: 'white', padding: '1px 6px', borderRadius: 4, fontSize: 9, marginLeft: 6, fontWeight: 700 }}>ADMIN</span>}
        </div>
        <button onClick={handleLogout} style={{
          background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8,
          padding: '4px 10px', fontFamily: 'Fredoka', fontSize: 11, color: '#5a8a7a', cursor: 'pointer',
        }}>
          Sign Out
        </button>
      </div>

      {/* Clouds */}
      <svg viewBox="0 0 300 60" width="280" style={{ position: 'absolute', top: 30, left: 10, opacity: 0.5 }}>
        <ellipse cx="60" cy="20" rx="30" ry="12" fill="white" opacity="0.8"/>
        <ellipse cx="75" cy="16" rx="22" ry="10" fill="white" opacity="0.7"/>
        <ellipse cx="210" cy="30" rx="25" ry="10" fill="white" opacity="0.6"/>
        <circle cx="260" cy="25" r="18" fill="#FFE066" opacity="0.4"/>
      </svg>

      <div className="float" style={{ marginBottom: 12 }}>
        <Pip mood="thrilled" size={130} />
      </div>

      <div className="heading" style={{ fontSize: 28, color: '#2d5a4a', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        CardioMenu
      </div>
      <div style={{ fontSize: 13, color: '#5a8a7a', fontWeight: 600, marginTop: 2 }}>
        Your Heart-Healthy Food Adventure
      </div>

      <div style={{ margin: '16px 0 0', width: '100%', maxWidth: 340 }}>
        <div className="bubble happy" style={{ textAlign: 'center', fontSize: 13 }}>
          <strong style={{ color: '#2d8a74' }}>Hi, I'm Pip!</strong> Ready to explore some restaurants? I'll help you find meals your heart will love!
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 340, marginTop: 24 }}>
        {!showSettings ? (
          <>
            <button className="game-btn game-btn-green" style={{ marginBottom: 10 }} onClick={handleStart}>
              Let's Eat!
            </button>
            <button className="game-btn game-btn-outline" style={{ marginBottom: 10 }} onClick={() => setShowSettings(true)}>
              Set My Goals
            </button>
            {isAdmin && (
              <button className="game-btn game-btn-outline" style={{ background: '#fff0f3', borderColor: '#e94560', color: '#e94560' }}
                onClick={() => dispatch({ type: 'GO_TO_SCREEN', payload: 'admin' })}>
                Admin Panel
              </button>
            )}
          </>
        ) : (
          <>
            <div className="game-card" style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span className="heading" style={{ fontSize: 13 }}>Daily Sodium</span>
                <span className="heading" style={{ fontSize: 18, color: '#e94560' }}>{sodiumTarget}mg</span>
              </div>
              <input type="range" min="1000" max="2300" step="100" value={sodiumTarget}
                onChange={(e) => setSodiumTarget(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#e94560' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8a7e6a', marginTop: 4 }}>
                <span>1,000mg</span><span>2,300mg</span>
              </div>
              <div style={{ fontSize: 10, color: '#8a7e6a', marginTop: 6 }}>
                AHA recommends &lt;1,500mg/day for cardiac patients
              </div>
            </div>

            <div className="game-card" style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span className="heading" style={{ fontSize: 13 }}>Daily Calories</span>
                <span className="heading" style={{ fontSize: 18, color: '#e9a345' }}>{calorieTarget}</span>
              </div>
              <input type="range" min="1200" max="3000" step="100" value={calorieTarget}
                onChange={(e) => setCalorieTarget(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#e9a345' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8a7e6a', marginTop: 4 }}>
                <span>1,200</span><span>3,000</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'start', margin: '8px 0 16px' }}>
              <Pip mood="happy" size={40} />
              <div className="bubble happy" style={{ fontSize: 11, flex: 1 }}>
                <strong style={{ color: '#2d8a74' }}>Great targets!</strong> With {sodiumTarget}mg daily sodium, you've got about <strong>{Math.round(sodiumTarget / 3)}mg per meal</strong>. I'll keep us on track!
              </div>
            </div>

            <button className="game-btn game-btn-green" onClick={handleStart}>
              Save & Pick a Restaurant
            </button>
          </>
        )}
      </div>

      {/* Educational quick-link */}
      <div style={{ width: '100%', maxWidth: 340, marginTop: 20, textAlign: 'center' }}>
        <a href="https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium/sodium-and-salt"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.6)', border: '2px solid rgba(45,90,74,0.3)',
            borderRadius: 20, textDecoration: 'none',
            fontSize: 11, fontWeight: 600, color: '#2d5a4a',
            backdropFilter: 'blur(4px)',
          }}>
          <span>❤️</span> Learn about sodium & heart health (AHA) <span style={{ opacity: 0.5 }}>↗</span>
        </a>
      </div>

      <svg viewBox="0 0 400 30" width="100%" style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <rect x="0" y="10" width="400" height="20" fill="#5AAF75"/>
        <rect x="0" y="8" width="400" height="6" fill="#6BC48A"/>
        <circle cx="40" cy="8" r="3" fill="#FFB7C5"/><circle cx="40" cy="8" r="1.5" fill="#FFE066"/>
        <circle cx="180" cy="6" r="3" fill="#C5B7FF"/><circle cx="180" cy="6" r="1.5" fill="#FFE066"/>
        <circle cx="320" cy="9" r="2.5" fill="#FFB7C5"/><circle cx="320" cy="9" r="1.2" fill="#FFE066"/>
      </svg>
    </div>
  );
}
