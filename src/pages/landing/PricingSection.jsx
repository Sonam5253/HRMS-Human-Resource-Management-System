import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Button from "../../components/commons/Button";
import Card from "../../components/commons/Card"; // ✅ added

const plans = [
  {
    name: "Starter",
    monthly: "₹999",
    yearly: "₹9,999",
    employees: "Up to 10 Employees",
    description: "Perfect for startups and small businesses.",
    gradient: "from-violet-500 to-fuchsia-500",
    features: [
      "Attendance Management",
      "Leave Management",
      "Employee Records",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    monthly: "₹2,499",
    yearly: "₹24,999",
    employees: "Up to 50 Employees",
    description: "Best for growing teams and medium-sized companies.",
    popular: true,
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Everything in Starter",
      "Payroll Management",
      "Task Management",
      "Priority Support",
    ],
  },
  {
    name: "Business",
    monthly: "₹5,999",
    yearly: "₹59,999",
    employees: "Up to 200 Employees",
    description: "Advanced HRMS tools for large businesses.",
    gradient: "from-emerald-500 to-green-500",
    features: [
      "Everything in Professional",
      "Advanced Reports",
      "Analytics Dashboard",
      "Multi Department Access",
    ],
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    yearly: "Custom",
    employees: "Unlimited Employees",
    description: "Custom solutions for enterprise organizations.",
    gradient: "from-orange-500 to-pink-500",
    features: [
      "Dedicated Manager",
      "Custom Dashboard",
      "API Integration",
      "24/7 Support",
    ],
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      style={{ scrollMarginTop: "80px" }}
      className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f5f7ff] via-white to-[#f8fbff]"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading (same) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ willChange: "transform" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <Sparkles size={16} />
            Flexible Pricing Plans
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Simple & transparent pricing
            <span className="block bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              for every company size
            </span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            Choose the right HRMS plan based on your team size and save 20%
            with yearly billing.
          </p>

          {/* Toggle (same) */}
          <div className="mt-10 inline-flex items-center rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm backdrop-blur">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                !yearly
                  ? "bg-gradient-to-r from-brand to-violet-500 text-white shadow-lg"
                  : "text-slate-600"
              }`}
            >
              Monthly Billing
            </button>

            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                yearly
                  ? "bg-gradient-to-r from-brand to-violet-500 text-white shadow-lg"
                  : "text-slate-600"
              }`}
            >
              Yearly Billing
            </button>
          </div>

          {yearly && (
            <p className="mt-4 text-sm font-medium text-emerald-600">
              Save up to 20% with annual plans
            </p>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
            >
              {/* ✅ Card used */}
              <Card
                className={`group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.22)] transition-all duration-300 ${
                  plan.popular
                    ? "ring-2 ring-violet-500 shadow-[0_25px_80px_-20px_rgba(99,102,241,0.35)]"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-brand to-violet-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <div
                  className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${plan.gradient} opacity-10 blur-3xl`}
                />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {plan.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {plan.description}
                  </p>

                  <p className="mt-4 text-sm font-medium text-slate-600">
                    {plan.employees}
                  </p>

                  <div className="mt-8 flex items-end gap-2">
                    <span className="text-5xl font-bold text-slate-900">
                      {yearly ? plan.yearly : plan.monthly}
                    </span>

                    {plan.name !== "Enterprise" && (
                      <span className="pb-2 text-sm font-medium text-slate-500">
                        {yearly ? "/year" : "/month"}
                      </span>
                    )}
                  </div>

                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${plan.gradient} text-white`}
                        >
                          <Check size={14} />
                        </div>

                        <span className="text-sm leading-6 text-slate-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  <div className="mt-8">
                    <Button
                      text={
                        plan.name === "Enterprise"
                          ? "Contact Sales"
                          : "Start Free Trial"
                      }
                      variant={plan.popular ? "brand" : "outline"}
                      size="lg"
                      width="full"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}