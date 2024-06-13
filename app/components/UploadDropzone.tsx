'use client'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { Check, Cloud, File, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { trpc } from '../_trpc/client'


const UploadDropzone = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const {startUpload}=useUploadThing("pdfUploader")
    const {toast}=useToast()
    const [onComplete, setOnComplete] = useState<boolean>(false)
    const {mutate:polling}=trpc.getFile.useMutation({
      onSuccess:(file)=>{
        router.push(`/dashboard/${file.id}`)  
      },
      retry:true,
      retryDelay:500
    })
   
    const router=useRouter()
   
  
   
   
    return (
    <Dropzone multiple={false} onDrop={async (acceptedFiles)=>{
        setIsUploading(true)
        console.log(acceptedFiles)
        const res=await startUpload(acceptedFiles)
        if(!res) return toast({
            title:"Upload failed",
            description:"Please try again",
            variant:"destructive"
        })
          console.log(res)
         const [fileResponse]=res
         const key=fileResponse.key
         if(!key) return toast({
              title:"Upload failed",
              description:"Please try again",
              variant:"destructive"
         })
         polling({key})
        setIsUploading(false)
        setOnComplete(true)
    }}>
       { ({getRootProps,getInputProps,acceptedFiles})=>(
            <div {...getRootProps()} className='border h-64 border-dashed m-4 border-gray-300 rounded-lg'>
             <div className=' flex items-center justify-between w-full h-full'>
                <label htmlFor="dropzone-file"
                className=' flex flex-col items-center justify-center w-full h-full cursor-pointer rounded-lg bg-gray-50 hover:bg-gray-300'
                >
                  <div className=' flex flex-col items-center justify-center pt-5 pb-6'>
                        <Cloud className=' h-6 w-6 text-zinc-500 mb-2'/>
                        <p className='mb-2 text-sm text-zinc-700'>
                            <span className=' font-semibold'>
                                   Click to upload a file 
                            </span>
                            { " "}
                            <span>
                                or drag and drop a file here
                            </span>
                        </p>
                        <p className=' text-xs text-zinc-500 '>
                            PDF (upto 4MB)
                        </p>
                    </div>  
                      {acceptedFiles[0] && acceptedFiles ? (
                            <div className=' max-w-xs bg-white flex itemms-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200 '>
                                   <div className=' px-3 py-2 grid h-full place-items-center'>
                                    <File className=' h-4 w-4 text-blue-500'/>
                                    </div> 
                                    <div className=' px-3 py-2 h-full text-sm truncate'>
                                        {acceptedFiles[0].name}
                                    </div>
                            </div>
                      ):(
                        null
                      )}  
                      {
                        isUploading ? (
                            <div className='flex mt-4 '>
                                   <Loader2 className='w-6 h-6 animate-spin' color="blue"/> 
                            </div>
                        ):
                        null
                      }
                      {
                          onComplete ? (
                            <div className=' flex mt-2'>
                              <Check className='w-6 h-6 text-blue-500'/>
                            </div>
                          ): null
                      }  
                      <input {...getInputProps()} id="dropzone-file" className='hidden'/>
                </label>
            </div>       

            </div>
       )

       }
    </Dropzone>
  )
}

export default UploadDropzone