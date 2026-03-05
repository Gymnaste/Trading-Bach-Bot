import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
            TB
          </div>
          <span className="text-lg font-semibold text-foreground">Trading Bach Bot</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Se connecter
          </Button>
          <Button size="sm" className="animate-pulse-glow bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            S'inscrire
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
