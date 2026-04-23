import { useState } from "react";
import Home from "./pages/Home";
import FlightResults from "./pages/FlightResults";

export default function App() {
  const API = process.env.REACT_APP_API_URL;

  // Auth state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Search + results state
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("JFK");
  const [to, setTo] = useState("LHR");
  const [date, setDate] = useState("2026-06-01");
  const [searched, setSearched] = useState(false);

  // Filters
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [stops, setStops] = useState(5);

  // --------------------
  // LOGIN (demo)
  // --------------------
  function login() {
    if (!email || !username || !password) {
      alert("Please fill in all fields");
      return;
    }

    const demoToken = "demo-token-" + Date.now();
    localStorage.setItem("token", demoToken);
    setToken(demoToken);
  }

  // --------------------
  // SEARCH FLIGHTS
  // --------------------
  async function searchFlights() {
    const res = await fetch(
      `${API}/flights?from=${from}&to=${to}&date=${date}`
    );
    const data = await res.json();
    setFlights(data.itineraries || []);
    setSearched(true);
  }

  // --------------------
  // LOGIN VIEW
  // --------------------
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            ✈️ SkyRoute
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="space-y-4"
          >
            <input
              type="email"
              className="border p-3 w-full rounded-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              className="border p-3 w-full rounded-lg"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="border p-3 w-full rounded-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --------------------
  // MAIN APP
  // --------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <Home
        searchFlights={searchFlights}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        date={date}
        setDate={setDate}
        onLogout={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
      />

      {searched && (
        <FlightResults
          flights={flights}
          from={from}
          to={to}
          date={date}
          sortBy={sortBy}
          setSortBy={setSortBy}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          stops={stops}
          setStops={setStops}
        />
      )}
    </div>
  );
}
``