import { memo } from 'react';
import { useOrder } from '../hooks/useOrder';
import Pip from './Pip';
import mcdonaldsData from '../data/mcdonalds.json';
import fiveguysData from '../data/fiveguys.json';
import pandaexpressData from '../data/pandaexpress.json';
import wendysData from '../data/wendys.json';
import tacobellData from '../data/tacobell.json';
import chipotleData from '../data/chipotle.json';
import chickfilaData from '../data/chickfila.json';
import starbucksData from '../data/starbucks.json';
import dunkinData from '../data/dunkin.json';
import burgerkingData from '../data/burgerking.json';
import subwayData from '../data/subway.json';
import dominosData from '../data/dominos.json';
import pizzahutData from '../data/pizzahut.json';
import sonicData from '../data/sonic.json';
import popeyesData from '../data/popeyes.json';
import kfcData from '../data/kfc.json';
import paneraData from '../data/panera.json';
import arbysData from '../data/arbys.json';
import jackintheboxData from '../data/jackinthebox.json';
import whataburgerData from '../data/whataburger.json';

const restaurants = [
  mcdonaldsData, chickfilaData, starbucksData, tacobellData,
  wendysData, dunkinData, burgerkingData, subwayData,
  chipotleData, dominosData, pandaexpressData, pizzahutData,
  sonicData, popeyesData, fiveguysData, kfcData,
  paneraData, arbysData, jackintheboxData, whataburgerData,
];

