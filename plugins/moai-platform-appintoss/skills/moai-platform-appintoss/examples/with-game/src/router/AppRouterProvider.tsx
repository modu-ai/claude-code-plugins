import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router';

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
