import Root from '@/pages/__Root__';
import { createRootRoute } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: () => <Root />,
});
