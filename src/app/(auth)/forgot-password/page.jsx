import React from 'react'
import ForgotPassword from '@/components/ForgotPassword'

function ForgotPasswordPage() {
  return (
    <> 
    {/*<div>
      <section>
        <h1>Forgot password</h1>
        <ForgotPassword/>
      </section>
  </div>*/}

  
    <div className="w-full flex mt-20 justify-center">
        <section className="flex flex-col w-[400px]">
          <h1 className="text-3xl w-full text-center font-bold mb-6">Forgot Password</h1>
          <ForgotPassword/>
        </section>
    </div>
    </>
  )
}

export default ForgotPasswordPage
