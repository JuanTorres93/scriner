import { createContext, useContext, useMemo } from "react";

/////// Repos
import { SupabaseScriptsRepo } from "../../../infrastructure/supabase/SupabaseScriptsRepo.js";
import { SupabaseUsersRepo } from "../../../infrastructure/supabase/user/SupabaseUsersRepo.js";
import { SupabaseEditsRepo } from "../../../infrastructure/supabase/edit/SupabaseEditsRepo.js";

/////// Use cases
// Scripts
import { CreateScript } from "../../../application/script/CreateScript.js";
import { DeleteScript } from "../../../application/script/DeleteScript.js";
import { GetScriptById } from "../../../application/script/GetScriptById.js";
import { GetScriptsByUser } from "../../../application/script/GetScriptsByUser.js";
import { UpdateScript } from "../../../application/script/UpdateScript.js";

// Edits
import { CreateEdit } from "../../../application/edit/CreateEdit.js";
import { DeleteEdit } from "../../../application/edit/DeleteEdit.js";
import { GetEditById } from "../../../application/edit/GetEditById.js";
import { GetEditsByScript } from "../../../application/edit/GetEditsByScript.js";
import { UpdateEdit } from "../../../application/edit/UpdateEdit.js";

// Users

const ServicesContext = createContext(null);

export function AppServicesProvider({ children }) {
  const value = useMemo(() => {
    const scriptsRepo = new SupabaseScriptsRepo();

    return {
      getScriptsByUser: new GetScriptsByUser(scriptsRepo),
      // add more use cases here
    };
  }, []);

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context)
    throw new Error("useServices must be used within AppServicesProvider");
  return context;
}
