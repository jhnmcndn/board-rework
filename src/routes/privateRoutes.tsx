import Auth from '@/pages/__Root__/Auth';
import CodeWashing from '@/pages/CodeWashing';
import CustomerService from '@/pages/CustomerService';
import FAQ from '@/pages/FAQ';
import Games from '@/pages/Games';
import Mailbox from '@/pages/Mailbox';
import PersonalInfo from '@/pages/PersonalInfo';
import PromotionAgent from '@/pages/PromotionAgent';
import Recharge from '@/pages/Recharge';
import RechargeHistory from '@/pages/RechargeHistory';
import SafeBox from '@/pages/SafeBox';
import Share from '@/pages/Share';
import WebView from '@/pages/WebView';
import Withdraw from '@/pages/Withdraw';
import { rootRoute } from '@/routes/root';
import { createRoute } from '@tanstack/react-router';

export const codeWashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/code-wash',
  component: Auth.bind({ component: CodeWashing }),
});

export const customerServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer-service',
  component: Auth.bind({ component: CustomerService }),
});

export const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: Auth.bind({ component: FAQ }),
});

export const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/games',
  component: Auth.bind({ component: Games }),
});

export const mailBoxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mailbox',
  component: Auth.bind({ component: Mailbox }),
});

export const personalInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/personal-info',
  component: Auth.bind({ component: PersonalInfo }),
});

export const promotionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/promotion-agent',
  component: Auth.bind({ component: PromotionAgent }),
});

export const rechargeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recharge',
  component: Auth.bind({ component: Recharge }),
});

export const rechargeHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recharge-history',
  component: Auth.bind({ component: RechargeHistory }),
});

export const safeBoxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/safe-box',
  component: Auth.bind({ component: SafeBox }),
});

export const shareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/share',
  component: Auth.bind({ component: Share }),
});

export const webviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/webview',
  component: Auth.bind({ component: WebView }),
});

export const withdrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/withdraw',
  component: Auth.bind({ component: Withdraw }),
});
