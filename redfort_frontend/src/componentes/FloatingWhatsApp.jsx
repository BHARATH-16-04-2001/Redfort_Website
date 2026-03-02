import { FaWhatsapp } from "react-icons/fa";
import { sendWhatsAppOrder } from "../utils/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <button
      onClick={() =>
        sendWhatsAppOrder({
          items: [{ name: "Biryani", qty: 2 }],
          total: 500,
          customer: "Rahul",
        })
      }
      className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
    >
      <FaWhatsapp size={28} color="white" />
    </button>
  );
}
