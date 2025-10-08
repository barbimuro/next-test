'use client'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../app/users/usersSlice'
import { useState } from 'react'
//import { useLocation, redirect } from 'react-router'
import { useRouter} from 'next/navigation'
import { usePathname } from 'next/navigation'

function UserDropdown() {
    const users = useSelector(selectAllUsers)
    const [selectedUser, setSelectedUser] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const location = usePathname()

    const handleSelect = (user) => {
        setSelectedUser(user);
        router.push(`/users/${user.id}`)
        setOpen(false);
    }

    useEffect(() => {
        if(location === '/'){
            setSelectedUser(false)
        } [location]
})


  return (
    <>
      <button onClick={()=>setOpen(!open)}> {selectedUser ? selectedUser.name : 'Seleccionar usuario'}</button>
      {open && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
           <button onClick={()=>handleSelect(user)}> 
              {user.name}
            </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default UserDropdown
