"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    {
      name: "Hobby",
      description: "Perfect for small personal projects and experiments.",
      price: annual ? 0 : 0,
      features: [
        "Unlimited personal projects",
        "Automated HTTPS",
        "Global CDN",
        "Continuous deployment",
        "Preview deployments",
        "Custom domains (up to 3)",
      ],
      limits: [
        "100 GB bandwidth/month",
        "1000 build minutes/month",
        "No team members",
        "Community support",
      ],
      mostPopular: false,
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      description: "For professionals and small teams building production apps.",
      price: annual ? 20 : 25,
      features: [
        "Unlimited projects",
        "Team collaboration (up to 5)",
        "Advanced analytics",
        "Password protection",
        "Environment variables",
        "Custom domains (unlimited)",
        "Priority builds",
        "Concurrent builds (up to 3)",
      ],
      limits: [
        "1 TB bandwidth/month",
        "5000 build minutes/month",
        "Email support",
      ],
      mostPopular: true,
      buttonText: "Try Pro Free",
      buttonVariant: "default",
    },
    {
      name: "Business",
      description: "For teams and businesses with advanced needs.",
      price: annual ? 60 : 70,
      features: [
        "Everything in Pro",
        "Team collaboration (unlimited)",
        "SAML SSO",
        "Role-based access controls",
        "Activity audit logs",
        "Concurrent builds (up to 10)",
        "Advanced security features",
        "99.99% uptime SLA",
      ],
      limits: [
        "5 TB bandwidth/month",
        "Unlimited build minutes",
        "Priority support",
      ],
      mostPopular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan for your needs. Start for free and upgrade as you grow.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="relative flex rounded-full p-1 bg-muted">
              <button
                className={cn(
                  "relative rounded-full px-6 py-2 text-sm font-medium transition-colors",
                  annual 
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
                onClick={() => setAnnual(true)}
              >
                Annual
                <span className="absolute -top-2 -right-2 flex h-5 w-auto min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-3 text-primary-foreground">
                  -20%
                </span>
              </button>
              <button
                className={cn(
                  "relative rounded-full px-6 py-2 text-sm font-medium transition-colors",
                  !annual 
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
                onClick={() => setAnnual(false)}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative rounded-xl border bg-background shadow-sm p-8",
                plan.mostPopular && "border-primary shadow-lg"
              )}
            >
              {plan.mostPopular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-6">
                  <span className="flex items-baseline">
                    <span className="text-4xl font-bold">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="ml-1 text-sm text-muted-foreground">
                        /mo {annual && "(billed annually)"}
                      </span>
                    )}
                  </span>
                </div>
                
                <div className="mt-8">
                  <Button 
                    variant={plan.buttonVariant as "default" | "outline"}
                    className="w-full"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
                
                <div className="mt-8 space-y-5">
                  <h4 className="text-sm font-medium">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex text-sm">
                        <CheckIcon className="h-5 w-5 text-primary shrink-0 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Limits:
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {plan.limits.map((limit) => (
                        <li key={limit} className="flex text-sm text-muted-foreground">
                          <span className="mr-3">•</span>
                          <span>{limit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold">Need a custom plan?</h3>
          <p className="mt-2 text-muted-foreground">
            Contact our sales team for a custom solution tailored to your specific needs.
          </p>
          <div className="mt-6">
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}