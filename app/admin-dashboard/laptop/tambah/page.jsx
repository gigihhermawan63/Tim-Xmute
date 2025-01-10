"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import AdminDashboardSidebar from "@/app/components/admin-dashboard/Sidebar";
import AdminDashboardNavbar from "@/app/components/admin-dashboard/Navbar";

const MainContent = () => {
  const [data, setData] = useState({
    merk: "",
    nama: "",
    kapasitas_penyimpanan: "",
    ram: "",
    processor: "",
    vga: "",
    harga: "",
  });
  const [file, setFile] = useState({
    img_file: "",
  });

  const router = useRouter();

  return (
    <main className="bg-gray-400 p-6 flex-1">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-medium mb-10">Tambah Data Laptop</h1>

          <div className="grid gap-2 text-lg">
            <form
              action="/api/admin-dashboard/laptop"
              encType="multipart/form-data"
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append("_id", data._id);
                formData.append("merk", data.merk);
                formData.append("nama", data.nama);
                formData.append("img_file", file.img_file);
                formData.append(
                  "kapasitas_penyimpanan",
                  data.kapasitas_penyimpanan
                );
                formData.append("ram", data.ram);
                formData.append("processor", data.processor);
                formData.append("vga", data.vga);
                formData.append("harga", data.harga);

                try {
                  const response = await fetch("/api/admin-dashboard/laptop", {
                    method: "POST",
                    body: formData,
                  });

                  const result = await response.json();

                  alert(result.messageResponse);

                  if (result) {
                    router.push("/admin-dashboard/laptop");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <div className="flex flex-wrap gap-2 mb-5">
                <label className="w-[200px] font-bold" htmlFor="merk">
                  Merk
                </label>
                <input
                  className="border border-black px-1 w-[400px]"
                  id="merk"
                  type="text"
                  value={data?.merk}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      merk: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <label className="w-[200px] font-bold" htmlFor="nama">
                  Nama
                </label>
                <input
                  className="border border-black px-1 w-[400px]"
                  id="nama"
                  type="text"
                  value={data?.nama}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      nama: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <label className="w-[200px] font-bold" htmlFor="img_file">
                  IMG File
                </label>
                <input
                  className="border border-black px-1 w-[400px]"
                  id="img_file"
                  type="file"
                  onChange={(e) =>
                    setFile((prevData) => ({
                      ...prevData,
                      img_file: e.target.files[0],
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <label
                  className="w-[200px] font-bold"
                  htmlFor="kapasitas_penyimpanan"
                >
                  Kapasitas Penyimpanan
                </label>
                <input
                  className="border border-black px-1 w-[400px]"
                  id="kapasitas_penyimpanan"
                  type="text"
                  value={data?.kapasitas_penyimpanan}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      kapasitas_penyimpanan: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <label className="w-[200px] font-bold" htmlFor="ram">
                  RAM
                </label>
                <input
                  className="border border-black px-1 w-[400px]"
                  id="ram"
                  type="text"
                  value={data?.ram}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      ram: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <label className="w-[200px] font-bold" htmlFor="processor">
                  Processor
                </label>
                <input
                  className="border border-black px-1 w-[400px]"
                  id="processor"
                  type="text"
                  value={data?.processor}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      processor: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <label className="w-[200px] font-bold" htmlFor="vga">
                  VGA
                </label>
                <input
                  className="border border-black px-1 w-[400px]"
                  id="vga"
                  type="text"
                  value={data?.vga}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      vga: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <label className="w-[200px] font-bold" htmlFor="harga">
                  Harga
                </label>
                <input
                  className="border border-black px-1 w-[400px]"
                  id="harga"
                  type="text"
                  value={data?.harga}
                  onChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      harga: e.target.value,
                    }))
                  }
                />
              </div>

              <button
                className="rounded-md py-1 px-3 bg-gray-500 text-white"
                type="submit"
              >
                Tambah
              </button>
            </form>
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
