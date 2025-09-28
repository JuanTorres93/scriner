import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

import { AppServicesProvider } from './interface-adapters/react/context/AppServicesProvider.jsx';

import ProtectedRoute from './presentation/features/authentication/ProtectedRoute.jsx';
import PaidRoute from './presentation/features/subscription/PaidRoute.jsx';
import CurrentEditsProvider from './presentation/features/edit/CurrentEditsContext.jsx';

import Landing from './presentation/pages/Landing.jsx';
import Login from './presentation/pages/Login.jsx';
import ScriptEditor from './presentation/pages/ScriptEditor';
import Signup from './presentation/pages/Signup.jsx';
import GlobalStyles from './presentation/styles/GlobalStyles.js';
import AppLayout from './presentation/ui/AppLayout.jsx';
import MarketingLayout from './presentation/ui/MarketingLayout.jsx';
import ErrorPage from './presentation/ui/ErrorPage.jsx';
import EmailConfirmation from './presentation/pages/EmailConfirmation.jsx';
import RouteForNotAuthenticated from './presentation/features/authentication/RouteForNotAuthenticated.jsx';
import Subscribe from './presentation/pages/Subscribe.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MarketingLayout>
        <Landing />
      </MarketingLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: (
      <RouteForNotAuthenticated>
        <MarketingLayout>
          <Login />
        </MarketingLayout>
      </RouteForNotAuthenticated>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: (
      <RouteForNotAuthenticated>
        <MarketingLayout>
          <Signup />
        </MarketingLayout>
      </RouteForNotAuthenticated>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/confirm-email',
    element: (
      <MarketingLayout>
        <EmailConfirmation />
      </MarketingLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/subscribe',
    element: (
      <MarketingLayout>
        <ProtectedRoute>
          <Subscribe />
        </ProtectedRoute>
      </MarketingLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    // AppLayout is the main layout for the app
    path: '/app',
    element: (
      <ProtectedRoute>
        <PaidRoute>
          <AppLayout />
        </PaidRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'editor',
        children: [
          {
            index: true,
            replace: true,
            element: <Navigate to="/app" />,
          },
          {
            // This is the main page of the app
            path: ':scriptId',
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
      <HelmetProvider>
        <GlobalStyles />
        <CurrentEditsProvider>
          <QueryClientProvider client={queryClient}>
            <AppServicesProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <RouterProvider router={router} />
              <Toaster
                position="bottom-center"
                gutter={12}
                containerStyle={{ margin: '8px' }}
                toastOptions={{
                  success: {
                    duration: 3000,
                  },
                  error: {
                    duration: 5000,
                  },
                  style: {
                    fontSize: '1.6rem',
                    maxWidth: '500px',
                    padding: '16px 24px',
                    backgroundColor: 'var(--color-grey-t2)',
                    color: 'var(--color-grey-s2)',
                  },
                }}
              />{' '}
            </AppServicesProvider>
          </QueryClientProvider>
        </CurrentEditsProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
