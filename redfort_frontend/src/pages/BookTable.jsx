import BookingForm from "../componentes/BookingForm";

export default function BookTable() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reserve Your Table 🍽️
        </h2>
        <BookingForm />
      </div>
    </div>
  );
}
