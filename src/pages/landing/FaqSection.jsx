import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Card from "../../components/commons/Card"; // ✅ added
import Button from "../../components/commons/Button"; // ✅ added

const faqs = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, every new company gets a 7-day free trial with access to all HRMS PRO features.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan anytime according to your company size and requirements.",
  },
  {
    question: "How many employees can I add?",
    answer:
      "The number of employees depends on your selected pricing plan. Enterprise plan supports unlimited employees.",
  },
  {
    question: "Is my company data secure?",
    answer:
      "Absolutely. We use advanced encryption, secure cloud storage and role-based access to protect your company data.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, there is no long-term contract. You can cancel your subscription whenever you want.",
  },
  {
    question: "Do you provide support and onboarding?",
    answer:
      "Yes, our team provides setup assistance, onboarding sessions and 24/7 support for premium plans.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f8fbff] via-white to-[#f5f7ff]">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <HelpCircle size={16} />
            Frequently Asked Questions
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Have questions?
            <span className="block bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              We have answers
            </span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-slate-600">
            Everything you need to know about pricing, employees, security and
            support before getting started with HRMS PRO.
          </p>
        </motion.div>

        {/* FAQ Cards */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                }}
                viewport={{ once: true }}
              >
                {/* ✅ Card used */}
                <Card
                  className={`overflow-hidden rounded-[28px] border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15)] transition-all duration-300 ${
                    isOpen
                      ? "shadow-[0_25px_70px_-20px_rgba(99,102,241,0.28)]"
                      : ""
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between px-7 py-6 text-left"
                  >
                    <div className="pr-5">
                      <h3
                        className={`text-lg md:text-xl font-semibold transition ${
                          isOpen ? "text-brand" : "text-slate-900"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-brand to-violet-500 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        size={20}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-7 pb-7">
                          <div className="mb-5 h-[2px] w-full rounded-full bg-gradient-to-r from-brand via-violet-500 to-fuchsia-500 opacity-20" />

                          <p className="text-[15px] leading-8 text-slate-600">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* ✅ Card used */}
          <Card className="mt-14 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-8 text-center shadow-[0_20px_60px_-15px_rgba(99,102,241,0.18)]">
            <h3 className="text-2xl font-bold text-slate-900">
              Still have questions?
            </h3>

            <p className="mt-3 text-slate-600">
              Our team is here to help you choose the right HRMS plan for your
              company.
            </p>

            {/* ✅ Button used */}
            <div className="mt-6 flex justify-center">
              <div className="w-[220px]">
                <Button
                  text="Contact Support"
                  variant="brand"
                  size="lg"
                  width="full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}