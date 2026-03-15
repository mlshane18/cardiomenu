import { memo, useCallback } from 'react';
import { getSodiumLevel, getSodiumColor, getSatFatFromFat } from '../utils/nutrition';
import { useOrder } from '../hooks/useOrder';

const MenuItem = memo(function MenuItem({ item }) {
  const { state, dispatch } = useOrder();
  const inOrder = state.orderItems.find(i => i.id === item.id);
  const quantity = inOrder?.quantity || 0;
  const isHalf = inOrder?.halfPortion || false;

  // Show nutrition adjusted for half portion if toggled
  const portionMult = isHalf ? 0.5 : 1;
  const displaySodium = Math.round(item.nutrition.sodium * portionMult);
  const displayCalories = Math.round(item.nutrition.calories * portionMult);
  const displayFat = Math.round(item.nutrition.fat * portionMult);

  const sodiumLevel = getSodiumLevel(displaySodium, state.sodiumTarget);
  const satFat = Math.round(getSatFatFromFat(item.nutrition.fat) * portionMult);

  const naClass = sodiumLevel === 'green' ? 'na-low' : sodiumLevel === 'yellow' ? 'na-med' : 'na-high';

  const handleAdd = useCallback(() => dispatch({ type: 'ADD_ITEM', payload: item }), [dispatch, item]);
  const handleRemove = useCallback(() => dispatch({ type: 'REMOVE_ITEM', payload: item.id }), [dispatch, item.id]);
  const handleToggleHalf = useCallback(() => dispatch({ type: 'TOGGLE_HALF_PORTION', payload: item.id }), [dispatch, item.id]);

  return (
    <div className={`menu-item-game${quantity > 0 ? ' selected' : ''}`}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="heading" style={{ fontSize: 13, color: '#3a3428', lineHeight: 1.3 }}>
          {item.name}
          {isHalf && <span style={{ fontSize: 10, color: '#e9a345', fontWeight: 700 }}> (½)</span>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
          <span className={`na-chip ${naClass}`}>Na {displaySodium}mg</span>
          <span className="na-chip na-cal">{displayCalories} cal</span>
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
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F0FFF8', borderRadius: 10, padding: '4px 8px', border: '2px solid #53c5ab' }}>
              <button
                onClick={handleRemove}
                className="heading"
                style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid #e94560', background: 'white', color: '#e94560', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                −
              </button>
              <span className="heading" style={{ fontSize: 15, color: '#2d8a74', width: 16, textAlign: 'center' }}>{quantity}</span>
              <button
                onClick={handleAdd}
                className="heading"
                style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid #2d8a74', background: '#53c5ab', color: 'white', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                +
              </button>
            </div>
            <button
              onClick={handleToggleHalf}
              style={{
                padding: '3px 10px',
                background: isHalf ? '#FFF8EB' : '#FFFDF7',
                border: `2px solid ${isHalf ? '#e9a345' : '#D4C5A0'}`,
                borderRadius: 8,
                fontFamily: 'Fredoka',
                fontSize: 10,
                fontWeight: 600,
                color: isHalf ? '#b07a20' : '#8a7e6a',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {isHalf ? '½ portion ✓' : '½ portion'}
            </button>
          </>
        ) : (
          <button
            onClick={handleAdd}
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
});

export default MenuItem;
