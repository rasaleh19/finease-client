import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const authContext = useAuth() || {};
  const { user, logout } = authContext;
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    if (logout) {
      await logout();
      navigate("/");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Menu links for reuse
  const menuLinks = (
    <>
      <Link
        to="/"
        className="btn btn-ghost justify-center"
        onClick={() => setMenuOpen(false)}
      >
        Home
      </Link>
      {user && (
        <>
          <Link
            to="/add-transaction"
            className="btn btn-ghost justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Add Transaction
          </Link>
          <Link
            to="/my-transactions"
            className="btn btn-ghost justify-center"
            onClick={() => setMenuOpen(false)}
          >
            My Transactions
          </Link>
          <Link
            to="/reports"
            className="btn btn-ghost justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Reports
          </Link>
          <Link
            to="/profile"
            className="btn btn-ghost justify-center"
            onClick={() => setMenuOpen(false)}
          >
            My Profile
          </Link>
          {/* User photo immediately after My Profile */}
          <div className="flex flex-col items-center group ml-2">
            <img
              src={user.photoURL || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-base-300 aspect-square cursor-pointer"
              style={{ borderRadius: "50%" }}
            />
            <span className="text-xs font-semibold mt-1 text-gray-800 group-hover:block hidden bg-base-100 px-2 py-1 rounded shadow">
              {user.displayName || user.email}
            </span>
          </div>
        </>
      )}
      {!user && (
        <>
          <Link
            to="/login"
            className="btn btn-primary justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn btn-outline justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Signup
          </Link>
        </>
      )}
      {user && (
        <button
          className="btn btn-outline justify-center"
          onClick={() => {
            setMenuOpen(false);
            handleLogout();
          }}
        >
          Log out
        </button>
      )}
      <button
        className="btn btn-outline justify-center"
        onClick={() => {
          toggleTheme();
          setMenuOpen(false);
        }}
        aria-label="Toggle light/dark mode"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </>
  );

  return (
    <nav className="navbar bg-base-200 px-4 py-2 flex justify-between items-center shadow relative">
      <div className="flex items-center gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
          alt="FinEase Logo"
          className="h-8 w-8"
        />
        <span className="font-bold text-xl">FinEase</span>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        {menuLinks}
        {/* Removed user photo from here to avoid duplication */}
      </div>
      {/* Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute top-full right-2 mt-2 w-64 bg-base-100 shadow-lg rounded-lg z-50 flex flex-col p-2 animate-fade-in">
            {user && (
              <div className="flex flex-col items-center mb-2">
                <img
                  src={user.photoURL || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border border-base-300 aspect-square mb-1"
                  style={{ borderRadius: "50%" }}
                />
                <span className="text-xs font-semibold text-gray-800">
                  {user.displayName || user.email}
                </span>
              </div>
            )}
            {menuLinks}
          </div>
        )}
      </div>
    </nav>
  );
}
