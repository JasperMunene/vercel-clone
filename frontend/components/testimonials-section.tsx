"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "DeployFlow has completely transformed our deployment process. What used to take hours now happens automatically in minutes. My team can focus on building features instead of fighting with infrastructure.",
      author: "Sarah Johnson",
      title: "CTO at Acme Corp",
      image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
      company: "acmeCorp",
    },
    {
      quote: "The preview deployments for each pull request have revolutionized our review process. Our designers can now provide feedback directly on the live site before we merge to production.",
      author: "David Chen",
      title: "Lead Developer at TechStart",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
      company: "techStart",
    },
    {
      quote: "We migrated from a complex self-hosted solution to DeployFlow and haven't looked back. The global CDN ensures our site is fast for users worldwide, and we've reduced our DevOps overhead significantly.",
      author: "Michelle Rodriguez",
      title: "VP of Engineering at SaaS Platform",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
      company: "saasPlat",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Trusted by developers worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our customers have to say about their experience with DeployFlow.
          </p>
        </div>
        
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -top-6 -left-6 text-primary/10 opacity-70">
            <Quote size={120} />
          </div>
          
          <div className="relative z-10">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: activeIndex === idx ? 1 : 0,
                  x: activeIndex === idx ? 0 : 20,
                  display: activeIndex === idx ? "block" : "none",
                }}
                transition={{ duration: 0.5 }}
                className="bg-card p-8 rounded-xl shadow-sm border"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="aspect-square relative rounded-full overflow-hidden border-4 border-background shadow-lg mx-auto w-24 h-24">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    activeIndex === idx ? "bg-primary" : "bg-muted"
                  )}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className="sr-only">Testimonial {idx + 1}</span>
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
          <div className="h-12 w-auto">
            <svg viewBox="0 0 98 96" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor" />
            </svg>
          </div>
          <div className="h-8 w-auto">
            <svg viewBox="0 0 2500 2165.1" width="70" height="60" xmlns="http://www.w3.org/2000/svg">
              <path d="M2500 1716.6v-220.6L2187.5 1293v269.9l-156.3-92v-269.6L1718.8 1108v631.4l312.5-184.7v-261.1l156.3 91.6v261.1z" fill="currentColor" />
              <path d="M1250 1825.2L2187.5 1293l-312.5-187L937.5 1543.3z" fill="currentColor" />
              <path d="M2187.5 919.4l-937.5-532.2L1250 204.9l937.5 532.3zM0 1118l312.5 178.1v-356.2z" fill="currentColor" />
              <path d="M312.5 1477.7L625 1296V723.4L312.5 541.7v935.9zm0-1200.5L0 460.5l312.5 178.1 312.5-178.1z" fill="currentColor" />
              <path d="M625 1296l937.5-538.7-312.5-178.1L625 723.5V1296z" fill="currentColor" />
            </svg>
          </div>
          <div className="h-10 w-auto">
            <svg viewBox="0 0 394 80" width="100" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z" fill="currentColor" />
              <path d="M149.052 0.0330722V12.7H94.5126V33.0772H138.281V45.7441H94.5126V66.6721H149.052V79.339H80.8996V12.7H80.8998V0.0330722H149.052Z" fill="currentColor" />
              <path d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654H229.312L206.352 28.6704L183.32 0.0661486Z" fill="currentColor" />
              <path d="M201.6 56.7148L192.679 45.6229L165.506 79.3723H183.32L201.6 56.7148Z" fill="currentColor" />
              <path d="M80.9 79.339L17.0173 0H0L63.8822 79.339H80.9Z" fill="currentColor" />
              <path d="M333.607 78.8285C332.61 78.8285 331.715 78.5297 330.922 77.9322C330.139 77.3347 329.507 76.5085 329.028 75.4537C328.549 74.3989 328.309 73.1863 328.309 71.8158C328.309 70.4453 328.549 69.2317 329.028 68.1769C329.517 67.1221 330.149 66.2959 330.922 65.6984C331.705 65.1009 332.6 64.8021 333.607 64.8021C334.604 64.8021 335.499 65.1009 336.282 65.6984C337.065 66.2959 337.697 67.1221 338.177 68.1769C338.656 69.2317 338.896 70.4453 338.896 71.8158C338.896 73.1863 338.656 74.3989 338.177 75.4537C337.697 76.5085 337.065 77.3347 336.282 77.9322C335.499 78.5297 334.604 78.8285 333.607 78.8285ZM371.525 78.8285C370.528 78.8285 369.633 78.5297 368.84 77.9322C368.057 77.3347 367.425 76.5085 366.946 75.4537C366.467 74.3989 366.227 73.1863 366.227 71.8158C366.227 70.4453 366.467 69.2317 366.946 68.1769C367.435 67.1221 368.067 66.2959 368.84 65.6984C369.623 65.1009 370.518 64.8021 371.525 64.8021C372.522 64.8021 373.417 65.1009 374.2 65.6984C374.983 66.2959 375.615 67.1221 376.094 68.1769C376.573 69.2317 376.813 70.4453 376.813 71.8158C376.813 73.1863 376.573 74.3989 376.094 75.4537C375.615 76.5085 374.983 77.3347 374.2 77.9322C373.417 78.5297 372.522 78.8285 371.525 78.8285ZM348.975 78.8285C347.978 78.8285 347.083 78.5297 346.29 77.9322C345.507 77.3347 344.875 76.5085 344.396 75.4537C343.917 74.3989 343.677 73.1863 343.677 71.8158C343.677 70.4453 343.917 69.2317 344.396 68.1769C344.875 67.1221 345.507 66.2959 346.29 65.6984C347.083 65.1009 347.978 64.8021 348.975 64.8021C349.972 64.8021 350.867 65.1009 351.65 65.6984C352.433 66.2959 353.065 67.1221 353.544 68.1769C354.023 69.2317 354.263 70.4453 354.263 71.8158C354.263 73.1863 354.023 74.3989 353.544 75.4537C353.065 76.5085 352.433 77.3347 351.65 77.9322C350.867 78.5297 349.972 78.8285 348.975 78.8285ZM394.01 78.9325C393.012 78.9325 392.117 78.6101 391.334 77.9654C390.552 77.331 389.92 76.4675 389.44 75.375C388.961 74.2825 388.721 73.0675 388.721 71.73C388.721 70.3925 388.961 69.1767 389.44 68.0825C389.92 66.9883 390.552 66.1248 391.334 65.4904C392.117 64.8456 393.012 64.5233 394.01 64.5233C395.007 64.5233 395.902 64.8456 396.685 65.4904C397.468 66.1248 398.1 66.9883 398.579 68.0825C399.058 69.1767 399.298 70.3925 399.298 71.73C399.298 73.0675 399.058 74.2825 398.579 75.375C398.1 76.4675 397.468 77.331 396.685 77.9654C395.902 78.6101 395.007 78.9325 394.01 78.9325Z" fill="currentColor" />
            </svg>
          </div>
          <div className="h-9 w-auto">
            <svg viewBox="0 0 640 280" width="80" height="35" xmlns="http://www.w3.org/2000/svg">
              <path d="M180.41 139.95h27.85v8.45h-39.03V89.75h11.18v50.2zM245.18 142.18c-3.88 4.56-8.19 6.84-12.9 6.84-7.59 0-11.4-4.56-11.4-13.68v-31.6h11.18v28.93c0 3.5.4 5.94 1.2 7.34.8 1.4 2.27 2.1 4.41 2.1 1.87 0 3.84-.65 5.93-1.95v-36.41h11.18v44.85h-9.59v-5.42h-.01zM292.3 101.75h-11.18v44.85h11.18v-44.85zm-5.59-18.66c-1.87 0-3.48.65-4.83 1.95-1.35 1.31-2.02 2.91-2.02 4.8 0 1.91.67 3.52 2.02 4.83 1.35 1.31 2.96 1.97 4.83 1.97s3.48-.66 4.83-1.97c1.35-1.31 2.03-2.91 2.03-4.83 0-1.89-.68-3.5-2.03-4.8-1.35-1.31-2.96-1.95-4.83-1.95zM320.36 147.22c-6.53 0-11.73-1.99-15.61-5.98-3.88-3.98-5.81-9.3-5.81-15.96 0-6.84 2.02-12.29 6.05-16.33 4.03-4.04 9.39-6.05 16.09-6.05 7.25 0 13.8 2.96 19.64 8.88l-7.47 7.25c-3.8-3.88-7.59-5.83-11.38-5.83-3.62 0-6.61 1.2-8.98 3.61-2.37 2.41-3.56 5.63-3.56 9.68 0 4.4 1.02 7.79 3.05 10.19 2.04 2.41 4.88 3.61 8.52 3.61 2.45 0 4.63-.56 6.53-1.67 1.91-1.11 3.14-2.66 3.7-4.63h-11.4v-9.98h22.57c.25 9.98-1.67 17.42-5.76 22.24-4.09 4.85-9.7 7.27-16.81 7.27h-.37zM386.83 101.75h-15.26v44.85h-11.17v-44.85h-15.26v-10.7h41.69v10.7z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}