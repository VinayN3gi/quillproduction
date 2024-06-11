
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  authCallback: publicProcedure.query(async()=>{
    return"Hello"
  })
});

export type AppRouter = typeof appRouter;