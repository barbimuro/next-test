import { createClient } from '../../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') 
  const code = searchParams.get('code') 
  const next = searchParams.get('next') ?? '/'


  if(code){
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if(!error){
      const { data, error: userError } = await supabase.auth.getUser()
      if (userError) {
         console.log('hello');
        console.log('error fetching user', userError.message)
        return NextResponse.redirect(`${origin}/error`)
      }
      const { data: existingUser } = await supabase.from('users')
      .select('*')
      .eq('email',data?.user?.user_metadata?.email)
      .limit(1)
      .single()   
        
      
      console.log(existingUser);
      console.log(data?.user?.user_metadata?.email);
        if(!existingUser){
          const { error: dbError } = await supabase
            .from('users')
            .insert({
              email: data?.user?.user_metadata?.email,
              username: data?.user?.user_metadata?.user_name,
            });
          if (dbError) {
            console.log('error inserting user', dbError.message)
            return NextResponse.redirect(`${origin}/error`)
          }
        }
     }

      redirect(`${origin}${next}`);
    }}
 
 
 


  // if (token_hash && type) {
  //   const supabase = await createClient()

  //   const { error } = await supabase.auth.verifyOtp({
  //     type,
  //     token_hash,
  //   })
  //   if (!error) {
  //     // redirect user to specified redirect URL or root of app
  //     redirect(next)
  //   }
  // }
  // redirect('/error')
 
  // redirect the user to an error page with some instructions





//   import { type EmailOtpType } from '@supabase/supabase-js'
// import { type NextRequest } from 'next/server'
// import { createClient } from '@/utils/supabase/server'
// import { redirect } from 'next/navigation'
// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url)
//   const token_hash = searchParams.get('token_hash')
//   const type = searchParams.get('type') as EmailOtpType | null
//   const next = searchParams.get('next') ?? '/'
  
  
  
  
  
//   if (token_hash && type) {
//     const supabase = await createClient()
//     const { error } = await supabase.auth.verifyOtp({
//       type,
//       token_hash,
//     })
//     if (!error) {
//       // redirect user to specified redirect URL or root of app
//       redirect(next)
//     }
//   }
//   // redirect the user to an error page with some instructions
//   redirect('/error')
// }