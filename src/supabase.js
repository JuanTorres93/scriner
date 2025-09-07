// TODO move this file to services
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jcemvkcdgjapayhiuywk.supabase.co";
// According to the Supabase documentation, there's no problem with exposing the key as long as RLS are properly set up
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZW12a2NkZ2phcGF5aGl1eXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTY2OTIsImV4cCI6MjA2OTI5MjY5Mn0.izdwLPI5t3bLlCNKa6LRkk6-5wlE_BnoysEN6MODOSg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
