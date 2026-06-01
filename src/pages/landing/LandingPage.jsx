import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../landing/Navbar";
import HeroSection from "../landing/HeroSection";
import FeaturesSection from "../landing/FeaturesSection";
import RoleSection from "../landing/RoleSection";
import WhyChooseUs from "../landing/WhyChooseUs";
import Testimonials from "../landing/Testimonials";
import CTASection from "../landing/CTASection";
import Footer from "../landing/Footer";
import TrustedBySection from "./TrustedBySection";
import ModulesSection from "../landing/ModulesSection";
import HowItWorksSection from "../landing/HowItWorksSection";
import PricingSection from "../landing/PricingSection";
import FaqSection from "../landing/FaqSection";
import BookDemoSection from "../landing/BookDemoSection";

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo.replace("#", "");

      setTimeout(() => {
        const section = document.getElementById(id);
        if (!section) return;

        const navbarHeight = 80;

        const y =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <main className="pt-20 scroll-smooth">
        <HeroSection />
        <TrustedBySection />
        <ModulesSection />
        <HowItWorksSection />
        <FeaturesSection />
        <RoleSection />
        <PricingSection />
        <Testimonials />
        <FaqSection />
        <BookDemoSection />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;