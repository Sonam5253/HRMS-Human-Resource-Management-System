import { motion } from "framer-motion";
import {
  Users,
  Clock3,
  CalendarDays,
  IndianRupee,
  ListTodo,
  Shield,
  BarChart3,
  Briefcase,
} from "lucide-react";
import Card from "../../components/commons/Card"; // ✅ added

const modules = [
  {
    icon: Users,
    title: "Employee Management",
    description:
      "Manage employee profiles, departments, documents and roles from one place.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Clock3,
    title: "Attendance Tracking",
    description:
      "Track check-in, check-out and working hours in real time with accuracy.",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    icon: CalendarDays,
    title: "Leave Management",
    description:
      "Approve, reject and monitor employee leave requests effortlessly.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: IndianRupee,
    title: "Payroll Processing",
    description:
      "Generate salary, payslips, bonuses and deductions automatically.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: ListTodo,
    title: "Task Management",
    description:
      "Assign tasks, track progress and improve team productivity.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Role Based Access",
    description:
      "Give different permissions to Admin, HR, Managers and Employees.",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description:
      "Get detailed reports and smart insights about workforce performance.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Briefcase,
    title: "Recruitment",
    description:
      "Manage hiring, interviews, job openings and candidate details.",
    gradient: "from-teal-500 to-emerald-500",
  },
];

export default function ModulesSection() {
  return (
    <section
      id="modules"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f8fbff] via-white to-[#f5f7ff]"
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

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Everything you need to manage
            <span className="block bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              your entire workforce
            </span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            From employee management to payroll and analytics, HRMS PRO gives
            you every tool your company needs in one platform.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <motion.div
                key={module.title}
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

                  {/* Hover Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 transition duration-500 group-hover:opacity-[0.08]`}
                  />

                  {/* Top Glow */}
                  <div
                    className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${module.gradient} opacity-10 blur-3xl`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${module.gradient} text-white shadow-lg`}
                    >
                      <Icon size={30} />
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-slate-950 transition">
                      {module.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-[15px] leading-7 text-slate-600">
                      {module.description}
                    </p>

                    {/* Bottom Row */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">
                        Learn More
                      </span>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${module.gradient} text-white transition-transform duration-300 group-hover:translate-x-1`}
                      >
                        →
                      </div>
                    </div>

                    {/* Animated Line */}
                    <div className="mt-5 h-[3px] w-0 rounded-full bg-gradient-to-r from-brand to-violet-500 transition-all duration-500 group-hover:w-20" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}