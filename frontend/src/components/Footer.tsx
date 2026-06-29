function Footer() {
  const year = new Date().getFullYear();
  const copyright =
    year === 2026 ? "2026" : `2026 - ${year}`;

  return (
    <footer className="bg-primary px-4 py-1 text-on-primary flex-0">
      Copyright © {copyright} Chorusmaster
    </footer>
  );
}

export default Footer;