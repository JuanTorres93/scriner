// interface-adapters/react/context/AppServicesProvider.jsx
import { createContext, useContext, useMemo } from "react";

import supabase from "../../../infrastructure/supabase/client.js";

// Infra: repos
import { SupabaseScriptsRepo } from "../../../infrastructure/supabase/script/SupabaseScriptsRepo.js";
import { SupabaseEditsRepo } from "../../../infrastructure/supabase/edit/SupabaseEditsRepo.js";
import { SupabaseUsersRepo } from "../../../infrastructure/supabase/user/SupabaseUsersRepo.js";

// Application: casos de uso
import { GetScriptsByUser } from "../../../application/script/GetScriptsByUser.js";
import { GetScriptById } from "../../../application/script/GetScriptById.js";
import { CreateScript } from "../../../application/script/CreateScript.js";
import { UpdateScript } from "../../../application/script/UpdateScript.js";
import { DeleteScript } from "../../../application/script/DeleteScript.js";

import { GetEditsByScript } from "../../../application/edit/GetEditsByScript.js";
import { GetEditById } from "../../../application/edit/GetEditById.js";
import { CreateEdit } from "../../../application/edit/CreateEdit.js";
import { UpdateEdit } from "../../../application/edit/UpdateEdit.js";
import { DeleteEdit } from "../../../application/edit/DeleteEdit.js";

import { Signup } from "../../../application/user/Signup.js";
import { Login } from "../../../application/user/Login.js";
import { GetCurrentUser } from "../../../application/user/GetCurrentUser.js";
import { Logout } from "../../../application/user/Logout.js";

const ServicesContext = createContext(null);

export function AppServicesProvider({ children }) {
  const value = useMemo(() => {
    // Repos (puedes pasar 'supabase' si un repo lo necesita en el ctor)
    const scriptsRepo = new SupabaseScriptsRepo(supabase);
    const editsRepo = new SupabaseEditsRepo(supabase);
    const usersRepo = new SupabaseUsersRepo(supabase);

    // Casos de uso
    const scripts = {
      getByUser: new GetScriptsByUser(scriptsRepo),
      getById: new GetScriptById(scriptsRepo),
      create: new CreateScript(scriptsRepo),
      update: new UpdateScript(scriptsRepo),
      delete: new DeleteScript(scriptsRepo),
    };

    const edits = {
      getByScript: new GetEditsByScript(editsRepo),
      getById: new GetEditById(editsRepo),
      create: new CreateEdit(editsRepo),
      update: new UpdateEdit(editsRepo),
      delete: new DeleteEdit(editsRepo),
    };

    const auth = {
      signup: new Signup(usersRepo),
      login: new Login(usersRepo),
      getCurrent: new GetCurrentUser(usersRepo),
      logout: new Logout(usersRepo),
    };

    return { scripts, edits, auth };
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
