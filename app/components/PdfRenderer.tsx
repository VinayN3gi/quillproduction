'use client'
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfRendererProp{
    url: string

}


const PdfRenderer = ({url}:PdfRendererProp) => {
  return (
    <div className=' w-full bg-white rounded-md shadow flex flex-col items center'>
        <div className=' h-14  border-b border-zinc-200 items-center justify-between px-2'>
            <div className=' flex items-center gap-1.5'>
              
            </div>
        </div>
        <div className=' flex-1 w-full max-h-screen'>
            <div>
            <Document file={url} className="max-h-full">
                <Page pageNumber={1} />
            </Document>
            </div>
        </div>
    </div>
  )
}

export default PdfRenderer