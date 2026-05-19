import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage, { action as registerAction } from './pages/SignupPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import { action as logoutAction } from './pages/LogoutPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';
import { tokenLoader } from './utils/auth';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: 'root',
    children: [
      {index: true, element: <HomePage />},
      {
        path: 'register', element: <SignupPage />,
        action: registerAction
      },
      {
        path: 'login', element: <LoginPage />,
        action: loginAction
      },
      {
        path: 'logout',
        action: logoutAction
      }

    ]
  }

]);

function App() {
  return <RouterProvider router={router} />
}
export default App;