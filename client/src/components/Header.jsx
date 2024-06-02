import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <nav className="bg-neutral-950 text-neutral-400">
      <div className="flex justify-between items-center max-w-6px mx-auto p-3">
        <NavLink to="/"><h1 className="font-bold"><span className='text-yellow-500'>Maahi</span>ti</h1></NavLink>
        <ul className="flex gap-4">
          <NavLink to="/"><li>Home</li></NavLink>
          <NavLink to="/about"><li>About</li></NavLink>
          <NavLink to="/signin"><li>Sign In</li></NavLink>
        </ul>
      </div>
    </nav>
  )
}