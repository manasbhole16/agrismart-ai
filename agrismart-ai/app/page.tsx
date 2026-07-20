import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Features />
      {/* Footer can be added later or as part of a global layout */}
      <footer className="py-12 border-t border-border/40 text-center text-muted-foreground bg-muted/20">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} AgriSmart AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
