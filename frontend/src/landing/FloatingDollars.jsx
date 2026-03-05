import { motion } from 'framer-motion'

const dollars = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    size: 14 + Math.random() * 28,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 12,
    opacity: 0.04 + Math.random() * 0.08,
    xDrift: -30 + Math.random() * 60,
}))

const SCREEN_HEIGHT = typeof window !== 'undefined' ? window.innerHeight : 900

export default function FloatingDollars() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {dollars.map((d) => (
                <motion.span
                    key={d.id}
                    className="absolute font-bold select-none"
                    style={{
                        left: d.left,
                        fontSize: d.size,
                        opacity: d.opacity,
                        bottom: '-40px',
                        color: 'hsl(187, 100%, 50%)',
                    }}
                    animate={{
                        y: [0, -(SCREEN_HEIGHT + 100)],
                        x: [0, d.xDrift, 0],
                        rotate: [0, d.xDrift > 0 ? 15 : -15, 0],
                    }}
                    transition={{
                        duration: d.duration,
                        delay: d.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    $
                </motion.span>
            ))}
        </div>
    )
}
