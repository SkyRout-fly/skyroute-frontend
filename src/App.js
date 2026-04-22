import { useState } from "react";
import Home from "./pages/Home";

export default function App() {
  const API = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [flights, setFlights] = useState([]);

  async function login() {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    const match = text.match(/<textarea.*?>(.*?)<\/textarea>/);

    if (match) {
      localStorage.setItem("token", match[1]);
      setToken(match[1]);
    } else {
      alert("Login failed");
    }
  }

  async function searchFlights() {
    const res = await fetch(
      `${API}/flights?from=JFK&to=LHR&date=2026-06-01`
    );
    const data = await res.json();
    setFlights(data.itineraries || []);
  }

  /* ============================
     🔐 LOGIN VIEW
  ============================ */
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          <input
            className="border p-3 w-full mb-3 rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="border p-3 w-full mb-4 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="bg-blue-600 text-white w-full py-3 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  /* ============================
     ✅ LOGGED‑IN VIEW
  ============================ */
  return (
    <>
      {/* Skyscanner‑style Home */}
      <Home />

      {/* Dashboard / Results section */}
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={searchFlights}
          className="bg-blue-600 text-white px-6 py-3 rounded mb-4"
        >
          Search Flights
        </button>

        <ul className="space-y-2">
          {flights.map((_, i) => (
            <li
              key={i}
              className="border p-4 rounded bg-white shadow"
            >
              Flight Option {i + 1}
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
          }}
          className="mt-6 text-red-600 underline"
        >
          Logout
        </button>
      </div>
    </>
  );
}
