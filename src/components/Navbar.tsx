interface NavbarProps {
  isRegistered: boolean;
  logOut: () => void;
}

function Navbar({ isRegistered, logOut }: NavbarProps) {
  return (
    <nav className="bg-primary py-2 px-4 text-on-primary font-medium flex justify-between">
      <div className="flex flex-row gap-2">
        <img alt="logo" src="/logo.svg" className="w-8 h-8"></img>
        <span className="text-xl">Simple notes app</span>
      </div>
      {isRegistered && <button onClick={logOut} className="text-on-primary hover:text-on-primary/80">Log out</button>}
    </nav>
  );
}

export default Navbar;