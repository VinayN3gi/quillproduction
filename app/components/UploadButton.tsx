'use client'
import { Button } from '@/components/ui/button'
import { DialogContent ,Dialog,DialogTrigger} from '@/components/ui/dialog'

import React, { useState } from 'react'


const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
    
  
  return (
    <Dialog open={isOpen} onOpenChange={(v)=>{
        if(!v) setIsOpen(v)
    }}>
     <DialogTrigger asChild onClick={()=>setIsOpen(true)}>
        <Button> 
            Upload PDF
        </Button>
    </DialogTrigger>
    <DialogContent>
        example content
    </DialogContent>   
    </Dialog>
  )
}

export default UploadButton