"use server";

import { createClient } from "@/utils/supabase/server";
import { SignUpFormSchema } from "@/schema/auth";
import { LoginFormSchema } from "@/schema/auth";
import { z } from "zod";

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
    email: values.email,
    password: values.password,
  };

  const { error, data: signUpData } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error("Oops! Something went wrong");
  }

  return signUpData;
}
