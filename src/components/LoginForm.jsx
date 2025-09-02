'use client'

import React, { useState } from 'react'
import AuthButton from './AuthButton'
import {signin} from '../actions/auth'
import { useRouter } from 'next/navigation'
import LogInGitHub from './LogInGitHub'

function LoginForm() {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()

    const handleSubmit= async(event)=>{
      event.preventDefault()
      setLoading(true)
      setError(null)
      const formData = new FormData(event.currentTarget)
    const result = await signin(formData)
    if(result.status === 'success'){
      router.push('/')
    }else{
      setError(result.status)
    }
    setLoading(false)
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit}  className="w-full flex flex-col gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-200" htmlFor="email">Email</label>
            <input type="text" placeholder='email' id='email' name='email' className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-200" htmlFor="password">Password</label>
            <input type="password" placeholder='password' id='password' name='password' className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"/>
        </div>
        <div className="mt-4">
            <AuthButton type='login' loading={loading}/>
            <LogInGitHub/>
              </div>
              {error && <p className="text-red-500"> {error} </p>}
      </form>
    </div>
  )
}

export default LoginForm
