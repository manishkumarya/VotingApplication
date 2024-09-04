import React from 'react'

export default function Card({item}) {
  return (
   <>
   <div className='mt-4 my-3 p-3'>
   <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={item.img}
      alt="elected_candidate" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-red-700 underline">{item.party}</h2>
    <p>{item.name}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Vote Now</button>
    </div>
  </div>
</div>
   </div>
   </>
  )
}
