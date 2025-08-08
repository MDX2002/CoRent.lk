import React from 'react'
import { place_Dummy_list } from '../../assets/assets'
import PlaceCard from '../PlaceCards/PlaceCard'
import Title from '../Title/Title'
import { useNavigate } from 'react-router-dom'

const RecommendListing = () => {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
  
      <Title title='Top Co-Living Choices' subTitle='Discover the best-reviewed rooms and homes perfect for co-living, saving money, and building community.'/>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20 w-full ml-20'>
        {place_Dummy_list.slice(0,8).map((place, index)=>(
          <PlaceCard key={place._id} place={place} index={index}/>
        ))}
      </div>

      <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
        Explore All Rentals        
      </button>
      
    </div>
  )
}

export default RecommendListing
