import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Menu,
  X,
  Dashboard as DashboardIcon,
  FitnessCenter,
  AddCircle,
  Logout,
  Person,
} from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-950 text-white border-b border-gray-800 relative z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/dashboard"
          onClick={closeMenu}
          className="text-2xl font-bold text-green-400"
        >
          FitTrack
        </Link>

        {/* Menu */}
        <div
          ref={menuRef}
          className="relative"
        >

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-300 hover:text-green-400 hover:bg-gray-800 transition"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <div
              className="absolute top-full right-0 mt-3 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-[fadeIn_0.2s_ease-out]"
            >

              {/* User Information */}
              <div className="px-5 py-5 bg-gray-50 border-b border-gray-200">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <Person fontSize="small" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Signed in as
                    </p>

                    <p className="font-semibold text-gray-900 truncate mt-0.5">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || ""}
                    </p>

                  </div>

                </div>

              </div>

              {/* Navigation */}
              <div className="p-2">

                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                >
                  <DashboardIcon fontSize="small" />

                  <span className="text-sm font-medium">
                    Dashboard
                  </span>
                </Link>

                {/* Workouts */}
                <Link
                  to="/workouts"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                >
                  <FitnessCenter fontSize="small" />

                  <span className="text-sm font-medium">
                    Workouts
                  </span>
                </Link>

                {/* Add Workout */}
                <Link
                  to="/add-workout"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                >
                  <AddCircle fontSize="small" />

                  <span className="text-sm font-medium">
                    Add Workout
                  </span>
                </Link>

                {/* Profile */}
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                >
                  <Person fontSize="small" />

                  <span className="text-sm font-medium">
                    Profile & Goals
                  </span>
                </Link>

              </div>

              {/* Logout */}
              <div className="p-2 border-t border-gray-200">

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition text-left"
                >
                  <Logout fontSize="small" />

                  <span className="text-sm font-medium">
                    Logout
                  </span>
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;