import React, { useRef,useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useData } from '../Context/ContextProvider';
function Login() {
  const emailRef = useRef();
  const {setUser,setToken}= useData();
  const [errors,setErrors] = useState(null);
  const passwordRef = useRef();
  const [message,setMessage] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
   const payload = {
    email:emailRef.current.value,
    password:passwordRef.current.value,
   }
   axiosClient.post('/login',payload).then(({data})=>{
       setToken(
           data.token
       )
       setUser(data.user)
   }).catch(err=>{
         const response = err.response
         if(response && response.status===422){
            //  setErrors(response.data.errors)
            setMessage(response.data.message)
            //  console.log(response.data.errors)
         }
   })
   console.log(payload);
  }
  return (
      <form onSubmit={onSubmit}>
        <h1 className="title">Login into your account</h1>

        {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

        <input  ref={emailRef} type="email" placeholder="Email"/>
        <input  ref={passwordRef} type="password" placeholder="Password"/>
        <button className="btn btn-block">Login</button>
        <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
      </form>
  )
}

export default Login