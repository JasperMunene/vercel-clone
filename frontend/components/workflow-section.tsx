"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  GitPullRequestIcon,
  Code2Icon,
  Terminal,
  Globe,
  CheckCircle
} from "lucide-react";

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Connect your repository",
      description: "Link your GitHub, GitLab, or Bitbucket repository to DeployFlow with just a few clicks.",
      icon: GitPullRequestIcon,
    },
    {
      id: 1,
      title: "Configure your project",
      description: "Set up your build settings, environment variables, and deployment preferences.",
      icon: Code2Icon,
    },
    {
      id: 2,
      title: "Push your code",
      description: "Push your changes to your repository and watch as DeployFlow automatically builds and deploys your project.",
      icon: Terminal,
    },
    {
      id: 3,
      title: "Go live",
      description: "Your project is live on our global CDN. Configure your custom domain and SSL certificate with one click.",
      icon: Globe,
    },
  ];

  return (
    <section id="workflow" className="py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Simple workflow, powerful results
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From code to production in minutes, not days. Our streamlined deployment process lets you focus on building, not configuring.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
          <div className="order-2 lg:order-1">
            <div className="space-y-12">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: step.id * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative pl-14 cursor-pointer transition-all duration-200",
                    activeStep === step.id
                      ? "opacity-100"
                      : "opacity-70 hover:opacity-100"
                  )}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div
                    className={cn(
                      "absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                      activeStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>

                  {step.id !== steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-5 top-12 h-[calc(100%+1rem)] w-px",
                        activeStep === step.id
                          ? "bg-primary"
                          : "bg-border"
                      )}
                    />
                  )}

                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <Button size="lg">
                Start Your First Deployment
              </Button>
            </div>
          </div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-xl border bg-card p-1 shadow-xl">
              <div className="flex items-center border-b px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm font-medium">
                  {activeStep === 0 && "Connect Repository"}
                  {activeStep === 1 && "Project Configuration"}
                  {activeStep === 2 && "Deployment in Progress"}
                  {activeStep === 3 && "Deployment Complete"}
                </div>
              </div>
              <div className="p-6 h-[32rem] flex items-center justify-center">
                {activeStep === 0 && <RepositoryStep />}
                {activeStep === 1 && <ConfigurationStep />}
                {activeStep === 2 && <DeploymentStep />}
                {activeStep === 3 && <LiveStep />}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RepositoryStep() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <GitPullRequestIcon className="h-12 w-12 mx-auto text-primary mb-4" />
        <h3 className="text-lg font-semibold">Connect your repository</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select a Git provider to get started
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
          <svg viewBox="0 0 98 96" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor" />
          </svg>
        </div>
        <div className="p-4 border rounded-lg flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
          <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.94 13.11c-.15.4-.41.76-.77 1.03l-9.33 8.38c-.28.25-.64.38-1 .38-.36 0-.72-.13-1-.38L.51 14.14c-.36-.27-.62-.63-.77-1.03-.16-.39-.2-.82-.11-1.24l1.94-9.75c.14-.66.59-1.2 1.22-1.47.26-.11.54-.17.82-.17h14.48c.28 0 .56.06.82.17.63.27 1.08.81 1.22 1.47l1.94 9.75c.09.41.05.84-.11 1.24z" fill="currentColor" />
          </svg>
        </div>
        <div className="p-4 border rounded-lg flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
          <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="space-y-3">
          <div className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="w-6 h-6 mr-3 flex items-center justify-center rounded-full bg-muted">
              <span className="text-xs">R</span>
            </div>
            <span className="text-sm">react-portfolio</span>
          </div>
          <div className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="w-6 h-6 mr-3 flex items-center justify-center rounded-full bg-muted">
              <span className="text-xs">N</span>
            </div>
            <span className="text-sm">next-ecommerce</span>
          </div>
          <div className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="w-6 h-6 mr-3 flex items-center justify-center rounded-full bg-muted">
              <span className="text-xs">S</span>
            </div>
            <span className="text-sm">svelte-dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigurationStep() {
  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Project Configuration</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Framework</label>
          <div className="flex items-center space-x-2 p-2 border rounded-md bg-background">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012c-2.021 2.827-2.63 6.45-1.618 9.792 1.01 3.342 3.519 6.113 6.698 7.423 3.18 1.31 6.777 1.185 9.845-.341 3.068-1.525 5.399-4.338 6.346-7.659.947-3.32.42-6.892-1.434-9.728-1.854-2.836-4.834-4.724-8.089-5.118-.403-.049-1.65-.095-2.404-.095zm.986 6.827v6.845l5.918 3.412c.334.193.345.674.025.881l-.186.129a18.751 18.751 0 0 1-5.205 2.64c-.507.167-1.066-.252-1.068-.81V13.23l-5.885-3.41c-.334-.193-.345-.674-.025-.881l.186-.129a18.749 18.749 0 0 1 5.205-2.64c.507-.167 1.066.252 1.068.81v6.845z" fill="currentColor" />
            </svg>
            <span className="text-sm">Next.js</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Build Command</label>
          <div className="p-2 border rounded-md bg-background">
            <code className="text-sm whitespace-nowrap">next build</code>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Output Directory</label>
          <div className="p-2 border rounded-md bg-background">
            <code className="text-sm whitespace-nowrap">.next</code>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Environment Variables</label>
          <div className="border rounded-md overflow-hidden">
            <div className="p-2 border-b flex items-center justify-between bg-muted/30">
              <span className="text-xs font-medium">Name</span>
              <span className="text-xs font-medium">Value</span>
            </div>
            <div className="p-2 border-b">
              <div className="flex items-center justify-between">
                <code className="text-xs">API_URL</code>
                <code className="text-xs">••••••••••••</code>
              </div>
            </div>
            <div className="p-2">
              <div className="flex items-center justify-between">
                <code className="text-xs">DATABASE_URL</code>
                <code className="text-xs">••••••••••••</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeploymentStep() {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-6 relative">
          <div className="absolute inset-0 rounded-full animate-ping bg-primary/20"></div>
          <div className="relative h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Deploying your application</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Your code is being built and deployed to our global edge network.
        </p>
        
        <div className="w-full space-y-3">
          <div className="flex items-center">
            <div className="w-5 h-5 mr-3 text-primary">
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-sm">Cloning repository</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 mr-3 text-primary">
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-sm">Installing dependencies</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 mr-3 text-primary">
              <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </div>
            <span className="text-sm">Building application</span>
          </div>
          <div className="flex items-center opacity-50">
            <div className="w-5 h-5 mr-3">
              <div className="h-2 w-2 bg-muted-foreground rounded-full"></div>
            </div>
            <span className="text-sm">Running tests</span>
          </div>
          <div className="flex items-center opacity-50">
            <div className="w-5 h-5 mr-3">
              <div className="h-2 w-2 bg-muted-foreground rounded-full"></div>
            </div>
            <span className="text-sm">Deploying to edge network</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveStep() {
  return (
    <div className="w-full max-w-md text-center">
      <div className="inline-flex items-center justify-center p-2 rounded-full bg-green-100 dark:bg-green-900 mb-6">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2">Deployment Successful!</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Your application has been deployed and is now live.
      </p>
      
      <div className="space-y-4">
        <div className="p-3 border rounded-lg bg-background">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Production</span>
            <div className="flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <code className="text-xs text-muted-foreground">https://my-app.deployflow.com</code>
            <button className="text-xs text-primary">Visit</button>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg bg-background">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Custom Domain</span>
            <Button variant="outline" size="sm" className="text-xs h-7 px-2">
              Add Domain
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 text-left mt-6">
          <h4 className="text-sm font-medium">Deployment Details</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-muted-foreground">Deployment ID</div>
            <div className="font-mono">dpl_12a45b67c8</div>
            
            <div className="text-muted-foreground">Created at</div>
            <div>Just now</div>
            
            <div className="text-muted-foreground">Build duration</div>
            <div>45 seconds</div>
            
            <div className="text-muted-foreground">Status</div>
            <div className="flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
              Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}