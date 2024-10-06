import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase"; // Importa supabase

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error al cerrar sesión:", error.message); // Agrega esto para depurar
    return new Response(error.message, { status: 500 });
  }

  // Eliminar las cookies
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });

  // Redirigir a la página principal después de cerrar sesión
  return redirect("/");
};
