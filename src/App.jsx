import React, { useEffect, useState } from "react";
import Cursor from "./cursor/Cursor";
import { SmoothScroll } from "react-smooth-scrolll";

export default function App() {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const sampleData = {
    place: "Patiala, India",
    description:
      "Patiala is a city in southeastern Punjab, India. It was the capital of the princely state of Patiala. Known for its rich history, grand palaces, gardens, and unique architectural style, it's often called the 'Royal City.' Key aspects of its culture include traditional Punjabi cuisine, Patiala Shahi Turban, and its historical forts and palaces.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/NSNIS.png",
      "https://s7ap1.scene7.com/is/image/incredibleindia/sheesh-mahal-patiala-punjab-city-ff?qlt=82&ts=1742174155892",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/MotiBaghPalace.jpg/250px-MotiBaghPalace.jpg",
      "https://s7ap1.scene7.com/is/image/incredibleindia/gurudwara-dukh-nivaran-sahib-patiala-punjab-2-attr-hero?qlt=82&ts=1742175247004",
      "https://s7ap1.scene7.com/is/image/incredibleindia/qila-mubarak-patiala-punjab-1-attr-hero?qlt=82&ts=1742167147483",
    ],
    bestTimes: "October to March offers pleasant weather for sightseeing.",
    quickFacts: [
      "Known as the 'Royal City'.",
      "Famous for its Patiala Shahi Turban and traditional Punjabi attire.",
      "Home to grand palaces and historical forts.",
      "Rich cultural heritage with a blend of Sikh and Mughal architecture.",
    ],
    weather: {
      current: {
        temp: 25,
        summary: "Partly cloudy",
      },
      forecast: [
        {
          date: "2025-10-01",
          day: "Wednesday",
          temp: 0,
          summary: "No forecast available",
        },
        {
          date: "2025-10-02",
          day: "Thursday",
          temp: 0,
          summary: "No forecast available",
        },
        {
          date: "2025-10-03",
          day: "Friday",
          temp: 0,
          summary: "No forecast available",
        },
        {
          date: "2025-10-04",
          day: "Saturday",
          temp: 0,
          summary: "No forecast available",
        },
        {
          date: "2025-10-05",
          day: "Sunday",
          temp: 0,
          summary: "No forecast available",
        },
      ],
    },
    hotels: [
      {
        id: 1,
        name: "Hotel Eqbal Inn",
        rating: 3.9,
        price: "$49",
        image:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrgK2zvdG85WvyafdSUYOzgvvws5ZkT851w99g9qACoQxP2DNeCLaXYRMMh9xJTNX16rzd1hmFtI72-crSBa2fnOJiZ-Vqwbp4AFJKhHpq4E3C7T4cs5n76AJ0sMUD6tr55lEzj=s287-w287-h192-n-k-no-v1",
        url: "https://www.hoteleqbal.com/",
      },
      {
        id: 2,
        name: "The Baradari Palace - 19th Century, Patiala",
        rating: 4.3,
        price: "$39",
        image:
          "https://lh3.googleusercontent.com/p/AF1QipOb9ti-SwdDoYzbyq3uH3U6woQexgQua3eS4Ohh=s287-w287-h192-n-k-no-v1",
        url: "http://www.neemranahotels.com/the-baradari-palace-patiala-punjab/",
      },
      {
        id: 3,
        name: "Hotel Clarion Inn AMPS",
        rating: 4.4,
        price: "$48",
        image:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nod7PAsRFS3muxXCFbKgoWyuTbxWWZjluz-TRbGU-AIpNjyqS4tPjCEnO45OWiDj4um2X9mkuqpF4sa-NNXO44MGHM3GgET_LWCf-iya0tFGjiDjNM2ix5pkzPNTjiiOIn4Cvk2=s287-w287-h192-n-k-no-v1",
        url: "http://www.clarioninnpatiala.com/",
      },
      {
        id: 4,
        name: "Hotel Mohan Continental",
        rating: 3.7,
        price: "$25",
        image:
          "https://lh3.googleusercontent.com/p/AF1QipP5OPKJ2DabKjT1uvR93A8XtxVF1PKMVZrNqTk=s287-w287-h192-n-k-no-v1",
        url: "http://www.mohancontinental.com/",
      },
      {
        id: 5,
        name: "RAN BAAS The Palace",
        rating: 4.6,
        price: "$569",
        image:
          "https://lh6.googleusercontent.com/proxy/AxAUQ-UoLcwYabzcOG8u8j1GG6uc6GAhjE5kn8i6l_-wQw7eOVEhgIP1wg_jSZOV3aMqnUN_9Gh1bNvIa0WT_pVIx8uAx8xZw1sEY1xAL_DHqhM7lsZsiOV-4nxznj8OsJbP914rRMM9xOWplbJvgHnBM-w-oA=s287-w287-h192-n-k-no-v1",
        url: "https://www.theparkhotels.com/ran-baas-the-palace/",
      },
    ],
    activities: [
      {
        id: 1,
        name: "Qila Mubarak",
        description:
          "A historic fort complex in Patiala, showcasing Sikh palace architecture.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/df/Qila_Mubarak%2C_Patiala.jpg",
      },
      {
        id: 2,
        name: "Moti Bagh Palace",
        description:
          "A grand palace in Patiala, known for its architectural beauty and historical significance. It now houses the National Institute of Sports.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/MotiBaghPalace.jpg",
      },
      {
        id: 3,
        name: "Sheesh Mahal",
        description:
          "Part of the Old Moti Bagh Palace, known as the 'Palace of Mirrors' for its exquisite mirror work and frescoes.",
        image:
          "https://s7ap1.scene7.com/is/image/incredibleindia/sheesh-mahal-patiala-punjab-1-attr-hero?qlt=82&ts=1742180406649",
      },
      {
        id: 4,
        name: "Baradari Garden",
        description:
          "A beautiful garden with a palace (Baradari Palace) at its center, known for its rare trees and flowers.",
        image:
          "https://assets.simplotel.com/simplotel/image/upload/q_80,fl_progressive,w_1500,f_auto,c_fit/the-baradari-palace---19th-century-patiala/The_Baradari_Palace_Patiala_Punjab_11_vqm6ko",
      },
      {
        id: 5,
        name: "Gurudwara Dukh Nivaran Sahib",
        description:
          "A prominent Sikh gurudwara known for its sacred Sarovar (holy tank) believed to have healing powers.",
        image:
          "https://s7ap1.scene7.com/is/image/incredibleindia/gurudwara-dukh-nivaran-sahib-patiala-punjab-2-attr-hero?qlt=82&ts=1742175247004",
      },
      {
        id: 6,
        name: "National Institute of Sports (NIS)",
        description:
          "Located in the Old Moti Bagh Palace, it is Asia's largest sports institute and a premier institute for sports coaching.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/NSNIS.png",
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
      const res = await fetch(
        "https://n8n-dnv8.onrender.com/webhook/b1a7b181-51e0-4296-a33a-574f7f013b54",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ place: place.trim(), startDate, endDate }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
      }

      const data = await res.json();
      if (!data || typeof data !== "object")
        throw new Error("Invalid response from server");

      console.log(data[0].output);

      setResult(data[0].output);

      scrollkar();
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

  function scrollkar() {
    window.scrollTo({
      top: 600,
      behavior: "smooth",
    });
  }

  onmousemove;

  return (
    <SmoothScroll scrollSpeed={0.4} smoothness={0.3} smooth={"easeInOutQuint"}>
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
                      {(result.weather.forecast || [])
                        .slice(0, 8)
                        .map((f, i) => (
                          <div
                            key={i}
                            className="p-3 bg-gray-50 rounded text-center text-sm"
                          >
                            <div className="font-medium">
                              {f.date || f.day || f.date}
                            </div>
                            <div>{f.temp}°</div>
                            <div className="text-xs text-gray-600">
                              {f.summary}
                            </div>
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
                    <div
                      key={h.id}
                      className="border rounded-lg overflow-hidden"
                    >
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
                              className="text-xl px-3 py-1 border rounded bg-indigo-600 text-white"
                            >
                              Book
                            </a>
                          )}
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
                <h3 className="text-xl font-semibold mb-4">
                  Popular activities
                </h3>
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
              Data aggregated by n8n backend.
            </footer>
          </main>
        ) : (
          <></>
          // <div className="relative h-screen w-full">
          //   <video
          //     src="/video.mp4"
          //     autoPlay
          //     loop
          //     muted
          //     className="absolute inset-0 w-full h-full object-cover"
          //   />

          //   <div className="absolute inset-0 bg-black/40"></div>

          //   <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          //     <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          //       Travel Explorer
          //     </h1>
          //     <p className="text-lg md:text-xl text-gray-100 mb-8">
          //       Enter a place and dates — well fetch essentials, weather, hotels,
          //       and activities for you.
          //     </p>

          //     <div className="text-gray-200 mt-4">
          //       Enter a destination and dates then press Search to see the trip
          //       overview.
          //     </div>
          //   </div>
          // </div>
        )}
      </div>
    </SmoothScroll>
  );
}
