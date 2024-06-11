'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'


const page = () => {
    const router = useRouter()
    const searchParams=useSearchParams()
    const origin=searchParams.get('origin')
    const {data,isLoading,error}=trpc.authCallback.useQuery(undefined,{
      retry:true,
      retryDelay:500,
    })

    if(error) console.log('error',error)

    if(!data) return(
      <div className=' w-full mt-24 flex justify-center '>
        <div className=' flex flex-col items-center gap-2'>
            <Loader2 className=' h-8 w-8 animate-spin text-zinnc-800'/>
            <h3 className=' font-semibold text-xl'>Settting up your account please wait....</h3>
            <p>You will be automatically redirected </p>
        </div>

      </div>
    )


    router.push(origin ? `/${origin}` : '/dashboard')

  
}

export default page