import { useEffect, useState } from "react";

export default function DarkToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="border px-3 py-1 rounded"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
