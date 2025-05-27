"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RocketIcon, GitBranchIcon, GlobeIcon, ServerIcon, ShieldIcon, BarChartIcon, type LucideProps } from "lucide-react";

const featureDetails = {
  instant: [
    "Zero-config deployments from Git",
    "Automatic builds for your framework",
    "Intelligent caching for faster builds",
    "Rollback to any previous deployment",
  ],
  preview: [
    "Unique URL for every branch and PR",
    "Share preview links with your team",
    "Compare changes visually before merging",
    "Automatic deployment when PRs are updated",
  ],
  global: [
    "Content served from 300+ edge locations",
    "Automatic CDN caching configuration",
    "Intelligent routing to the closest region",
    "Global load balancing and failover",
  ],
  serverless: [
    "Write functions in JavaScript, TypeScript, or Go",
    "Automatic scaling with no cold starts",
    "Connect to any database or API",
    "Local development environment",
  ],
  security: [
    "Free SSL certificates for all domains",
    "Automatic HTTPS redirects",
    "DDoS protection at the edge",
    "Regular security audits and updates",
  ],
  analytics: [
    "Real-time performance monitoring",
    "Error tracking and alerting",
    "User behavior analytics",
    "Customizable dashboards and reports",
  ],
} as const;

type FeatureId = keyof typeof featureDetails;

interface Feature {
  id: FeatureId;
  name: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  image: string;
}

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("instant");

  const features: Feature[] = [
    {
      id: "instant",
      name: "Instant Deployments",
      description: "Push your code and let our platform handle the deployment process. Updates are live within seconds.",
      icon: RocketIcon,
      image: "/features/instant-deployment.webp", // This would be a real image in production
    },
    {
      id: "preview",
      name: "Preview Environments",
      description: "Every pull request gets its own preview environment. Test changes before merging to production.",
      icon: GitBranchIcon,
      image: "/features/preview-environments.webp",
    },
    {
      id: "global",
      name: "Global Edge Network",
      description: "Deploy to our global CDN with edge locations worldwide for the fastest possible performance.",
      icon: GlobeIcon,
      image: "/features/global-edge.webp",
    },
    {
      id: "serverless",
      name: "Serverless Functions",
      description: "Deploy backend logic as serverless functions that scale automatically with your traffic.",
      icon: ServerIcon,
      image: "/features/serverless.webp",
    },
    {
      id: "security",
      name: "Advanced Security",
      description: "Built-in SSL, DDoS protection, and automated security patches to keep your applications safe.",
      icon: ShieldIcon,
      image: "/features/security.webp",
    },
    {
      id: "analytics",
      name: "Real-time Analytics",
      description: "Monitor performance, errors, and user behavior with our integrated analytics dashboard.",
      icon: BarChartIcon,
      image: "/features/analytics.webp",
    },
  ];

  // Initial animation settings
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to deploy with confidence</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform provides a complete set of tools to deploy, manage, and scale your applications.
          </p>
        </div>

        <Tabs
          defaultValue="instant"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-1">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-background"
              >
                <feature.icon className="h-5 w-5" />
                <span className="text-xs sm:text-sm">{feature.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-12">
            {features.map((feature) => (
              <TabsContent
                key={feature.id}
                value={feature.id}
                className="mt-0"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{feature.name}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    
                    <motion.ul 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3 mt-6"
                    >
                      {featureDetails[feature.id].map((detail, i) => (
                        <motion.li 
                          key={i} 
                          variants={itemVariants}
                          className="flex items-start"
                        >
                          <div className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-xl border bg-background p-2 shadow-lg"
                  >
                    <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary/5 via-secondary/5 to-muted flex items-center justify-center overflow-hidden">
                      <div className="flex h-full w-full items-center justify-center">
                        <FeatureIllustration feature={feature.id} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}


function FeatureIllustration({ feature }: { feature: string }) {
  // In a real app, these would be actual images or more complex SVGs
  // Here we're using simple placeholders
  
  switch (feature) {
    case "instant":
      return (
        <div className="relative w-full max-w-md p-6">
          <div className="flex flex-col space-y-4">
            <div className="h-2 w-24 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="h-2 w-32 bg-primary/15 rounded-full animate-pulse delay-100"></div>
            <div className="h-2 w-40 bg-primary/10 rounded-full animate-pulse delay-200"></div>
            <div className="h-6 w-20 bg-primary/30 rounded-md mt-4 animate-pulse delay-300"></div>
          </div>
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-primary/20 animate-ping absolute"></div>
              <div className="h-12 w-12 rounded-full bg-primary/40 relative flex items-center justify-center">
                <RocketIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      );
    
    case "preview":
      return (
        <div className="flex space-x-6 p-6">
          <div className="flex-1 rounded-md border border-border p-3">
            <div className="h-2 w-16 bg-primary/20 rounded-full mb-2"></div>
            <div className="h-20 w-full bg-muted rounded-md"></div>
          </div>
          <div className="flex-1 rounded-md border border-border p-3">
            <div className="h-2 w-16 bg-primary/20 rounded-full mb-2"></div>
            <div className="h-20 w-full bg-muted/50 rounded-md"></div>
          </div>
          <div className="absolute bottom-4 right-8">
            <GitBranchIcon className="h-8 w-8 text-primary/60" />
          </div>
        </div>
      );
      
    // You would implement all the other cases similar to these
    default:
      // For the sake of brevity, we'll use a generic illustration for other features
      return (
        <div className="flex items-center justify-center p-8">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
            {feature === "global" && <GlobeIcon className="h-10 w-10 text-primary/60" />}
            {feature === "serverless" && <ServerIcon className="h-10 w-10 text-primary/60" />}
            {feature === "security" && <ShieldIcon className="h-10 w-10 text-primary/60" />}
            {feature === "analytics" && <BarChartIcon className="h-10 w-10 text-primary/60" />}
          </div>
        </div>
      );
  }
}