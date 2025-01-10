"use client";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <header className="bg-white p-4 shadow-m">
      <div className="flex flex-wrap gap-10 justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

        <div className="flex flex-wrap items-center space-x-4">
          <button
            className="text-white text-lg py-1 px-2 rounded-md mx-20 hover:font-medium bg-gray-600 hover:bg-gray-900"
            onClick={async (e) => {
              e.preventDefault();

              try {
                const response = await fetch("/api/sign-out", {
                  method: "POST",
                });

                const { messageResponse } = await response.json();

                alert(messageResponse);

                router.refresh();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
