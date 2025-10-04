// Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [searchLocation, setSearchLocation] = useState("");
  const [filterListingType, setFilterListingType] = useState("");
  const [searchUser, setSearchUser] = useState("");

  // Pagination states
  const [currentRatingsPage, setCurrentRatingsPage] = useState(1);
  const [ratingsPerPage] = useState(6);

  // Sample customer reviews data (15 reviews)
  const sampleRatings = [
    {
      id: 1,
      name: "John Smith",
      profile_photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      note: "Excellent service! The property was exactly as described. Highly recommended!",
      stars: 5,
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Emma Johnson",
      profile_photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      note: "Beautiful location and very responsive hosts. Will definitely book again!",
      stars: 4,
      created_at: "2024-01-14T14:20:00Z"
    },
    {
      id: 3,
      name: "Michael Brown",
      profile_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      note: "Great value for money. Clean and comfortable stay.",
      stars: 4,
      created_at: "2024-01-13T16:45:00Z"
    },
    {
      id: 4,
      name: "Sarah Davis",
      profile_photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      note: "Amazing experience! The view was breathtaking and the amenities were top-notch.",
      stars: 5,
      created_at: "2024-01-12T09:15:00Z"
    },
    {
      id: 5,
      name: "David Wilson",
      profile_photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      note: "Good location but could use some improvements in cleanliness.",
      stars: 3,
      created_at: "2024-01-11T11:30:00Z"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      profile_photo: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face",
      note: "Perfect for family vacation! Kids loved the pool area.",
      stars: 5,
      created_at: "2024-01-10T13:20:00Z"
    },
    {
      id: 7,
      name: "Robert Taylor",
      profile_photo: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      note: "Comfortable beds and good WiFi. Would stay here again.",
      stars: 4,
      created_at: "2024-01-09T15:40:00Z"
    },
    {
      id: 8,
      name: "Maria Garcia",
      profile_photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      note: "Beautiful interior design and very peaceful environment.",
      stars: 5,
      created_at: "2024-01-08T18:00:00Z"
    },
    {
      id: 9,
      name: "James Martinez",
      profile_photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      note: "Great customer service and quick response to all queries.",
      stars: 4,
      created_at: "2024-01-07T20:15:00Z"
    },
    {
      id: 10,
      name: "Patricia Lee",
      profile_photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
      note: "The photos don't do justice to how beautiful this place really is!",
      stars: 5,
      created_at: "2024-01-06T22:30:00Z"
    },
    {
      id: 11,
      name: "Christopher Harris",
      profile_photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      note: "Good value but the neighborhood was a bit noisy at night.",
      stars: 3,
      created_at: "2024-01-05T08:45:00Z"
    },
    {
      id: 12,
      name: "Jennifer Clark",
      profile_photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      note: "Absolutely loved our stay! Everything was perfect from start to finish.",
      stars: 5,
      created_at: "2024-01-04T12:00:00Z"
    },
    {
      id: 13,
      name: "Daniel Lewis",
      profile_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      note: "Clean, modern, and well-equipped. Highly recommended for business travelers.",
      stars: 4,
      created_at: "2024-01-03T14:20:00Z"
    },
    {
      id: 14,
      name: "Nancy Walker",
      profile_photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      note: "Beautiful garden and very peaceful. Perfect for a relaxing getaway.",
      stars: 5,
      created_at: "2024-01-02T16:40:00Z"
    },
    {
      id: 15,
      name: "Kevin Hall",
      profile_photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      note: "Good basic accommodation but could use some updates.",
      stars: 3,
      created_at: "2024-01-01T19:00:00Z"
    }
  ];

  /* -------- Fetch Data -------- */
  const fetchListings = useCallback(() => {
    const params = new URLSearchParams({
      search: searchLocation,
      type: filterListingType,
    }).toString();

    fetch(`http://localhost:5000/listings?${params}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Listings API Response:", data);
        setListings(data);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setListings([]);
      });
  }, [searchLocation, filterListingType]);

  const fetchUsers = useCallback(() => {
    const params = new URLSearchParams({
      search: searchUser,
    }).toString();

    fetch(`http://localhost:5000/users?${params}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Users API Response:", data);
        setUsers(data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, [searchUser]);

  const fetchRatings = useCallback(() => {
    console.log("Loading sample ratings data...");
    setRatings(sampleRatings);
  }, []);

  useEffect(() => {
    fetchListings();
    fetchUsers();
    fetchRatings();
  }, [fetchListings, fetchUsers, fetchRatings]);

  /* -------- Delete Handlers -------- */
  const handleDeleteListing = (id) => {
    fetch(`http://localhost:5000/listings/${id}`, { method: "DELETE" })
      .then(() => fetchListings())
      .catch((err) => console.error(err));
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" })
      .then(() => fetchUsers())
      .catch((err) => console.error(err));
  };

  const handleDeleteRating = (id) => {
    // Remove from local state for sample data
    setRatings(prevRatings => prevRatings.filter(rating => rating.id !== id));
    setCurrentRatingsPage(1);
  };

  /* -------- Pagination Calculations -------- */
  const indexOfLastRating = currentRatingsPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;
  const currentRatings = Array.isArray(ratings) 
    ? ratings.slice(indexOfFirstRating, indexOfLastRating)
    : [];

  const totalPages = Array.isArray(ratings) 
    ? Math.ceil(ratings.length / ratingsPerPage)
    : 0;

  const nextPage = () => {
    if (currentRatingsPage < totalPages) {
      setCurrentRatingsPage(currentRatingsPage + 1);
    }
  };

  const prevPage = () => {
    if (currentRatingsPage > 1) {
      setCurrentRatingsPage(currentRatingsPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentRatingsPage(pageNumber);
  };

  /* -------- Reusable Table Renderer -------- */
  const renderTable = (data, deleteHandler, type = "listings") => (
    <div className="overflow-x-auto border border-gray-300 rounded-lg">
      <div style={{ maxHeight: "225px", overflowY: "auto" }}>
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 bg-[#8B77FF] text-black">
            <tr>
              {type === "users" && (
                <>
                  <th className="px-12 py-2 text-left">Name</th>
                  <th className="px-12 py-2 text-left">Email</th>
                  <th className="px-6 py-2 text-left">Contact</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                </>
              )}
              {type === "listings" && (
                <>
                  <th className="px-4 py-2 text-left">Owner ID</th>
                  <th className="px-4 py-2 text-left">Listing Type</th>
                  <th className="px-10 py-2 text-left">Location</th>
                  <th className="px-10 py-2 text-left">Price</th>
                </>
              )}
              {type === "ratings" && (
                <>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Profile</th>
                  <th className="px-4 py-2 text-left">Note</th>
                  <th className="px-4 py-2 text-left">Stars</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                </>
              )}
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-[#8B77FF]/[0.15]"
                  }
                >
                  {type === "users" && (
                    <>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.email}</td>
                      <td className="px-4 py-2">{item.contact_number || item.contact}</td>
                      <td className="px-4 py-2">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </>
                  )}
                  {type === "listings" && (
                    <>
                      <td className="px-4 py-2">{item.owner_id}</td>
                      <td className="px-4 py-2">{item.listing_type}</td>
                      <td className="px-4 py-2">{item.location}</td>
                      <td className="px-4 py-2">Rs. {item.price}</td>
                    </>
                  )}
                  {type === "ratings" && (
                    <>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">
                        <img
                          src={item.profile_photo || "default-avatar.png"}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-4 py-2">{item.note}</td>
                      <td className="px-4 py-2">
                        {"⭐".repeat(item.stars)}{" "}
                        {item.stars < 5 && "☆".repeat(5 - item.stars)}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteHandler(item.id)}
                      className="hover:scale-125 transition-all duration-300"
                    >
                      <img
                        src="icons8-delete-50.png"
                        alt="Delete"
                        className="w-6 h-6"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={type === "users" ? 5 : type === "listings" ? 5 : 6}
                  className="text-center p-4"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-[#72759E]/[0.25] w-full pb-5 absolute top-0 left-0">
      <div style={{ backgroundColor: "rgb(131,134,173)" }}>
        <h1 className="text-center text-4xl font-bold py-4 text-left pl-5">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex justify-center space-x-10">
        {/* Listings Table */}
        <section className="flex space-x-4">
          <div className="p-2">
            <h2 className="text-2xl font-bold mb-4">Listings Table</h2>

            <input
              type="text"
              className="border border-gray-300 p-2 rounded-full mb-4"
              placeholder="Search Location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />

            <select
              className="mb-4 ml-20 p-2 border border-gray-300 rounded-full"
              value={filterListingType}
              onChange={(e) => setFilterListingType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Land">Land</option>
              <option value="Commertial">Commertial</option>
            </select>

            {renderTable(listings, handleDeleteListing, "listings")}
          </div>
        </section>

        {/* Users Table */}
        <section className="flex space-x-4">
          <div className="p-2">
            <h2 className="text-2xl font-bold mb-4">Users Table</h2>

            <input
              type="text"
              className="border border-gray-300 p-2 rounded-full mb-4"
              placeholder="Search users..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />

            {renderTable(users, handleDeleteUser, "users")}
          </div>
        </section>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-5">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <div className="flex item-center">
            <h1>__________________________________________________ </h1>
          Customer Reviews
            <h1> _________________________________________________</h1>
          </div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pl-20 pr-20">
          {currentRatings.length > 0 ? (
            currentRatings.map((rating) => (
              <div
                key={rating.id}
                className="bg-white rounded-2xl shadow-full p-3 border-4 border-gray-400"
              >
                <div className="flex items-center pl-20">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src={rating.profile_photo || "default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="pl-8">
                    <h3 className="text-2xl font-semibold">{rating.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-xl ${
                            index < rating.stars
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-gray-600">{rating.note}</p>
                </div>

                <div className="text-center mt-2">
                  <button
                    onClick={() => handleDeleteRating(rating.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full md:col-span-3">No reviews found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {Array.isArray(ratings) && ratings.length > ratingsPerPage && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevPage}
              disabled={currentRatingsPage === 1}
              className={`px-4 py-2 rounded-full font-semibold ${
                currentRatingsPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`w-10 h-10 rounded-full font-semibold ${
                      currentRatingsPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextPage}
              disabled={currentRatingsPage === totalPages}
              className={`px-4 py-2 rounded-full font-semibold ${
                currentRatingsPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {Array.isArray(ratings) && ratings.length > 0 && (
          <div className="text-center mt-4 text-gray-600">
            Showing {indexOfFirstRating + 1}-{Math.min(indexOfLastRating, ratings.length)} of {ratings.length} reviews
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;