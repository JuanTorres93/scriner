import { createContext, useContext, useState } from "react";

const CurrentEditsContext = createContext();

function CurrentEditsProvider({ children }) {
  const [currentEditsIds, setCurrentEditsIds] = useState({});

  function isCurrentEdit(edit) {
    for (const editType in currentEditsIds) {
      if (currentEditsIds[editType] === edit.id) {
        return true;
      }
    }
    return false;
  }

  return (
    // Provide the context value to child components
    <CurrentEditsContext.Provider
      value={{
        // Place inside the object any variable, function, etc. that should be accessible to child components
        currentEditsIds,
        setCurrentEditsIds,
        resetCurrentEdits: () => setCurrentEditsIds({}),
        isCurrentEdit,
      }}
    >
      {children}
    </CurrentEditsContext.Provider>
  );
}

// Custom hook to make it easier to consume the context
export function useCurrentEdits() {
  const value = useContext(CurrentEditsContext);

  if (value === undefined) {
    throw new Error(
      "useCurrentEdits must be used within a CurrentEditsProvider"
    );
  }
  return value;
}

export default CurrentEditsProvider;
