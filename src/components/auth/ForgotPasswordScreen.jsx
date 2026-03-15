import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Pip from '../Pip';

export default function ForgotPasswordScreen({ onNavigate }) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
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
          <Pip mood={sent ? 'thrilled' : 'thinking'} size={70} />
        </div>

        <h1 className="heading" style={{ fontSize: 22, textAlign: 'center', color: '#2d5a4a', marginBottom: 4 }}>
          {sent ? 'Check Your Email' : 'Reset Password'}
        </h1>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#5a8a7a', marginBottom: 24 }}>
              We sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.
            </p>
            <button className="game-btn game-btn-green" onClick={() => onNavigate('login')}>
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: 12, textAlign: 'center', color: '#5a8a7a', marginBottom: 20 }}>
              Enter your email and we'll send you a reset link
            </p>

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

            {error && (
              <div className="bubble danger" style={{ fontSize: 12, marginBottom: 12 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="game-btn game-btn-green" style={{ marginBottom: 10 }}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <button type="button" className="game-btn game-btn-outline" onClick={() => onNavigate('login')}>
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
