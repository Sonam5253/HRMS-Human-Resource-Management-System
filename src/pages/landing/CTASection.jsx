import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Button from "../../components/commons/Button";
import Card from "../../components/commons/Card";

const CTASection = () => {
  return (
    <section
      id="cta"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f5f7ff] via-white to-slate-950"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* ✅ Card used without breaking color */}
          <Card className="relative overflow-hidden rounded-[40px] border border-white/10 bg-slate-950 px-8 py-16 text-center shadow-[0_40px_100px_-20px_rgba(99,102,241,0.35)] md:px-16">

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20" />

            {/* Decorative Blurs */}
            <div className="absolute -top-20 -left-10 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
                <Sparkles size={16} />
                Start Your Free Trial Today
              </div>

              <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-6xl">
                Transform your HR operations
                <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  with HRMS PRO
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Join 500+ companies already using HRMS PRO to manage employees,
                attendance, payroll, tasks and reports from one modern platform.
              </p>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  "No Credit Card Required",
                  "14-Day Free Trial",
                  "Setup in 5 Minutes",
                ].map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="min-w-[220px]">
                  <Button
                    text="Start Free Trial"
                    variant="brand"
                    size="lg"
                    width="full"
                    onClick={() => {
                      const section = document.getElementById("contact"); // ✅ correct id
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                </div>
              </div>

              <p className="mt-6 text-sm text-slate-400">
                Trusted by 10,000+ employees and 500+ companies across India
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;