import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "../../components/commons/Button";
import Card from "../../components/commons/Card"; // ✅ added

import dashboardImg from "../../assets/screenshots/dashboard.png";
import tasksImg from "../../assets/screenshots/tasks.png";
import staffImg from "../../assets/screenshots/staff.png";

const HeroSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const previewCards = [
    {
      title: "Tasks",
      subtitle: "Assign & track employee work",
      image: tasksImg,
    },
    {
      title: "Staff",
      subtitle: "Manage employee records",
      image: staffImg,
    },
  ];

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbff] via-white to-[#f6f7ff]" />
        <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-24 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* LEFT SIDE */}
            <div>
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Smart HRMS Platform
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mt-7 text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] text-slate-900"
              >
                Manage your workforce
                <span className="block mt-2 bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  from one dashboard
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-7 max-w-2xl text-lg leading-8 text-slate-600"
              >
                Attendance, payroll, tasks, employee management and reports —
                everything your company needs in one modern HRMS platform built
                for growing teams.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button
                  text="Start Free Trial"
                  variant="brand"
                  size="lg"
                  width="auto"
                />

                <Button
                  text="Login"
                  variant="outline"
                  size="lg"
                  width="auto"
                  onClick={() => (window.location.href = "/login")}
                />
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl"
              >
                {[ 
                  { value: "10k+", label: "Employees Managed" },
                  { value: "99.9%", label: "Payroll Accuracy" },
                  { value: "24/7", label: "Premium Support" },
                ].map((item) => (
                  <Card
                    key={item.label}
                    className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)]"
                  >
                    <p className="text-3xl font-bold text-slate-900">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      {item.label}
                    </p>
                  </Card>
                ))}
              </motion.div>

              {/* Trusted Tags */}
              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <span className="text-sm font-medium text-slate-500">
                  Trusted by:
                </span>

                {["Infosys", "TCS", "Wipro", "HCL"].map((company) => (
                  <div
                    key={company}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    {company}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT SIDE */}
            <motion.div
              variants={itemVariants}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-violet-500/20 to-cyan-400/20 blur-3xl" />

              {/* ✅ Card wrapper */}
              <Card className="relative rounded-[36px] border border-white/70 bg-white/80 p-4 backdrop-blur-xl shadow-[0_40px_90px_-20px_rgba(99,102,241,0.35)]">

                {/* Header */}
                <div className="mb-5 flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <div className="rounded-full border border-slate-200 bg-white px-4 py-1 text-sm font-medium text-slate-600 shadow-sm">
                    HRMS Dashboard Preview
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Main Dashboard */}
                  <div
                    onClick={() => setSelectedImage(dashboardImg)}
                    className="group relative cursor-pointer overflow-hidden rounded-[28px]"
                  >
                    <img
                      src={dashboardImg}
                      alt="Dashboard Preview"
                      className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Small Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {previewCards.map((card) => (
                      <div
                        key={card.title}
                        onClick={() => setSelectedImage(card.image)}
                        className="group relative cursor-pointer overflow-hidden rounded-[24px]"
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="h-44 w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal same as before */}
    </>
  );
};

export default HeroSection;