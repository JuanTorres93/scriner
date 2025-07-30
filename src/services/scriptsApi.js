import supabase from "../supabase";

export async function getScripts() {
  const { data, error } = await supabase.from("scripts").select("*");

  return { data, error };
}

export async function getScriptById(id) {
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}
