'use client'

import { signInWithGoogle } from '@/actions/auth'
import React, {useTransition} from 'react'
import {FaGoogle} from 'react-icons/fa'

function LogInGoogle() {

    const [isPending, startTransition] = useTransition()
    const handleGoogleLogin = () =>{
        startTransition(async()=>{
            await signInWithGoogle()
        })
    }
    
  return (
    <div
        onClick={handleGoogleLogin}
        className="w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-white-800 rounded-md p-4 flex justify-center items-center border-2">
          <FaGoogle/>
          <p className="text-black">{isPending ? 'Redirecting...':'Login with Google'}</p> 
    </div>
  )
}

export default LogInGoogle



/*"use client"

import { handleSignIn, handleSignOut } from '../lib/auth';
import { useSession } from 'next-auth/react';

export default function LogInGoogle() {
  const { data: session } = useSession();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      {session ? (
        <div>
          <h2 className="text-lg font-medium text-gray-700">
            Welcome, {session.user.name}!
          </h2>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      )}
    </main>
  );
}*/