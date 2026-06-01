import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Clock3,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Card from "../../components/commons/Card"; // ✅ added

const steps = [
  {
    number: "01",
    title: "Register Company",
    description:
      "Create your company account and set up departments, roles and company details in minutes.",
    icon: Building2,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    number: "02",
    title: "Add Employees",
    description:
      "Invite employees, assign departments and manage permissions instantly.",
    icon: Users,
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    number: "03",
    title: "Track Attendance & Payroll",
    description:
      "Monitor attendance, leaves, tasks and automatically process payroll.",
    icon: Clock3,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    number: "04",
    title: "Generate Reports",
    description:
      "Get real-time reports, insights and analytics to make better decisions.",
    icon: BarChart3,
    gradient: "from-orange-500 to-pink-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-[#f8fbff] to-[#f5f7ff]">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ willChange: "transform" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Simple 4-Step Process
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Start using HRMS PRO
            <span className="block bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              in just a few minutes
            </span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            Setup your company, add employees and start managing your workforce
            with a simple and seamless onboarding process.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-8 lg:grid-cols-4">
          {/* Connection Line */}
          <div className="absolute top-20 left-0 right-0 hidden lg:block">
            <div className="mx-20 h-[2px] bg-gradient-to-r from-violet-300 via-cyan-300 to-pink-300" />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.6,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* ✅ Card used */}
                <Card className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.22)] transition-all duration-300">

                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 transition duration-500 group-hover:opacity-[0.08]`}
                  />

                  {/* Floating Number */}
                  <div className="absolute top-5 right-5 text-6xl font-bold text-slate-100 group-hover:text-slate-200 transition">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg`}
                  >
                    <Icon size={30} />
                  </div>

                  {/* Content */}
                  <div className="relative mt-8">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="relative mt-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      Step {step.number}
                    </span>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} text-white transition-transform duration-300 group-hover:translate-x-1`}
                    >
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  {/* Animated Line */}
                  <div
                    className={`mt-5 h-[3px] w-0 rounded-full bg-gradient-to-r ${step.gradient} transition-all duration-500 group-hover:w-24`}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}