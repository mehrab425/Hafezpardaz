"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  titleHighlight,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(centered ? "text-center" : "", className)}
    >
      {tag && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn("mb-4", centered ? "flex justify-center" : "")}
        >
          <span className="section-tag">{tag}</span>
        </motion.div>
      )}
      <h2 className="heading-lg text-white mb-4">
        {titleHighlight ? (
          <>
            {title}{" "}
            <span className="accent-gradient-text">{titleHighlight}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "text-text-secondary text-lg leading-8",
            centered ? "max-w-2xl mx-auto" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
