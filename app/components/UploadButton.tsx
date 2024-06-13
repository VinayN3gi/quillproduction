'use client'
import { Button } from '@/components/ui/button'
import { DialogContent ,Dialog,DialogTrigger} from '@/components/ui/dialog'
import Dropzone from 'react-dropzone'
import React, { useState } from 'react'
import UploadDropzone from './UploadDropzone'



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
        <UploadDropzone/>
    </DialogContent>   
    
    
    </Dialog>
  )
}

export default UploadButton