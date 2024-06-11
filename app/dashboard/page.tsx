
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

import React from 'react'
import Dashboard from '../components/Dashboard'

const page = async () => {
  const {getUser}=getKindeServerSession()
  const user=await getUser()

  if(!user || !user.id) redirect("/auth-callback?origin=/dashboard/page")

  return (
    <>
    <Dashboard/>
    </>
  )
}

export default page