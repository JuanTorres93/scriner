import { createContext, useContext, useMemo } from "react";

/////// Repos
import { SupabaseScriptsRepo } from "../../../infrastructure/supabase/script/SupabaseScriptsRepo.js";
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
import { Signup } from "../../../application/user/Signup.js";
import { Login } from "../../../application/user/Login.js";
import { GetCurrentUser } from "../../../application/user/GetCurrentUser.js";
import { Logout } from "../../../application/user/Logout.js";

const ServicesContext = createContext(null);

// TODO use context in the main app to start using the new arquitechture and fix the errors
export default function AppServicesProvider({ children }) {
  const value = useMemo(() => {
    const scriptsRepo = new SupabaseScriptsRepo();
    const usersRepo = new SupabaseUsersRepo();
    const editsRepo = new SupabaseEditsRepo();

    return {
      // Scripts
      createScript: new CreateScript(scriptsRepo),
      deleteScript: new DeleteScript(scriptsRepo),
      getScriptById: new GetScriptById(scriptsRepo),
      updateScript: new UpdateScript(scriptsRepo),
      getScriptsByUser: new GetScriptsByUser(scriptsRepo),
      // Users
      signup: new Signup(usersRepo),
      login: new Login(usersRepo),
      getCurrentUser: new GetCurrentUser(usersRepo),
      logout: new Logout(usersRepo),

      // Edits
      createEdit: new CreateEdit(editsRepo),
      deleteEdit: new DeleteEdit(editsRepo),
      getEditById: new GetEditById(editsRepo),
      getEditsByScript: new GetEditsByScript(editsRepo),
      updateEdit: new UpdateEdit(editsRepo),
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
