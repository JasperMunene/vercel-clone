"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
      <div className="absolute inset-0 bg-grid-foreground/5 mask-gradient-to-r" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Ship Your Code<br className="hidden sm:inline" /> to Production in Minutes
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              The modern platform for deploying and scaling web applications. 
              Push to git and let us handle the rest.
            </p>
          </motion.div>

          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started for Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">
                See how it works
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative mx-auto overflow-hidden rounded-xl border bg-background shadow-xl">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-muted-foreground">Terminal</div>
                <div className="w-16"></div>
              </div>
              <div className="p-4 font-mono text-sm overflow-hidden">
                <TypewriterEffect />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent"></div>
    </section>
  );
}

function TypewriterEffect() {
  const [text, setText] = useState("");
  const fullText = [
    "$ git push origin main",
    "Counting objects: 5, done.",
    "Delta compression using up to 8 threads.",
    "Compressing objects: 100% (3/3), done.",
    "Writing objects: 100% (5/5), 456 bytes | 456.00 KiB/s, done.",
    "Total 5 (delta 2), reused 0 (delta 0)",
    "remote: Resolving deltas: 100% (2/2), completed with 2 local objects.",
    "remote: ",
    "remote: 🚀 Deploying to DeployFlow...",
    "remote: ✅ Build completed successfully",
    "remote: 🔍 Running checks...",
    "remote: ✨ Deploy preview: https://preview-123456.deployflow.app",
    "remote: 🎉 Production: https://myapp.deployflow.app",
  ].join("\n");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return <pre className="whitespace-pre-wrap break-all">{text}</pre>;
}