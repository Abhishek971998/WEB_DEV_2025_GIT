import React from "react";
import { NavLink } from "react-router-dom";
import { Book, Code, Moon, Sun, Search } from "lucide-react";
import { useThemeStore, useSearchStore } from "../../store";

export const Navigation = () => {
  const { isDark, toggle } = useThemeStore();
  const { query, setQuery } = useSearchStore();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ overflow: "auto", width: "100%" }}
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold">Home</span>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink
              to="/javascript"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Code className="inline-block h-5 w-5 mr-1" />
              JavaScript
            </NavLink>
            <NavLink
              to="/react"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Code className="inline-block h-5 w-5 mr-1" />
              React
            </NavLink>
            <button
              onClick={toggle}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
