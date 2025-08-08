import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { place_Dummy_list, assets } from '../../assets/assets'
import StarRating from '../../components/StarRating/StarRating'

const SpaceDetails = () => {
  const {id} = useParams()
  const [space, setSpace] = useState(null)
  const [mainImage, setMainImage] = useState(null)

  useEffect(()=>{
    const space = place_Dummy_list.find(space=> space._id === id)
    space && setSpace(space)
    space && setMainImage(space.images[0])
  },[])

  return space && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Space Details */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md-text-4xl font-playfair'>{space.name} <span className='font-inter text-sm'>({space.type})</span></h1>      
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
          {space?.images.length > 1 && space.images.map((image, index)=>(
            <img onClick={()=> setMainImage(image)} 
            key={index} src={image} alt="Room Image" className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline outline-3 outline-orange-500'}`}/>
          ))}
        </div>
      </div>

      {/* Room Highlights*/}
      <div>
        <div className=''><p>Description</p></div>
        <div>

          <div>

            <img src='' alt="" />
            <p></p>
            <img src="" alt="" />
            <p>{}</p>

          </div>
        
          <div>

            <img src="" alt="" />
            <p></p>
            <img src="" alt="" />
            <p></p>

          </div>

          <div>
            <p></p>

          </div>

        </div>
        

      </div>

      
    </div>
  )
}

export default SpaceDetails
