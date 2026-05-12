import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import PlaceCard from '../PlaceCards/PlaceCard'; // adjust the path if it's in a different folder


export default function SearchPage() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortBy, setSortBy] = useState('ascending');

  // Only use search service URL
  const searchURL = import.meta.env.VITE_BACKEND_SEARCH_URL || 'http://localhost:7000';

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${searchURL}/api/listings`, {
        params: { q: query, sortField, sortBy },
      });
      setList(res.data || []);
    } catch (err) {
      console.error('Error fetching listings:', err.message || err);
      setList([]);
    }
  };

  // Fetch whenever query or sorting changes
  useEffect(() => {
    fetchListings();
  }, [query, sortField, sortBy]);

  return (
    <div className="min-h-screen bg-gray-300 p-6 flex justify-center pt-30">
      <div className="w-full max-w-7xl px-4">
        {/* Search & Sort Form */}
        <form className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search:</label>
              <input
                type="search"
                placeholder="Search by title, location, price..."
                value={query}
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Field:</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="title">Title</option>
                <option value="location">Location</option>
                <option value="price">Price</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </div>
        </form>

        {/* Listings */}
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.length > 0 ? (
            list.map((post) => (
              <div
                key={post.id || post.title}
                className="flex bg-white shadow rounded-lg overflow-hidden hover:scale-[1.01] transition-transform h-[200px]"
              >
                <img
                  src={post.images ? JSON.parse(post.images)[0] : '/placeholder.jpg'}
                  alt={post.title}
                  className="w-[200px] h-full object-cover"
                />
                <div className="p-4 flex flex-col justify-between">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h2>
                  <p className="text-sm text-gray-600">{post.location}</p>
                  <p className="text-blue-600 font-semibold mt-2">Rs:{post.price}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mr-1" />
                    ))}
                    <span className="text-sm font-medium text-gray-700 ml-2">5.0</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center text-gray-500 text-xl col-span-full">
              No matching posts found!
            </h2>
          )}
        </div>*/}

        {/* Listings */}
        {list.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.map((post, index) => (
              <PlaceCard key={post.id} place={post} index={index} />
            ))}
          </div>
        ) : (
          <h2 className="text-center text-gray-500 text-xl col-span-full">
            No matching posts found!
          </h2>
        )}


      </div>
    </div>
  );
}
