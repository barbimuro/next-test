import React from 'react'
import { redirect } from 'next/navigation'
import { getUserSession } from '@/actions/auth'

async function AuthLayout({children}) {
    
  const response = await getUserSession()
  if(response?.user){
    redirect('/')
  }

  return (
    <>
      {children}
    </>
  )
}

export default AuthLayout
