import { useState, useEffect } from 'react';
import { supabase, generateInviteCode } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function InvitationManager({ onNavigate }) {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [email, setEmail] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('invitation_codes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setInvitations(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    setCreating(true);
    setError(null);
    try {
      const code = generateInviteCode();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiresInDays);

      const { error: insertError } = await supabase
        .from('invitation_codes')
        .insert({
          code,
          email: email.trim() || null,
          created_by: user.id,
          expires_at: expiresAt.toISOString(),
        });

      if (insertError) throw insertError;
      setEmail('');
      await fetchInvitations();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatus = (inv) => {
    if (inv.used_at) return { label: 'Used', color: '#8a7e6a', bg: '#f0ebe0' };
    if (inv.expires_at && new Date(inv.expires_at) < new Date()) return { label: 'Expired', color: '#e94560', bg: '#ffe0e6' };
    return { label: 'Active', color: '#2d8a74', bg: '#e0fff5' };
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

        <h2 className="heading" style={{ fontSize: 18, marginBottom: 16 }}>Invitation Codes</h2>

        {/* Create new invitation */}
        <div className="game-card" style={{ marginBottom: 16 }}>
          <div className="heading" style={{ fontSize: 14, marginBottom: 10 }}>Generate New Invitation</div>

          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8a7e6a', marginBottom: 4, textTransform: 'uppercase' }}>
            Email (optional — locks code to this email)
          </label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="anyone@example.com"
            style={{
              width: '100%', padding: '8px 10px', border: '2px solid #D4C5A0', borderRadius: 8,
              fontFamily: 'Nunito', fontSize: 13, boxSizing: 'border-box', marginBottom: 10,
              background: '#FFFDF7',
            }}
          />

          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8a7e6a', marginBottom: 4, textTransform: 'uppercase' }}>
            Expires in
          </label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {[1, 3, 7, 30].map((d) => (
              <button key={d} onClick={() => setExpiresInDays(d)}
                className={`cat-pill ${expiresInDays === d ? 'cat-active' : 'cat-inactive'}`}>
                {d} day{d > 1 ? 's' : ''}
              </button>
            ))}
          </div>

          {error && <div className="bubble danger" style={{ fontSize: 12, marginBottom: 10 }}>{error}</div>}

          <button onClick={handleCreate} disabled={creating}
            className="game-btn game-btn-green" style={{ padding: '10px 20px', fontSize: 13 }}>
            {creating ? 'Generating...' : 'Generate Code'}
          </button>
        </div>

        {/* Existing invitations */}
        <div className="heading" style={{ fontSize: 14, marginBottom: 8 }}>
          All Invitations ({invitations.length})
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#8a7e6a', padding: 20 }}>Loading...</div>
        ) : invitations.length === 0 ? (
          <div className="game-card" style={{ textAlign: 'center', color: '#8a7e6a', fontSize: 13 }}>
            No invitations yet. Generate one above!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {invitations.map((inv) => {
              const status = getStatus(inv);
              return (
                <div key={inv.id} className="game-card" style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{
                      fontFamily: 'Fredoka', fontSize: 16, fontWeight: 700, letterSpacing: 2, color: '#3a3428',
                    }}>
                      {inv.code}
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                      background: status.bg, color: status.color,
                    }}>
                      {status.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: '#8a7e6a' }}>
                    {inv.email && <span>For: {inv.email} · </span>}
                    Expires: {new Date(inv.expires_at).toLocaleDateString()}
                    {inv.used_at && <span> · Used: {new Date(inv.used_at).toLocaleDateString()}</span>}
                  </div>
                  {!inv.used_at && new Date(inv.expires_at) > new Date() && (
                    <button onClick={() => copyCode(inv.code)} style={{
                      marginTop: 6, background: copied === inv.code ? '#53c5ab' : '#F0FFF8',
                      border: '1px solid #53c5ab', borderRadius: 6, padding: '4px 12px',
                      fontFamily: 'Fredoka', fontSize: 11, color: copied === inv.code ? 'white' : '#2d8a74',
                      cursor: 'pointer',
                    }}>
                      {copied === inv.code ? 'Copied!' : 'Copy Code'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
