import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useData } from '../Context/ContextProvider'

function GuestLayout() {
    const {token} = useData();
    if(token){
       return <Navigate to="/" />
    }
  return (
    <div>GuestLayout for guest users only
        <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <Outlet/>
       </div>
    </div>
    </div>
  )
}

export default GuestLayout