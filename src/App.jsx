import {createBrowserRouter, RouterProvider} from 'react-router-dom';   
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import RootLayout from './pages/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'register', element: <SignupPage />
      },
      {
        path: 'login', element: <LoginPage />
      }

    ]
  }

]);

function App() {
    return <RouterProvider router={router} />
}
export default App;