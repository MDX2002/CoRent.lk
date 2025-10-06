import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { place_Dummy_list, userDummyData, assets } from '../../assets/assets'
import StarRating from '../../components/StarRating/StarRating'
import axios from 'axios'

const SpaceDetails = () => {
  const {id} = useParams()
  const [space, setSpace] = useState(null)
  const [mainImage, setMainImage] = useState(null)

  const [formData, setFormData] = useState({
    ownerEmail: '',
    name: '',
    message: ''
  })

  useEffect(()=>{
    const fetchSpace = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LISTING_URL}/api/listings/${id}`)
        setSpace(res.data)
        setMainImage(JSON.parse(res.data.images)[0])
      } catch (err) {
        console.error('Error fetching listing details:', err)
      }
    }

    fetchSpace()
  },[id])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_EMAIL_URL}/api/contact/send-message`, {
          name: formData.name,
          email: formData.ownerEmail,
          message: formData.message,
          listingTitle: space.title,
          listingId: space.id
        })
        if (res.data.success) {
          alert('Email sent successfully!')
          setFormData({ ownerEmail: '', name: '', message: '' })
        }
      } catch (err) {
        console.error(err)
        alert('Failed to send email.')
      }
  }

  if (!space) return <div>Loading...</div>

  return space && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Space Details */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md-text-4xl font-playfair'>{space.title} <span className='font-inter text-sm'>({space.listing_type})</span></h1>      
      </div>

      {/* Space Rating */}
      <div className='flex item-center gap-1 mt-2'>
        <StarRating />
      </div>
       
      {/* Location */}
      <div className='flex items-center gap-1 text-sm mt-2'>
          <img src={assets.location_icon} alt="location-icon" />
          <span>{space.location}</span>
      </div>

      {/* Room Images */}
      <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img src={mainImage} alt="Room Image"  className='w-full rounded-xl shadow-lg object-cover'/>
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {space?.images.length > 1 && JSON.parse(space.images).map((image, index)=>(
            <img onClick={()=> setMainImage(image)} 
            key={index} src={image} alt="Room Image" className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline outline-3 outline-orange-500'}`}/>
          ))}
        </div>
      </div>

      {/* Room Highlights*/}
      <div className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 mt-5'>
        <div className='mb-4'><p className='text-xl font-semibold'>Details</p></div>
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-gray-500/30 pb-6">

          <div className="flex flex-col text-lg">
        
            <p className='mb-2'>Location: {space.location}</p>
            
            <p>Type: {space.listing_type}</p>

          </div>
        
          <div className="flex flex-col text-lg">

            
            <p className='mb-2'>Owner: {space.owner?.name || 'Unknown'}</p>
            
            <p className='mb-2'>Contact no: {space.owner?.contact_number || '-'}</p>
            <p>Email: {space.owner?.email || '-'}</p>

          </div>

          <div className="flex flex-col text-lg">
            <p>Rs:{space.price}/month</p>

          </div>

        </div>

        <div>
          <p className='text-lg mb-2'>Description:</p>
          <p className='text-lg'>{space.description}</p>
        </div>
        

      </div>
      
      {/* Contact Form */}
      <div className='pt-8 px-6 md:px-16 lg:px-24 xl:px-32 mt-5'>
        <form onSubmit={handleSubmit}>

              <h2 className="text-2xl font-bold py-4 text-center">
            Contact Owner
          </h2>

          <label className="font-medium w-full">Owner Email Address</label>
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            placeholder="Enter Owner Email here"
            required
            className="mt-2 mb-4 h-10 px-3 w-full border border-slate-300 rounded-full outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <label className="font-medium w-full">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name here"
            required
            className="mt-2 mb-4 h-10 px-3 w-full border border-slate-300 rounded-full outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <label className="font-medium w-full">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message here"
            required
            className="mt-2 mb-4 p-2 w-full border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
          />

          <button
            type="submit"
            className="mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-30 rounded-full transition disabled:opacity-50"
          >Send</button>

        </form>
      </div>



      
    </div>
  )
}

export default SpaceDetails
