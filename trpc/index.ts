
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/app/db';

export const appRouter = router({
  authCallback: publicProcedure.query(async()=>{
  const {getUser}=getKindeServerSession() 
  const user = await getUser()
  //check is the user exists in kinde
  if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Unauthorized'})


   //check is the user exists in database 
   const dbUser=await db.user.findFirst({
    where:{
      id:user.id
    }
  })


  if(!dbUser)//now user is not in database so we need to add it
    { 
      try {
        const create_user=await db.user.create({
          data:{
            id:user.id,
            email:user.email || '',
          }
        })
        console.log('create_user',create_user)
      } catch (error) {
        console.log('error',error)
      }
    }

  
   return dbUser
  }),
  getUserFiles:privateProcedure.query(async({ctx})=>{
    const {userId,user}=ctx 
    return await db.file.findMany({
      where:{
        userId
      }
    })
  })

  
});

export type AppRouter = typeof appRouter;