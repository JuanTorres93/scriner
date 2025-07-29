import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import ScriptEditor from "./pages/ScriptEditor";

const router = createBrowserRouter([
  {
    // AppLayout is the main layout for the app
    element: <AppLayout />,
    children: [
      {
        path: "/app",
        element: <ScriptEditor />,
      },
    ],
  },
]);

// Provides the router to the App component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
