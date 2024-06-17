'use client'
import React from 'react'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'


interface ChatWrapperProps {
  fileId:string
}




const ChatWrapper = ({fileId}:ChatWrapperProps) => {
  const {data,isLoading}= trpc.getFileUploadStatus.useQuery({
    fileId
  },
  {
    refetchInterval:500
     
  })

  if (isLoading)
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
            <h3 className='font-semibold text-xl'>
              Loading...
            </h3>
            <p className='text-zinc-500 text-sm'>
              We&apos;re fetching your messages.
            </p>
          </div>
        </div>

        <ChatInput isDisabled={true}/>
      </div>
    )
    if (data?.status === 'PROCESSING')
      return (
        <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
          <div className='flex-1 flex justify-center items-center flex-col mb-28'>
            <div className='flex flex-col items-center gap-2'>
              <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
              <h3 className='font-semibold text-xl'>
                Processing
              </h3>
              <p className='text-zinc-500 text-sm'>
                We&apos;re processing your messages.
               </p>              
            </div>
          </div>
  
          <ChatInput isDisabled={true}/>
        </div>
      )
  


  return (
    <div className='relative min-h-full bg-zinc-50 flex-col flex divide-y divide-zinc-200 justify-between gap-2 '>
      <div className=' flex-1 justify-between flex flex-col mb-2'>
        <Messages/>

        <ChatInput isDisabled={false}/>
      </div>
    </div>
  )
}

export default ChatWrapper