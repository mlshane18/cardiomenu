import { getSodiumLevel, getSodiumColor, getSatFatFromFat } from '../utils/nutrition';
import { useOrder } from '../hooks/useOrder';

export default function MenuItem({ item }) {
  const { state, dispatch } = useOrder();
  const sodiumLevel = getSodiumLevel(item.nutrition.sodium, state.sodiumTarget);
  const sodiumColor = getSodiumColor(sodiumLevel);
  const inOrder = state.orderItems.find(i => i.id === item.id);
  const quantity = inOrder?.quantity || 0;
  const satFat = getSatFatFromFat(item.nutrition.fat);

  const naClass = sodiumLevel === 'green' ? 'na-low' : sodiumLevel === 'yellow' ? 'na-med' : 'na-high';

  return (
    <div className={`menu-item-game${quantity > 0 ? ' selected' : ''}`}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="heading" style={{ fontSize: 13, color: '#3a3428', lineHeight: 1.3 }}>{item.name}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
          <span className={`na-chip ${naClass}`}>Na {item.nutrition.sodium}mg</span>
          <span className="na-chip na-cal">{item.nutrition.calories} cal</span>
          {satFat > 3 && (
            <span className="na-chip na-fat">{satFat}g sat fat</span>
          )}
        </div>
        {item.tags?.includes('popular') && (
          <div style={{ fontSize: 10, color: '#e9a345', fontWeight: 700, marginTop: 4 }}>⭐ Popular</div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {quantity > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F0FFF8', borderRadius: 10, padding: '4px 8px', border: '2px solid #53c5ab' }}>
            <button
              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
              className="heading"
              style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid #e94560', background: 'white', color: '#e94560', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              −
            </button>
            <span className="heading" style={{ fontSize: 15, color: '#2d8a74', width: 16, textAlign: 'center' }}>{quantity}</span>
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
              className="heading"
              style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid #2d8a74', background: '#53c5ab', color: 'white', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
            style={{
              padding: '6px 14px',
              background: 'linear-gradient(180deg, #53c5ab, #3da88f)',
              border: '2px solid #2d8a74',
              borderRadius: 10,
              color: 'white',
              fontFamily: 'Fredoka',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 0 #2d8a74',
            }}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}
