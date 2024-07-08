import PersonalInfo from '@/pages/PersonalInfo';
import { rootRoute } from '@/routes/root';
import { createRoute } from '@tanstack/react-router';

export const personalInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/personal-info',
  component: PersonalInfo,
});
