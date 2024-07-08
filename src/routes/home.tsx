import Home from '@/pages/Home';
import { rootRoute } from '@/routes/root';
import { createRoute } from '@tanstack/react-router';

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
