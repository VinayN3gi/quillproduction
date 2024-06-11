'use client'
import React from 'react'
import { trpc } from '../_trpc/client'

const Dashboard = () => {
    const {data,isLoading}=trpc.authCallback.useQuery()
    if(!data) return <div>Loading...</div>

    return (
    <div>{data}</div>
  )
}

export default Dashboard