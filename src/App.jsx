import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout";
import ScriptEditor from "./pages/ScriptEditor";
import CurrentEditsProvider from "./features/edit/CurrentEditsContext.jsx";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Amount of time in seconds data is considered fresh
    },
  },
});

// Provides the router to the App component
function App() {
  return (
    <>
      <CurrentEditsProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <RouterProvider router={router} />
          <Toaster
            position="bottom-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "1.6rem",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-t2)",
                color: "var(--color-grey-s2)",
              },
            }}
          />{" "}
        </QueryClientProvider>
      </CurrentEditsProvider>
    </>
  );
}

export default App;
