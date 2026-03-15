import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function ResetUserPassword({ onNavigate }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);
  const [sent, setSent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, display_name, role')
      .order('email');
    if (!error) setUsers(data || []);
    setLoading(false);
  };

  const handleReset = async (email) => {
    setSending(email);
    setError(null);
    setSent(null);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}`,
      });
      if (resetError) throw resetError;
      setSent(email);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(null);
    }
  };

  return (
    <div className="fade-in" style={{ minHeight: '100svh', background: '#f4f1eb', padding: '20px 16px 40px' }}>
      <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
        <button onClick={() => onNavigate('admin')} style={{
          background: 'none', border: 'none', fontFamily: 'Fredoka', fontSize: 13,
          color: '#8a7e6a', cursor: 'pointer', padding: '4px 0', marginBottom: 12,
        }}>
          ← Back to Admin
        </button>

        <h2 className="heading" style={{ fontSize: 18, marginBottom: 8 }}>Reset User Password</h2>
        <p style={{ fontSize: 12, color: '#8a7e6a', marginBottom: 16 }}>
          Send a password reset email to any user
        </p>

        {error && <div className="bubble danger" style={{ fontSize: 12, marginBottom: 12 }}>{error}</div>}

        {loading ? (
          <div style={{ textAlign: 'center', color: '#8a7e6a', padding: 20 }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {users.map((u) => (
              <div key={u.id} className="game-card" style={{
                padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#3a3428' }}>
                    {u.display_name || u.email}
                  </div>
                  <div style={{ fontSize: 11, color: '#8a7e6a' }}>{u.email}</div>
                </div>
                <button
                  onClick={() => handleReset(u.email)}
                  disabled={sending === u.email}
                  style={{
                    background: sent === u.email ? '#53c5ab' : '#F0FFF8',
                    border: '1px solid #53c5ab', borderRadius: 8, padding: '6px 12px',
                    fontFamily: 'Fredoka', fontSize: 11, cursor: 'pointer',
                    color: sent === u.email ? 'white' : '#2d8a74', flexShrink: 0,
                  }}
                >
                  {sending === u.email ? 'Sending...' : sent === u.email ? 'Sent!' : 'Send Reset'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
