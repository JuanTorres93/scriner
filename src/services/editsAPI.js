import supabase from "../supabase";

export async function getEdits() {
  const { data, error } = await supabase.from("edits").select("*");

  if (error) {
    throw new Error("No se pudieron cargar las anotaciones");
  }

  return data;
}

export async function getEditById(id) {
  const { data, error } = await supabase
    .from("edits")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("No se pudo cargar la anotación");
  }

  return data;
}
