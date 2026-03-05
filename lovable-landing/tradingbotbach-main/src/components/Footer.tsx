const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© 2026 Trading Bach Bot. Tous droits réservés.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          <a href="#" className="hover:text-foreground transition-colors">Simulation V1</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
