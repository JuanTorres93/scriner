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

export async function createEdit(edit) {
  const { data, error } = await supabase
    .from("edits")
    .insert(edit)
    .single()
    .select("*");

  if (error) {
    throw new Error("No se pudo crear la anotación");
  }

  return data;
}

export async function updateEdit(id, edit) {
  const { data, error } = await supabase
    .from("edits")
    .update(edit)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error("No se pudo actualizar la anotación");
  }

  return data;
}

export async function deleteEdit(id) {
  const { data, error } = await supabase
    .from("edits")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error("No se pudo eliminar la anotación");
  }

  return data;
}
