import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function BookingModal({ onClose }) {

  const { customer } = useContext(AuthContext);

  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {

    try {
      await axios.post("/api/bookings/", {
        guests,
        booking_date: date,
        booking_time: time
      });

      alert("Booking Confirmed 🎉");
      onClose();

    } catch (error) {
      alert("Booking Failed");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Reserve Table 🍽️</h2>

        {/* Auto Fetched User */}
        <p><b>Name:</b> {customer?.name}</p>
        <p><b>Phone:</b> {customer?.phone}</p>

        <input
          type="number"
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={handleBooking}>
          Confirm Booking
        </button>

      </div>
    </div>
  );
}
