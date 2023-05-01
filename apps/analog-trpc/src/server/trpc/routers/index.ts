import { router } from '../trpc';
import { todoRouter } from './todos';

export const appRouter = router({
  todos: todoRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
