import api from "./api";

export const createBooking = (data) => {
  return api.post("/bookings/", data);
};

export const getBookings = () => {
  return api.get("/bookings/");
};

export const getMyBookings = () => {
  return api.get("/bookings/my_bookings/");
};
