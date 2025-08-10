import React from 'react'
import { assets, types } from '../../assets/assets'

const Hero = () => {
  return (
  <div className="relative h-screen bg-no-repeat bg-cover bg-center"
    style={{ backgroundImage: `url("${assets.heroImage}")` }}
  >
    {/*bg-[url('/src/assets/heroImage.jpg')]*/}
    
    <div className="absolute right-0 top-1/3 transform -translate-y-1/4 px-6 md:px-16 lg:px-24 xl:px-32 text-white">
      <h1 className="text-5xl md:text-7xl  tracking-tight text-left">
        <span className="block mt-10 font-playfair font-bold md:font-extrabold">Find your</span>
        <span className="block mt-6 font-playfair font-bold md:font-extrabold">perfect place</span>
      </h1>

       <form className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-25 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calender_icon} alt="" className='h-4' />
                    <label htmlFor="typeInput">Type</label>
                </div>
                <input list='types' id="typeInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='types'>
                    {types.map((type, index)=>(
                        <option value={type} key={index}/>
                    ))}

                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calender_icon} alt="" className='h-4' />
                    <label htmlFor="price">Price</label>
                </div>
                <input id="price" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calender_icon} alt="" className='h-4' />
                    <label htmlFor="location">Location</label>
                </div>
                <input id="location" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here"/>
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.search_icon} alt="searchIcon" className='h-7'/>
                <span>Search</span>
            </button>
        </form>

    </div>
  </div>
  )
}

export default Hero
