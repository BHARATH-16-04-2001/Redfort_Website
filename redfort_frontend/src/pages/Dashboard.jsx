import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {

  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-3xl font-bold text-yellow-500">
        Welcome to Red Fort Restaurant
      </h1>

      <button
        onClick={logout}
        className="mt-5 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