const RestaurantIcon = memo(function RestaurantIcon({ restaurant }) {
  const renderSVG = (id) => {
    const svgProps = {
      width: 52,
      height: 52,
      viewBox: '0 0 52 52',
      style: { flexShrink: 0 },
    };

    switch (id) {
      case 'mcdonalds':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="#DA291C" rx="8" />
            <path d="M18 16 Q18 10 18 10 L22 10 Q22 18 22 20 L18 20 Z" fill="#FFC72C" />
            <path d="M30 16 Q30 10 30 10 L34 10 Q34 18 34 20 L30 20 Z" fill="#FFC72C" />
            <path d="M18 20 Q22 28 26 28 Q30 28 34 20" stroke="#FFC72C" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        );
      case 'chickfila':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="#E51636" rx="8" />
            <path d="M14 12 L38 12 L38 40 Q38 44 34 44 L18 44 Q14 44 14 40 Z" fill="white" />
            <circle cx="26" cy="20" r="4" fill="#E51636" />
            <path d="M22 28 Q26 32 30 28" stroke="#E51636" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'starbucks':
        return (
          <svg {...svgProps}>
            <circle cx="26" cy="26" r="26" fill="#00704A" />
            <circle cx="26" cy="26" r="20" fill="white" />
            <path d="M26 10 L30 20 L32 22 Q32 28 26 32 Q20 28 20 22 L22 20 Z" fill="#00704A" />
            <circle cx="26" cy="28" r="3" fill="white" />
          </svg>
        );
      case 'tacobell':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <path d="M26 10 L38 18 L38 36 Q38 42 32 42 L20 42 Q14 42 14 36 L14 18 Z" fill="#702082" />
            <circle cx="26" cy="28" r="4" fill="white" />
          </svg>
        );
      case 'wendys':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <rect x="12" y="12" width="28" height="28" fill="#D2222F" rx="4" />
            <circle cx="22" cy="20" r="2" fill="#FFC72C" />
            <circle cx="30" cy="20" r="2" fill="#FFC72C" />
            <path d="M20 26 Q26 30 32 26" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'dunkin':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="#FF6600" rx="8" />
            <ellipse cx="26" cy="18" rx="8" ry="10" fill="#DD1E6A" />
            <rect x="14" y="20" width="24" height="20" rx="3" fill="#DD1E6A" />
            <rect x="18" y="26" width="4" height="8" fill="#FF6600" />
            <rect x="30" y="26" width="4" height="8" fill="#FF6600" />
          </svg>
        );
      case 'burgerking':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <rect x="10" y="14" width="32" height="24" rx="4" fill="#FF8732" />
            <path d="M12 14 L40 14" stroke="#D62300" strokeWidth="3" />
            <path d="M12 38 L40 38" stroke="#D62300" strokeWidth="3" />
            <circle cx="26" cy="26" r="8" fill="white" />
            <text x="26" y="30" fontSize="12" fontWeight="bold" fill="#D62300" textAnchor="middle">BK</text>
          </svg>
        );
      case 'subway':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="#008C15" rx="8" />
            <path d="M14 22 L38 22 L40 26 L38 30 L14 30 L12 26 Z" fill="#FFC600" />
            <rect x="16" y="24" width="6" height="4" fill="#008C15" />
            <rect x="25" y="24" width="6" height="4" fill="#008C15" />
            <rect x="34" y="24" width="4" height="4" fill="#008C15" />
          </svg>
        );
      case 'chipotle':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <path d="M26 12 Q32 18 32 28 Q32 40 26 44 Q20 40 20 28 Q20 18 26 12 Z" fill="#441500" />
            <ellipse cx="26" cy="24" rx="3" ry="4" fill="#B8860B" />
          </svg>
        );
      case 'dominos':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <rect x="14" y="16" width="12" height="12" fill="#006491" rx="2" />
            <circle cx="20" cy="22" r="2.5" fill="white" />
            <rect x="26" y="16" width="12" height="12" fill="#E31837" rx="2" />
            <circle cx="32" cy="22" r="2.5" fill="white" />
            <rect x="14" y="28" width="12" height="12" fill="#E31837" rx="2" />
            <circle cx="20" cy="34" r="2.5" fill="white" />
            <rect x="26" y="28" width="12" height="12" fill="#006491" rx="2" />
            <circle cx="32" cy="34" r="2.5" fill="white" />
          </svg>
        );
      case 'pandaexpress':
        return (
          <svg {...svgProps}>
            <circle cx="26" cy="26" r="26" fill="#D12028" />
            <circle cx="20" cy="22" r="5" fill="black" />
            <circle cx="32" cy="22" r="5" fill="black" />
            <circle cx="20.5" cy="21.5" r="2" fill="white" />
            <circle cx="32.5" cy="21.5" r="2" fill="white" />
            <path d="M22 28 L24 30 L26 28 L28 30 L30 28" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        );
      case 'pizzahut':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <path d="M26 10 L38 20 L38 32 L14 32 L14 20 Z" fill="#EE3A23" />
            <rect x="18" y="26" width="4" height="6" fill="white" />
            <rect x="30" y="26" width="4" height="6" fill="white" />
            <circle cx="26" cy="22" r="2" fill="white" />
          </svg>
        );
      case 'sonic':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <path d="M26 12 L36 22 L36 30 L16 30 L16 22 Z" fill="#0075C9" />
            <path d="M26 30 L32 38 L20 38 Z" fill="#EF3A42" />
            <circle cx="26" cy="26" r="3" fill="white" />
          </svg>
        );
      case 'popeyes':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="#FF6600" rx="8" />
            <path d="M26 12 L32 24 L26 28 L20 24 Z" fill="white" />
            <path d="M26 28 L32 32 L26 38 L20 32 Z" fill="white" />
            <path d="M26 16 L30 22 L26 24 L22 22 Z" fill="#FF6600" />
          </svg>
        );
      case 'fiveguys':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <rect x="12" y="12" width="8" height="28" fill="#DA291C" />
            <rect x="22" y="12" width="8" height="28" fill="white" stroke="#DA291C" strokeWidth="1" />
            <rect x="32" y="12" width="8" height="28" fill="#DA291C" />
          </svg>
        );
      case 'kfc':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <rect x="10" y="10" width="32" height="32" fill="#F40009" />
            <rect x="12" y="12" width="28" height="28" fill="white" />
            <circle cx="26" cy="24" r="6" fill="#F40009" />
            <path d="M20 28 L20 35 L32 35 L32 28" fill="#F40009" />
          </svg>
        );
      case 'panera':
        return (
          <svg {...svgProps}>
            <circle cx="26" cy="26" r="26" fill="#4E7A2D" />
            <path d="M20 18 Q26 12 32 18 L30 26 Q26 30 22 26 Z" fill="white" />
            <ellipse cx="26" cy="32" rx="8" ry="6" fill="white" />
          </svg>
        );
      case 'arbys':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <path d="M26 12 L36 22 L34 28 L26 32 L18 28 L16 22 Z" fill="#D2282E" />
            <ellipse cx="26" cy="24" rx="4" ry="5" fill="white" />
          </svg>
        );
      case 'jackinthebox':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <path d="M18 16 L34 16 L36 20 L36 36 Q36 40 32 40 L22 40 Q18 40 18 36 Z" fill="#E31837" />
            <circle cx="26" cy="28" r="7" fill="#FDB913" />
            <circle cx="26" cy="28" r="4" fill="#E31837" />
          </svg>
        );
      case 'whataburger':
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="white" rx="8" />
            <path d="M22 14 L30 14 L34 22 L34 36 Q34 40 30 40 L22 40 Q18 40 18 36 L18 22 Z" fill="#F37321" />
            <path d="M24 18 L28 18 L28 34 L24 34 Z" fill="white" />
            <circle cx="26" cy="26" r="2" fill="#F37321" />
          </svg>
        );
      default:
        return (
          <svg {...svgProps}>
            <rect width="52" height="52" fill="#ccc" rx="8" />
            <text x="26" y="28" fontSize="20" textAnchor="middle" fill="white">🍽</text>
          </svg>
        );
    }
  };

  return (
    <div style={{
      width: 52, height: 52, borderRadius: 14,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {renderSVG(restaurant.id)}
    </div>
  );
});

