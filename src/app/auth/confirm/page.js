import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') 
  const code = searchParams.get('code') 
  const next = searchParams.get('next') ?? '/'


  if(code){
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if(!error){
      const { data, error: userError } = await supabase.auth.getUser()
      if(userError){
        console.log('error fetching user', userError.message)
        return NextResponse.redirect(`${origin}/error`)
      }
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', data?.user?.email)
        .limit(1)
        .single()

        if(existingUser){
          const { error: dbError } = await supabase.from('users')
          .insert({
            email: data?.user?.email,
            userName: data?.user?.user_metadata?.user_name
          })
          if(dbError){
            console.log('error inserting user', dbError.message)
            return NextResponse.redirect(`${origin}/error`)
      }
          }
        }

      
    }
  }

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
