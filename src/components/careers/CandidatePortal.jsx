import Link from 'next/link'
import React from 'react'

const CandidatePortal = () => {
  return (
    <section className='my-24'>
        <div className='mx-auto flex flex-col'>
            <h2 className='font-anton text-white text-center'>Can’t find what you’re looking for?</h2>
            <h4 className='text-white text-center mb-12'>Join our Candidate Portal and stay updated on new job openings that match your profile.</h4>
            <Link href="" className='px-4 py-2 bg-[#FCD901] rounded-lg w-fit mx-auto'>Register Here</Link>
        </div>
    </section>
  )
}

export default CandidatePortal