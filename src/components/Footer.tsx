function Footer() {
  return (
    <footer className="bg-primary px-4 py-1 text-on-primary flex-0">
      Copyright ©{" "}
      {new Date().getFullYear() == 2026
        ? "2026"
        : `2026 - ${new Date().getFullYear()}`}{" "}
      Chorusmaster
    </footer>
  );
}

export default Footer;