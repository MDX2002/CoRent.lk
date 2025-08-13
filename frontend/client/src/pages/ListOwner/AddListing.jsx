import React, { useState } from 'react'
import Title from '../../components/Title/Title'
import { assets } from '../../assets/assets'


const AddListing = () => {

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })
  const [input, setInputs] = useState({
    placeType:'',
    location:'',
    name:'',
    telno:'',
    price:0,
    description:''
  })

  return (
    <form>
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

          <div className='mb-4'>
          <p className='text-gray-800 mt-4'>Lising Type</p>
          <select value={setInputs.placeType} onChange={e=> setInputs({...input, placeType: e.target.value})} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-80'>
            <option value="House">House</option>
            <option value="Room">Room</option>
            <option value="commercal Area">Commercal Area</option>
          </select>

        </div>
        
        {/* Location */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Location</p>
          <input className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" name='name' placeholder='Type here' />
        </div>
        
        {/* Owner Name */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Owner Name</p>
          <input className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" name="ownerName" placeholder='Type here' />
        </div>
        
        {/* Contact No */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">contact No</p>
          <input className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" name="contactno" placeholder='Type here' />
        </div>
        
         {/* Price */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Price</p>
          <input type="text" name="price" placeholder='Type here' />
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <p className="block text-gray-800 font-medium mb-1">Description</p>
          <textarea className="border border-gray-300 rounded p-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none" name="description" rows="6" placeholder='Write Content here'></textarea>
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
