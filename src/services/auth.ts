'use server'

import {createAdminClient} from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import {getURL, routes} from "@/lib/utils";
import {redirect} from "next/navigation";

export const getUser = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export const signIn = async (email: string, password: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  })
  if (error) {
    throw new Error('Sign in failed')
  }

  return data
}

export async function logOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()
  redirect(routes.login)
}

export async function requestPasswordReset(email: string) {
  const supabase = await createClient()
  const res = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}/account`
  })
  if (res.error) {
    throw new Error('Failed to request password reset')
  }
  return true
}


export const updatePassword = async ({
  token,
  password,
}: {
  token: string
  password: string
}) => {
  const supabase = await createClient()
  const verify = await supabase.auth.verifyOtp({
    type: 'recovery',
    token_hash: token,
  })
  if (verify.error) {
    throw new Error("Failed to verify token")
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })
  if (error) {
    throw new Error("Failed to update password")
  }
  return true
}

export const setPassword = async ({
  token,
  password,
}: {
  token: string
  password: string
}) => {
  const supabase = await createClient()
  const verify = await supabase.auth.verifyOtp({
    type: 'invite',
    token_hash: token,
  })
  if (verify.error) {
    throw new Error("Failed to verify token")
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })
  if (error) {
    throw new Error("Failed to set password")
  }
  return true
}

export async function signUp({email, password}: {email: string, password: string}) {
  console.log('*** signUp ***', email)
  const supabase = await createClient()

  const {error} = await supabase.auth.signUp({
    email: email,
    password: password,
  })


  console.log({error})

  if (error) {
    throw new Error("Failed to invite user")
  }

  return true
}

export async function deleteUser() {
  const supabase = await createClient()
  const { data: {user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not found')
  }
  const supabaseAdmin = await createAdminClient()
  await supabaseAdmin.auth.admin.deleteUser(user.id)
  redirect(routes.login)
}