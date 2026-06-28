function SearchBar() {
  return (
    <div className="w-full max-w-xl mx-4 h-10 border-2 border-primary mt-6 rounded-2xl flex items-center overflow-hidden">
      <button className="h-full bg-secondary hover:bg-secondary-hover border-r-2 border-primary group transition duration-200 cursor-pointer">
        <img
          alt="search icon"
          src="/search.svg"
          className="w-6 h-6 mx-2 sm:mx-4 transition duration-200 group-hover:scale-105"
        ></img>
      </button>
      <input
        className="flex-1 h-full bg-surface-elevated rounded-r-2xl pl-4 placeholder:text-text-muted focus:outline-none"
        placeholder="Search..."
      ></input>
    </div>
  );
}

export default SearchBar;