export default function RestaurantSelect() {
  const { state, dispatch } = useOrder();

  return (
    <div className="fade-in" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px 40px', background: '#f4f1eb' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        {/* Back button */}
        <button
          onClick={() => dispatch({ type: 'GO_TO_SCREEN', payload: 'start' })}
          style={{ background: 'none', border: 'none', fontFamily: 'Fredoka', fontSize: 13, color: '#8a7e6a', cursor: 'pointer', padding: '4px 0', marginBottom: 8 }}
        >
          ← Back
        </button>

        {/* Pip header */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'start', marginBottom: 16 }}>
          <Pip mood="happy" size={50} />
          <div className="bubble happy" style={{ fontSize: 13, flex: 1 }}>
            <strong style={{ color: '#2d8a74' }}>Where to today?</strong> Pick a restaurant and let's see what's on the menu!
          </div>
        </div>

        {/* Targets reminder */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14 }}>
          <span className="na-chip na-low" style={{ fontSize: 11 }}>🎯 {state.sodiumTarget}mg Na/day</span>
          <span className="na-chip na-cal" style={{ fontSize: 11 }}>🔥 {state.calorieTarget} cal/day</span>
        </div>

        {/* Restaurant count */}
        <div style={{ textAlign: 'center', fontSize: 12, color: '#8a7e6a', marginBottom: 12 }}>
          {restaurants.length} restaurants to explore
        </div>

        {/* Restaurant grid — 2 columns of squares */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 8,
        }}>
          {restaurants.map((r) => (
            <button
              key={r.id}
              onClick={() => dispatch({ type: 'SELECT_RESTAURANT', payload: r })}
              className="game-card"
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', textAlign: 'center',
                padding: '16px 8px',
                aspectRatio: '1',
                width: '100%',
              }}
            >
              <RestaurantIcon restaurant={r} />
              <div className="heading" style={{ fontSize: 13, color: '#3a3428', marginTop: 10, lineHeight: 1.2 }}>
                {r.restaurant}
              </div>
              <div style={{ fontSize: 10, color: '#b0a890', marginTop: 4 }}>
                {r.categories.reduce((n, c) => n + c.items.length, 0)} items
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
