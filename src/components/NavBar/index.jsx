import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";

function NavBar({ children }) {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {children}
      </div>
    </nav>
  );
}

export default NavBar;
export { Logo, Search, NumResults };
