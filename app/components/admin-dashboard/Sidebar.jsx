"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

const Sidebar = () => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(window.location.pathname);
  }, [location]);

  return (
    <div className="bg-gray-800 w-64 p-5 text-white hidden lg:block">
      <h2 className="text-2xl font-bold text-center mb-8">Admin</h2>

      <ul>
        <li className="mb-5">
          <Link
            className={`
              ${
                location !== "/" ? "" : "bg-gray-600 "
              }block text-lg p-2 rounded hover:bg-gray-400
            `}
            href="/"
          >
            Home
          </Link>
        </li>

        <li className="mb-5">
          <Link
            className={`
              ${
                location !== "/admin-dashboard/laptop" ? "" : "bg-gray-600 "
              }block text-lg p-2 rounded hover:bg-gray-400
            `}
            href="/admin-dashboard/laptop"
          >
            Laptop
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
