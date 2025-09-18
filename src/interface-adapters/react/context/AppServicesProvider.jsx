// interface-adapters/react/context/AppServicesProvider.jsx
import { createContext, useContext, useMemo } from 'react';

import supabase from '../../../infrastructure/supabase/client.js';

// Infra: repos and services
import { SupabaseScriptsRepo } from '../../../infrastructure/supabase/script/SupabaseScriptsRepo.js';
import { SupabaseEditsRepo } from '../../../infrastructure/supabase/edit/SupabaseEditsRepo.js';
import { SupabaseUsersRepo } from '../../../infrastructure/supabase/user/SupabaseUsersRepo.js';
import { SupabaseAuthService } from '../../../infrastructure/supabase/authentication/SupabaseAuthService.js';

// Application: script use cases
import { GetScriptsByUser } from '../../../application/script/GetScriptsByUser.js';
import { GetScriptById } from '../../../application/script/GetScriptById.js';
import { CreateScript } from '../../../application/script/CreateScript.js';
import { UpdateScript } from '../../../application/script/UpdateScript.js';
import { DeleteScript } from '../../../application/script/DeleteScript.js';
import { AddEditToScript } from '../../../application/script/AddEditToScript.js';

// Application: edit use cases
import { GetEditsByScript } from '../../../application/edit/GetEditsByScript.js';
import { GetEditById } from '../../../application/edit/GetEditById.js';
import { UpdateEdit } from '../../../application/edit/UpdateEdit.js';
import { DeleteEdit } from '../../../application/edit/DeleteEdit.js';

// Application: authentication use cases
import { Signup } from '../../../application/authentication/Signup.js';
import { Login } from '../../../application/authentication/Login.js';
import { GetCurrentUser } from '../../../application/authentication/GetCurrentUser.js';
import { Logout } from '../../../application/authentication/Logout.js';

// Application: user use cases
import { GetUserById } from '../../../application/user/GetUserById.js';
import { UpdateUserProfile } from '../../../application/user/UpdateUserProfile.js';
import { DeleteUser } from '../../../application/user/DeleteUser.js';

const ServicesContext = createContext(null);

export function AppServicesProvider({ children }) {
  const value = useMemo(() => {
    // Repos and services
    const scriptsRepo = new SupabaseScriptsRepo(supabase);
    const editsRepo = new SupabaseEditsRepo(supabase);
    const usersRepo = new SupabaseUsersRepo(supabase);
    const authService = new SupabaseAuthService(supabase);

    // Use cases
    const scripts = {
      getByUser: new GetScriptsByUser(scriptsRepo),
      getById: new GetScriptById(scriptsRepo),
      create: new CreateScript(scriptsRepo),
      update: new UpdateScript(scriptsRepo),
      delete: new DeleteScript(scriptsRepo),
      addEditToScript: new AddEditToScript(scriptsRepo, editsRepo),
    };

    const edits = {
      getByScript: new GetEditsByScript(editsRepo),
      getById: new GetEditById(editsRepo),
      update: new UpdateEdit(editsRepo),
      delete: new DeleteEdit(editsRepo),
    };

    const auth = {
      signup: new Signup(authService),
      login: new Login(authService),
      getCurrent: new GetCurrentUser(authService),
      logout: new Logout(authService),
    };

    const users = {
      getById: new GetUserById(usersRepo),
      updateProfile: new UpdateUserProfile(usersRepo),
      delete: new DeleteUser(usersRepo),
    };

    return { scripts, edits, auth, users };
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
    throw new Error('useServices must be used within AppServicesProvider');
  return context;
}
