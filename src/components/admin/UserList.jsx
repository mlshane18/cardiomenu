import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function UserList({ onNavigate }) {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setUsers(data || []);
    setLoading(false);
  };

  const toggleRole = async (userId, currentRole) => {
    if (userId === currentUser.id) return; // Can't demote yourself
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);
    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
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

        <h2 className="heading" style={{ fontSize: 18, marginBottom: 16 }}>
          Users ({users.length})
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#8a7e6a', padding: 20 }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {users.map((u) => (
              <div key={u.id} className="game-card" style={{ padding: '10px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#3a3428' }}>
                      {u.display_name || u.email}
                    </div>
                    <div style={{ fontSize: 11, color: '#8a7e6a' }}>
                      {u.email}
                    </div>
                    <div style={{ fontSize: 10, color: '#b0a890', marginTop: 2 }}>
                      Joined {new Date(u.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 6,
                      background: u.role === 'admin' ? '#ffe0e6' : '#e0fff5',
                      color: u.role === 'admin' ? '#e94560' : '#2d8a74',
                    }}>
                      {u.role}
                    </span>
                    {u.id !== currentUser.id && (
                      <button onClick={() => toggleRole(u.id, u.role)} style={{
                        background: 'none', border: '1px solid #D4C5A0', borderRadius: 6,
                        padding: '2px 8px', fontFamily: 'Nunito', fontSize: 10,
                        color: '#8a7e6a', cursor: 'pointer',
                      }}>
                        {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
