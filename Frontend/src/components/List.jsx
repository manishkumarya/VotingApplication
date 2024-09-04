import React from 'react'

export default function List({item}) {
    
  return (
    <>

    <div className=''>
        
      <div className="card bg-slate-300 mb-5 w-96 shadow-xl">
       <div className="card-body">
         <h2 className="card-title">{item.name}</h2>
         <p>{item.adress}</p>
       <div className="card-actions justify-end">
      <div>Age: {item.age}</div>
     </div>
     </div>
    </div>
   
      </div>
    
    </>
  )
}
