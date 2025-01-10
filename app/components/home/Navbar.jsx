import Link from "next/link";

import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    document.cookie !== "email=admin%40gmail.com"
      ? setIsAdmin(false)
      : setIsAdmin(true);
  }, []);

  return (
    <div className="bg-indigo-800 grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center p-3">
      <h1 className="text-white text-3xl font-bold text-center">
        E-Katalog Penyediaan Laptop
      </h1>

      <div className={`${isAdmin === false ? "" : "hidden "} mx-5`}>
        <Link
          className="block bg-white w-48 text-center text-lg py-1 px-2 rounded-md hover:font-medium"
          href="/sign-in"
        >
          Sign-In
        </Link>
      </div>

      <div
        className={`${
          isAdmin === true ? "" : "hidden "
        }grid grid-cols-1 sm:grid-cols-2 gap-5 mx-5`}
      >
        <Link
          className="block bg-white w-48 text-center text-lg py-1 px-2 rounded-md hover:font-medium"
          href="/admin-dashboard"
        >
          Admin Dashboard
        </Link>

        <button
          className="block bg-amber-300 w-48 text-center text-lg py-1 px-2 rounded-md hover:font-medium"
          onClick={async (e) => {
            e.preventDefault();

            try {
              const response = await fetch("/api/sign-out", {
                method: "POST",
              });

              const { messageResponse } = await response.json();

              alert(messageResponse);

              location.reload();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
