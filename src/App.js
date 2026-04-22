import { useState } from "react";

function App() {
  const API = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [flights, setFlights] = useState([]);

  async function login() {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
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

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <br /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>SkyRoute Dashboard</h2>
      <button onClick={searchFlights}>Search Flights</button>
      <ul>
        {flights.map((_, i) => (
          <li key={i}>Flight Option {i + 1}</li>
        ))}
      </ul>
      <br />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
