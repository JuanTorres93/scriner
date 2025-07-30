import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import ScriptEditor from "./pages/ScriptEditor";

const router = createBrowserRouter([
  {
    // TODO remove, just for development
    path: "/",
    element: <Navigate to="/app" />,
  },
  {
    // AppLayout is the main layout for the app
    element: <AppLayout />,
    path: "/app",
    children: [
      {
        path: "editor",
        children: [
          {
            index: true,
            replace: true,
            element: <Navigate to="/app" />,
          },
          {
            // This is the main page of the app
            path: ":scriptId",
            element: <ScriptEditor />,
          },
        ],
      },
    ],
  },
]);

// Provides the router to the App component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
