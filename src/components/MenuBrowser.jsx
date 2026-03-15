import { useMemo } from 'react';
import { useOrder } from '../hooks/useOrder';
import { totalNutrition, getSodiumPercent, getSodiumColor, getSodiumLevel, getPipMood, getPipMessage, getSatFatFromFat } from '../utils/nutrition';
import { PipSmall } from './Pip';
import MenuItem from './MenuItem';

export default function MenuBrowser() {
  const { state, dispatch } = useOrder();
  const { restaurant, orderItems, activeCategory, sodiumTarget, calorieTarget } = state;

  const totals = useMemo(() => totalNutrition(orderItems), [orderItems]);
  const naPercent = getSodiumPercent(totals.sodium, sodiumTarget);
  const naLevel = getSodiumLevel(totals.sodium, sodiumTarget);
  const naColor = getSodiumColor(naLevel);
  const mood = orderItems.length > 0 ? getPipMood(totals, sodiumTarget) : 'happy';
  const category = restaurant.categories[activeCategory];

  return (
    <div className="fade-in" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', background: '#f4f1eb', paddingBottom: 80 }}>
      {/* HUD */}
      <div className="hud">
        <div className="hud-item">
          <div className="hud-value" style={{ color: naColor }}>{totals.sodium}mg</div>
          <div>Sodium</div>
        </div>
        <div className="hud-item">
          <div className="hud-value" style={{ color: '#e9a345' }}>{totals.calories}</div>
          <div>Calories</div>
        </div>
        <div className="hud-item">
          <div className="hud-value" style={{ color: '#B088E8' }}>{totals.satFat}g</div>
          <div>Sat Fat</div>
        </div>
      </div>

      {/* Sodium bar */}
      <div style={{ padding: '0 12px', marginBottom: 4 }}>
        <div className="sodium-bar">
          <div
            className="sodium-bar-fill"
            style={{
              width: `${Math.min(naPercent, 100)}%`,
              background: naPercent > 80 ? 'linear-gradient(90deg, #53c5ab, #e9a345, #e94560)' :
                         naPercent > 50 ? 'linear-gradient(90deg, #53c5ab, #e9a345)' :
                         '#53c5ab',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#8a7e6a', marginTop: 2, padding: '0 2px' }}>
          <span>0mg</span>
          <span>{sodiumTarget}mg daily limit</span>
        </div>
      </div>

      <div style={{ padding: '0 12px', flex: 1 }}>
        {/* Restaurant header + back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <button
            onClick={() => dispatch({ type: 'GO_TO_SCREEN', payload: 'restaurant' })}
            style={{ background: 'none', border: 'none', fontFamily: 'Fredoka', fontSize: 13, color: '#8a7e6a', cursor: 'pointer', padding: '4px 0' }}
          >
            ←
          </button>
          <span className="heading" style={{ fontSize: 16, flex: 1 }}>{restaurant.restaurant}</span>
          <PipSmall mood={mood} />
        </div>

        {/* Pip speech if items selected */}
        {orderItems.length > 0 && (
          <div className={`bubble ${mood === 'thrilled' || mood === 'happy' ? 'happy' : mood === 'thinking' ? 'warn' : 'danger'}`} style={{ fontSize: 12, marginBottom: 12 }}>
            {getPipMessage(mood, totals, sodiumTarget)}
          </div>
        )}

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 8 }}>
          {restaurant.categories.map((cat, i) => (
            <button
              key={cat.name}
              className={`cat-pill ${activeCategory === i ? 'cat-active' : 'cat-inactive'}`}
              onClick={() => dispatch({ type: 'SET_CATEGORY', payload: i })}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div>
          {category.items.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Order tray */}
      {orderItems.length > 0 && (
        <div className="order-tray">
          <div>
            <div style={{ color: '#53c5ab', fontFamily: 'Fredoka', fontWeight: 700, fontSize: 14 }}>
              {orderItems.reduce((s, i) => s + (i.quantity || 1), 0)} items
            </div>
            <div style={{ color: '#aaa', fontSize: 10 }}>
              Na: {totals.sodium}mg · Cal: {totals.calories}
            </div>
          </div>
          <button
            className="game-btn game-btn-green"
            style={{ width: 'auto', padding: '10px 24px', fontSize: 14 }}
            onClick={() => dispatch({ type: 'GO_TO_REVIEW' })}
          >
            Review Order
          </button>
        </div>
      )}
    </div>
  );
}
