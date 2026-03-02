
// import { useState } from "react";
// import axios from "axios";

// export default function Register() {

//   const [form, setForm] = useState({
//     username: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//   });

//   const [error, setError] = useState("");

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
//     return regex.test(password);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validatePassword(form.password)) {
//       setError("Weak password");
//       return;
//     }

//     try {
//       await axios.post("http://127.0.0.1:8000/api/auth/register/", form);
//       alert("Signup Successful");
//     } catch (err) {
//       setError("Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100">

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-2xl rounded-2xl p-10 w-[400px]"
//       >

//         <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

//         <input
//           name="username"
//           placeholder="Full Name"
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg mb-4"
//         />

//         <input
//           name="phone"
//           placeholder="Phone Number"
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg mb-4"
//         />

//         <input
//           name="email"
//           placeholder="Email (Optional)"
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg mb-4"
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg"
//         />

//         <ul className="text-xs text-gray-500 ml-5 mt-2 mb-4 list-disc">
//           <li>Minimum 8 characters</li>
//           <li>One capital letter</li>
//           <li>One number</li>
//           <li>One special symbol</li>
//         </ul>

//         <input
//           name="confirm_password"
//           type="password"
//           placeholder="Confirm Password"
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg mb-4"
//         />

//         {error && <p className="text-red-500 mb-3">{error}</p>}

//         <button className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700">
//           Signup
//         </button>

//       </form>

//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // ================= Handle Input =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= Password Validation =================
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

  // ================= Handle Submit =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must contain 1 capital letter, 1 number, 1 special symbol and minimum 6 characters"
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", {
        username: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword,
      });

      alert("Signup successful 🎉 Please login");

      // ⭐ Redirect to Login
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email (Optional)"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-1 rounded"
          onChange={handleChange}
          required
        />

        <p className="text-xs text-gray-500 mb-3">
          Password must contain 1 Capital letter, 1 Number and 1 Special symbol
        </p>

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Signup
        </button>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}
