'use client'

import React, { useState } from 'react'
import { signout } from '@/actions/auth'

function Logout() {

    const [loading, setLoading] = useState(false)
    const handleLogout = async (event) =>{
        event.preventDefault()
        setLoading(true)
        await signout()
        setLoading(false)
    }
    
  return (
    <div>
      <form onSubmit={handleLogout}>
              <button type='submit' disabled={loading}>
                  {loading ? 'Signin out...' : 'Sign out'}
                          </button>
      </form>
    </div>
  )
}

export default Logout
