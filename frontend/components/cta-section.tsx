import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-foreground/[0.025] [mask-image:radial-gradient(white,transparent_70%)]" />
          
          <div className="relative z-10 px-8 py-16 md:py-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Deploy your next project in minutes
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join thousands of developers who trust DeployFlow for their deployment needs. Start for free, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}