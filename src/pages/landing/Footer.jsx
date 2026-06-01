import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Card from "../../components/commons/Card"; // ✅ added

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (e, href) => {
    e.preventDefault();

    if (href.startsWith("#")) {
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

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ✅ Card wrapper (no UI change) */}
        <Card className="bg-transparent border-none shadow-none">
          
          {/* Main Footer */}
          <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  HRMS PRO
                </span>
              </div>

              <p className="mt-5 max-w-md text-[15px] leading-8 text-slate-400">
                A complete HRMS platform built for modern businesses to manage
                employees, payroll, attendance, leave and performance from one
                dashboard.
              </p>

              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <Mail size={18} />
                  </div>
                  <span>support@hrmspro.com</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <Phone size={18} />
                  </div>
                  <span>+91 98765 43210</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <MapPin size={18} />
                  </div>
                  <span>Lucknow, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold text-white">Product</h3>

              <ul className="mt-6 space-y-4">
                {[
                  { label: "Features", href: "#features" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Modules", href: "#modules" },
                  { label: "Roles", href: "#roles" },
                  { label: "Book Demo", href: "#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavigation(e, item.href)}
                      className="text-slate-400 transition hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold text-white">Company</h3>

              <ul className="mt-6 space-y-4">
                {["About Us", "Careers", "Customers", "Blog", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-slate-400 transition hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white">Resources</h3>

              <ul className="mt-6 space-y-4">
                {[
                  "Help Center",
                  "Documentation",
                  "API Status",
                  "Privacy Policy",
                  "Terms & Conditions",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 transition hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 md:flex-row">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} HRMS PRO. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
              ].map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={index}
                    href={social.href}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

        </Card>
      </div>
    </footer>
  );
};

export default Footer;