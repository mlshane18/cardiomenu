import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OrderProvider, useOrder } from './hooks/useOrder';
import LoginScreen from './components/auth/LoginScreen';
import SignupScreen from './components/auth/SignupScreen';
import ForgotPasswordScreen from './components/auth/ForgotPasswordScreen';
import StartScreen from './components/StartScreen';
import RestaurantSelect from './components/RestaurantSelect';
import MenuBrowser from './components/MenuBrowser';
import OrderReview from './components/OrderReview';
import OrderFinalized from './components/OrderFinalized';
import AdminPanel from './components/admin/AdminPanel';
import InvitationManager from './components/admin/InvitationManager';
import UserList from './components/admin/UserList';
import ResetUserPassword from './components/admin/ResetUserPassword';
import Pip from './components/Pip';

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #98D8A0 75%, #7BC47F 100%)',
    }}>
      <div className="float">
        <Pip mood="happy" size={80} />
      </div>
      <div className="heading" style={{ fontSize: 18, color: '#2d5a4a', marginTop: 16 }}>Loading...</div>
    </div>
  );
}

function AuthScreens() {
  const [screen, setScreen] = useState('login');

  switch (screen) {
    case 'signup':
      return <SignupScreen onNavigate={setScreen} />;
    case 'forgot-password':
      return <ForgotPasswordScreen onNavigate={setScreen} />;
    default:
      return <LoginScreen onNavigate={setScreen} />;
  }
}

function GameScreens() {
  const { state, dispatch } = useOrder();
  const navigate = (screen) => dispatch({ type: 'GO_TO_SCREEN', payload: screen });

  switch (state.screen) {
    case 'start':
      return <StartScreen />;
    case 'restaurant':
      return <RestaurantSelect />;
    case 'menu':
      return <MenuBrowser />;
    case 'review':
      return <OrderReview />;
    case 'finalized':
      return <OrderFinalized />;
    case 'admin':
      return <AdminPanel onNavigate={navigate} />;
    case 'admin-invitations':
      return <InvitationManager onNavigate={navigate} />;
    case 'admin-users':
      return <UserList onNavigate={navigate} />;
    case 'admin-reset':
      return <ResetUserPassword onNavigate={navigate} />;
    default:
      return <StartScreen />;
  }
}

function AppRoot() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <AuthScreens />;
  return <GameScreens />;
}

export default function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <div style={{ width: '100%', maxWidth: 480, minHeight: '100svh', margin: '0 auto', boxSizing: 'border-box' }}>
          <AppRoot />
        </div>
      </OrderProvider>
    </AuthProvider>
  );
}
