import { motion } from "framer-motion";
import { sendWhatsAppOrder } from "../utils/whatsapp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BookingModal from "../componentes/BookingModal";

export default function Home() {
  const navigate = useNavigate();
  const [openBooking, setOpenBooking] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-800">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">🌿 Redfort</h1>

          <div className="hidden md:flex gap-6">
            <a href="/home" className="hover:text-red-400">Home</a>
            <a href="/menu" className="hover:text-red-400">Menu</a>
            {/* <a href="/my-bookings" className="hover:text-red-400">Bookings</a> */}
             {/* <a href="/gallery" className="hover:text-red-400">Gallery</a> */}
            <a href="/contactus" className="hover:text-red-400">Contact</a>
            <a href="/about" className="hover:text-red-400">About</a>
          </div>

          <button
            onClick={() => setOpenBooking(true)}
            className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700"
          >
            Book Table
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center px-6"
        >
          <h1 className="text-6xl font-bold mb-6">
            Luxury Garden Dining Experience
          </h1>

          <p className="text-lg mb-8">
            Fresh Food • Romantic Ambience • Family Moments
          </p>

          <div className="flex gap-4 justify-center flex-wrap">

            <button
              onClick={() => setOpenBooking(true)}
              className="bg-orange-500 px-6 py-3 rounded-lg text-white"
            >
              🍽️ Book Table
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="bg-white text-black px-8 py-3 rounded-xl"
            >
              📖 View Menu
            </button>

            {/* <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg"
              onClick={() =>
                sendWhatsAppOrder({
                  items: [{ name: "Biryani", qty: 2 }],
                  total: 500,
                  customer: "Rahul",
                })
              }
            >
              Order on WhatsApp
            </button> */}

          </div>
        </motion.div>
      </section>

      {/* ================= POPULAR DISHES ================= */}
      <section className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Dishes
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              name: "Chicken Biryani",
              img: "https://media.istockphoto.com/id/1345624336/photo/chicken-biriyani.webp?a=1&b=1&s=612x612&w=0&k=20&c=a8j_p9BkWtsSX7WkcqeetigH8PYWXGayIGto9GiehNY="
            },
            {
              name: "Mutton Kebab",
              img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070"
            },
            {
              name: "Alfredo Pasta",
              img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
              name: "Farmhouse Pizza",
              img: "https://plus.unsplash.com/premium_photo-1675451537385-e76cd7e78087?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
              name: "Butter Garlic Prawns",
              img: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=2070"
            },
            {
              name: "Veg Platter",
              img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070"
            },
          ].map((dish, i) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={i}
              className="rounded-2xl overflow-hidden shadow-lg bg-gray-50"
            >
              <img
                src={dish.img}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{dish.name}</h3>
                <p className="text-sm text-gray-500">
                  Signature Special Dish
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ULTRA LUXURY CANDLE EXPERIENCE ================= */}
      <section className="relative h-[120vh] flex items-center justify-center text-white overflow-hidden">

        {/* 🔥 Cinematic Parallax Background */}
        <motion.img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
          className="absolute inset-0 w-full h-full object-cover object-center scale-110"
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        />

        {/* 🌙 Luxury Gradient + Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/95" />

        {/* ✨ Floating Romantic Glow Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20, -140],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
            />
          ))}
        </div>

        {/* 💎 Glass Luxury Card Content */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-8 py-14 max-w-3xl rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Romantic Candle Light Dinner
          </h2>

          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Private luxury tables • Live soft music • Chef curated couple menu • Rose decoration
          </p>

          {/* ⭐ Premium Package Tags */}
          <div className="flex justify-center gap-4 flex-wrap mb-10">
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur text-sm">
              🌹 Rose Decoration
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur text-sm">
              🎻 Live Music
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur text-sm">
              🍷 Couple Special Menu
            </span>
          </div>

          {/* ⭐ Premium CTA Buttons */}
          <div className="flex justify-center gap-6 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenBooking(true)}
              className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 px-10 py-4 rounded-full text-lg shadow-xl"
            >
              💑 Reserve Romantic Table
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/menu")}
              className="border border-white/40 px-10 py-4 rounded-full backdrop-blur-lg"
            >
              View Special Menu
            </motion.button>
          </div>
        </motion.div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Redfort Restaurant</h3>
            <p>Luxury dining experience with nature ambience.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>📍 Bangalore</p>
            <p>📞 +91 9999999999</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <p>Mon - Sun</p>
            <p>12 PM - 11 PM</p>
          </div>
        </div>
      </footer>

      {/* ⭐ Booking Modal */}
      {/* <BookingModal
        isOpen={openBooking}
        closeModal={() => setOpenBooking(false)}
      /> */}

    </div>
  );
}



