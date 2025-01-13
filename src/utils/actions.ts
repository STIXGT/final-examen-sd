"use server";

import { createClient } from "@/utils/supabase/server";
import { SignUpFormSchema } from "@/schema/auth";
import { LoginFormSchema } from "@/schema/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(values: z.infer<typeof LoginFormSchema>) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: values.email,
    password: values.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error("Invalid credentials");
  }

  return data;
}

export async function signup(values: z.infer<typeof SignUpFormSchema>) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    name: values.name,
    email: values.email,
    password: values.password,
  };

  const { error, data: signUpData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  });

  if (error) {
    throw new Error("Oops! Something went wrong");
  }

  return signUpData;
}
export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Oops! Something went wrong");
  }

  revalidatePath("/");
  redirect("/sing-in");
}
