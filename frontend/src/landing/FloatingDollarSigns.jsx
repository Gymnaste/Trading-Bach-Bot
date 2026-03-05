import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function FloatingDollarSigns() {
    const dollarSigns = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 15,
        delay: Math.random() * 10,
        size: 40 + Math.random() * 80,
        blur: Math.random() * 8 + 2,
        opacity: Math.random() * 0.15 + 0.05,
        rotate: Math.random() * 360,
    })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {dollarSigns.map((sign) => (
                <motion.div
                    key={`dollar-sign-${sign.id}`}
                    className="absolute text-cyan-400 select-none font-black"
                    style={{
                        left: `${sign.x}%`,
                        top: `${sign.y}%`,
                        fontSize: `${sign.size}px`,
                        filter: `blur(${sign.blur}px)`,
                        opacity: sign.opacity,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        x: [0, 40, 0],
                        rotate: [sign.rotate, sign.rotate + 360],
                    }}
                    transition={{
                        duration: sign.duration,
                        delay: sign.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    $
                </motion.div>
            ))}
        </div>
    );
}
