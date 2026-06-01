import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Users as UsersIcon,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const roles = [
  {
    icon: User,
    title: "Employee Panel",
    description:
      "A self-service dashboard where employees can manage attendance, leaves, tasks and payslips.",
    access: [
      "Apply Leave",
      "View Payslips",
      "Track Tasks",
      "Update Profile",
    ],
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: UsersIcon,
    title: "HR Panel",
    description:
      "A complete workspace for HR teams to manage employees, payroll and company policies.",
    access: [
      "Approve Requests",
      "Run Payroll",
      "Generate Reports",
      "Onboard Employees",
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "Admin Panel",
    description:
      "Full system control with user permissions, security settings and company-wide access.",
    access: [
      "User Management",
      "Audit Logs",
      "System Config",
      "Role Permissions",
    ],
    gradient: "from-emerald-500 to-green-500",
  },
];

const RoleSection = () => {
  return (
    <section  id="roles" className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f5f7ff] via-white to-[#f8fbff]">
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
            Role-Based Access
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Separate dashboards for every
            <span className="block bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              role in your organization
            </span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            Employees, HR teams and Admins get their own personalized dashboard
            with the exact tools and permissions they need.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {roles.map((role, index) => {
            const Icon = role.icon;

            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.6,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.22)] transition-all duration-300"
              >
                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 transition duration-500 group-hover:opacity-[0.08]`}
                />

                {/* Top Glow */}
                <div
                  className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${role.gradient} opacity-10 blur-3xl`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient} text-white shadow-lg`}
                  >
                    <Icon size={30} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 text-2xl font-bold text-slate-900">
                    {role.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-[15px] leading-7 text-slate-600">
                    {role.description}
                  </p>

                  {/* Access List */}
                  <div className="mt-7 space-y-4">
                    {role.access.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-slate-50/80 px-4 py-3"
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${role.gradient} text-white`}
                        >
                          <CheckCircle2 size={16} />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      Explore Dashboard
                    </span>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${role.gradient} text-white transition-transform duration-300 group-hover:translate-x-1`}
                    >
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  {/* Bottom Line */}
                  <div
                    className={`mt-5 h-[3px] w-0 rounded-full bg-gradient-to-r ${role.gradient} transition-all duration-500 group-hover:w-24`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoleSection;