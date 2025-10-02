import React from 'react'

import ResetPassword from '@/components/ResetPassword'

function ResetPasswordPage() {
  return (
    <div>
      <div className="w-full flex mt-20 justify-center">
        <section className="flex flex-col w-[400px]">
          <h1 className="text-3xl w-full text-center font-bold mb-6">Reset Password</h1>
          <ResetPassword/>
        </section>
    </div>
    </div>
  )
}

export default ResetPasswordPage
