'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ChevronDown, ChevronUp, Loader2, Rotate3D, RotateCw } from 'lucide-react'
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { useResizeDetector } from 'react-resize-detector'
import Simplebar from 'simplebar-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Search } from 'lucide-react'
  


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfRendererProp{
    url: string

}


const PdfRenderer = ({url}:PdfRendererProp) => {
    const {toast}=useToast()
    const {width,ref}=useResizeDetector()
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [totalPage,setTotalPage]=useState<number>(0)
    const [scale,setScale]=useState<number>(1)
    const [rotation,setRotation]=useState<number>(0)

  return (
    <div className=' w-full bg-white rounded-md shadow flex flex-col '>
        <div className=' h-14  border-b border-zinc-200 items-center justify-between px-2'>
            <div className=' flex items-center gap-1.5 mt-2'>
                <div className=' flex flex-1 '>
              <Button
              disabled={pageNumber===totalPage}
                onClick={()=>{
                    setPageNumber((prev)=>(
                        prev+1 <= totalPage ? prev+1 : prev
                    ))
                }}        

              variant="ghost" aria-label='previous-page'>
                     <ChevronDown className=' h-4 w-4'/>   
              </Button>
                    
                <div className=' mt-2'>
                    {pageNumber} of {totalPage}
                </div>
                
                
                <Button 
                disabled={pageNumber===1}
                onClick={()=>{
                    setPageNumber((prev)=>(
                        prev-1 >= 1 ? prev-1 : prev
                    ))
                }}
                variant="ghost" aria-label='next-page'>
                         <ChevronUp className=' h-4 w-4'/>
                </Button>   
                </div>
                <div className=' space-x-2 flex flex-[0.75]  justify-end'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"  className=' gap-2'>
                            <Search className=' h-4 w-4'/>
                            {scale*100}%
                            <ChevronDown className=' h-4 w-4 opacity-50'/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={()=>{
                            setScale(1)
                        }}>
                            100%
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={()=>{
                            setScale(1.5)
                        }}>
                            150%
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={()=>{
                            setScale(2)
                        }}>
                            200%    
                       </DropdownMenuItem>     
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" onClick={()=>
                    setRotation((prev)=>(
                        prev+90
                    ))
                }>
                        <RotateCw className=' h-4 w-4'/>
                </Button>
                </div>   
                </div>

        </div>
        <div className=' flex-1 w-full max-h-80vh'>
            <Simplebar autoHide={false} className='max-h-[calc(80vh - 10 rem)]'>
            <div ref={ref}>
            <Document 
            loading={
                <div className=' flex justify-center '>
                      <Loader2 className=' my-24 h-6 w-6 animate-spin'/>      
                </div>
            }
            onLoadError={()=>
                toast({
                    title:'Error loading pdf',
                    description:'An error occured while loading the pdf',
                    variant:'destructive'
                })
            }
            onLoadSuccess={({numPages})=>{
               setTotalPage(numPages)
            
            }}
            file={url} className="max-h-full">
                <Page  width={width ? width:1}
                pageNumber={pageNumber}
                scale={scale} 
                renderTextLayer={false}
                rotate={rotation}/>
            </Document>
            </div>
        </Simplebar>
        </div>
    </div>
  )
}

export default PdfRenderer