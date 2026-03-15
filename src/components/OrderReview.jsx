import { memo, useMemo } from 'react';
import { useOrder } from '../hooks/useOrder';
import { totalNutrition, getPipMood, getPipMessage, getLetterGrade, getGradeColor, getSodiumPercent, getSatFatFromFat, getSodiumColor, getSodiumLevel } from '../utils/nutrition';
import { getSwapSuggestions, getAllItems } from '../utils/swaps';
import Pip, { PipSmall } from './Pip';

const GaugeRing = memo(function GaugeRing({ value, target, label, unit, color }) {
  const pct = Math.min((value / target) * 100, 100);
  const grade = getLetterGrade(value, target);
  const gradeCol = getGradeColor(grade);
  const circumference = 2 * Math.PI * 48;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg viewBox="0 0 120 120" style={{ width: '100%', maxWidth: 110, height: 'auto' }}>
        <circle cx="60" cy="60" r="48" stroke="#E8E0D0" strokeWidth="10" fill="none" />
        <circle cx="60" cy="60" r="48" stroke={color} strokeWidth="10" fill="none"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset 0.8s' }} />
        <circle cx="60" cy="60" r="36" fill="#FFFDF7" stroke="#E8E0D0" strokeWidth="2" />
        <text x="60" y="55" textAnchor="middle" fontFamily="Fredoka" fontSize="22" fontWeight="700" fill={gradeCol}>{grade}</text>
        <text x="60" y="70" textAnchor="middle" fontFamily="Nunito" fontSize="9" fill="#8a7e6a">{Math.round(pct)}%</text>
      </svg>
      <div style={{ fontFamily: 'Fredoka', fontSize: 11, fontWeight: 600, color: '#3a3428', marginTop: 2 }}>{label}</div>
      <div style={{ fontSize: 10, color: '#8a7e6a' }}>{value}{unit} / {target}{unit}</div>
    </div>
  );
});

