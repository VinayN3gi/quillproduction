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
    <div>Chat Input</div>
  )
}

export default ChatInput