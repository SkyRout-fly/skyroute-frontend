import { useState } from "react";
import Home from "./pages/Home";
import FlightResults from "./pages/FlightResults";

export default function App() {
  const API = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("JFK");
  const [to, setTo] = useState("LHR");
  const [date, setDate] = useState("2026-06-01");
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [stops, setStops] = useState(5);
  const [searched, setSearched] = useState(false);

  async function login() {
    // Demo login - validate inputs and set token
    if (!email || !username || !password) {
      alert("Please fill in all fields");
      return;
    }
    const demoToken = "demo-token-" + Date.now();
    localStorage.setItem("token", demoToken);
    setToken(demoToken);
  }

  async function searchFlights() {
    const res = await fetch(
      `${API}/flights?from=${from}&to=${to}&date=${date}`
    );
    const data = await res.json();
    setFlights(data.itineraries || []);
    setSearched(true);
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        {/* Login Card */}
        <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-96">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">✈️ SkyRoute</h1>
            <p className="text-gray-600">Find and Book Your Perfect Flight</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="username123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg mt-6"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign Up
            </a>
          </p>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              💡 Demo Mode: Use any email/username and password
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Home 
        searchFlights={searchFlights} 
        from={from} setFrom={setFrom} 
        to={to} setTo={setTo} 
        date={date} setDate={setDate}
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
