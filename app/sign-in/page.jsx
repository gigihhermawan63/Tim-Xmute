"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <div className="bg-[url('/imgs/blue-background.jpg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-sm overflow-y-auto p-8 my-12 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">Sign In</h2>

        <form
          action="/api/admin-dashboard/sign-in"
          encType="multipart/form-data"
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            try {
              const response = await fetch("/api/sign-in", {
                method: "POST",
                body: formData,
              });

              const { messageResponse } = await response.json();

              alert(messageResponse);

              router.refresh();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-gray-700 text-lg font-medium"
            >
              Email
            </label>
            <input
              className="border border-gray-300 w-full p-2 rounded-md"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-10">
            <label
              htmlFor="password"
              className="text-gray-700 text-lg font-medium"
            >
              Password
            </label>
            <input
              className="border border-gray-300 w-full p-2 rounded-md"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="text-white w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
