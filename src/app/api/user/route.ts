import { createClient } from "@/utils/supabase/server";
import exp from "constants";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// Reutilizamos el mismo esquema del formulario para validar en el backend
const userInfoSchema = z.object({
  age: z.number().min(1).max(120),
  gender: z.string(),
  weight: z.number().min(1).max(300),
  height: z.number().min(50).max(250),
  allergies: z.array(z.string()).optional(),
  user_id: z.string(),
});
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json(
      { error: "No estás autenticado" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("user_info")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = {
    ...data,
    email: user.email,
    display_name: user.user_metadata?.full_name,
  };

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const body = await request.json();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    body.user_id = user?.id;

    const result = userInfoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.format() },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("user_info")
      .upsert(result.data)
      .select();
    if (error) {
      return NextResponse.json(
        { error: "Error al guardar los datos" },
        { status: 500 }
      );
    }

    // 4. Retornar respuesta exitosa
    return NextResponse.json(
      { message: "Datos guardados exitosamente", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  const body = await request.json();
  const { data, error } = await supabase
    .from("user_info")
    .delete()
    .match({ id: body.id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: authError ? authError.message : "No estás autenticado" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { email, name, age, weight, gender, height, allergies } = body;

  const { data: updatedAuth, error: authUpdateError } =
    await supabase.auth.admin.updateUserById(user.id, {
      email,
      user_metadata: { full_name: name },
    });

  if (authUpdateError) {
    return NextResponse.json(
      { error: authUpdateError.message },
      { status: 500 }
    );
  }

  // 4. Actualizar datos en la tabla user_info (age, weight, gender, height, allergies)
  const { data: updatedInfo, error: tableUpdateError } = await supabase
    .from("user_info")
    .update({
      age,
      weight,
      gender,
      height,
      allergies,
    })
    .eq("user_id", user.id);

  if (tableUpdateError) {
    return NextResponse.json(
      { error: tableUpdateError.message },
      { status: 500 }
    );
  }

  // 5. Retornar respuesta combinada
  return NextResponse.json({
    message: "Perfil actualizado exitosamente",
    auth: updatedAuth,
    userInfo: updatedInfo,
  });
}
