import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import login from "../assets/login.png"
import { registerUser } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { mergeCart } from '../../redux/slices/cartSlice'
import { useEffect } from 'react'
const Signup = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    
        const navigate=useNavigate()
        const location=useLocation()
        const {user,guestId}=useSelector((state)=>state.auth)
         const {cart}=useSelector((state)=>state.cart)
    
         //get redirect parameter and check if its checkout or something 
    
         const redirect=new URLSearchParams(location.search).get("redirect")||"/"
         const isCheckoutRedirect=redirect.includes("checkout")
    
         useEffect(()=>{
          if(user){
            if(cart?.products.length>0&&guestId){
              dispatch(mergeCart({guestId,user})).then(()=>{
                navigate(isCheckoutRedirect?"/checkout":"/")
              })
            }else{
               navigate(isCheckoutRedirect?"/checkout":"/")
            }
          }
         },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch])

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(registerUser({name,email,password}))
        console.log({name,email,password})

    }
    
   

  return (
    <div className='w-full h-[700px] md:h-screen mt-[100px] flex '>
      <div className='w-full md:w-1/2 flex md:p-10 p-0  justify-center items-center '>
        <form className=' md:w-[80%] w-[95%] p-8 gap-2 h-[450px] flex-col justify-between  rounded-lg shadow-md '>
            <div className='text-3xl font-bold text-[#c8a261]'>Veloura</div>


        <div className='flex-col flex justify-evenly   p-2 h-[250px] '>
             <label className='text-[20px]' >Name</label>
        <input type="text" className='p-2' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Name'></input>
        <label className='text-[20px]' >E-mail</label>
        <input type="text" className='p-2' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter email'></input>

        <label className='text-[20px]'>Password</label>
        <input className='p-2' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter password' type="password"></input>
        </div>
        <div className='flex justify-center'>
                   <button type="submit" onClick={handleSubmit} className='px-3 py-2 w-full hover:bg-gray-800 bg-black text-white rounded-md' >Sign up</button>
        </div>
        <div className=' place-items-center'>
          <p className='mt-5'>Already have an account</p>
        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`}>
            <p className='text-blue-400'>Login</p>
        </Link>
        </div>
        </form>
        
      </div>

      {/* image */}
      <div className='hidden md:block w-1/2 p-5'>
        <img className=' w-full h-full rounded-lg' src={login}/>
      </div>
    </div>
  )
}

export default Signup
