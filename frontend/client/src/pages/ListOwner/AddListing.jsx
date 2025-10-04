import React, { useState } from 'react'
import Title from '../../components/Title/Title'
import { assets } from '../../assets/assets'
import axios from 'axios'


const AddListing = () => {

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })
  const [input, setInputs] = useState({
    title:'',
    listing_type:'',
    location:'',
    price:0,
    description:''
  })

   // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs({ ...input, [name]: value })
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!input.title || !input.listing_type || !input.location || !input.price || !input.description) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const formData = new FormData()
      formData.append('title', input.title)
      formData.append('listing_type', input.listing_type)
      formData.append('location', input.location)
      formData.append('price', Number(parseFloat(input.price).toFixed(2)))
      formData.append('description', input.description)

      // Add images
      Object.values(images).forEach((img) => {
        if (img) formData.append('images', img)
      })

      // Debug: see what is being sent
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1])
      }

      // Get token (saved when user logged in)
      const token = localStorage.getItem('token')

      const res = await axios.post(
      
        'http://localhost:5000/api/listings', // your listing-service endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Listing added successfully!')
      console.log(res.data)

       // Reset form after success
      setInputs({
        title: '',
        listing_type: '',
        location: '',
        price: '',
        description: ''
      })
      setImages({ 1: null, 2: null, 3: null, 4: null })

    } catch (error) {
      console.error(error)
      alert('Error adding listing')
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <Title align='left' font='outfit' title='Add Listing' subTitle='Fill in the details carefully and accurate listing details, pricing, and small description, to enhance the user experience'/>

      {/* Upload Area For Image */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key)=>(
          <label htmlFor={`placeImage${key}`} key={key}>
            <img className='max-h-13 cursor-pointer opacity-80'
            src={images[key] ? URL.createObjectURL(images[key]) : assets.upload_area} alt="" />
            <input type="file" accept='image/*' id={`placeImage${key}`} hidden onChange={e=> setImages({...images, [key]: e.target.files[0]})}/>
          </label>
        ))}
      </div>

      <div className='p-1'>

          
        {/* title */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Title</p>
          <input className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" name='title' value={input.title} onChange={handleChange} placeholder='Type here' />
        </div>
        

        <div className='mb-4'>
          <p className='text-gray-800 mt-4'>Lising Type</p>
          <select name='listing_type' value={input.listing_type} onChange={handleChange} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-80'>
            <option value=''>Select</option>
            <option value="House">House</option>
            <option value="Room">Room</option>
            <option value="commercial Area">Commercal Area</option>
          </select>

        </div>
        
        {/* Location */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Location</p>
          <input className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" name='location' value={input.location} onChange={handleChange} placeholder='Type here' />
        </div>
        
        {/* Owner Name 
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Owner Name</p>
          <input className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" name="ownerName" placeholder='Type here' />
        </div>
        
        {/* Contact No 
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">contact No</p>
          <input className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" name="contactno" placeholder='Type here' />
        </div>*/}
        
         {/* Price */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Price</p>
          <input className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="number" name="price" value={input.price} onChange={handleChange} placeholder='Type here' />
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Description</p>
          <textarea className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" name="description" rows="6" value={input.description} onChange={handleChange} placeholder='Write Content here'></textarea>
        </div>
        
        {/* Submit */}
        <div>
          <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-200" type='submit'>Add</button>
        </div>


      </div>

      

    </form>
  )
}

export default AddListing
