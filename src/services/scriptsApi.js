import supabase from "../supabase";

export async function getScripts() {
  const { data, error } = await supabase.from("scripts").select("*");

  if (error) {
    throw new Error("Could not load scripts");
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
    throw new Error("Could not load script");
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
    throw new Error("Could not create script");
  }

  return data;
}
