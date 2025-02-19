import { createClient } from "@/utils/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  age: z.number().min(1).max(120),
  weight: z.number().min(1).max(300),
  height: z.number().min(50).max(250),
  gender: z.string(),
});

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const result = userSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.format() },
        { status: 400 }
      );
    }

    console.log(result.data);
    const { data, error } = await supabase
      .from("users")
      .insert([result.data])
      .select();
    console.log(data);
    console.log("ERRORSOTO", error);
    if (error) {
      return NextResponse.json(
        { error: "Error al crear el usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Usuario creado exitosamente", data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, ...updateData } = body;

    const result = userSchema.safeParse(updateData);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.format() },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .update(result.data)
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Error al actualizar el usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Usuario actualizado exitosamente",
      data,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { error } = await supabase.from("users").delete().eq("id", body.id);

    if (error) {
      return NextResponse.json(
        { error: "Error al eliminar el usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
