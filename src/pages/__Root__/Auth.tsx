import { useGetAccountInfo } from '@/actions/';
import { useAccountStore } from '@/store/useAccountStore';
import { Navigate, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';

const Auth = () => {
  const { data: accountInfo } = useGetAccountInfo();
  const setAccountInfo = useAccountStore((state) => state.setAccountInfo);

  useEffect(() => {
    if (accountInfo) {
      setAccountInfo(accountInfo);
    }
  }, [accountInfo]);

  if (!accountInfo) return <Navigate to="/" />;

  return <Outlet />;
};

export default Auth;
