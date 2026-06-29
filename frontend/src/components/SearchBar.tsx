interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({value, onChange}: SearchBarProps) {
  return (
    <div className="w-full max-w-xl mx-4 h-10 border-2 border-primary mt-6 rounded-2xl flex items-center overflow-hidden">
      <div className="h-full bg-secondary border-r-2 border-primary flex items-center">
        <img
          alt="search icon"
          src="/search.svg"
          className="w-6 h-6 mx-2 sm:mx-4"
        ></img>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 h-full bg-surface-elevated rounded-r-2xl pl-4 placeholder:text-muted focus:outline-none"
        placeholder="Search..."
      ></input>
    </div>
  );
}

export default SearchBar;