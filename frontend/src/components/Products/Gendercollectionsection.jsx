import React from 'react'
import menscollection from '../../assets/menscollection.png'
import womenscollection from '../../assets/womenscollection.png'
import kidscollection from '../../assets/kidscollection.png'

const Gendercollectionsection = () => {
  return (
    <div  className='flex flex-col gap-3 md:flex-row  justify-evenly items-center py-5 md:py-10'>
      <div className='w-full md:w-[29%]   flex items-center relative  justify-center md:h-[500px] h-[400px] px-6 md:px-0 '>
        
            <img className='object-top object-cover w-full h-full' src={menscollection}/>
            <div className='bg-white p-1 absolute w-[200px] h-[50px] top-[80%] left-[15%] opacity-80 flex flex-col'>
                <p>Mens Collection</p>
                <a href="/collections/all?gender=Men">Shop now </a>
            
        </div>
      </div>
      <div className='w-full md:w-[29%] relative  flex items-center  justify-center md:h-[500px] h-[400px] px-6 md:px-0   '>
        
            <img className=' object-top object-cover h-full w-full' src={womenscollection}/>
            <div className='bg-white p-1 absolute w-[200px] h-[50px] top-[80%] left-[15%] opacity-80 flex flex-col'>
                <p>Womens Collection</p>
                <a href="/collections/all?gender=Women">Shop now </a>
            </div>
        
      </div>
      <div className='w-full md:w-[29%] relative  flex items-center  justify-center md:h-[500px] h-[400px] px-6 md:px-0  '>
       
            <img className='w-full h-full object-top object-cover' src={kidscollection}/>
            <div className='bg-white p-1 absolute w-[200px] h-[50px] top-[80%] left-[15%] opacity-80 flex flex-col'>
                <p>Kids Collection</p>
                <a href="/collections/all?gender=Kids">Shop now </a>
            </div>
        
      </div>
    </div>
  )
}

export default Gendercollectionsection
