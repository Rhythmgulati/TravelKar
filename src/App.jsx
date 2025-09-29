import React, { useEffect, useState } from "react";
import { Scrollbar } from "smooth-scrollbar-react";
import Cursor from "./cursor/Cursor";

export default function App() {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const sampleData = {
    place: "Kyoto, Japan",
    description:
      "Kyoto is famous for its classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
    images: [
      "/sampleimages/1.jpg",
      "/sampleimages/2.jpg",
      "/sampleimages/3.jpg",
    ],
    bestTimes: "March–May, October–November",
    quickFacts: [
      "Former capital of Japan",
      "Known for cherry blossoms",
      "Over 1600 temples",
    ],
    weather: {
      current: { temp: 22, summary: "Clear skies" },
      forecast: [
        { date: "20-03-2003", day: "Mon", temp: 23, summary: "Sunny" },
        { date: "20-03-2003", day: "Tue", temp: 21, summary: "Partly cloudy" },
        { date: "20-03-2003", day: "Wed", temp: 20, summary: "Light rain" },
        { date: "20-03-2003", day: "Thu", temp: 19, summary: "Showers" },
      ],
    },
    hotels: [
      {
        id: 1,
        name: "Kyoto Imperial Hotel",
        rating: 4.5,
        price: "$150/night",
        image: "/sampleimages/h1.jpg",
        url: "https://example.com/hotel1",
      },
      {
        id: 2,
        name: "Ryokan Sakura",
        rating: 4.8,
        price: "$200/night",
        image: "/sampleimages/h2.jpg",
        url: "https://example.com/hotel2",
      },
      {
        id: 2,
        name: "Ryokan Sakura",
        rating: 4.8,
        price: "$200/night",
        image: "/sampleimages/h3.jpg",
        url: "https://example.com/hotel2",
      },
      {
        id: 2,
        name: "Ryokan Sakura",
        rating: 4.8,
        price: "$200/night",
        image: "/sampleimages/h4.jpg",
        url: "https://example.com/hotel2",
      },
      {
        id: 2,
        name: "Ryokan Sakura",
        rating: 4.8,
        price: "$200/night",
        image: "/sampleimages/h5.jpg",
        url: "https://example.com/hotel2",
      },
    ],
    activities: [
      {
        id: 1,
        name: "Fushimi Inari Shrine",
        description: "Walk through thousands of iconic red torii gates.",
        image: "https://source.unsplash.com/400x300/?fushimi-inari",
      },
      {
        id: 1,
        name: "Fushimi Inari Shrine",
        description: "Walk through thousands of iconic red torii gates.",
        image: "https://source.unsplash.com/400x300/?fushimi-inari",
      },
      {
        id: 1,
        name: "Fushimi Inari Shrine",
        description: "Walk through thousands of iconic red torii gates.",
        image: "https://source.unsplash.com/400x300/?fushimi-inari",
      },
      {
        id: 1,
        name: "Fushimi Inari Shrine",
        description: "Walk through thousands of iconic red torii gates.",
        image: "https://source.unsplash.com/400x300/?fushimi-inari",
      },
      {
        id: 2,
        name: "Arashiyama Bamboo Grove",
        description: "Stunning bamboo forest perfect for a peaceful stroll.",
        image: "https://source.unsplash.com/400x300/?bamboo,forest",
      },
    ],
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(sampleData);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!place.trim()) {
      setError("Please enter a place to search.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place: place.trim(), startDate, endDate }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
      }

      const data = await res.json();
      // Basic validation of expected shape
      if (!data || typeof data !== "object")
        throw new Error("Invalid response from server");

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return dateStr;
    }
  }

  onmousemove;

  return (
    // <Scrollbar
    //   damping={0.1}
    //   thumbMinSize={20}
    //   renderByPixels={true}
    //   alwaysShowTracks={false}
    //   continuousScrolling={true}
    //   onScroll={(status) => {
    //     console.log("Scrolling", status);
    //   }}
    //   style={{ height: "500px" }}
    // >
    <div className="min-h-screen bg-gray-50 ">
      <header className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-center ">
        <div className="absolute inset-0 overflow-hidden z-2">
          <video src="/video.mp4" loop autoPlay muted></video>
        </div>
        <div className="absolute z-4 inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            TravelKar
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Enter a place and dates — we’ll fetch essentials, weather, hotels,
            and activities for you.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/90 p-6 rounded-lg shadow-lg text-black"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Destination
              </label>
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="e.g. Kyoto, Japan"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 p-2"
              />
            </div>

            <div className="md:col-span-4 flex gap-3 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Searching..." : "Search"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlace("");
                  setStartDate("");
                  setEndDate("");
                  setResult(sampleData);
                  setError(null);
                }}
                className="inline-flex items-center px-4 py-2 border rounded-lg bg-white/80"
              >
                Clear
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded">
              {error}
            </div>
          )}
        </div>
      </header>

      {/* Result area */}
      {result ? (
        <main className="space-y-8 px-12 pt-10 bg-[#353F4A] relative">
          <Cursor position={cursorPosition} />
          <section className="bg-white p-6 rounded-lg shadow">
            <div className="md:flex md:gap-6">
              <div className="md:flex-1">
                <h2 className="text-2xl font-semibold">
                  {result.place || place}
                </h2>
                {result.description && (
                  <p className="mt-3 text-gray-700">{result.description}</p>
                )}

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                  {result.bestTimes && (
                    <div className="px-3 py-2 bg-gray-100 rounded">
                      Best times: {result.bestTimes}
                    </div>
                  )}
                  {startDate && (
                    <div className="px-3 py-2 bg-gray-100 rounded">
                      Trip: {formatDate(startDate)} — {formatDate(endDate)}
                    </div>
                  )}
                </div>

                {/* Quick facts */}
                {result.quickFacts && (
                  <div className="mt-4">
                    <h3 className="font-medium">Quick facts</h3>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                      {result.quickFacts.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Image gallery */}
              <div className="mt-4 md:mt-0 md:w-72 md:flex-shrink-0">
                <div className="rounded-lg overflow-hidden border">
                  {result.images && result.images.length > 0 ? (
                    <img
                      src={result.images[0]}
                      alt={result.place}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      No image
                    </div>
                  )}
                </div>

                {/* thumbnails */}
                {result.images && result.images.length > 1 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {result.images.slice(0, 6).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`thumb-${i}`}
                        className="h-20 w-full object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Weather */}
          {result.weather && (
            <section className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Weather</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <div className="text-sm text-gray-500">Current</div>
                  <div className="mt-2 text-2xl font-bold">
                    {result.weather.current?.temp ?? "—"}°
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.weather.current?.summary ?? "—"}
                  </div>
                </div>

                <div className="md:col-span-2 p-4 border rounded">
                  <div className="text-sm text-gray-500">Forecast</div>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(result.weather.forecast || []).slice(0, 8).map((f, i) => (
                      <div
                        key={i}
                        className="p-3 bg-gray-50 rounded text-center text-sm"
                      >
                        <div className="font-medium">
                          {f.date || f.day || f.date}
                        </div>
                        <div>{f.temp}°</div>
                        <div className="text-xs text-gray-600">{f.summary}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Hotels */}
          {result.hotels && result.hotels.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Hotels</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.hotels.map((h) => (
                  <div key={h.id} className="border rounded-lg overflow-hidden">
                    {h.image ? (
                      <img
                        src={h.image}
                        alt={h.name}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="h-40 bg-gray-100" />
                    )}
                    <div className="p-3">
                      <div className="font-medium">{h.name}</div>
                      <div className="text-sm text-gray-600">
                        {h.rating ? `${h.rating} ★` : "—"} •{" "}
                        {h.price ? `from ${h.price}` : "Price N/A"}
                      </div>
                      <div className="mt-2 flex gap-2">
                        {h.url && (
                          <a
                            href={h.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm underline"
                          >
                            Book
                          </a>
                        )}
                        <button className="text-sm px-2 py-1 border rounded">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities */}
          {result.activities && result.activities.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Popular activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.activities.map((a) => (
                  <div
                    key={a.id}
                    className="border rounded-lg overflow-hidden flex flex-col"
                  >
                    {a.image ? (
                      <img
                        src={a.image}
                        alt={a.name}
                        className="w-full h-36 object-cover"
                      />
                    ) : (
                      <div className="h-36 bg-gray-100" />
                    )}
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="font-medium">{a.name}</div>
                      <p className="text-sm text-gray-600 mt-2 flex-1">
                        {a.description || a.desc || "No description"}
                      </p>
                      <div className="mt-3 text-sm">
                        <button className="px-3 py-1 border rounded">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer / attribution */}
          <footer className="text-sm text-gray-500">
            Data aggregated by your n8n backend. Replace /api/trip with your n8n
            route.
          </footer>
        </main>
      ) : (
        <div className="relative h-screen w-full">
          <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Travel Explorer
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Enter a place and dates — well fetch essentials, weather, hotels,
              and activities for you.
            </p>

            <div className="text-gray-200 mt-4">
              Enter a destination and dates then press Search to see the trip
              overview.
            </div>
          </div>
        </div>
      )}
    </div>
    // </Scrollbar>
  );
}
