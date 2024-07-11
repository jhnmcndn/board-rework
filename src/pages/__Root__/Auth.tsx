import { useGetAccountInfo } from '@/actions/useGetAccountInfo';
import { useAccountInfoStore } from '@/store/accountInfo';
import { Navigate, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';

const Auth = () => {
  const { data: accountInfo } = useGetAccountInfo();
  const setAccountInfo = useAccountInfoStore((state) => state.setAccountInfo);

  useEffect(() => {
    if (accountInfo) {
      setAccountInfo(accountInfo);
    }
  }, [accountInfo]);

  if (!accountInfo) return <Navigate to="/" />;

  return <Outlet />;
};

export default Auth;
