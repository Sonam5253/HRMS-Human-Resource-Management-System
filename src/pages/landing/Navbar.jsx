import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/commons/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const navbarHeight = 80;
const scrollPosition = window.scrollY + navbarHeight;

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Modules", href: "#modules" },
    { name: "Pricing", href: "#pricing" },
    { name: "Roles", href: "#roles" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
  const handleScroll = () => {
  if (isScrolling) return;

  setScrolled(window.scrollY > 20);

  const navbarHeight = 80;
  const scrollPosition = window.scrollY + navbarHeight;

  navLinks.forEach((link) => {
    const section = document.getElementById(link.href.replace("#", ""));
    if (!section) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      setActiveSection(link.href);
    }
  });
};

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, [isScrolling]); // ✅ dependency add

  // ✅ FINAL NAVIGATION FIX
  const handleNavigation = (e, href) => {
  e.preventDefault();
  const id = href.replace("#", "");

  if (location.pathname !== "/") {
    navigate("/", { state: { scrollTo: href } });
    return;
  }

  const section = document.getElementById(id);
  if (!section) return;

  const navbarHeight = 80;

  const y =
    section.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight;

  setIsScrolling(true); // ✅ stop scroll listener

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });

  // ✅ scroll complete hone ke baad listener enable
  setTimeout(() => {
    setIsScrolling(false);
    setActiveSection(href); // direct active set
  }, 600);

  setIsOpen(false);
};

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur shadow-md"
          : "bg-gray-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <button
            onClick={(e) => handleNavigation(e, "#home")}
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl bg-brand text-white flex items-center justify-center font-bold">
              H
            </div>
            <h1 className="font-bold text-lg">HRMS PRO</h1>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={`px-5 py-2 rounded-full text-sm ${
                  activeSection === link.href
                    ? "bg-brand text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="hidden lg:flex gap-3">
            <a href="/login" className="px-5 py-3 text-sm rounded-2xl border">
              Login
            </a>

            <Button
              text="Start Free Trial"
              variant="brand"
              className="px-5 py-3 text-sm rounded-2xl"
            />
          </div>

          {/* Mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div className="p-4 bg-white shadow-md lg:hidden">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="block w-full text-left py-2"
                >
                  {link.name}
                </button>
              ))}

              <a href="/login" className="block py-2">
                Login
              </a>

              <Button
  text="Start Free Trial"
  variant="brand"
  size="lg"
  width="full"
  onClick={() => {
    const section = document.getElementById("contact"); // ✅ correct id
    section?.scrollIntoView({ behavior: "smooth" });
  }}
/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}