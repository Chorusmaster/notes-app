function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary py-2 px-4 text-on-primary font-medium flex flex-row gap-2">
        <img alt="logo" src="/logo.svg" className="w-8 h-8"></img>
        <span className="text-xl">Simple notes app</span>
      </nav>

      <header className="bg-surface-elevated">
        <div className="w-full flex flex-col items-center pt-20 px-4">
          <h1 className="text-6xl sm:text-7xl inline-block pb-4 font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Notes App
          </h1>
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
        </div>

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
      </header>

      <main className="flex-1 bg-surface">
        <div className="h-full px-4 sm:px-8 lg:px-16 py-18 grid gap-12 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
          <button
            className="
            min-h-80 rounded-2xl border-2 border-dashed text-2xl cursor-pointer
            border-primary text-primary bg-transparent
            hover:border-secondary hover:text-secondary hover:bg-gradient-primary-soft
            transition duration-300 ease-in-out
          "
          >
            <span className="font-medium">+</span> New note
          </button>

          <div className="min-h-80 bg-card rounded-2xl shadow-sm transition-shadow p-6 flex flex-col">
            <label>Title</label>
            <input className="border border-border rounded-lg mt-1 mb-4 h-8 p-2 focus:outline-none focus:ring-1 focus:ring-primary/40"></input>
            <label>Text</label>
            <textarea className="border border-border rounded-lg flex-1 mt-1 mb-4 p-2 focus:outline-none focus:ring-1 focus:ring-primary/40"></textarea>
            <div className="w-full flex justify-end">
              <button className="rounded-lg bg-secondary hover:bg-secondary-hover transition text-on-primary w-20 h-8 active:scale-98 cursor-pointer">
                Ok
              </button>
            </div>
          </div>

          <div className="min-h-80 bg-card rounded-2xl shadow-sm transition-shadow p-6 flex flex-col">
            <h2 className="text-2xl mb-2">Note title</h2>
            <p className="flex-1 text-text-secondary">Note text</p>
            <p className="w-full flex justify-end">26.06.2026</p>
          </div>
        </div>
      </main>

      <footer className="bg-primary px-4 py-1 text-on-primary flex-0">
        Copyright ©{" "}
        {new Date().getFullYear() == 2026
          ? "2026"
          : `2026 - ${new Date().getFullYear()}`}{" "}
        Chorusmaster
      </footer>
    </div>
  );
}

export default App;
