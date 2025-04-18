import React from 'react'
import { Placeholder,Star } from '../../assets'
const index = ({ 
    image, 
    title, 
    location, 
    rating, 
    reviews, 
    originalPrice, 
    discountedPrice, 
    discount 
  }) => {
  return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl border-r border-b border-[#E2E4E9] hover:shadow-lg duration-300 overflow-hidden w-full sm:w-[295px]">
        {/* Image Section */}
        <div className="relative">
          <img 
            src={image}
            alt={title} 
            className="w-full h-40 sm:h-48 object-cover"
          />
        </div>
        
        {/* Content Section */}
        <div className="p-3 sm:p-4">
          <h2 className="text-[18px] sm:text-[20px] leading-[101%] font-[600] mb-1">
            {title}
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base mb-2">{location}</p>
          
          {/* Rating Section */}
          <div className="flex items-center gap-1 mb-2 sm:mb-3">
            <img src={Star} alt="" className="w-4 sm:w-auto" />
            <span className="font-semibold text-sm sm:text-base">{rating}</span>
            <span className="text-gray-500 text-xs sm:text-sm">({reviews} reviews)</span>
          </div>
          
          {/* Price Section */}
          <div className="flex justify-between items-end">
            <div className='w-[30%]'>
              <div className="text-gray-500 line-through text-[12px] sm:text-[14px]">{originalPrice}</div>
              <div className="text-[18px] sm:text-[20px] font-bold">{discountedPrice}</div>
            </div>
            <div className='flex w-[70%] justify-end items-end'>
              <span className="border-[#00963C] text-[#00963C] border text-[12px] sm:text-[14px] px-2 py-1 rounded-md">
                Save up to {discount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
