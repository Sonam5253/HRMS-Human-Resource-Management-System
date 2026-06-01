import { motion } from "framer-motion";
import {
  Users,
  Clock3,
  IndianRupee,
  BarChart3,
  Sparkles,
} from "lucide-react";
import Card from "../../components/commons/Card";
import Button from "../../components/commons/Button";

export default function BookDemoSection() {
  const stats = [
    {
      icon: Users,
      title: "Employees Managed",
      value: "12,000+",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      icon: Clock3,
      title: "Attendance Accuracy",
      value: "99.9%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: IndianRupee,
      title: "Payroll Processed",
      value: "₹8Cr+",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: BarChart3,
      title: "Reports Generated",
      value: "50k+",
      color: "from-orange-500 to-pink-500",
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#f6f7ff] py-24">
      {/* Background Effects */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-sky-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* LEFT SIDE */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur"
          >
            <Sparkles size={16} />
            Trusted by 600+ Companies
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 max-w-2xl text-5xl font-bold leading-tight text-slate-900 xl:text-6xl"
          >
            Run your complete workforce
            <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              from one powerful HRMS
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-600"
          >
            Manage employees, attendance, payroll, leave, tasks and analytics
            with a single platform built for modern teams.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {[
              "No Credit Card Required",
              "7-Day Free Trial",
              "Setup in 5 Minutes",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur"
              >
                {item}
              </div>
            ))}
          </motion.div>

          {/* Floating Professional Cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.6,
                  }}
                  animate={{ y: [0, -6, 0] }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.25)] backdrop-blur-xl"
                >
                  {/* Hover Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition duration-500 group-hover:opacity-10`}
                  />

                  <div className="relative flex items-start justify-between">
                    <div>
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
                      >
                        <Icon size={24} />
                      </div>

                      <p className="mt-5 text-sm font-medium text-slate-500">
                        {item.title}
                      </p>

                      <h3 className="mt-1 text-3xl font-bold text-slate-900">
                        {item.value}
                      </h3>
                    </div>

                    <div className="flex gap-1 pt-1">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:150ms]" />
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:300ms]" />
                    </div>
                  </div>

                  {/* Animated Progress */}
                  <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      animate={{ width: ["20%", "80%", "55%", "90%"] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.35)] backdrop-blur-xl md:p-10">
            {/* Steps */}
            <div className="mb-10 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                  1
                </div>
                <span className="font-semibold text-slate-900">Details</span>
              </div>

              <div className="h-[3px] flex-1 rounded-full bg-slate-200">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
              </div>

              <div className="flex items-center gap-3 opacity-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-sm font-bold text-white">
                  2
                </div>
                <span className="font-semibold text-slate-600">Schedule</span>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-slate-900">
                Book a Free Demo
              </h3>
              <p className="mt-2 text-slate-500">
                Tell us about your company and we’ll contact you shortly.
              </p>
            </div>

            {/* Form */}
            <div className="grid gap-6 md:grid-cols-2">
              <input
                className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:bg-white"
                placeholder="Your Name"
              />

              <select className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-500 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:bg-white">
                <option>Number of Employees</option>
                <option>1 - 10</option>
                <option>11 - 50</option>
                <option>51 - 100</option>
                <option>100+</option>
              </select>

              <input
                className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:bg-white"
                placeholder="Work Email"
              />

              <input
                className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:bg-white"
                placeholder="Phone Number"
              />

              <select className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-500 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:bg-white">
                <option>Region</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>

              <input
                className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:bg-white"
                placeholder="Current HRMS"
              />
            </div>

            {/* Terms */}
            <p className="mt-6 text-sm leading-6 text-slate-500">
              By submitting your information, you agree to our privacy policy,
              terms of service and GDPR compliance.
            </p>

            {/* Button */}
            <div className="mt-8">
              <Button
                text="Book Free Demo"
                variant="brand"
                size="lg"
                width="full"
              />
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Trusted by 600+ companies across India
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}