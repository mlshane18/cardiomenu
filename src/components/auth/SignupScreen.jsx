import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Pip from '../Pip';

export default function SignupScreen({ onNavigate }) {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signup(email, password, code);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fade-in" style={{
        minHeight: '100svh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '24px 20px',
        background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #98D8A0 75%, #7BC47F 100%)',
      }}>
        <div style={{ width: '100%', maxWidth: 320, textAlign: 'center' }}>
          <Pip mood="thrilled" size={100} />
          <h2 className="heading" style={{ fontSize: 22, color: '#2d5a4a', margin: '16px 0 8px' }}>
            Check your email!
          </h2>
          <p style={{ fontSize: 13, color: '#5a8a7a', marginBottom: 24 }}>
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then come back and sign in.
          </p>
          <button className="game-btn game-btn-green" onClick={() => onNavigate('login')}>
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px 60px',
      background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #98D8A0 75%, #7BC47F 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: 320 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Pip mood="happy" size={70} />
        </div>

        <h1 className="heading" style={{ fontSize: 22, textAlign: 'center', color: '#2d5a4a', marginBottom: 4 }}>
          Create Account
        </h1>
        <p style={{ fontSize: 12, textAlign: 'center', color: '#5a8a7a', marginBottom: 20 }}>
          You need an invitation code to join
        </p>

        <form onSubmit={handleSubmit}>
          <div className="game-card" style={{ marginBottom: 10, padding: '12px 14px' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8a7e6a', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Invitation Code
            </label>
            <input
              type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} required
              placeholder="e.g. ABC12345"
              style={{
                width: '100%', padding: '10px 12px', border: '2px solid #53c5ab', borderRadius: 10,
                fontFamily: 'Fredoka, sans-serif', fontSize: 16, fontWeight: 600, boxSizing: 'border-box',
                outline: 'none', background: '#F0FFF8', textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center',
              }}
            />
          </div>

          <div className="game-card" style={{ marginBottom: 10, padding: '12px 14px' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8a7e6a', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '10px 12px', border: '2px solid #D4C5A0', borderRadius: 10,
                fontFamily: 'Nunito, sans-serif', fontSize: 14, boxSizing: 'border-box',
                outline: 'none', background: '#FFFDF7',
              }}
            />
          </div>

          <div className="game-card" style={{ marginBottom: 10, padding: '12px 14px' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8a7e6a', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Password
            </label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              placeholder="At least 6 characters"
              style={{
                width: '100%', padding: '10px 12px', border: '2px solid #D4C5A0', borderRadius: 10,
                fontFamily: 'Nunito, sans-serif', fontSize: 14, boxSizing: 'border-box',
                outline: 'none', background: '#FFFDF7',
              }}
            />
          </div>

          {error && (
            <div className="bubble danger" style={{ fontSize: 12, marginBottom: 10 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="game-btn game-btn-green" style={{ marginBottom: 10 }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <button type="button" className="game-btn game-btn-outline" onClick={() => onNavigate('login')}>
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  );
}
