import { homeRoute } from '@/routes/home';
import { personalInfoRoute } from '@/routes/personalInfo';
import { rootRoute } from '@/routes/root';
import '@/styles/index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Title from './providers/Title';

const routeTree = rootRoute.addChildren([homeRoute, personalInfoRoute]);
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
      <Title />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
