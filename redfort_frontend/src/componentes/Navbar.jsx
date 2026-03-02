import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition ${
        scroll ? "bg-black shadow-lg" : "bg-transparent"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">🌿 Redfort</h1>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/my-bookings">Bookings</Link>

          {user ? (
            <Link to="/user/profile" className="bg-red-600 px-4 py-2 rounded">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="bg-red-600 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
