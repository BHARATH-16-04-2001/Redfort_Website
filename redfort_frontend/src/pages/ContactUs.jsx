import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [reviews, setReviews] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);

  // ================= Fetch Reviews =================
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/auth/reviews/")
      .then((res) => {
        if (res.data.result?.reviews) {
          setReviews(res.data.result.reviews);
        }
      })
      .catch(() => {
        setReviews([
          {
            author_name: "Rahul S",
            rating: 5,
            text: "Amazing ambience and delicious food!",
          },
          {
            author_name: "Priya K",
            rating: 4,
            text: "Luxury dining experience in Davanagere.",
          },
          {
            author_name: "Arjun M",
            rating: 5,
            text: "Best restaurant for family and friends.",
          },
        ]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">🌿 Redfort</h1>

          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-red-400">Home</Link>
            <Link to="/menu" className="hover:text-red-400">Menu</Link>
            {/* <Link to="/my-bookings" className="hover:text-red-400">Bookings</Link>
            <Link to="/gallery" className="hover:text-red-400">Gallery</Link> */}
            <Link to="/about" className="hover:text-red-400">about</Link>
            
          </div>

          <button
            onClick={() => setOpenBooking(true)}
            className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Book Table
          </button>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="pt-24"></div>

      {/* ================= HERO SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 text-center px-6"
      >
        <h1 className="text-5xl font-bold mb-6">
          Contact Redfort Restaurant
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Luxury dining experience in Davanagere. We are here for reservations
          and special events.
        </p>
      </motion.section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 pb-20">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >

          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
            <p className="text-gray-300">
              📍 Swami Vivekananda Badavane,<br/>
              Beside Jayadeva Choultry,<br/>
              Davanagere, Karnataka 577004
            </p>
            <p className="text-gray-300 mt-3">
              🕒 Open Daily | 12 PM – 11 PM
            </p>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=CWR3+26C,+Davanagere"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
            >
              Get Directions
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              title="Location"
              src="https://www.google.com/maps?q=CWR3+26C,+Davanagere&output=embed"
              width="100%"
              height="280"
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>

        </motion.div>

        {/* RIGHT SIDE - FORM */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-4 rounded-xl bg-black/40 border border-white/20"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 rounded-xl bg-black/40 border border-white/20"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-4 rounded-xl bg-black/40 border border-white/20"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Send Message
            </button>

          </form>
        </motion.div>

      </section>

      {/* ================= REVIEWS ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          ⭐ What Our Guests Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl"
            >
              <div className="text-yellow-400 mb-3">
                {"⭐".repeat(review.rating)}
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                {review.text}
              </p>
              <p className="text-gray-500 text-xs">
                — {review.author_name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-8 border-t border-white/10 text-gray-400">
        © 2026 Redfort Restaurant. Crafted with excellence.
      </footer>

    </div>
  );
}
