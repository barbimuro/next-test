'use client'

import React, { use, useState } from 'react'
import AuthButtons from './AuthButton'
import { resetPassword } from '@/actions/auth'
import AuthButton from './AuthButton'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'

function ResetPassword() {

    
    const searchParams = useSearchParams()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

 const router = useRouter() 
  
    const handleSubmit= async (event)=>{
        event.preventDefault
        setLoading(true)
        setError(null)
        const formData = new FormData(event.currentTarget)
        const result = await resetPassword(formData, searchParams.get('code'))
        if(result.status === 'success'){
            router.push('/')
        }else{
            setError(result.status)
        }
        setLoading(false)
    }

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div >
            <label className="block text-sm font-medium text-gray-200" htmlFor="password">New Password</label>
            <input type="password" placeholder='new password' id='password' name='password' className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"/>
        </div>
        <div className="mt-4">
        <AuthButton type='Reset Password' loading={loading}/>
      </div>
      </form>
    </div>
  )
}

export default ResetPassword
