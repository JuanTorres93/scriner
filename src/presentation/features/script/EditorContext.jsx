import { createContext, useContext, useState } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';

// Create a new context
const EditorContext = createContext();

function EditorProvider({ children }) {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  return (
    // Provide the context value to child components
    <EditorContext.Provider
      value={{
        // Place inside the object any variable, function, etc. that should be accessible to child components
        editor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

// Custom hook to make it easier to consume the context
export function useEditor() {
  const value = useContext(EditorContext);

  if (value === undefined) {
    throw new Error('useEditor must be used within a EditorProvider');
  }
  return value;
}

export default EditorProvider;
