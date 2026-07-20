"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Sun, Sprout } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-8"
        >
          <Sprout className="mr-2 h-4 w-4" />
          <span className="font-medium">The Future of Sugarcane Farming is Here</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8"
        >
          AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Irrigation</span> <br className="hidden md:block" /> Advisory System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Maximize your sugarcane yield and minimize water waste with our intelligent, 
          weather-aware irrigation recommendation engine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

        </motion.div>
        
        {/* Mockup Showcase */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.4 }}
           className="mt-20 relative mx-auto max-w-5xl"
        >
           <div className="glass-card p-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="bg-muted/30 rounded-xl h-[400px] md:h-[600px] flex items-center justify-center border border-border/50 relative overflow-hidden">
                 {/* Decorative elements representing the dashboard */}
                 <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-muted/80 backdrop-blur-sm z-0"></div>
                 <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-8 w-full h-full">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                       <div className="h-48 rounded-xl bg-card border border-border shadow-sm p-6 flex flex-col justify-between">
                          <div className="h-6 w-1/3 bg-muted rounded"></div>
                          <div className="flex justify-between items-end">
                             <div className="h-16 w-32 bg-primary/20 rounded"></div>
                             <div className="h-32 w-full ml-8 bg-muted rounded"></div>
                          </div>
                       </div>
                       <div className="h-64 rounded-xl bg-card border border-border shadow-sm p-6">
                           <div className="h-6 w-1/4 bg-muted rounded mb-6"></div>
                           <div className="space-y-4">
                              <div className="h-4 w-full bg-muted rounded"></div>
                              <div className="h-4 w-5/6 bg-muted rounded"></div>
                              <div className="h-4 w-4/6 bg-muted rounded"></div>
                           </div>
                       </div>
                    </div>
                    <div className="col-span-1 space-y-6">
                       <div className="h-64 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 shadow-sm p-6 flex flex-col items-center justify-center text-center">
                          <Droplets className="h-16 w-16 text-primary mb-4" />
                          <div className="h-6 w-3/4 bg-primary/30 rounded mb-2"></div>
                          <div className="h-4 w-1/2 bg-primary/20 rounded"></div>
                       </div>
                       <div className="h-48 rounded-xl bg-card border border-border shadow-sm p-6 flex flex-col items-center justify-center">
                          <Sun className="h-12 w-12 text-amber-500 mb-4" />
                          <div className="h-4 w-2/3 bg-muted rounded"></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
