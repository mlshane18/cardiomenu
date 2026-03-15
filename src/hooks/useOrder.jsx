import { createContext, useContext, useReducer } from 'react';
import { DEFAULT_DAILY_SODIUM, DEFAULT_DAILY_CALORIES, DEFAULT_DAILY_SAT_FAT } from '../utils/nutrition';

const OrderContext = createContext(null);

const initialState = {
  screen: 'start',
  sodiumTarget: DEFAULT_DAILY_SODIUM,
  calorieTarget: DEFAULT_DAILY_CALORIES,
  satFatTarget: DEFAULT_DAILY_SAT_FAT,
  restaurant: null,
  orderItems: [],
  activeCategory: 0,
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'SET_SETTINGS':
      return { ...state, ...action.payload, screen: 'restaurant' };
    case 'SELECT_RESTAURANT':
      return { ...state, restaurant: action.payload, screen: 'menu', orderItems: [], activeCategory: 0 };
    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.payload };
    case 'ADD_ITEM': {
      const existing = state.orderItems.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          orderItems: state.orderItems.map(i =>
            i.id === action.payload.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          ),
        };
      }
      return { ...state, orderItems: [...state.orderItems, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM': {
      const item = state.orderItems.find(i => i.id === action.payload);
      if (item && (item.quantity || 1) > 1) {
        return {
          ...state,
          orderItems: state.orderItems.map(i =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }
      return { ...state, orderItems: state.orderItems.filter(i => i.id !== action.payload) };
    }
    case 'GO_TO_REVIEW':
      return { ...state, screen: 'review' };
    case 'GO_TO_SCREEN':
      return { ...state, screen: action.payload };
    case 'RESET':
      return { ...initialState };
    case 'SWAP_ITEM': {
      const { originalId, newItem } = action.payload;
      return {
        ...state,
        orderItems: state.orderItems.map(i =>
          i.id === originalId ? { ...newItem, quantity: i.quantity || 1 } : i
        ),
      };
    }
    case 'FINALIZE_ORDER':
      return { ...state, screen: 'finalized' };
    case 'TRY_AGAIN':
      return { ...state, screen: 'menu', orderItems: [], activeCategory: 0 };
    default:
      return state;
  }
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
}
