import type { AuthComponent } from '@/types/component';
import { isLoggedIn } from '@/utils/app';
import { Navigate } from '@tanstack/react-router';

const Auth: AuthComponent = ({ component }) => {
  if (!isLoggedIn()) return <Navigate to="/" />;
  return component();
};

export default Auth;
