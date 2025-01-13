"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState, useEffect, Suspense } from "react";

import Navbar from "@/app/components/home/Navbar";
import SearchLaptop from "@/app/components/home/SearchLaptop";

const MainContent = () => {
  const [data, setData] = useState([]);

  const searchParams = useSearchParams();

  const router = useRouter();
  const [category, setCategory] = useState("nama");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await fetch(
          `/api/home/laptop?category=${
            searchParams.get("category") || category
          }&search=${searchParams.get("search") || ""}`,
          { method: "GET" }
        );

        const { result } = await response.json();

        setData(result);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  return (
    <section className="text-lg">
      <SearchLaptop
        router={router}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 p-10">
        {data.map((data, index) => (
          <div className="bg-indigo-200 rounded" key={index}>
            <div className="block min-h-20 p-3">
              <p className="font-medium">{data?.nama}</p>
            </div>

            <div className="border border-black">
              <img
                className="w-full"
                src={data?.img_file.url}
                alt={data?.pathname}
                width={400}
                height={400}
              />
            </div>

            <div className="p-3">
              <p>
                Merk: <span className="font-medium">{data?.merk}</span>
              </p>

              <p>
                Kapasitas Penyimpanan:{" "}
                <span className="font-medium">
                  {data?.kapasitas_penyimpanan}
                </span>
              </p>

              <p>
                RAM: <span className="font-medium">{data?.ram}</span>
              </p>

              <p>
                Processor:{" "}
                <span className="font-medium">{data?.processor}</span>
              </p>

              <p>
                VGA: <span className="font-medium">{data?.vga}</span>
              </p>

              <p>
                Harga: <span className="font-medium">{data?.harga}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AdminDashboard = () => {
  return (
    <div className="bg-[url('/imgs/hero-background.jpg')] bg-cover min-h-screen">
      <Navbar />

      <Suspense>
        <MainContent />
      </Suspense>
    </div>
  );
};

export default AdminDashboard;
