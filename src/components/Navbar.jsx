import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-slate-900">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex h-14 items-center justify-between">

                    {/* Logo */}
                    <h1 className="text-xl font-bold text-white tracking-wide">
                        Expense<span className="text-indigo-400">Tracker</span>
                    </h1>

                    {/* Links */}
                    <div className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md transition
                ${isActive
                                    ? "bg-indigo-500 text-white shadow"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md transition
                ${isActive
                                    ? "bg-indigo-500 text-white shadow"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
