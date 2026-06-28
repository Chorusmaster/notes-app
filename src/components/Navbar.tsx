function Navbar() {
  return (
    <nav className="bg-primary py-2 px-4 text-on-primary font-medium flex flex-row gap-2">
      <img alt="logo" src="/logo.svg" className="w-8 h-8"></img>
      <span className="text-xl">Simple notes app</span>
    </nav>
  );
}

export default Navbar;