import Pip from '../Pip';

const adminCards = [
  { screen: 'admin-invitations', icon: '✉️', title: 'Invitations', desc: 'Generate and manage invitation codes' },
  { screen: 'admin-users', icon: '👥', title: 'Users', desc: 'View all users and manage roles' },
  { screen: 'admin-reset', icon: '🔑', title: 'Reset Password', desc: 'Send password reset to a user' },
];

export default function AdminPanel({ onNavigate }) {
  return (
    <div className="fade-in" style={{ minHeight: '100svh', background: '#f4f1eb', padding: '20px 16px 40px' }}>
      <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
        <button onClick={() => onNavigate('start')} style={{
          background: 'none', border: 'none', fontFamily: 'Fredoka', fontSize: 13,
          color: '#8a7e6a', cursor: 'pointer', padding: '4px 0', marginBottom: 8,
        }}>
          ← Back to Game
        </button>

        <div style={{ display: 'flex', gap: 10, alignItems: 'start', marginBottom: 20 }}>
          <Pip mood="happy" size={50} />
          <div className="bubble happy" style={{ fontSize: 13, flex: 1 }}>
            <strong style={{ color: '#2d8a74' }}>Admin Panel</strong> — Manage invitations, users, and passwords.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {adminCards.map((card) => (
            <button
              key={card.screen}
              onClick={() => onNavigate(card.screen)}
              className="game-card"
              style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', textAlign: 'left', width: '100%' }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: '#F0FFF8',
                border: '2px solid #53c5ab30', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, flexShrink: 0,
              }}>
                {card.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div className="heading" style={{ fontSize: 15, color: '#3a3428' }}>{card.title}</div>
                <div style={{ fontSize: 12, color: '#8a7e6a', marginTop: 2 }}>{card.desc}</div>
              </div>
              <span className="heading" style={{ fontSize: 20, color: '#D4C5A0' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
