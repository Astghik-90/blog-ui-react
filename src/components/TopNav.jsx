import { NavLink } from 'react-router-dom';
import logoImg from '../assets/logo192.png';

function TopNav() {
  return (
    <header className='flex items-center px-6 h-14 border-b'>
      <nav>
        <ul className='flex gap-4'>
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
        </ul>
      </nav>
    </header>
  );
}

export default TopNav;