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
  component: CodeWashing,
});

export const customerServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer-service',
  component: CustomerService,
});

export const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: FAQ,
});

export const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/games',
  component: Games,
});

export const mailBoxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mail-box',
  component: Mailbox,
});

export const personalInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/personal-info',
  component: PersonalInfo,
});

export const promotionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/promotion-agent',
  component: PromotionAgent,
});

export const rechargeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recharge',
  component: Recharge,
});

export const rechargeHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recharge-history',
  component: RechargeHistory,
});

export const safeBoxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/safe-box',
  component: SafeBox,
});

export const shareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/share',
  component: Share,
});

export const webviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/webview',
  component: WebView,
});

export const withdrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/withdraw',
  component: Withdraw,
});
