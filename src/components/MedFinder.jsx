
import React, { useState } from "react";
import axios from "axios";
import {server_url} from '../config/url'

const MedFinder = () => {
  const [city, setCity] = useState("");
  const [medName, setMedName] = useState("");
  const [results, setResults] = useState([]);

  const handleFind = async () => {
    if (!city || !medName) return alert("Please enter both fields");

    try {
      const res = await axios.post(server_url + "/needy/med-finder", {
        city,
        medName,
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-10">
          Find Available Medicines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <input
            type="text"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            placeholder="Enter Medicine Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={handleFind}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">
              No results found.
            </p>
          ) : (
            results.map((med, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-emerald-600 mb-2">
                  {med.medName}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Email:</span> {med.emailid}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Quantity:</span> {med.qty}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Packaging:</span> {med.packing}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Expiry Date:</span>{" "}
                  {new Date(med.expdate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Company:</span> {med.company}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MedFinder;
