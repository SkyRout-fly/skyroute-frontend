import React, { useState } from 'react';

export default function Home({ searchFlights, from, setFrom, to, setTo, date, setDate, onLogout }) {
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Comprehensive Airport database
  // Comprehensive Airport database
  const airports = [
    // North America
    { code: 'JFK', city: 'New York', name: 'John F. Kennedy International', country: 'USA' },
    { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International', country: 'USA' },
    { code: 'ORD', city: 'Chicago', name: 'O\'Hare International', country: 'USA' },
    { code: 'MIA', city: 'Miami', name: 'Miami International', country: 'USA' },
    { code: 'SFO', city: 'San Francisco', name: 'San Francisco International', country: 'USA' },
    { code: 'SEA', city: 'Seattle', name: 'Seattle-Tacoma International', country: 'USA' },
    { code: 'BOS', city: 'Boston', name: 'Logan International', country: 'USA' },
    { code: 'DEN', city: 'Denver', name: 'Denver International', country: 'USA' },
    { code: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson International', country: 'USA' },
    { code: 'DFW', city: 'Dallas', name: 'Dallas/Fort Worth International', country: 'USA' },
    { code: 'LAS', city: 'Las Vegas', name: 'Harry Reid International', country: 'USA' },
    { code: 'PHX', city: 'Phoenix', name: 'Phoenix Sky Harbor International', country: 'USA' },
    { code: 'IAD', city: 'Washington DC', name: 'Washington Dulles International', country: 'USA' },
    { code: 'YYZ', city: 'Toronto', name: 'Toronto Pearson International', country: 'Canada' },
    { code: 'YVR', city: 'Vancouver', name: 'Vancouver International', country: 'Canada' },
    { code: 'MEX', city: 'Mexico City', name: 'Mexico City International', country: 'Mexico' },

    // Europe
    { code: 'LHR', city: 'London', name: 'London Heathrow', country: 'UK' },
    { code: 'LGW', city: 'London', name: 'London Gatwick', country: 'UK' },
    { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle', country: 'France' },
    { code: 'ORY', city: 'Paris', name: 'Paris Orly', country: 'France' },
    { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt Airport', country: 'Germany' },
    { code: 'MUC', city: 'Munich', name: 'Munich Airport', country: 'Germany' },
    { code: 'AMS', city: 'Amsterdam', name: 'Amsterdam Airport', country: 'Netherlands' },
    { code: 'FCO', city: 'Rome', name: 'Leonardo da Vinci', country: 'Italy' },
    { code: 'MXP', city: 'Milan', name: 'Milan Malpensa', country: 'Italy' },
    { code: 'MAD', city: 'Madrid', name: 'Madrid-Barajas', country: 'Spain' },
    { code: 'BCN', city: 'Barcelona', name: 'Barcelona-El Prat', country: 'Spain' },
    { code: 'ZRH', city: 'Zurich', name: 'Zurich Airport', country: 'Switzerland' },
    { code: 'VIE', city: 'Vienna', name: 'Vienna International', country: 'Austria' },
    { code: 'CPH', city: 'Copenhagen', name: 'Copenhagen Airport', country: 'Denmark' },
    { code: 'ARN', city: 'Stockholm', name: 'Stockholm Arlanda', country: 'Sweden' },
    { code: 'OSL', city: 'Oslo', name: 'Oslo Gardermoen', country: 'Norway' },
    { code: 'HEL', city: 'Helsinki', name: 'Helsinki-Vantaa', country: 'Finland' },
    { code: 'DUB', city: 'Dublin', name: 'Dublin Airport', country: 'Ireland' },
    { code: 'BRU', city: 'Brussels', name: 'Brussels Airport', country: 'Belgium' },
    { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport', country: 'Turkey' },
    { code: 'ATH', city: 'Athens', name: 'Athens International', country: 'Greece' },
    { code: 'WAW', city: 'Warsaw', name: 'Warsaw Chopin', country: 'Poland' },
    { code: 'PRG', city: 'Prague', name: 'Václav Havel Airport', country: 'Czech Republic' },
    { code: 'BUD', city: 'Budapest', name: 'Budapest Ferenc Liszt', country: 'Hungary' },

    // Asia
    { code: 'HND', city: 'Tokyo', name: 'Haneda Airport', country: 'Japan' },
    { code: 'NRT', city: 'Tokyo', name: 'Narita International', country: 'Japan' },
    { code: 'ICN', city: 'Seoul', name: 'Incheon International', country: 'South Korea' },
    { code: 'PVG', city: 'Shanghai', name: 'Shanghai Pudong', country: 'China' },
    { code: 'PEK', city: 'Beijing', name: 'Beijing Capital', country: 'China' },
    { code: 'CAN', city: 'Guangzhou', name: 'Guangzhou Baiyun', country: 'China' },
    { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong International', country: 'Hong Kong' },
    { code: 'SIN', city: 'Singapore', name: 'Singapore Changi', country: 'Singapore' },
    { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi Airport', country: 'Thailand' },
    { code: 'DMK', city: 'Bangkok', name: 'Don Mueang International', country: 'Thailand' },
    { code: 'CGK', city: 'Jakarta', name: 'Soekarno-Hatta International', country: 'Indonesia' },
    { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur International', country: 'Malaysia' },
    { code: 'MNL', city: 'Manila', name: 'Ninoy Aquino International', country: 'Philippines' },
    { code: 'DEL', city: 'Delhi', name: 'Indira Gandhi International', country: 'India' },
    { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj', country: 'India' },
    { code: 'BLR', city: 'Bangalore', name: 'Kempegowda International', country: 'India' },
    { code: 'DOH', city: 'Doha', name: 'Hamad International', country: 'Qatar' },
    { code: 'AUH', city: 'Abu Dhabi', name: 'Abu Dhabi International', country: 'UAE' },
    { code: 'DXB', city: 'Dubai', name: 'Dubai International', country: 'UAE' },
    { code: 'TLV', city: 'Tel Aviv', name: 'Ben Gurion Airport', country: 'Israel' },
    { code: 'RUH', city: 'Riyadh', name: 'King Khalid International', country: 'Saudi Arabia' },
    { code: 'JED', city: 'Jeddah', name: 'King Abdulaziz International', country: 'Saudi Arabia' },

    // Oceania
    { code: 'SYD', city: 'Sydney', name: 'Sydney Kingsford Smith', country: 'Australia' },
    { code: 'MEL', city: 'Melbourne', name: 'Melbourne Tullamarine', country: 'Australia' },
    { code: 'BNE', city: 'Brisbane', name: 'Brisbane Airport', country: 'Australia' },
    { code: 'PER', city: 'Perth', name: 'Perth Airport', country: 'Australia' },
    { code: 'AKL', city: 'Auckland', name: 'Auckland Airport', country: 'New Zealand' },
    { code: 'CHC', city: 'Christchurch', name: 'Christchurch International', country: 'New Zealand' },

    // Africa
    { code: 'JNB', city: 'Johannesburg', name: 'O.R. Tambo International', country: 'South Africa' },
    { code: 'CPT', city: 'Cape Town', name: 'Cape Town International', country: 'South Africa' },
    { code: 'CAI', city: 'Cairo', name: 'Cairo International', country: 'Egypt' },
    { code: 'ADD', city: 'Addis Ababa', name: 'Addis Ababa Bole', country: 'Ethiopia' },
    { code: 'NBO', city: 'Nairobi', name: 'Jomo Kenyatta International', country: 'Kenya' },
    { code: 'LOS', city: 'Lagos', name: 'Murtala Muhammed International', country: 'Nigeria' },
    { code: 'CMN', city: 'Casablanca', name: 'Mohammed V International', country: 'Morocco' },

    // South America
    { code: 'GRU', city: 'São Paulo', name: 'São Paulo-Guarulhos', country: 'Brazil' },
    { code: 'GIG', city: 'Rio de Janeiro', name: 'Rio de Janeiro-Galeão', country: 'Brazil' },
    { code: 'BOG', city: 'Bogotá', name: 'El Dorado International', country: 'Colombia' },
    { code: 'LIM', city: 'Lima', name: 'Jorge Chávez International', country: 'Peru' },
    { code: 'SCL', city: 'Santiago', name: 'Arturo Merino Benítez', country: 'Chile' },
    { code: 'EZE', city: 'Buenos Aires', name: 'Ministro Pistarini', country: 'Argentina' },
  ];

  // Filter airports based on search input
  const filterAirports = (searchValue) => {
    if (!searchValue) return [];
    const search = searchValue.toUpperCase();
    return airports.filter(
      (airport) =>
        airport.code.includes(search) ||
        airport.city.toUpperCase().includes(search) ||
        airport.name.toUpperCase().includes(search)
    );
  };

  const fromAirports = filterAirports(from);
  const toAirports = filterAirports(to);

  const handleFromSelect = (airport) => {
    setFrom(airport.code);
    setShowFromDropdown(false);
  };

  const handleToSelect = (airport) => {
    setTo(airport.code);
    setShowToDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFlights();
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">✈️</span>
              <h1 className="text-3xl font-bold text-gray-900">SkyRoute</h1>
            </div>
            <nav className="flex items-center space-x-8">
              <button className="text-gray-700 font-semibold border-b-2 border-blue-600 pb-2">
                ✈️ Flights
              </button>
              <button className="text-gray-500 hover:text-gray-700">🏨 Hotels</button>
              <button className="text-gray-500 hover:text-gray-700">🚗 Cars</button>
              <button
                onClick={onLogout}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                🚪 Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-2">Millions of cheap flights. One simple search.</h2>
          <p className="text-blue-100 mb-8">Compare and find the best deals</p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-6 rounded-lg shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* From - With Autocomplete */}
              <div className="flex flex-col relative">
                <label className="text-sm font-semibold text-gray-600 mb-2">From</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-white hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="mr-2">📍</span>
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value.toUpperCase());
                      setShowFromDropdown(true);
                    }}
                    onFocus={() => setShowFromDropdown(true)}
                    className="w-full outline-none text-gray-900 font-semibold"
                    placeholder="Departure airport"
                  />
                </div>
                
                {/* Dropdown */}
                {showFromDropdown && fromAirports.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {fromAirports.map((airport, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleFromSelect(airport)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900">{airport.code}</p>
                            <p className="text-sm text-gray-600">{airport.city}, {airport.country}</p>
                          </div>
                          <p className="text-xs text-gray-500">{airport.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* To - With Autocomplete */}
              <div className="flex flex-col relative">
                <label className="text-sm font-semibold text-gray-600 mb-2">To</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-white hover:border-blue-500 transition focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="mr-2">📍</span>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value.toUpperCase());
                      setShowToDropdown(true);
                    }}
                    onFocus={() => setShowToDropdown(true)}
                    className="w-full outline-none text-gray-900 font-semibold"
                    placeholder="Arrival airport"
                  />
                </div>

                {/* Dropdown */}
                {showToDropdown && toAirports.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {toAirports.map((airport, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToSelect(airport)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900">{airport.code}</p>
                            <p className="text-sm text-gray-600">{airport.city}, {airport.country}</p>
                          </div>
                          <p className="text-xs text-gray-500">{airport.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-2">Depart</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-white hover:border-blue-500 transition">
                  <span className="mr-2">📅</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-2">Travellers & cabin</label>
                <div className="border border-gray-300 rounded-lg p-3 bg-white hover:border-blue-500 transition">
                  <select className="w-full outline-none text-gray-900 font-semibold">
                    <option>1 Adult, Economy</option>
                    <option>2 Adults, Economy</option>
                    <option>1 Adult, Business</option>
                    <option>1 Adult, First Class</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg w-full"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}