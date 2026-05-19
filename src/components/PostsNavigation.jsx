import { NavLink } from 'react-router-dom';


function PostsNavigation() {
  return (
    <header className="bg-gray-100 p-4">
      <nav>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'text-gray-600'
              }
              end
            >
              All Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts/new"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'text-gray-600'
              }
            >
              New Post
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default PostsNavigation;
