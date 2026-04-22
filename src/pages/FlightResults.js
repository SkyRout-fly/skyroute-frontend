import React, { useState } from 'react';

export default function FlightResults({ 
  flights, 
  from, 
  to, 
  date, 
  sortBy, 
  setSortBy, 
  maxPrice, 
  setMaxPrice, 
  stops, 
  setStops 
}) {
  const [selectedFlights, setSelectedFlights] = useState([]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(price);
  };

  // Airport information database
  const airportInfo = {
    JFK: { city: 'New York', name: 'John F. Kennedy International', country: 'USA' },
    LHR: { city: 'London', name: 'London Heathrow', country: 'UK' },
    LAX: { city: 'Los Angeles', name: 'Los Angeles International', country: 'USA' },
    CDG: { city: 'Paris', name: 'Charles de Gaulle', country: 'France' },
    ORD: { city: 'Chicago', name: "O'Hare International", country: 'USA' },
  };

  // Mock flight data for demo (replace with real API data)
  const mockFlights = [
    {
      id: 1,
      airline: 'SkyBlue Airways',
      flightNumber: 'SB123',
      departure: '06:00',
      arrival: '12:30',
      duration: 390,
      stops: 0,
      price: 245,
      logo: '✈️',
      aircraft: 'Boeing 787',
      seatsAvailable: 12,
      baggage: '2x 23kg + 1x 8kg',
      departureGate: 'A12',
      arrivalTerminal: '3',
    },
    {
      id: 2,
      airline: 'AeroTech',
      flightNumber: 'AT456',
      departure: '08:15',
      arrival: '15:45',
      duration: 450,
      stops: 1,
      price: 189,
      logo: '✈️',
      aircraft: 'Airbus A320',
      seatsAvailable: 5,
      baggage: '1x 23kg + 1x 8kg',
      departureGate: 'B5',
      arrivalTerminal: '2',
    },
    {
      id: 3,
      airline: 'GlobalFly',
      flightNumber: 'GF789',
      departure: '10:30',
      arrival: '17:00',
      duration: 390,
      stops: 0,
      price: 320,
      logo: '✈️',
      aircraft: 'Boeing 777',
      seatsAvailable: 18,
      baggage: '2x 23kg + 1x 8kg',
      departureGate: 'C20',
      arrivalTerminal: '1',
    },
    {
      id: 4,
      airline: 'FastJet',
      flightNumber: 'FJ234',
      departure: '12:00',
      arrival: '18:20',
      duration: 380,
      stops: 1,
      price: 165,
      logo: '✈️',
      aircraft: 'Airbus A319',
      seatsAvailable: 3,
      baggage: '1x 23kg',
      departureGate: 'A8',
      arrivalTerminal: '2',
    },
    {
      id: 5,
      airline: 'PremiumAir',
      flightNumber: 'PA567',
      departure: '14:45',
      arrival: '21:15',
      duration: 390,
      stops: 0,
      price: 450,
      logo: '✈️',
      aircraft: 'Boeing 747',
      seatsAvailable: 25,
      baggage: '2x 32kg + 2x 8kg',
      departureGate: 'D15',
      arrivalTerminal: '3',
    },
  ];

  // Filter flights
  let filteredFlights = mockFlights.filter(
    (flight) => flight.price <= maxPrice && flight.stops <= stops
  );

  // Sort flights
  if (sortBy === 'price') {
    filteredFlights.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'departure') {
    filteredFlights.sort((a, b) => a.departure.localeCompare(b.departure));
  } else if (sortBy === 'duration') {
    filteredFlights.sort((a, b) => a.duration - b.duration);
  }

  const toggleFlightSelection = (flightId) => {
    if (selectedFlights.includes(flightId)) {
      setSelectedFlights(selectedFlights.filter((id) => id !== flightId));
    } else {
      setSelectedFlights([...selectedFlights, flightId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Filters</h3>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Price</h4>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-sm text-gray-600 mt-2">
                Up to {formatPrice(maxPrice)}
              </p>
            </div>

            {/* Stops Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Stops</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="stops"
                    value="0"
                    onChange={() => setStops(0)}
                    checked={stops === 0}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Direct</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="stops"
                    value="1"
                    onChange={() => setStops(1)}
                    checked={stops === 1}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">1 Stop</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="stops"
                    value="5"
                    onChange={() => setStops(5)}
                    checked={stops === 5}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">All</span>
                </label>
              </div>
            </div>

            {/* Airline Filter */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Airlines</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="text-blue-600" />
                  <span className="ml-2 text-gray-700">SkyBlue Airways</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="text-blue-600" />
                  <span className="ml-2 text-gray-700">AeroTech</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="text-blue-600" />
                  <span className="ml-2 text-gray-700">GlobalFly</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Results */}
        <div className="lg:col-span-3">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Flights from {from} to {to}
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg outline-none font-semibold"
            >
              <option value="price">Lowest Price</option>
              <option value="departure">Earliest Departure</option>
              <option value="duration">Shortest Duration</option>
            </select>
          </div>

          {/* Flight Cards */}
          <div className="space-y-4">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  onClick={() => toggleFlightSelection(flight.id)}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-2 overflow-hidden ${
                    selectedFlights.includes(flight.id) ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{flight.airline}</p>
                        <p className="text-sm text-gray-500">Flight {flight.flightNumber} • {flight.aircraft}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-blue-600">{formatPrice(flight.price)}</p>
                        <p className="text-xs text-gray-500 mt-1">per person</p>
                      </div>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Departure Details */}
                      <div className="flex flex-col">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Departure</p>
                        <p className="text-3xl font-bold text-gray-900">{flight.departure}</p>
                        <p className="text-sm text-gray-600 font-semibold mt-1">{from}</p>
                        <div className="mt-3 text-xs text-gray-600 space-y-1">
                          <p>📍 {airportInfo[from]?.city || 'N/A'}</p>
                          <p>{airportInfo[from]?.name || 'Airport'}</p>
                          <p className="text-blue-600 font-semibold">Gate: {flight.departureGate}</p>
                        </div>
                      </div>

                      {/* Duration & Stops */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative w-full mb-4">
                          <div className="h-1 bg-gradient-to-r from-gray-300 via-blue-400 to-gray-300 rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span className="text-xs bg-white px-2 text-gray-700 font-semibold">{formatTime(flight.duration)}</span>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                          {flight.stops === 0 ? '✈️ Direct' : `🔄 ${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                        </p>
                        <div className="mt-4 text-xs text-gray-600 space-y-2 w-full">
                          <div className="bg-gray-100 p-2 rounded">✈️ {flight.aircraft}</div>
                          <div className="bg-green-100 p-2 rounded text-green-700 font-semibold">{flight.seatsAvailable} seats available</div>
                        </div>
                      </div>

                      {/* Arrival Details */}
                      <div className="flex flex-col">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Arrival</p>
                        <p className="text-3xl font-bold text-gray-900">{flight.arrival}</p>
                        <p className="text-sm text-gray-600 font-semibold mt-1">{to}</p>
                        <div className="mt-3 text-xs text-gray-600 space-y-1">
                          <p>📍 {airportInfo[to]?.city || 'N/A'}</p>
                          <p>{airportInfo[to]?.name || 'Airport'}</p>
                          <p className="text-blue-600 font-semibold">Terminal: {flight.arrivalTerminal}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Baggage & Amenities */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div className="text-sm">
                        <p className="font-semibold text-gray-700">🧳 Baggage</p>
                        <p className="text-gray-600">{flight.baggage}</p>
                      </div>
                      <button
                        className="px-8 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        Select This Flight
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <p className="text-xl text-gray-600">No flights found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
