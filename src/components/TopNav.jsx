import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import logoImg from '../assets/logo192.png';

function TopNav() {
  const token = useRouteLoaderData('root');

  return (
    <header className='flex items-center px-6 h-14 border-b'>
      <nav>
        <ul className='flex items-center gap-4'>
          <li>
            <NavLink to="/"
              className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}
              end>
              <img src={logoImg} alt="Logo" className='h-6' />
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>
              Profile
            </NavLink>
          </li>
          {!token && (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>
                  Login
                </NavLink>
              </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>
              Register
            </NavLink>
          </li>
            </>
          )}
          {token && ( 
          <li>
            <Form action='/logout' method='POST'>
              <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                Logout
              </button>
            </Form>
          </li>)}
        </ul>
      </nav>
    </header>
  );
}

export default TopNav;