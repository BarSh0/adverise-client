import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import { TwitterAuthProvider } from './contexts/TwitterAuthContext';
import { AutomationsProvider } from './contexts/AutomationsContext';
import {
  AdminPage,
  AutomationsPage,
  ConnectionsPage,
  LoginPage,
  SettingsPage,
  SignUpPage,
  UserProfilePage,
} from './pages';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <TwitterAuthProvider> */}
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <AutomationsProvider>
                    <AutomationsPage />
                  </AutomationsProvider>
                }
              />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/connections" element={<ConnectionsPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
        {/* </TwitterAuthProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
