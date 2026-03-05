import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(hsl(187 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(187 100% 50% / 0.3) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            <div className="container mx-auto max-w-6xl px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white">
                            L'IA qui trade pour vous,{' '}
                            <span className="text-gradient-cyan">sans le moindre risque.</span>
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
                            Découvrez Trading Bach Bot. Inscrivez-vous, recevez{' '}
                            <span className="text-white font-semibold">10 000 $ virtuels</span>, et laissez
                            notre intelligence artificielle analyser les actualités et les graphiques pour vous.
                        </p>
                        <Link
                            to="/register"
                            className="inline-block px-8 py-4 text-base font-semibold bg-[hsl(187,100%,50%)] text-[hsl(216,71%,8%)] rounded-xl animate-pulse-glow hover:brightness-110 transition-all hover:-translate-y-0.5"
                        >
                            Ouvrir un compte gratuit
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900 p-6">
                            {/* Faux graphique animé */}
                            <div className="flex items-end gap-1.5 h-48">
                                {[40, 55, 45, 70, 60, 80, 65, 90, 75, 95, 85, 100, 88, 96].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 rounded-t-sm"
                                        style={{ background: h > 70 ? 'hsl(187,100%,50%)' : 'hsl(187,100%,50%,0.3)' }}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                                    />
                                ))}
                            </div>
                            <div className="mt-3 flex justify-between text-xs text-gray-500">
                                <span>Sept</span><span>Oct</span><span>Nov</span><span>Déc</span><span>Jan</span><span>Fév</span>
                            </div>
                            <div className="absolute top-4 right-4 text-right">
                                <p className="text-xs text-gray-500">Rendement simulé</p>
                                <p className="text-2xl font-bold text-[hsl(187,100%,50%)]">+142%</p>
                            </div>
                        </div>
                        <div className="absolute -inset-4 -z-10 rounded-3xl bg-[hsl(187,100%,50%)]/5 blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
