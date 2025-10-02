'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import { headers } from "next/headers";

export async function signup(formData) {
    const supabase = await createClient()
    const credentials = {
        username: formData.get('username'),
        email: formData.get('email'),
        password:formData.get('password')
        }
        const {error, data} = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            options: {
                data: {
                    username: credentials.username
                }
            }
        })
    if(error){
        return {
            status: error?.message, 
            user: null
        }
    } else if(data?.user?.identities?.length === 0){
        return{
            status: 'user with this email already exists',
            user: null
        }
    }
    revalidatePath('/', 'layout')
    return {
        status: 'success',
        user: data.user
    }
}

export async function signin(formData){
    const supabase = await createClient()
    const credentials = {
        email: formData.get('email'),
        password:formData.get('password')
        }
        const {data, error} =await supabase.auth.signInWithPassword(credentials)
        if(error){
            return {status:error?.message, 
                user:null}
        } 
      
    const {data: existingUser} = supabase
    .from('users')
    .select('*')
    .eq('email', credentials?.email)
    .limit(1)
    .single()

    if(!existingUser){
        const {error: insertError} = await supabase.from('users').insert({
            email: data?.user?.email,
            username: data?.user?.user_metadata.username
        })

        if(insertError){
            return{
                status: insertError?.message,
                    user: null
            }
        }
    }
    revalidatePath('/', 'layout')
    redirect('/')
        return{
            status: 'success',
            user: data.user
        }

}



export async function signout() {
    const supabase = await createClient()
    const {error} = await supabase.auth.signOut()
    if(error){
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/login')
    
}

export async function getUserSession() {
    const supabase = await createClient()
    const {data, error} = await supabase.auth.getUser()
    if(error){
        return null
    }
    return {status: 'success', user: data?.user}
}

export async function signInWithGithub() {
    const origin = (await headers()).get('origin')
    console.log(origin)
    const supabase = await createClient() 
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`
        }
    }) 

    if(error){
        redirect('error')
    }else if(data.url){
        return redirect(data.url)
    }
}

export async function forgotPassword(formData) {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')
    const {error} = await supabase.auth.resetPasswordForEmail(
        formData.get('email'), 
        {redirectTo: `${origin}/reset-password`}
    )
    if (error) {
        return {
            status: error?.message
        }
    }
        return{
            status: 'success'
        }
    }

    export async function resetPassword(formData, code) {
        const supabase = await createClient()
        const origin = (await headers()).get('origin')
        const {codeError} = await supabase.auth.exchangeCodeForSession(
            // https://tzuhstyocokeljnxtkfb.supabase.co/auth/v1/verify?token=pkce_3ce45a199906cfe3fa8536f1a25e2a6aa51bf085801ab2598d9113d1&type=recovery&redirect_to=http://localhost:3000/reset-password
            code
        )
           if (codeError) {
            return {
                status: error?.message
            }
        }

        const {error} = await supabase.auth.updateUser({
            password : formData.get('password')
        })

        if (error) {
            return {
                status: error?.message
            }
        }
            return{
                status: 'success'
            }
        }