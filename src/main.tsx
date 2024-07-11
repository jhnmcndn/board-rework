import { homeRoute } from '@/routes/home';
import {
  codeWashRoute,
  customerServiceRoute,
  faqRoute,
  gamesRoute,
  mailBoxRoute,
  personalInfoRoute,
  promotionRoute,
  rechargeHistoryRoute,
  rechargeRoute,
  safeBoxRoute,
  shareRoute,
  webviewRoute,
  withdrawRoute,
} from '@/routes/privateRoutes';
import { rootRoute } from '@/routes/root';
import '@/styles/main.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AlertModal from './components/Modals/AlertModal';

const routeTree = rootRoute.addChildren([
  homeRoute,
  personalInfoRoute,
  codeWashRoute,
  customerServiceRoute,
  faqRoute,
  gamesRoute,
  mailBoxRoute,
  promotionRoute,
  rechargeRoute,
  rechargeHistoryRoute,
  safeBoxRoute,
  shareRoute,
  webviewRoute,
  withdrawRoute,
]);
const router = createRouter({ routeTree });
const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <AlertModal />
    </QueryClientProvider>
  </React.StrictMode>
);
