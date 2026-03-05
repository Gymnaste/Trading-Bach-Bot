import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroChart from "@/assets/hero-chart.png";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(hsl(187 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(187 100% 50% / 0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              L'IA qui trade pour vous,{" "}
              <span className="text-gradient-cyan">sans le moindre risque.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Découvrez Trading Bach Bot. Inscrivez-vous, recevez{" "}
              <span className="text-foreground font-semibold">10 000 $ virtuels</span>, et laissez
              notre intelligence artificielle analyser les actualités et les graphiques pour vous.
            </p>
            <Button
              size="lg"
              className="animate-pulse-glow bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Ouvrir un compte gratuit
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              <img
                src={heroChart}
                alt="Trading Bach Bot - Courbe de performance IA"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Floating glow behind */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
