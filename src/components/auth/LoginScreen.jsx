import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Pip from '../Pip';

export default function LoginScreen({ onNavigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px 60px',
      background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #98D8A0 75%, #7BC47F 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Pip mood="happy" size={80} />
        </div>

        <h1 className="heading" style={{ fontSize: 26, textAlign: 'center', color: '#2d5a4a', marginBottom: 4 }}>
          CardioMenu
        </h1>
        <p style={{ fontSize: 13, textAlign: 'center', color: '#5a8a7a', marginBottom: 24 }}>
          Sign in to start ordering
        </p>

        <form onSubmit={handleSubmit}>
          <div className="game-card" style={{ marginBottom: 12, padding: '14px 16px' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8a7e6a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '10px 12px', border: '2px solid #D4C5A0', borderRadius: 10,
                fontFamily: 'Nunito, sans-serif', fontSize: 16, boxSizing: 'border-box',
                outline: 'none', background: '#FFFDF7',
              }}
            />
          </div>

          <div className="game-card" style={{ marginBottom: 12, padding: '14px 16px' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8a7e6a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Password
            </label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              placeholder="Your password"
              style={{
                width: '100%', padding: '10px 12px', border: '2px solid #D4C5A0', borderRadius: 10,
                fontFamily: 'Nunito, sans-serif', fontSize: 16, boxSizing: 'border-box',
                outline: 'none', background: '#FFFDF7',
              }}
            />
          </div>

          {error && (
            <div className="bubble danger" style={{ fontSize: 12, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="game-btn game-btn-green" style={{ marginBottom: 10 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <button type="button" className="game-btn game-btn-outline" style={{ marginBottom: 8 }}
            onClick={() => onNavigate('signup')}>
            I have an invitation code
          </button>

          <button type="button" style={{
            background: 'none', border: 'none', width: '100%', padding: '8px',
            fontFamily: 'Fredoka', fontSize: 12, color: '#5a8a7a', cursor: 'pointer', textDecoration: 'underline',
          }} onClick={() => onNavigate('forgot-password')}>
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
}
