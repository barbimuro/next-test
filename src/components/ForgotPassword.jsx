'use client'

import React, { use, useState } from 'react'
import AuthButtons from './AuthButton'
import { forgotPassword } from '@/actions/auth'

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
      
    </div>
  )
}

export default ForgotPassword
