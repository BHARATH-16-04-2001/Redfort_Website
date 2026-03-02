import { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [foodFilter, setFoodFilter] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/menu/")
      .then((res) => res.json())
      .then((data) => {
        // Handle pagination OR normal response
        const items = Array.isArray(data)
          ? data
          : data.results || [];

        setMenuItems(items);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  // ✅ SAFE category extraction (ForeignKey aware)
  const categories = [
    "All",
    ...new Set(
      menuItems
        .map((item) => item.category?.name)
        .filter(Boolean)
    ),
  ];

  // ✅ SAFE filtering
  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      activeCategory === "All" ||
      item.category?.name === activeCategory;

    const foodMatch =
      foodFilter === "All" ||
      item.food_type === foodFilter;

    return categoryMatch && foodMatch;
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="pt-24 text-center">
        <h1 className="text-5xl font-bold mb-6">Our Menu</h1>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full border ${
              activeCategory === category
                ? "bg-red-600 border-red-600"
                : "border-gray-500 hover:bg-red-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* VEG / NON VEG FILTER */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Veg", "Non-Veg"].map((type) => (
          <button
            key={type}
            onClick={() => setFoodFilter(type)}
            className={`px-5 py-2 rounded-full border ${
              foodFilter === type
                ? "bg-green-600 border-green-600"
                : "border-gray-500 hover:bg-green-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* MENU GRID */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-20">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-semibold">
                  {item.name}
                </h3>

                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    item.food_type === "Veg"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {item.food_type}
                </span>
              </div>

              <p className="text-gray-400 mb-3">
                {item.description}
              </p>

              <p className="text-yellow-400 text-lg font-bold">
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
