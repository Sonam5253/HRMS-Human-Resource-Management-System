import { motion } from "framer-motion";
import Card from "../../components/commons/Card"; // ✅ added

import infosysLogo from "../../assets/logos/infosys.png";
import tcsLogo from "../../assets/logos/tcs.jpg";
import wiproLogo from "../../assets/logos/wipro.png";
import hclLogo from "../../assets/logos/hcl.png";
import techMahindraLogo from "../../assets/logos/techmahindra.png";

const companies = [
  { name: "Infosys", logo: infosysLogo },
  { name: "TCS", logo: tcsLogo },
  { name: "Wipro", logo: wiproLogo },
  { name: "HCL", logo: hclLogo },
  { name: "Tech Mahindra", logo: techMahindraLogo },
];

export default function TrustedBySection() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-[#f8fbff] to-[#f5f7ff]">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Trusted By Industry Leaders
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            500+ Companies trust
            <span className="block bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              HRMS PRO
            </span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-600 leading-8">
            From startups to enterprise teams, organizations use HRMS PRO to
            manage employees, payroll, attendance and productivity.
          </p>
        </motion.div>

        {/* Logo Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
            >
              {/* ✅ Card used */}
              <Card className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_50px_-15px_rgba(99,102,241,0.25)] transition-all duration-300">

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:via-fuchsia-500/5 group-hover:to-cyan-500/5 transition duration-500" />

                <div className="relative flex flex-col items-center justify-center">
                  {/* Logo */}
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-h-12 w-auto object-contain grayscale opacity-70 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  </div>

                  {/* Name */}
                  <p className="mt-5 text-sm font-semibold tracking-wide text-slate-700 group-hover:text-slate-900 transition">
                    {company.name}
                  </p>

                  {/* Bottom line animation */}
                  <div className="mt-4 h-[3px] w-0 rounded-full bg-gradient-to-r from-brand to-violet-500 transition-all duration-500 group-hover:w-12" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {[
            { value: "500+", label: "Companies" },
            { value: "10k+", label: "Employees Managed" },
            { value: "99.9%", label: "Payroll Accuracy" },
            { value: "24/7", label: "Premium Support" },
          ].map((item) => (
            <Card
              key={item.label}
              className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur p-5 text-center shadow-sm"
            >
              <h3 className="text-3xl font-bold text-slate-900">
                {item.value}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{item.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}