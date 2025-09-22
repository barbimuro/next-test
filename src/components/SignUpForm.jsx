'use client'

import React, { useState } from 'react'
import AuthButton from './AuthButton'
import LogInGitHub from './LogInGitHub'
import { useRouter } from 'next/navigation'
import { signup } from '@/actions/auth'

function SignUpForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()

    const handleSubmit=async (event)=>{
        event.preventDefault()
        setLoading(true)
        setError(null)
        const formData = new FormData(event.currentTarget)
      const result = await signup(formData)
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
          <label className="block text-sm font-medium text-gray-200">
            Username
          </label>
              <input
                  type="username"
                  placeholder="username"
                   id="username"
                   name="username"
                   className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"/>
                  <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
            <input type="email"
                  placeholder="email"
                   id="email"
                   name="email"
                   className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
             <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
              <input type="password"
                  placeholder="password"
                   id="password"
                   name="password"
                   className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
              <button type='submit'>Sign Up</button>
              <div className="mt-4">
            <AuthButton type='login' loading={loading}/>
            <LogInGitHub/>
              </div>
              {error && <p className="text-red-500">{error}</p>}
        </form>
    </div>
  )
}

export default SignUpForm
