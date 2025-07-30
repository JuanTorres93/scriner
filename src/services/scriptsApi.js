import supabase from "../supabase";

export async function getScripts() {
  const { data, error } = await supabase.from("scripts").select("*");

  if (error) {
    throw new Error("No se pudieron cargar los guiones");
  }

  return data;
}

export async function getScriptById(id) {
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("No se pudo cargar el guion");
  }

  return data;
}

export async function createScript(script) {
  const { data, error } = await supabase
    .from("scripts")
    .insert(script)
    .single()
    .select("*");

  if (error) {
    throw new Error("No se pudo crear el guion");
  }

  return data;
}

export async function deleteScript(id) {
  const { error } = await supabase.from("scripts").delete().eq("id", id);

  if (error) {
    throw new Error("No se pudo eliminar el guion");
  }

  return true;
}
