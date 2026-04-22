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

  // ✅ SHOW LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

