import supabase from "../supabase";

export async function getScripts(userId) {
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
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
    throw error;
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

export async function updateScript(id, script) {
  // TODO handle delete when it has edits. Right now it won't work
  const { data, error } = await supabase
    .from("scripts")
    .update(script)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error("No se pudo actualizar el guion");
  }

  return data;
}
