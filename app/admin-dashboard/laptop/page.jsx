"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

import AdminDashboardSidebar from "@/app/components/admin-dashboard/Sidebar";
import AdminDashboardNavbar from "@/app/components/admin-dashboard/Navbar";

const MainContent = () => {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState(false);

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await fetch("/api/admin-dashboard/laptop", {
          method: "GET",
        });

        const { result } = await response.json();

        setData(result);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [updatedData]);

  return (
    <main className="bg-gray-400 p-6 flex-1">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <h1 className="text-3xl font-medium mb-10">Seluruh Data Laptop</h1>

            <div className="grid md:justify-end">
              <Link
                className="bg-blue-600 text-white text-lg font-medium mb-10 py-1 px-3 rounded-md w-fit h-fit"
                href="/admin-dashboard/laptop/tambah"
              >
                Tambah Laptop
              </Link>
            </div>
          </div>

          <div className="border border-collapse border-black break-words text-lg">
            <div className="hidden 2xl:grid 2xl:grid-cols-9 font-bold">
              <p className="border border-black p-2">Merk</p>
              <p className="border border-black p-2">Nama</p>
              <p className="border border-black p-2">URL IMG</p>
              <p className="border border-black p-2">Kapasitas Penyimpanan</p>
              <p className="border border-black p-2">RAM</p>
              <p className="border border-black p-2">Processor</p>
              <p className="border border-black p-2">VGA</p>
              <p className="border border-black p-2">Harga</p>
              <p className="border border-black p-2 text-center">Aksi</p>
            </div>

            {data.map((data, index) => (
              <div className="grid grid-cols-2 2xl:grid-cols-9" key={index}>
                <p className="border border-black p-2 font-bold grid 2xl:hidden">
                  Merk
                </p>
                <p className="border border-black p-2">{data?.merk}</p>

                <p className="border border-black p-2 font-bold grid 2xl:hidden">
                  Nama
                </p>
                <p className="border border-black p-2">{data?.nama}</p>

                <p className="border border-black p-2 font-bold grid 2xl:hidden">
                  URL IMG
                </p>
                <div className="border border-black">
                  <img
                    src={data?.img_file.url}
                    alt={data?.pathname}
                    width={400}
                    height={400}
                  />
                </div>

                <p className="border border-black p-2 font-bold grid 2xl:hidden">
                  Kapasitas Penyimpanan
                </p>
                <p className="border border-black p-2">
                  {data?.kapasitas_penyimpanan}
                </p>

                <p className="border border-black p-2 font-bold grid 2xl:hidden">
                  RAM
                </p>
                <p className="border border-black p-2">{data?.ram}</p>

                <p className="border border-black p-2 font-bold grid 2xl:hidden">
                  Processor
                </p>
                <p className="border border-black p-2">{data?.processor}</p>

                <p className="border border-black p-2 font-bold grid 2xl:hidden">
                  VGA
                </p>
                <p className="border border-black p-2">{data?.vga}</p>

                <p className="border border-black p-2 font-bold grid 2xl:hidden">
                  Harga
                </p>
                <p className="border border-black p-2">{data?.harga}</p>

                <p className="border border-black p-2 font-bold grid 2xl:hidden justify-center">
                  Aksi
                </p>
                <div className="border border-black p-2">
                  <div className="flex flex-wrap place-content-center gap-2">
                    <Link
                      className="bg-amber-300 text-black py-1 px-2 rounded"
                      href={`/admin-dashboard/laptop/${data?._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-600 text-white py-1 px-2 rounded"
                      onClick={async (e) => {
                        e.preventDefault();

                        const formData = new FormData();
                        formData.append("_id", data._id);

                        const isConfirm = confirm(
                          "Apakah kamu yakin ingin menghapus Data pada baris ini?"
                        );

                        if (!isConfirm) return;

                        try {
                          const response = await fetch(
                            "/api/admin-dashboard/laptop",
                            {
                              method: "DELETE",
                              body: formData,
                            }
                          );

                          const result = await response.json();

                          alert(result.messageResponse);

                          setUpdatedData((data) => !data);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminDashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <AdminDashboardNavbar />

        {/* Main Content Area */}
        <MainContent />
      </div>
    </div>
  );
};

export default AdminDashboard;
