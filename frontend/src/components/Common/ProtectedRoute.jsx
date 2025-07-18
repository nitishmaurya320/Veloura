import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children,role}) => {
    const {user} =useSelector((state)=>state.auth)
        console.log(user.role)
    if(!user||(user.role!==role)){
        return <Navigate to="/login" replace></Navigate>
    }
 
  return children
}

export default ProtectedRoute
