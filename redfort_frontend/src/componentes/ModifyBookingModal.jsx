import { useState, useEffect } from "react";

export default function ModifyBookingModal({
  booking,
  onClose,
  onSave
}) {

  const [form, setForm] = useState({
    booking_date: "",
    booking_time: "",
    guests: 1
  });

  useEffect(() => {
    if (booking) {
      setForm({
        booking_date: booking.booking_date,
        booking_time: booking.booking_time,
        guests: booking.guests
      });
    }
  }, [booking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(booking.id, form);
  };

  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">

      <div className="bg-gray-900 p-6 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">
          Modify Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Date */}
          <input
            type="date"
            value={form.booking_date}
            className="w-full p-3 bg-gray-800 rounded"
            onChange={(e) =>
              setForm({ ...form, booking_date: e.target.value })
            }
          />

          {/* Time */}
          <input
            type="time"
            value={form.booking_time}
            className="w-full p-3 bg-gray-800 rounded"
            onChange={(e) =>
              setForm({ ...form, booking_time: e.target.value })
            }
          />

          {/* Guests */}
          <input
            type="number"
            min="1"
            value={form.guests}
            className="w-full p-3 bg-gray-800 rounded"
            onChange={(e) =>
              setForm({ ...form, guests: e.target.value })
            }
          />

          <div className="flex justify-between">

            <button
              type="submit"
              className="bg-yellow-500 px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
