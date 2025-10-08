

import React from 'react'
import { redirect } from 'next/navigation'
import { getUserSession } from '@/actions/auth'
import { SessionProvider } from 'next-auth/react';

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
