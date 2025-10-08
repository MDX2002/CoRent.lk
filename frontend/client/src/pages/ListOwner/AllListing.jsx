import './AllListing.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react';

const AllListing = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const backendURL = import.meta.env.VITE_BACKEND_LISTING_URL;

  // Fetch listings for the logged-in user
  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendURL}/api/listings/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await axios.delete(`${backendURL}/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(listings.filter((item) => item.id !== id));
      alert('Listing deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Error deleting listing');
    }
  };

  if (loading) return <p>Loading listings...</p>;

  return (
    <div className='list add flex-col'>
      <p>All Listing List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Title</b>
          <b>Type</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {listings.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img
              src={item.images ? JSON.parse(item.images)[0] : '/placeholder.png'}
              alt={item.title}
              className="w-20 h-16 object-cover"
            />
              <p>{item.title}</p>
              <p>{item.listing_type}</p>
              <p>Rs{item.price}</p>
              <p className='cursor-pointer text-red-600' onClick={() => handleDelete(item.id)}>X</p>

            </div>
          )

        })}
      </div>
      
    </div>
  )
}

export default AllListing
