import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Bot, Wallet } from "lucide-react";

const tabs = [
  {
    id: "analyse",
    label: "Analyse IA",
    icon: Brain,
    title: "Analyse IA (Actus & RSI)",
    description:
      "Notre intelligence artificielle scanne en temps réel le sentiment du marché à travers les actualités financières et calcule les indicateurs techniques comme le RSI. Elle identifie les meilleures opportunités pour maximiser vos performances virtuelles.",
  },
  {
    id: "trading",
    label: "Trading Auto",
    icon: Bot,
    title: "Trading 100% Automatique",
    description:
      "Les positions sont ouvertes et fermées sans aucune intervention humaine. L'algorithme réagit instantanément aux signaux du marché, 24h/24, pour ne jamais rater une opportunité.",
  },
  {
    id: "portefeuille",
    label: "Portefeuille Virtuel",
    icon: Wallet,
    title: "Portefeuille Virtuel",
    description:
      "Apprenez et testez des stratégies de trading sans risquer votre vrai capital. Commencez avec 10 000 $ virtuels et suivez l'évolution de votre portefeuille en temps réel.",
  },
];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("analyse");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-24">
      <div className="container max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Comment ça <span className="text-gradient-cyan">fonctionne ?</span>
        </motion.h2>

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border/50 bg-card p-8 md:p-12 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <active.icon className="text-primary" size={28} />
              <h3 className="text-xl font-semibold">{active.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              {active.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturesSection;
