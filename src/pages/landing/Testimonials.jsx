import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Card from "../../components/commons/Card"; // ✅ added

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director, TechCorp",
    content:
      "HRMS PRO completely transformed our HR operations. Payroll processing time reduced by 70% and attendance management became effortless.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=1",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Michael Chen",
    role: "CEO, InnovateLabs",
    content:
      "The role-based access and dashboard analytics are perfect for our growing team. We finally have everything in one platform.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=2",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Emily Rodriguez",
    role: "HR Manager, GrowthInc",
    content:
      "The interface is simple, beautiful and easy to use. Our employees love it and the support team is amazing.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=3",
    gradient: "from-emerald-500 to-green-500",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f8fbff] via-white to-[#f5f7ff]">
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
            Customer Success Stories
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Trusted by HR professionals
            <span className="block bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              across every industry
            </span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            Thousands of companies use HRMS PRO to simplify HR operations,
            manage employees and improve productivity.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
            >
              {/* ✅ Card used */}
              <Card className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.18)] transition-all duration-300">

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 transition duration-500 group-hover:opacity-[0.08]`}
                />

                <div
                  className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${testimonial.gradient} opacity-10 blur-3xl`}
                />

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${testimonial.gradient} text-white shadow-lg`}
                  >
                    <Quote size={26} />
                  </div>

                  {/* Stars */}
                  <div className="mt-6 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="mt-6 text-[15px] leading-8 text-slate-600 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Divider */}
                  <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  {/* User */}
                  <div className="mt-7 flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-md"
                      />

                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {testimonial.name}
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Line */}
                  <div
                    className={`mt-6 h-[3px] w-0 rounded-full bg-gradient-to-r ${testimonial.gradient} transition-all duration-500 group-hover:w-24`}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* ✅ Card used */}
          <Card className="mt-16 grid gap-6 rounded-[36px] border border-white/70 bg-white/80 p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(99,102,241,0.18)] md:grid-cols-3">

            {[
              { value: "4.9/5", label: "Average Customer Rating" },
              { value: "500+", label: "Companies Using HRMS PRO" },
              { value: "98%", label: "Customer Satisfaction" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <h3 className="text-4xl font-bold text-slate-900">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}

          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;