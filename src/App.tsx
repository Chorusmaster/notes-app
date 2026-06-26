function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-teal-700 py-2 px-4 text-white font-medium flex flex-row gap-2">
        <img alt="logo" src="/logo.svg" className="w-8 h-8"></img>
        <span className="text-xl">Simple notes app</span>
      </nav>

      <header className="bg-white">
        <div className="w-full flex flex-col items-center pt-20">
          <h1 className="text-7xl inline-block pb-3 font-semibold bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Notes App</h1>
          <div className="w-120 h-10 border-2 border-teal-700 bg-linear-to-r from-teal-500 to-cyan-500 mt-6 rounded-2xl flex items-center">
            <img alt="search icon" src="/search.svg" className="w-6 h-6 flex-1"></img>
            <input className="w-[90%] h-full border-l-2 border-teal-700 bg-white rounded-r-2xl pl-4" placeholder="Search..."></input>
          </div>
        </div>

        <div className="mt-30 flex text-slate-500">
          <button className="py-1 px-8 border-r border-slate-300 hover:bg-slate-50 hover:rounded-tr-xl transition duration-200">
            All
          </button>
          <button className="py-1 px-8 border-r border-slate-300 hover:bg-slate-50 hover:rounded-tr-xl transition duration-200">
            Work
          </button>
        </div>
      </header>

      <main className="flex-1 bg-slate-100">
        <div className="h-full px-16 py-18 grid grid-cols-3 gap-12">
          <button className="
            min-h-80 rounded-2xl border-2 border-dashed text-2xl
            border-teal-700 text-teal-700
            hover:border-teal-600 hover:text-teal-500
            bg-linear-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5
            hover:from-emerald-500/10 hover:via-teal-500/10 hover:to-cyan-500/10
            transition duration-200 ease-in-out
          ">
            <span className="font-medium">+</span> New note
          </button>

          <div className="min-h-80 bg-white rounded-2xl shadow-md shadow-slate-100 p-6 flex flex-col">
            <label>Title</label>
            <input className="border rounded-lg mt-1 mb-4 h-8"></input>
            <label>Text</label>
            <textarea className="border rounded-lg flex-1 mt-1 mb-4 p-2"></textarea>
            <div className="w-full flex justify-end">
              <button className="rounded-lg bg-teal-500 hover:bg-teal-600 transition text-white w-20 h-8">Ok</button>
            </div>
          </div> 

          <div className="min-h-80 bg-white rounded-2xl shadow-md shadow-slate-100 p-6 flex flex-col">
            <h2 className="text-2xl mb-2">Note title</h2>
            <p className="flex-1 text-slate-900">Note text</p>
            <p className="w-full flex justify-end">26.06.2026</p>
          </div> 
        </div>
      </main>

      <footer className="bg-teal-700 px-4 py-1 text-white flex-0">
        Copyright © {(new Date).getFullYear() == 2026 ? "2026" : `2026 - ${(new Date).getFullYear()}`} Chorusmaster
      </footer>
    </div>
  )
}

export default App
