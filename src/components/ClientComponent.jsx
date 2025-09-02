'use client'

import React, { useEffect, useState } from 'react'

function ClientComponent() {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        async function getUser() {
            setUser(null)
        }
        getUser()
    },[])

  return <h2>{user?.email}</h2>
}

export default ClientComponent
