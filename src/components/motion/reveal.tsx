"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Expo-out: arranca rápido y desacelera muy suave (sensación premium)
const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** desplazamiento inicial en px (eje Y). Default 18. */
  y?: number;
}

/**
 * Aparición sutil al entrar en viewport: fade + slide-up, sin bounce.
 * Respeta prefers-reduced-motion vía la prop de Framer Motion.
 */
export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.85, ease: EASE_EXPO_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EXPO_OUT },
  },
};

/** Contenedor que escalona la entrada de sus <RevealItem> hijos. */
export function RevealStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
