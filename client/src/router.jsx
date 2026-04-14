import { createBrowserRouter, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home/Home';
import AdminLogin from './pages/admin/AdminLogin/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import Appointments from './pages/admin/Appointments/Appointments';
import Doctors from './pages/admin/Doctors/Doctors';
import Services from './pages/admin/Services/Services';
import Messages from './pages/admin/Messages/Messages';
import Settings from './pages/admin/Settings/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'doctors', element: <Doctors /> },
      { path: 'services', element: <Services /> },
      { path: 'messages', element: <Messages /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);
