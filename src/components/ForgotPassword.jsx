'use client'

import React, { use, useState } from 'react'
import AuthButtons from './AuthButton'
import { forgotPassword } from '@/actions/auth'
import AuthButton from './AuthButton'

function ForgotPassword() {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit= async (event)=>{
        event.preventDefault
        setLoading(true)
        setError(null)
        const formData = new FormData(event.currentTarget)
        const result = await forgotPassword(formData)
        if(result.status === 'success'){
            alert('Password reset link sent to your email')
        }else{
            setError(result.status)
        }
        setLoading(false)
    }

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div >
            <label className="block text-sm font-medium text-gray-200" htmlFor="email">Email</label>
            <input type="email" placeholder='email' id='email' name='email' className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"/>
        </div>
        <div className="mt-4">
        <AuthButton type='Send email' loading={loading}/>
      </div>
      </form>
    </div>
  )
}

export default ForgotPassword
