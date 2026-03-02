// import { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { addDays, format, startOfMonth, endOfMonth } from "date-fns";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const [form, setForm] = useState({
//     booking_date: "",
//     booking_time: "",
//     guests: 1,
//   });

//   const [filter, setFilter] = useState("upcoming");
//   const [calendarDate, setCalendarDate] = useState("");
//   const [calendarDays, setCalendarDays] = useState([]);

//   const token = localStorage.getItem("token");

//   const api = axios.create({
//     baseURL: "http://127.0.0.1:8000/api/",
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   // ================= FETCH BOOKINGS =================
//   const fetchBookings = async () => {
//     try {
//       const res = await api.get("bookings/");
//       setBookings(res.data);
//       setFilteredBookings(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     generateCalendar();
//   }, []);

//   // ================= GENERATE MINI CALENDAR =================
//   const generateCalendar = () => {
//     const start = startOfMonth(new Date());
//     const end = endOfMonth(new Date());
//     const days = [];
//     for (let d = start; d <= end; d = addDays(d, 1)) {
//       days.push(format(d, "yyyy-MM-dd"));
//     }
//     setCalendarDays(days);
//   };

//   // ================= FILTER BOOKINGS =================
//   useEffect(() => {
//     const now = new Date();
//     let filtered = bookings;

//     if (filter === "upcoming") {
//       filtered = bookings.filter(
//         (b) =>
//           new Date(b.booking_date + "T" + b.booking_time) >= now &&
//           b.status !== "cancelled"
//       );
//     } else if (filter === "past") {
//       filtered = bookings.filter(
//         (b) => new Date(b.booking_date + "T" + b.booking_time) < now
//       );
//     } else if (filter === "cancelled") {
//       filtered = bookings.filter((b) => b.status === "cancelled");
//     }

//     if (calendarDate) {
//       filtered = filtered.filter((b) => b.booking_date === calendarDate);
//     }

//     setFilteredBookings(filtered);
//   }, [filter, bookings, calendarDate]);

//   // ================= DASHBOARD STATS =================
//   const stats = {
//     totalBookings: bookings.length,
//     upcoming: bookings.filter(
//       (b) =>
//         new Date(b.booking_date + "T" + b.booking_time) >= new Date() &&
//         b.status !== "cancelled"
//     ).length,
//     past: bookings.filter(
//       (b) => new Date(b.booking_date + "T" + b.booking_time) < new Date()
//     ).length,
//     cancelled: bookings.filter((b) => b.status === "cancelled").length,
//     totalGuests: bookings.reduce((acc, b) => acc + b.guests, 0),
//   };

//   // ================= CANCEL =================
//   const cancelBooking = async (id) => {
//     if (!window.confirm("Cancel this booking?")) return;
//     try {
//       await api.post(`bookings/${id}/cancel/`);
//       fetchBookings();
//     } catch (err) {
//       alert(err.response?.data?.error || "Cancel failed");
//     }
//   };

//   // ================= OPEN MODAL =================
//   const openModal = (booking) => {
//     setSelectedBooking(booking);
//     setForm({
//       booking_date: booking.booking_date,
//       booking_time: booking.booking_time,
//       guests: booking.guests,
//     });
//     setShowModal(true);
//   };

//   // ================= UPDATE =================
//   const updateBooking = async () => {
//     try {
//       await api.put(`bookings/${selectedBooking.id}/`, form);
//       setShowModal(false);
//       fetchBookings();
//       alert("Booking updated!");
//     } catch (err) {
//       alert(err.response?.data || "Update failed");
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <p className="text-xl text-gray-600">Loading bookings...</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 md:p-10">
//       <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
//         My Reservations
//       </h1>

//       {/* ================= DASHBOARD STATS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//         <div className="bg-blue-500 text-white rounded-xl p-4 text-center shadow">
//           <p className="font-bold text-lg">Total Bookings</p>
//           <p className="text-2xl mt-2">{stats.totalBookings}</p>
//         </div>
//         <div className="bg-green-500 text-white rounded-xl p-4 text-center shadow">
//           <p className="font-bold text-lg">Upcoming</p>
//           <p className="text-2xl mt-2">{stats.upcoming}</p>
//         </div>
//         <div className="bg-gray-500 text-white rounded-xl p-4 text-center shadow">
//           <p className="font-bold text-lg">Past</p>
//           <p className="text-2xl mt-2">{stats.past}</p>
//         </div>
//         <div className="bg-red-500 text-white rounded-xl p-4 text-center shadow">
//           <p className="font-bold text-lg">Cancelled</p>
//           <p className="text-2xl mt-2">{stats.cancelled}</p>
//         </div>
//         <div className="bg-yellow-500 text-white rounded-xl p-4 text-center shadow">
//           <p className="font-bold text-lg">Total Guests</p>
//           <p className="text-2xl mt-2">{stats.totalGuests}</p>
//         </div>
//       </div>

