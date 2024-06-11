import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'

const Navbar = () => {
  return (
    <nav className=' sticky top-0 inset-x-0 h-14 z-30 border-b border-gray-200 bg-white/75 backdrop:blur-lg transition-all w-full'>
        <MaxWidthWrapper className=' md:p-0 sm:p-0'>
            <div className=" flex h-14 items-center justify-between md:border-b border-zinc-200  ">
               <Link href="/" className=' font-semibold flex z-40'>
               Quill
               </Link>
               <div className=' hidden items-center space-x-4 sm:flex'>
                <>
                  <Link  href="/pricing"className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm'
                  })}>
                    Pricing
                  </Link>
                  <LoginLink className={buttonVariants()}>
                    Log In
                  </LoginLink>
                  <RegisterLink className={buttonVariants()}>
                    Sign Up
                  </RegisterLink>
                </>
               </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar