
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/app/db';
import * as z from 'zod';


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
  }),
  deleteFile:privateProcedure.input(z.object({
    id:z.string()
  })).mutation(async ({ctx,input})=>{
      const {userId,user}=ctx
      const {id}=input
      const file=await db.file.findFirst({
        where:{
          id,
          userId
        }
      })
      if(!file) throw new TRPCError({code:'NOT_FOUND',message:'File not found'})
      await db.file.delete({
        where:{
          id
        }
      })  

      return file
  }),
  getFile:privateProcedure.input(z.object({
    key:z.string()
  })).mutation(async ({ctx,input})=>{
      const {userId,user}=ctx
      const file=await db.file.findFirst({
        where:{
          key:input.key,
          userId
        }
      })
    if(!file) throw new TRPCError({code:'NOT_FOUND',message:'File not found'})  
    return file
  }),
  
  getFileUploadStatus:privateProcedure.input(z.object({fileId:z.string()})).query(async ({ctx,input})=>{
      const file=await db.file.findFirst({
        where:{
          id:input.fileId
        }
      })
      if(!file) return {status:"PENDING" as const}
      return {status:file.uploadStatus}
  })
});

  

export type AppRouter = typeof appRouter;