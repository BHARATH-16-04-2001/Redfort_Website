import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black shadow-xl backdrop-blur-lg"
            : "bg-black/40 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <Link to="/" className="text-2xl font-bold">
            🌿 Redfort
          </Link>

          <div className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-red-400">Home</Link>
            <Link to="/menu" className="hover:text-red-400">Menu</Link>
            <Link to="/gallery" className="hover:text-red-400">Gallery</Link>
            <Link to="/contactus" className="hover:text-red-400">Contact</Link>
          </div>

          <button
            className="md:hidden text-3xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-black text-white flex flex-col items-center gap-6 py-6">
            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/menu" onClick={() => setMobileOpen(false)}>Menu</Link>
            <Link to="/gallery" onClick={() => setMobileOpen(false)}>Gallery</Link>
            <Link to="/contactus" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      <div className="pt-24"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Our Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 max-w-3xl mx-auto text-lg"
        >
          Redfort Restaurant was founded with a vision to blend authentic
          flavors with modern dining elegance. We believe food is not just
          a meal — it is an experience.
        </motion.p>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <motion.img
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src="https://mindtrip.ai/cdn-cgi/image/format=webp,w=720/https://images.mindtrip.ai/restaurants/32bb/2dd0/14e8/fa61/7b2e/1e06/1daf/4dcc"
          alt="Restaurant"
          className="rounded-3xl shadow-2xl"
        />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
          <p className="text-gray-400">
            ✔ Fresh Ingredients sourced daily  
            ✔ Experienced chefs with global expertise  
            ✔ Premium ambience and private dining  
            ✔ Exceptional hospitality
          </p>

          <p className="text-gray-400">
            Whether you're here for a family dinner, romantic evening,
            or celebration — we make every visit memorable.
          </p>
        </motion.div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-gradient-to-r from-red-700 to-pink-700 py-16 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6">

          <div>
            <h3 className="text-4xl font-bold">10+</h3>
            <p>Years of Experience</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">50K+</h3>
            <p>Happy Customers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">100+</h3>
            <p>Delicious Dishes</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">4.8★</h3>
            <p>Google Rating</p>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-8 border-t border-white/10 text-gray-500">
        © 2026 Redfort Restaurant. Crafted with passion.
      </footer>
    </div>
  );
}
