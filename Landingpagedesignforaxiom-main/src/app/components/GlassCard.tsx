import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 211, 238, 0.2)' }}
      className={`relative p-8 rounded-3xl backdrop-blur-2xl border border-white/10 overflow-hidden group ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }}
    >
      {/* Animated glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(34, 211, 238, 0.15), transparent 70%)',
        }}
      />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
