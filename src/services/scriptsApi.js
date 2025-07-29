import supabase from "../supabase";

export async function getScripts() {
  const { data, error } = await supabase.from("scripts").select("*");

  return { data, error };
}
