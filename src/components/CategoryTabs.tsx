function CategoryTabs() {
  return (
    <div
      role="group"
      aria-label="Filter notes by category"
      className="mt-16 sm:mt-32 flex text-primary"
    >
      <button className="py-1 px-8 border-r border-muted hover:bg-surface hover:rounded-tr-xl transition duration-200 cursor-pointer">
        All
      </button>
      <button className="py-1 px-8 border-r border-muted hover:bg-surface hover:rounded-tr-xl transition duration-200 cursor-pointer">
        Work
      </button>
    </div>
  );
}

export default CategoryTabs;