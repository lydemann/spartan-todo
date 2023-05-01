import { inject } from '@angular/core';
import { createTrpcClient } from '@spartan-todo/trpc';
import { AppRouter } from './server/trpc/routers';

export const { provideTRPCClient, tRPCClient } = createTrpcClient<AppRouter>({
  url: 'http://127.0.0.1:4200/api/trpc',
});

export function injectTRPCClient() {
  return inject(tRPCClient);
}