//       {/* ================= FILTER & CALENDAR ================= */}
//       <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
//         <div className="flex gap-3">
//           {["upcoming", "past", "cancelled", "all"].map((f) => (
//             <button
//               key={f}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 filter === f
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//               onClick={() => setFilter(f)}
//             >
//               {f.charAt(0).toUpperCase() + f.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="flex items-center gap-2">
//           <label className="font-semibold text-gray-700">Filter by Date:</label>
//           <input
//             type="date"
//             value={calendarDate}
//             onChange={(e) => setCalendarDate(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <button
//             onClick={() => setCalendarDate("")}
//             className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
//           >
//             Clear
//           </button>
//         </div>
//       </div>

//       {/* ================= MINI CALENDAR ================= */}
//       <div className="grid grid-cols-7 gap-1 mb-6">
//         {calendarDays.map((day) => {
//           const isBooked = bookings.some((b) => b.booking_date === day);
//           const isSelected = calendarDate === day;
//           return (
//             <button
//               key={day}
//               onClick={() => setCalendarDate(day)}
//               className={`p-2 rounded transition text-sm font-semibold ${
//                 isSelected
//                   ? "bg-blue-500 text-white"
//                   : isBooked
//                   ? "bg-green-200 text-green-800"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {format(new Date(day), "d")}
//             </button>
//           );
//         })}
//       </div>

