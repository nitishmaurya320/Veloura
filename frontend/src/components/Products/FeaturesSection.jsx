import React from 'react'
import { HiShoppingBag } from "react-icons/hi2";
import { HiArrowPath } from "react-icons/hi2";
import { SiFsecure } from "react-icons/si";

const FeaturesSection = () => {
  return (
    <section className='md:flex-row flex  flex-col h-[400px] md:h-[350px] justify-evenly items-center w-full '>
        <div className='w-full md:1/3 flex flex-col place-items-center '>
            <HiShoppingBag/>
            <p  className='font-semibold'>FREE INTERNATIONAL SHIPPING </p>
            <span>On orders over Rs.7000</span>
        </div>
        <div className='w-full md:1/3  flex-col flex place-items-center'>
            <HiArrowPath/>
            <p className='font-semibold'>45 DAYS RETURN</p>
            <span>Money back guaranatee</span>
        </div>
        <div className='w-full md:1/3   flex-col flex place-items-center'>
            <SiFsecure/>
            <p className='font-semibold'>SECURE CHECKOUT</p>
            <span>100% secured checkout process</span>
        </div>
    </section>
  )
}

export default FeaturesSection
