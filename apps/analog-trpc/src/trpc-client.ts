import { inject } from '@angular/core';
import { createTrpcClient } from '@spartan-todo/trpc';
import { AppRouter } from './server/trpc/routers';

export const { provideTRPCClient, tRPCClient } = createTrpcClient<AppRouter>({
  url: 'http://localhost:4200/api/trpc',
});

export function injectTRPCClient() {
  return inject(tRPCClient);
}
