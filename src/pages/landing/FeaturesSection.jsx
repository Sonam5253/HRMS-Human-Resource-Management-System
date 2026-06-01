import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  DollarSign,
  Calendar,
  CheckSquare,
  BarChart3,
  Users,
  ArrowRight,
} from "lucide-react";
import Card from "../../components/commons/Card"; // ✅ added

const features = [
  {
    icon: Clock,
    title: "Attendance Tracking",
    description:
      "Track employee attendance with real-time check-in, check-out, face recognition and geofencing.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: DollarSign,
    title: "Payroll Management",
    description:
      "Automate salary processing, tax calculations, payslips and compliance in one place.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description:
      "Employees can request leave while managers approve or reject instantly.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: CheckSquare,
    title: "Task Tracking",
    description:
      "Assign tasks, track progress and improve team productivity with ease.",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Performance Reports",
    description:
      "Generate smart reports and employee performance insights with analytics.",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: Users,
    title: "Employee Records",
    description:
      "Store employee details, documents, departments and history securely.",
    gradient: "from-sky-500 to-cyan-500",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f5f7ff] via-white to-[#f8fbff]"
    >
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Powerful HRMS Features
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Everything you need to manage
            <span className="block bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              your workforce smarter
            </span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            HRMS PRO gives your company every tool you need to manage
            attendance, payroll, leave, performance and employee records from
            one dashboard.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
              >
                {/* ✅ Card used */}
                <Card className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/80 backdrop-blur-xl p-7 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.22)] transition-all duration-300">
                  
                  {/* Hover Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition duration-500 group-hover:opacity-[0.08]`}
                  />

                  {/* Glow */}
                  <div
                    className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                    >
                      <Icon size={30} />
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-2xl font-bold text-slate-900">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-[15px] leading-7 text-slate-600">
                      {feature.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-7 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">
                        Learn More
                      </span>

                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${feature.gradient} text-white transition-transform duration-300 group-hover:translate-x-1`}
                      >
                        <ArrowRight size={18} />
                      </div>
                    </div>

                    {/* Bottom Line */}
                    <div
                      className={`mt-5 h-[3px] w-0 rounded-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 group-hover:w-24`}
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;