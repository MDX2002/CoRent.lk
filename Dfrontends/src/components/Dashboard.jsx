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

  /* -------- Sample static customer reviews -------- */
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
    }
  ];

  /* -------- Fetch Listings & Users -------- */
  const fetchListings = useCallback(() => {
    const params = new URLSearchParams({
      search: searchLocation,
      type: filterListingType,
    }).toString();

    fetch(`http://localhost:5000/listings?${params}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch(() => setListings([]));
  }, [searchLocation, filterListingType]);

  const fetchUsers = useCallback(() => {
    const params = new URLSearchParams({
      search: searchUser,
    }).toString();

  fetch(`http://localhost:5000/users?${params}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, [searchUser]);

  const fetchRatings = useCallback(() => {
    setRatings(sampleRatings);
  }, []);

  useEffect(() => {
    fetchListings();
    fetchUsers();
    fetchRatings();
  }, [fetchListings, fetchUsers, fetchRatings]);

  /* -------- Delete Handlers -------- */
  const handleDeleteListing = (id) => {
    fetch(`http://localhost:5000/places/${id}`, { method: "DELETE" })
      .then(() => fetchListings())
      .catch(console.error);
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" })
      .then(() => fetchUsers())
      .catch(console.error);
  };

  const handleDeleteRating = (id) => {
    setRatings(prev => prev.filter(r => r.id !== id));
    setCurrentRatingsPage(1);
  };

  /* -------- Pagination Calculations -------- */
  const indexOfLastRating = currentRatingsPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;
  const currentRatings = ratings.slice(indexOfFirstRating, indexOfLastRating);
  const totalPages = Math.ceil(ratings.length / ratingsPerPage);

  const nextPage = () => currentRatingsPage < totalPages && setCurrentRatingsPage(currentRatingsPage + 1);
  const prevPage = () => currentRatingsPage > 1 && setCurrentRatingsPage(currentRatingsPage - 1);
  const goToPage = (pageNumber) => setCurrentRatingsPage(pageNumber);

  /* -------- Table Renderer -------- */
  const renderTable = (data, deleteHandler, type) => (
    <div className="overflow-x-auto border border-gray-300 rounded-lg">
      <div style={{ maxHeight: "225px", overflowY: "auto" }}>
        <table className="min-w-full">
          <thead className="sticky top-0 bg-[#8B77FF] text-black">
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
            {data.length > 0 ? data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-[#8B77FF]/[0.15]"}>
                {type === "users" && (
                  <>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.contact_number || item.contact}</td>
                    <td className="px-4 py-2">{new Date(item.created_at).toLocaleDateString()}</td>
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
                      <img src={item.profile_photo || "default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full object-cover"/>
                    </td>
                    <td className="px-4 py-2">{item.note}</td>
                    <td className="px-4 py-2">{"⭐".repeat(item.stars)}{"☆".repeat(5 - item.stars)}</td>
                    <td className="px-4 py-2">{new Date(item.created_at).toLocaleString()}</td>
                  </>
                )}
                <td className="px-4 py-2 text-center">
                  <button onClick={() => deleteHandler(item.id)} className="hover:scale-125 transition-all duration-300">
                    <img src="icons8-delete-50.png" alt="Delete" className="w-6 h-6"/>
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={type === "users" ? 5 : type === "listings" ? 5 : 6} className="text-center p-4">No matching records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* -------- JSX -------- */
  return (
    <div className="bg-[#72759E]/[0.25] w-full pb-5 absolute top-0 left-0">
      <div style={{ backgroundColor: "rgb(131,134,173)" }}>
        <h1 className="text-center text-4xl font-bold py-4 text-left pl-5">Admin Dashboard</h1>
      </div>

      <div className="flex justify-center space-x-10">
        {/* Listings Table */}
        <section className="flex space-x-4">
          <div className="p-2">
            <h2 className="text-2xl font-bold mb-4">Listings Table</h2>
            <input type="text" placeholder="Search Location..." className="border p-2 rounded-full mb-4" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} />
            <select className="mb-4 ml-20 p-2 border rounded-full" value={filterListingType} onChange={e => setFilterListingType(e.target.value)}>
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
            <input type="text" placeholder="Search users..." className="border p-2 rounded-full mb-4" value={searchUser} onChange={e => setSearchUser(e.target.value)} />
            {renderTable(users, handleDeleteUser, "users")}
          </div>
        </section>
      </div>

      {/* Customer Reviews */}
      <div className="mt-5">
        <h2 className="text-3xl font-bold mb-6 text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pl-20 pr-20">
          {currentRatings.map(rating => (
            <div key={rating.id} className="bg-white rounded-2xl shadow-full p-3 border-4 border-gray-400">
              <div className="flex items-center pl-20">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                  <img src={rating.profile_photo || "default-avatar.png"} alt="Profile" className="w-full h-full object-cover"/>
                </div>
                <div className="pl-8">
                  <h3 className="text-2xl font-semibold">{rating.name}</h3>
                  <div className="flex">{[...Array(5)].map((_, i) => <span key={i} className={`text-xl ${i < rating.stars ? "text-yellow-400" : "text-gray-300"}`}>★</span>)}</div>
                </div>
              </div>
              <div className="mt-2"><p className="text-gray-600">{rating.note}</p></div>
              <div className="text-center mt-2">
                <button onClick={() => handleDeleteRating(rating.id)} className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {ratings.length > ratingsPerPage && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button onClick={prevPage} disabled={currentRatingsPage === 1} className={`px-4 py-2 rounded-full font-semibold ${currentRatingsPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Previous</button>
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, i) => <button key={i} onClick={() => goToPage(i + 1)} className={`w-10 h-10 rounded-full font-semibold ${currentRatingsPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{i + 1}</button>)}
            </div>
            <button onClick={nextPage} disabled={currentRatingsPage === totalPages} className={`px-4 py-2 rounded-full font-semibold ${currentRatingsPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Next</button>
          </div>
        )}
        {ratings.length > 0 && <div className="text-center mt-4 text-gray-600">Showing {indexOfFirstRating + 1}-{Math.min(indexOfLastRating, ratings.length)} of {ratings.length} reviews</div>}
      </div>
    </div>
  );
}

export default Dashboard;
