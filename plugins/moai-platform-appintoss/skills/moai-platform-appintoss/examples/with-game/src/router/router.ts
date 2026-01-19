import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';
import { TitlePage } from '@/pages/TitlePage';
import { GamePage } from '@/pages/GamePage';

const rootRoute = createRootRoute();

const startRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: TitlePage,
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game',
  component: GamePage,
});

const routeTree = rootRoute.addChildren([startRoute, gameRoute]);
export const router = createRouter({ routeTree });
