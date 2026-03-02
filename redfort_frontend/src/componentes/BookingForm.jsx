// import { useState } from "react";
// import { createBooking } from "../api/bookings";

// export default function BookingForm() {

//   const [form, setForm] = useState({
//     booking_date: "",
//     booking_time: "",
//     guests: 1,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Basic validation
//     if (!form.booking_date || !form.booking_time || !form.guests) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await createBooking(form);

//       // ✅ Success message with table number
//       alert(
//         `Booking Confirmed!\n\nTable Number: ${res.data.table_number}\nDate: ${res.data.booking_date}\nTime: ${res.data.booking_time}`
//       );

//       console.log("Booking Success:", res.data);

//       // ✅ Reset form after success
//       setForm({
//         booking_date: "",
//         booking_time: "",
//         guests: 1,
//       });

//     } catch (err) {

//       // ✅ Proper error message handling
//       const errorMessage =
//         err.response?.data?.detail ||
//         err.response?.data?.error ||
//         err.response?.data?.message ||
//         "Booking failed. Please try again.";

//       alert(errorMessage);

//       console.error("Booking Error:", err.response?.data || err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">

//       <input
//         type="date"
//         value={form.booking_date}
//         className="w-full p-3 bg-gray-700 text-white rounded"
//         onChange={(e) =>
//           setForm({ ...form, booking_date: e.target.value })
//         }
//       />

//       <input
//         type="time"
//         value={form.booking_time}
//         className="w-full p-3 bg-gray-700 text-white rounded"
//         onChange={(e) =>
//           setForm({ ...form, booking_time: e.target.value })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Number of People"
//         min="1"
//         value={form.guests}
//         className="w-full p-3 bg-gray-700 text-white rounded"
//         onChange={(e) =>
//           setForm({ ...form, guests: e.target.value })
//         }
//       />

//       <button
//         type="submit"
//         className="w-full bg-yellow-500 p-3 rounded font-bold hover:bg-yellow-400 transition"
//       >
//         Book Table
//       </button>

//     </form>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function BookingForm() {
  const [tables, setTables] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    table: "",
    guests: "",
    date: "",
    time: "",
  });

  // Fetch tables automatically
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await api.get("/tables/");
        setTables(res.data);
      } catch (err) {
        console.error("Failed to fetch tables", err);
      }
    };

    fetchTables();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/bookings/", formData);
      alert("Booking Successful 🎉");
    } catch (err) {
      alert("Booking failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Book Table</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border p-2 rounded-lg"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Table Selection */}
        <select
          name="table"
          className="w-full border p-2 rounded-lg"
          value={formData.table}
          onChange={handleChange}
          required
        >
          <option value="">Select Table</option>
          {tables.map((t) => (
            <option key={t.id} value={t.id}>
              Table {t.table_number} (Seats {t.capacity})
            </option>
          ))}
        </select>

        {/* Guests */}
        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          className="w-full border p-2 rounded-lg"
          value={formData.guests}
          onChange={handleChange}
          required
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          className="w-full border p-2 rounded-lg"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Time Slot */}
        <select
          name="time"
          className="w-full border p-2 rounded-lg"
          value={formData.time}
          onChange={handleChange}
          required
        >
          <option value="">Select Time</option>
          <option>12:00</option>
          <option>13:00</option>
          <option>14:00</option>
          <option>18:00</option>
          <option>19:00</option>
          <option>20:00</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded-lg">
          Confirm Booking
        </button>

      </form>
    </div>
  );
}
