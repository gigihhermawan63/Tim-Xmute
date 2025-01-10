const SearchLaptop = ({ router, value, setValue }) => {
  return (
    <div className="m-16 mb-8">
      <h1 className="text-3xl font-medium text-center mb-8">
        Cari Nama Laptop
      </h1>

      <form
        className="flex flex-wrap gap-5 place-content-center mx-20"
        onSubmit={(e) => {
          e.preventDefault();

          router.push(`/?search=${value}`);
        }}
      >
        <input
          className="bg-gray-200 w-80 p-2 border rounded border-black"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

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
