"use client";
import { motion } from "framer-motion";
import { Droplets, CloudRain, Map, BarChart3, ShieldCheck, Sprout } from "lucide-react";

const features = [
  {
    title: "AI Irrigation Engine",
    description: "Our advanced models calculate the exact water requirement based on crop age, soil type, and weather forecast.",
    icon: Droplets,
  },
  {
    title: "Hyper-Local Weather",
    description: "Integrates with premium weather APIs to adjust irrigation schedules automatically when rain is predicted.",
    icon: CloudRain,
  },
  {
    title: "GIS Farm Mapping",
    description: "Draw your farm boundaries on interactive satellite maps to calculate exact area and micro-climate data.",
    icon: Map,
  },
  {
    title: "Yield Prediction",
    description: "Predict your sugarcane yield months in advance using historical data and current crop health metrics.",
    icon: BarChart3,
  },
  {
    title: "Smart Fertigation",
    description: "Get personalized NPK and micronutrient recommendations tailored to your sugarcane variety's growth stage.",
    icon: Sprout,
  },
  {
    title: "Enterprise Grade",
    description: "Secure, reliable, and built for scale. Perfect for individual farmers or large agricultural cooperatives.",
    icon: ShieldCheck,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need for <span className="text-primary">Precision Farming</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            AgriSmart AI combines agronomy with artificial intelligence to take the guesswork out of sugarcane cultivation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 group hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
