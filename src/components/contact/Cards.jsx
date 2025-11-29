import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cards = () => {
  return (
    <section className='px-4 md:px-12 py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Email Card */}
        <div className='flex flex-col items-center space-y-4 relative bg-gradient-to-br from-black/0 to-[#FCD201]/15 p-4 rounded-xl'>
          <div className='relative w-16 h-12 mt-8'>
            <Image src='/layout/email.svg' alt='email' fill />
          </div>
          <h2 className='text-[#c2c2c2] font-bold text-center'>E-Mail</h2>
          <h4 className='text-white text-center'>info@genrobotics.org</h4>
          <Link
            href="mailto:info@genrobotics.org"
            className='lg:absolute lg:bottom-8 my-4 px-4 py-2 bg-[#FCD901] rounded-lg'
          >
            Email us
          </Link>
        </div>

        {/* Phone Card */}
        <div className='flex flex-col items-center space-y-4 relative bg-gradient-to-br from-black/0 to-[#FCD201]/15 p-4 rounded-xl'>
          <div className='relative w-12 h-12 mt-8'>
            <Image src='/layout/phone.svg' alt='phone' fill />
          </div>
          <h2 className='text-[#c2c2c2] font-bold text-center'>Phone Number</h2>
          <h4 className='text-white text-center'>+91-9961616166</h4>
          <Link
            href="tel:+919961616166"
            className='lg:absolute lg:bottom-8 my-4 px-4 py-2 bg-[#FCD901] rounded-lg'
          >
            Contact us
          </Link>
        </div>

        {/* Location Card */}
        <div className='flex flex-col items-center space-y-4 relative bg-gradient-to-br from-black/0 to-[#FCD201]/15 p-4 rounded-xl'>
          <div className='relative w-12 h-12 mt-8'>
            <Image src='/layout/location.svg' alt='location' fill />
          </div>
          <h2 className='text-[#c2c2c2] font-bold text-center'>Location</h2>
          <h4 className='text-white text-center lg:mb-24'>
            Genrobotic Innovations, CDAC Building, Technopark Campus, Thiruvananthapuram Kerala, 695581
          </h4>
          <Link
            href="https://www.google.com/maps/place/Genrobotic+Innovations,+CDAC+Building,+Technopark+Campus,+Thiruvananthapuram+Kerala+695581"
            target="_blank"
            rel="noopener noreferrer"
            className='lg:absolute lg:bottom-8 my-4 px-4 py-2 bg-[#FCD901] rounded-lg'
          >
            View Location
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cards
