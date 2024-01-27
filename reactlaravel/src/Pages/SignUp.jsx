import { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useData } from '../Context/ContextProvider';
function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const {setUser,setToken}= useData();
  const [errors,setErrors] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
   const payload = {
    name:nameRef.current.value,
    email:emailRef.current.value,
    password:passwordRef.current.value,
    password_confirmation:passwordConfirmationRef.current.value
   }
   
   axiosClient.post('/signup',payload).then(({data})=>{
       console.log(data);
       setToken(
           data.token
       )
       setUser(data.user)
   }).catch((err=>{
         const response = err.response
         if(response && response.status===422){
             setErrors(response.data.errors)
            //  console.log(response.data.errors)
         }
   }))
   console.log(payload);
  }
  return (
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
  )
}

export default SignUp