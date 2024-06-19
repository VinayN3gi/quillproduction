import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import React from 'react'

interface ChatInputProps {
  isDisabled:boolean
}

const ChatInput = ({isDisabled}:ChatInputProps) => {
  if(isDisabled)
  return 
  (
    <>
    </>
  )
  return (
    <div className=' aboslute bottom-0 left-0  w-full '>
      <form className=' mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-1 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
          <div className='w-full relative flex-col flex h-full flex-1 items-stretch md:flex md:flex-col'>
            <div className=' relative'>
                  <Textarea rows={1} 
                  className='resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-ligther scrollbar-w-2 scrolling-touch'
                  autoFocus maxRows={4} placeholder=' Enter your question'/>
              <Button className=' absolute bottom-1.5 right-[8px] '
              size="sm">
                <Send className=' h-4 w-4'/>
              </Button>
            </div>
          </div>
      </form>
   
      
      
      </div>
  )
}

export default ChatInput