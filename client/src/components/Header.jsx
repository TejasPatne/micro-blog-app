import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="bg-neutral-950 text-neutral-400">
      <div className="flex justify-between items-center max-w-6px mx-auto p-3">
        <NavLink to="/">
          <h1 className="font-semibold text-xl">
            <span className="text-yellow-500">Maahi</span>ti
          </h1>
        </NavLink>
        <ul className="flex gap-4">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about">
            <li>About</li>
          </NavLink>
          <NavLink to="/profile">
            <li>
              {
                currentUser ?
                <img src={currentUser.profilePicture} alt="profile" className="w-8 h-8 rounded-full object-cover hover:border-2 border-neutral-200" />
                :
                'Sign in'
              }
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};
