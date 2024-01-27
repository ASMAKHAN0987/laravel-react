import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useData } from '../Context/ContextProvider'
function UserForm() {
    const {id} = useParams()
    const navigate =  useNavigate()
    const [loading,setLoading]= useState(false)
    const [errors,setErrors]= useState(null)
    const {setNotification} = useData()
    const [user,setUser] = useState({
        id:null,
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    })
    if(id){
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/users/${id}`)
            .then(({data})=>{
                 console.log(data)
                 setLoading(false);
                 setUser(data)
            })
            .catch(()=>{
                setLoading(false);
            })
        },[])
    }
   const onSubmit = (e)=>{
      e.preventDefault();
      if(user.id){
        axiosClient.put(`/users/${user.id}`,user)
        .then(()=>{
            setNotification("User was updated successfully")
            navigate('/users')
        })
        .catch((err=>{
            const response = err.response
            if(response && response.status===422){
                setErrors(response.data.errors)
               //  console.log(response.data.errors)
            }
      }))
      }
      else{
        axiosClient.post(`/users`,user)
        .then(()=>{
            setNotification("User was created successfully")
           navigate('/users')
        })
        .catch((err=>{
            const response = err.response
            if(response && response.status===422){
                setErrors(response.data.errors)
               //  console.log(response.data.errors)
            }
      }))
      }
   }
  return (
      <>
        {user.id ? <h1>Update User: {user.name}</h1>:<h1>New User</h1>}
         <div className='card animated fadeInDown'>
            {loading &&(<div className='text-center'>
                Loading.....
            </div>)}
                {errors &&
                    <div className="alert">
                      {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                      ))}
                    </div>
                  }
             {
                !loading&& 
                <form onSubmit={onSubmit}>
                    <input placeholder='name' type='text' value={user.name} onChange={ev=>setUser({...user,name:ev.target.value})}/>
                    <input type="email" placeholder='Email'  value={user.email} onChange={ev=>setUser({...user,email:ev.target.value})}/>
                    <input placeholder='Password' type='password' onChange={ev=>setUser({...user,password:ev.target.value})}/>
                    <input type="password" name="" placeholder='confirm password' onChange={ev=>setUser({...user,password_confirmation:ev.target.value})}/>
                    <button type='submit' className='btn'>Submit</button>
                </form>
             }
         </div>
      </>
    )
}

export default UserForm