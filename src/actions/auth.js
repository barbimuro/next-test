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
    .from('Users')
    .select('*')
    .eq('Email', credentials?.email)
    .limit(1)
    .single()

    if(!existingUser){
        const {error: insertError} = await supabase.from('Users').insert({
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
    const supabase = await createClient() 
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: "github", options:{
            redirectTo: `${origin}/auth/callback`
        }
    }) 

    if(error){
        redirect('error')
    }else if(data.url){
        return redirect(data.url)
    }
}