//       {/* ================= BOOKINGS GRID ================= */}
//       {filteredBookings.length === 0 && (
//         <p className="text-center text-gray-500 text-lg">No bookings found.</p>
//       )}

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredBookings.map((booking) => (
//           <motion.div
//             key={booking.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition"
//           >
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Table {booking.table}
//               </h2>
//               <p className="text-gray-600 mb-1">📅 {booking.booking_date}</p>
//               <p className="text-gray-600 mb-1">⏰ {booking.booking_time}</p>
//               <p className="text-gray-600 mb-1">👥 {booking.guests} Guests</p>
//               <p
//                 className={`font-semibold ${
//                   booking.status === "cancelled"
//                     ? "text-red-500"
//                     : "text-green-600"
//                 }`}
//               >
//                 Status: {booking.status}
//               </p>
//             </div>

//             <div className="flex gap-3 mt-4">
//               {booking.status !== "cancelled" && (
//                 <>
//                   <button
//                     onClick={() => openModal(booking)}
//                     className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
//                   >
//                     Modify
//                   </button>

//                   <button
//                     onClick={() => cancelBooking(booking.id)}
//                     className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ================= MODIFY MODAL ================= */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-2xl w-11/12 max-w-md shadow-2xl"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//             >
//               <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
//                 Modify Booking
//               </h2>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block font-semibold mb-1 text-gray-700">Date</label>
//                   <input
//                     type="date"
//                     value={form.booking_date}
//                     onChange={(e) => setForm({ ...form, booking_date: e.target.value })}
//                     className="w-full border p-2 rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-semibold mb-1 text-gray-700">Time</label>
//                   <select
//                     value={form.booking_time}
//                     onChange={(e) =>
//                       setForm({ ...form, booking_time: e.target.value })
//                     }
//                     className="w-full border p-2 rounded"
//                   >
//                     <option value="12:00:00">12:00 PM</option>
//                     <option value="13:00:00">1:00 PM</option>
//                     <option value="14:00:00">2:00 PM</option>
//                     <option value="18:00:00">6:00 PM</option>
//                     <option value="19:00:00">7:00 PM</option>
//                     <option value="20:00:00">8:00 PM</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block font-semibold mb-1 text-gray-700">Guests</label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={form.guests}
//                     onChange={(e) =>
//                       setForm({ ...form, guests: e.target.value })
//                     }
//                     className="w-full border p-2 rounded"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-between mt-6">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={updateBooking}
//                   className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
//                 >
//                   Update
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { addDays, format, startOfMonth, endOfMonth } from "date-fns";

// ================= BOOKING CARD COMPONENT =================
function BookingCard({ booking, onCancel, onModify }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onCancel(booking.id),
    onSwipedRight: () => onCancel(booking.id),
    delta: 50,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <motion.div
      {...handlers}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between cursor-pointer transition hover:shadow-2xl"
      title={`Swipe left/right to cancel`}
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Table {booking.table}
        </h2>
        <p className="text-gray-600 mb-1">📅 {booking.booking_date}</p>
        <p className="text-gray-600 mb-1">⏰ {booking.booking_time}</p>
        <p className="text-gray-600 mb-1">👥 {booking.guests} Guests</p>
        <p
          className={`font-semibold ${
            booking.status === "cancelled"
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          Status: {booking.status}
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        {booking.status !== "cancelled" && (
          <>
            <button
              onClick={() => onModify(booking)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Modify
            </button>

            <button
              onClick={() => onCancel(booking.id)}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ================= MAIN COMPONENT =================
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    booking_date: "",
    booking_time: "",
    guests: 1,
  });

  const [filter, setFilter] = useState("upcoming");
  const [calendarDate, setCalendarDate] = useState("");
  const [calendarDays, setCalendarDays] = useState([]);

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: `Bearer ${token}` },
  });

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const res = await api.get("bookings/");
      setBookings(res.data);
      setFilteredBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    generateCalendar();
  }, []);

  // ================= GENERATE MINI CALENDAR =================
  const generateCalendar = () => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    const days = [];
    for (let d = start; d <= end; d = addDays(d, 1)) {
      days.push(format(d, "yyyy-MM-dd"));
    }
    setCalendarDays(days);
  };

  // ================= FILTER BOOKINGS =================
  useEffect(() => {
    const now = new Date();
    let filtered = bookings;

    if (filter === "upcoming") {
      filtered = bookings.filter(
        (b) =>
          new Date(b.booking_date + "T" + b.booking_time) >= now &&
          b.status !== "cancelled"
      );
    } else if (filter === "past") {
      filtered = bookings.filter(
        (b) => new Date(b.booking_date + "T" + b.booking_time) < now
      );
    } else if (filter === "cancelled") {
      filtered = bookings.filter((b) => b.status === "cancelled");
    }

    if (calendarDate) {
      filtered = filtered.filter((b) => b.booking_date === calendarDate);
    }

    setFilteredBookings(filtered);
  }, [filter, bookings, calendarDate]);

  // ================= DASHBOARD STATS =================
  const stats = {
    totalBookings: bookings.length,
    upcoming: bookings.filter(
      (b) =>
        new Date(b.booking_date + "T" + b.booking_time) >= new Date() &&
        b.status !== "cancelled"
    ).length,
    past: bookings.filter(
      (b) => new Date(b.booking_date + "T" + b.booking_time) < new Date()
    ).length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    totalGuests: bookings.reduce((acc, b) => acc + b.guests, 0),
  };

  // ================= CANCEL =================
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.post(`bookings/${id}/cancel/`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.error || "Cancel failed");
    }
  };

  // ================= OPEN MODAL =================
  const openModal = (booking) => {
    setSelectedBooking(booking);
    setForm({
      booking_date: booking.booking_date,
      booking_time: booking.booking_time,
      guests: booking.guests,
    });
    setShowModal(true);
  };

  // ================= UPDATE =================
  const updateBooking = async () => {
    try {
      await api.put(`bookings/${selectedBooking.id}/`, form);
      setShowModal(false);
      fetchBookings();
      alert("Booking updated!");
    } catch (err) {
      alert(err.response?.data || "Update failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-600">Loading bookings...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        My Reservations
      </h1>

      {/* ================= DASHBOARD STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-500 text-white rounded-xl p-4 text-center shadow">
          <p className="font-bold text-lg">Total Bookings</p>
          <p className="text-2xl mt-2">{stats.totalBookings}</p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-4 text-center shadow">
          <p className="font-bold text-lg">Upcoming</p>
          <p className="text-2xl mt-2">{stats.upcoming}</p>
        </div>
        <div className="bg-gray-500 text-white rounded-xl p-4 text-center shadow">
          <p className="font-bold text-lg">Past</p>
          <p className="text-2xl mt-2">{stats.past}</p>
        </div>
        <div className="bg-red-500 text-white rounded-xl p-4 text-center shadow">
          <p className="font-bold text-lg">Cancelled</p>
          <p className="text-2xl mt-2">{stats.cancelled}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-xl p-4 text-center shadow">
          <p className="font-bold text-lg">Total Guests</p>
          <p className="text-2xl mt-2">{stats.totalGuests}</p>
        </div>
      </div>

      {/* ================= FILTER & CALENDAR ================= */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <div className="flex gap-3">
          {["upcoming", "past", "cancelled", "all"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Filter by Date:</label>
          <input
            type="date"
            value={calendarDate}
            onChange={(e) => setCalendarDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={() => setCalendarDate("")}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Clear
          </button>
        </div>
      </div>

      {/* ================= MINI CALENDAR ================= */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {calendarDays.map((day) => {
          const isBooked = bookings.some((b) => b.booking_date === day);
          const isSelected = calendarDate === day;
          return (
            <button
              key={day}
              onClick={() => setCalendarDate(day)}
              className={`p-2 rounded transition text-sm font-semibold ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isBooked
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {format(new Date(day), "d")}
            </button>
          );
        })}
      </div>

      {/* ================= BOOKINGS GRID ================= */}
      {filteredBookings.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onCancel={cancelBooking}
            onModify={openModal}
          />
        ))}
      </div>

      {/* ================= MODIFY MODAL ================= */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl w-11/12 max-w-md shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Modify Booking
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.booking_date}
                    onChange={(e) =>
                      setForm({ ...form, booking_date: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700">
                    Time
                  </label>
                  <select
                    value={form.booking_time}
                    onChange={(e) =>
                      setForm({ ...form, booking_time: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="12:00:00">12:00 PM</option>
                    <option value="13:00:00">1:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="18:00:00">6:00 PM</option>
                    <option value="19:00:00">7:00 PM</option>
                    <option value="20:00:00">8:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.guests}
                    onChange={(e) =>
                      setForm({ ...form, guests: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition"
                >
                  Close
                </button>
                <button
                  onClick={updateBooking}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                >
                  Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
