const SearchLaptop = ({ router, category, setCategory, search, setSearch }) => {
  return (
    <div className="m-16 mb-8">
      <h1 className="text-3xl font-medium text-center mb-8">Laptop Xmute</h1>

      <form
        className="flex flex-wrap gap-9 place-content-center mx-20"
        onSubmit={(e) => {
          e.preventDefault();

          router.push(`/?category=${category}&search=${search}`);
        }}
      >
        <div className="flex flex-wrap gap-3">
          <select
            className="bg-gray-200 p-2 border rounded border-black"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="merk">Merk</option>
            <option value="nama">Nama</option>
            <option value="kapasitas_penyimpanan">Kapasitas Penyimpanan</option>
          </select>

          <input
            className="bg-gray-200 w-80 p-2 border rounded border-black"
            type="text"
            search={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="bg-gray-700 py-1 px-3 rounded text-white"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchLaptop;
