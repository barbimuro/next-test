'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'

function ClientComponent() {
    const [user, setUser] = useState(null)

   
    useEffect(()=>{
        async function getUser() {
            const supabase = createClient()
            const {data, error} = await supabase.auth.getUser()
            if (error || !data?.user) { 
                console.log('user does not exist')
            }else{
                setUser(data?.user)
            }
        }
        getUser()
    },[])

  return <h2>{user?.email}</h2>
}

 

export default ClientComponent
