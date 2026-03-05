import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, TrendingUp, Globe, Lock, Cpu, ArrowRight } from 'lucide-react';
import { AxiomLogo } from '../landing/AxiomLogo';
import { GlassCard } from '../landing/GlassCard';
import { FloatingDollarSigns } from '../landing/FloatingDollarSigns';
import { PerformanceChart } from '../landing/PerformanceChart';
import { ImageWithFallback } from '../landing/ImageWithFallback';

export default function LandingPage() {
    return (
        <div className="min-h-screen relative text-white font-sans selection:bg-cyan-400/30 overflow-x-hidden" style={{ backgroundColor: '#0A0E1A' }}>
            <FloatingDollarSigns />

            {/* BACKGROUND ORBS */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            {/* NAVIGATION */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <AxiomLogo />

                    <div className="hidden md:flex items-center gap-10">
                        {['FONCTIONNALITÉS', 'PERFORMANCE', 'SÉCURITÉ'].map((item) => (
                            <a
                                key={`nav-link-${item}`}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium tracking-[0.1em] text-white/60 hover:text-cyan-400 transition-colors uppercase"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden sm:block text-sm font-bold tracking-[0.1em] text-cyan-400 hover:text-cyan-300 transition-colors uppercase">
                            CONNEXION
                        </Link>
                        <Link to="/register" className="px-6 py-2.5 rounded-full bg-cyan-400 text-[#0A0E1A] text-sm font-bold tracking-[0.1em] hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] uppercase inline-block">
                            S'INSCRIRE
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-[0.2em] mb-8 uppercase"
                    >
                        <Zap size={14} />
                        <span>LA FINTECH DE DEMAIN, AUJOURD'HUI</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase"
                    >
                        DOMINEZ LE MARCHÉ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SANS AUCUNE ÉMOTION</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-2xl text-lg md:text-xl text-white/50 mb-12 uppercase leading-relaxed tracking-wide"
                    >
                        AXIOM EST L'IA D'INVESTISSEMENT LA PLUS AVANCÉE AU MONDE.
                        OPTIMISEZ VOS ACTIFS 24/7 AVEC UNE PRÉCISION MATHÉMATIQUE.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/register" className="px-10 py-5 rounded-2xl bg-cyan-400 text-[#0A0E1A] font-black tracking-[0.1em] hover:bg-cyan-300 transition-all flex items-center justify-center gap-3 uppercase group">
                            COMMENCER MAINTENANT
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#fonctionnalités" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 font-black tracking-[0.1em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 uppercase">
                            DÉCOUVRIR L'IA
                        </a>
                    </motion.div>

                    {/* DASHBOARD PREVIEW */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-20 w-full max-w-5xl aspect-video rounded-3xl border border-white/10 overflow-hidden relative shadow-[0_0_100px_rgba(34,211,238,0.1)]"
                    >
                        <ImageWithFallback
                            src="https://images.unsplash.com/photo-1761850167081-473019536383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY3lhbiUyMGxpbmUlMjBncmFwaCUyMGZpbnRlY2glMjBkYXNoYm9hcmQlMjBkYXJrJTIwZnV0dXJpc3RpY3xlbnwxfHx8fDE3NzI3MTY3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="AXIOM DASHBOARD"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-60" />

                        {/* GLASS OVERLAY ELEMENTS */}
                        <div className="absolute bottom-10 left-10 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 max-w-xs text-left hidden md:block">
                            <p className="text-cyan-400 text-xs font-bold tracking-widest mb-2 uppercase">SOLDE TOTAL</p>
                            <h3 className="text-3xl font-black mb-1">124.530,00 €</h3>
                            <p className="text-green-400 text-xs font-bold uppercase">+12,4% CE MOIS</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="fonctionnalités" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-xl">
                            <p className="text-cyan-400 text-xs font-bold tracking-[0.2em] mb-4 uppercase">CORE FEATURES</p>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">L'EXCELLENCE <br />TECHNOLOGIQUE</h2>
                        </div>
                        <p className="max-w-md text-white/50 uppercase text-sm tracking-widest leading-relaxed">
                            NOTRE INFRASTRUCTURE UTILISE LE QUANTUM COMPUTING POUR PRÉDIRE LES VARIATIONS DE MARCHÉ AVEC UNE LATENCE INFÉRIEURE À 1MS.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <GlassCard delay={0.1}>
                            <Cpu className="text-cyan-400 mb-6" size={40} />
                            <h3 className="text-xl font-black mb-4 uppercase">ALGORITHMES QUANTIQUES</h3>
                            <p className="text-white/50 text-sm leading-relaxed uppercase">
                                ANALYSE DE MILLIERS DE PARAMÈTRES EN TEMPS RÉEL POUR CHAQUE TRANSACTION.
                            </p>
                        </GlassCard>

                        <GlassCard delay={0.2}>
                            <TrendingUp className="text-cyan-400 mb-6" size={40} />
                            <h3 className="text-xl font-black mb-4 uppercase">RENDEMENTS OPTIMISÉS</h3>
                            <p className="text-white/50 text-sm leading-relaxed uppercase">
                                UNE STRATÉGIE ADAPTATIVE QUI MAXIMISE LE PROFIT TOUT EN MINIMISANT L'EXPOSITION AU RISQUE.
                            </p>
                        </GlassCard>

                        <GlassCard delay={0.3}>
                            <Globe className="text-cyan-400 mb-6" size={40} />
                            <h3 className="text-xl font-black mb-4 uppercase">ACCÈS GLOBAL</h3>
                            <p className="text-white/50 text-sm leading-relaxed uppercase">
                                INVESTISSEZ DANS N'IMPORTE QUEL MARCHÉ MONDIAL, 24 HEURES SUR 24, 7 JOURS SUR 7.
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* PERFORMANCE SECTION */}
            <section id="performance" className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-cyan-400 text-xs font-bold tracking-[0.2em] mb-4 uppercase">PERFORMANCE RÉELLE</p>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">RÉSULTATS <br />VÉRIFIÉS</h2>
                            <p className="text-white/50 uppercase text-lg mb-10 tracking-wide leading-relaxed">
                                REJOIGNEZ PLUS DE 10 000 INVESTISSEURS QUI FONT DÉJÀ CONFIANCE À L'ALGORITHME AXIOM POUR LEUR CROISSANCE PATRIMONIALE.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-4xl font-black text-white mb-1">+127%</h4>
                                    <p className="text-white/40 text-xs font-bold tracking-widest uppercase">RENDEMENT MOYEN</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-black text-white mb-1">€2.4B</h4>
                                    <p className="text-white/40 text-xs font-bold tracking-widest uppercase">ACTIFS GÉRÉS</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">LIVE TRADING VIEW</div>
                            </div>
                            <PerformanceChart />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECURITY SECTION */}
            <section id="sécurité" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <GlassCard className="!p-16 text-center">
                        <div className="flex justify-center mb-8">
                            <div className="w-24 h-24 rounded-full bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20">
                                <Lock className="text-cyan-400" size={48} />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">SÉCURITÉ MILITAIRE</h2>
                        <p className="max-w-2xl mx-auto text-white/50 uppercase text-lg mb-12 tracking-wide leading-relaxed">
                            VOS ACTIFS SONT PROTÉGÉS PAR UN CHIFFREMENT DE BOUT EN BOUT ET STOCKÉS DANS DES COFFRES-FORTS NUMÉRIQUES HORS LIGNE À HAUTE SÉCURITÉ.
                        </p>
                        <div className="grid sm:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <Shield className="mx-auto text-cyan-400" size={32} />
                                <h4 className="font-black uppercase">GARANTIE TOTALE</h4>
                            </div>
                            <div className="space-y-4">
                                <Lock className="mx-auto text-cyan-400" size={32} />
                                <h4 className="font-black uppercase">2FA AVANCÉ</h4>
                            </div>
                            <div className="space-y-4">
                                <Cpu className="mx-auto text-cyan-400" size={32} />
                                <h4 className="font-black uppercase">AUDIT IA CONTINU</h4>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-10">PRÊT À RÉVOLUTIONNER <br />VOTRE PATRIMOINE ?</h2>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block"
                    >
                        <Link to="/register" className="px-12 py-6 rounded-2xl bg-white text-[#0A0E1A] font-black tracking-[0.2em] text-xl shadow-[0_0_50px_rgba(255,255,255,0.2)] uppercase hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] transition-all inline-block">
                            OUVRIR UN COMPTE AXIOM
                        </Link>
                    </motion.div>
                    <p className="mt-8 text-white/30 text-xs font-bold tracking-[0.2em] uppercase">
                        AUCUN FRAIS D'ENTRÉE • ANNULATION À TOUT MOMENT • SUPPORT 24/7
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-20 pb-10 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2">
                            <AxiomLogo />
                            <p className="mt-8 max-w-sm text-white/40 text-sm tracking-widest leading-relaxed uppercase">
                                AXIOM EST UNE PLATEFORME D'INVESTISSEMENT AUTOMATISÉE UTILISANT DES TECHNOLOGIES DE POINTE POUR OPTIMISER LES RENDEMENTS FINANCIERS.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-black mb-8 uppercase tracking-[0.2em]">PRODUITS</h5>
                            <ul className="space-y-4">
                                {['IA TRADING', 'WALLET', 'CARTE NOIRE', 'INSTITUTIONS'].map((item) => (
                                    <li key={`footer-prod-${item}`}>
                                        <a href="#" className="text-sm text-white/40 hover:text-cyan-400 transition-colors uppercase tracking-widest">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-black mb-8 uppercase tracking-[0.2em]">SOCIÉTÉ</h5>
                            <ul className="space-y-4">
                                {['À PROPOS', 'CARRIÈRES', 'CONTACT', 'PRESSE'].map((item) => (
                                    <li key={`footer-soc-${item}`}>
                                        <a href="#" className="text-sm text-white/40 hover:text-cyan-400 transition-colors uppercase tracking-widest">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
                        <p className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase">
                            © 2026 AXIOM TECHNOLOGIES. TOUS DROITS RÉSERVÉS.
                        </p>
                        <div className="flex gap-8">
                            <a href="#" className="text-white/20 text-[10px] font-bold tracking-[0.3em] hover:text-white uppercase">POLITIQUE DE CONFIDENTIALITÉ</a>
                            <a href="#" className="text-white/20 text-[10px] font-bold tracking-[0.3em] hover:text-white uppercase">CONDITIONS D'UTILISATION</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