export default function OrderReview() {
  const { state, dispatch } = useOrder();
  const { orderItems, restaurant, sodiumTarget, calorieTarget, satFatTarget } = state;

  const totals = useMemo(() => totalNutrition(orderItems), [orderItems]);
  const mood = getPipMood(totals, sodiumTarget);
  const message = getPipMessage(mood, totals, sodiumTarget);
  const allItems = useMemo(() => getAllItems(restaurant), [restaurant]);
  const swaps = useMemo(() => getSwapSuggestions(orderItems, allItems), [orderItems, allItems]);

  const perMealNa = Math.round(sodiumTarget / 3);
  const naGrade = getLetterGrade(totals.sodium, perMealNa);
  const isGoodOrder = naGrade.startsWith('A') || naGrade.startsWith('B');

  return (
    <div className="fade-in" style={{ minHeight: '100svh', background: '#f4f1eb', padding: '20px 16px 40px' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
        {/* Pip reaction */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <Pip mood={mood} size={100} />
        </div>
        <div className={`bubble ${mood === 'thrilled' || mood === 'happy' ? 'happy' : mood === 'thinking' ? 'warn' : 'danger'}`} style={{ fontSize: 13, textAlign: 'center', marginBottom: 20 }}>
          {message}
        </div>

        {/* Report Card Gauges */}
        <div className="game-card" style={{ marginBottom: 14 }}>
          <div className="heading" style={{ fontSize: 14, textAlign: 'center', marginBottom: 12 }}>Report Card</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 80px', maxWidth: 120 }}>
              <GaugeRing value={totals.sodium} target={perMealNa} label="Sodium" unit="mg" color="#e94560" />
            </div>
            <div style={{ flex: '1 1 80px', maxWidth: 120 }}>
              <GaugeRing value={totals.calories} target={Math.round(calorieTarget / 3)} label="Calories" unit="" color="#e9a345" />
            </div>
            <div style={{ flex: '1 1 80px', maxWidth: 120 }}>
              <GaugeRing value={totals.satFat} target={Math.round(satFatTarget / 3)} label="Sat Fat" unit="g" color="#B088E8" />
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="game-card" style={{ marginBottom: 14 }}>
          <div className="heading" style={{ fontSize: 14, marginBottom: 8 }}>Your Order at {restaurant.restaurant}</div>
          {orderItems.map(item => {
            const qty = item.quantity || 1;
            const portionMult = item.halfPortion ? 0.5 : 1;
            const itemNa = Math.round(item.nutrition.sodium * qty * portionMult);
            const itemCal = Math.round(item.nutrition.calories * qty * portionMult);
            const naLevel = getSodiumLevel(Math.round(item.nutrition.sodium * portionMult), sodiumTarget);
            const naColor = getSodiumColor(naLevel);
            return (
              <div key={item.id} className="review-row">
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                  {item.halfPortion && <span style={{ color: '#e9a345', fontWeight: 700 }}> (½)</span>}
                  {qty > 1 && <span style={{ color: '#8a7e6a' }}> ×{qty}</span>}
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: naColor }}>{itemNa}mg</span>
                  <span style={{ fontSize: 10, color: '#8a7e6a' }}>{itemCal}cal</span>
                </div>
              </div>
            );
          })}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontWeight: 700, fontFamily: 'Fredoka', fontSize: 14 }}>
            <span>Meal Total</span>
            <span style={{ color: '#e94560' }}>{totals.sodium}mg Na · {totals.calories} cal</span>
          </div>
        </div>

        {/* Per-item sodium bar chart */}
        <div className="game-card" style={{ marginBottom: 14 }}>
          <div className="heading" style={{ fontSize: 14, marginBottom: 10 }}>Sodium Breakdown</div>
          {orderItems.map(item => {
            const portionMult = item.halfPortion ? 0.5 : 1;
            const na = Math.round(item.nutrition.sodium * (item.quantity || 1) * portionMult);
            const pct = Math.min((na / perMealNa) * 100, 100);
            const naLevel = getSodiumLevel(Math.round(item.nutrition.sodium * portionMult), sodiumTarget);
            const naColor = getSodiumColor(naLevel);
            return (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ fontWeight: 600 }}>{item.name}{item.halfPortion ? ' (½)' : ''}</span>
                  <span style={{ fontWeight: 700, color: naColor }}>{na}mg</span>
                </div>
                <div className="sodium-bar" style={{ height: 10 }}>
                  <div className="sodium-bar-fill" style={{ width: `${pct}%`, background: naColor }} />
                </div>
              </div>
            );
          })}
          <div style={{ fontSize: 10, color: '#8a7e6a', marginTop: 4, textAlign: 'center' }}>
            Per-meal target: {perMealNa}mg sodium
          </div>
        </div>

        {/* Swap suggestions */}
        {swaps.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <PipSmall mood="thinking" />
              <div className="heading" style={{ fontSize: 14 }}>Pip's Swap Suggestions</div>
            </div>
            {swaps.map(swap => (
              <div key={swap.original.id} className="swap-card" style={{ marginBottom: 8, flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>
                      Swap <span style={{ color: '#e94560' }}>{swap.original.name}</span>
                    </div>
                    <div style={{ fontSize: 12 }}>
                      for <span style={{ color: '#2d8a74', fontWeight: 700 }}>{swap.suggestion.name}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#2d8a74', marginTop: 4, fontWeight: 700 }}>
                      Save {swap.savedSodium}mg sodium · {swap.savedCalories} cal
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => dispatch({
                    type: 'SWAP_ITEM',
                    payload: { originalId: swap.original.id, newItem: swap.suggestion },
                  })}
                  style={{
                    marginTop: 8, width: '100%', padding: '8px 16px',
                    fontFamily: 'Fredoka', fontSize: 12, fontWeight: 600,
                    background: '#E0FFF5', border: '2px solid #53c5ab',
                    borderRadius: 10, color: '#2d8a74', cursor: 'pointer',
                  }}
                >
                  Make This Swap
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Finalize Order button */}
        <button
          className="game-btn"
          onClick={() => dispatch({ type: 'FINALIZE_ORDER' })}
          style={{
            marginBottom: 10,
            background: isGoodOrder
              ? 'linear-gradient(135deg, #FFD700, #FFA500)'
              : 'linear-gradient(135deg, #53c5ab, #2d8a74)',
            color: isGoodOrder ? '#5a3e00' : 'white',
            border: isGoodOrder ? '3px solid #DAA520' : '3px solid #1a6e5a',
            boxShadow: isGoodOrder
              ? '0 4px 0 #B8860B, 0 6px 12px rgba(218,165,32,0.3)'
              : '0 4px 0 #1a6e5a, 0 6px 12px rgba(45,138,116,0.3)',
          }}
        >
          Finalize My Order
        </button>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button className="game-btn game-btn-green" onClick={() => dispatch({ type: 'TRY_AGAIN' })}>
            Try Different Choices
          </button>
          <button className="game-btn game-btn-outline" onClick={() => dispatch({ type: 'GO_TO_SCREEN', payload: 'restaurant' })}>
            Try Another Restaurant
          </button>
          <button className="game-btn game-btn-outline" onClick={() => dispatch({ type: 'RESET' })}>
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
