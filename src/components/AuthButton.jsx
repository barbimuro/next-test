import React from 'react'

function AuthButton({type,loading}) {

  return (
      <button type='submit' disabled={loading} className={`${loading ? 'bg-gray-600' : 'bg-blue-600'}
   rounded-md w-full px-12 py-3 text-sm font-medium text-white`}  > 
   {loading ? 'LOADING...' : type}
    </button>
  )
}

export default AuthButton
