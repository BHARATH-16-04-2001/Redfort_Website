export const sendWhatsAppOrder = (order) => {
  const phone = "919999999999";

  const message = `
🛒 New Order

Items:
${order.items.map(i => `• ${i.name} x ${i.qty}`).join("\n")}

Total: ₹${order.total}
Customer: ${order.customer}
  `;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};
