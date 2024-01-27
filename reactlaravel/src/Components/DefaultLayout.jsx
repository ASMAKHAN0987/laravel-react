import { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useData } from '../Context/ContextProvider'
import axiosClient from '../axios-client';
function DefaultLayout() {
   const {user,token,setUser,setToken,notification} = useData();
     if(!token){
        return <Navigate to="/login"/>
     }
     useEffect(()=>{
      axiosClient.get('/user').then(({data})=>{
         setUser(data)
      })
   },[])
     const logout = (e)=>{
      e.preventDefault();
      console.log("clicked");
      axiosClient.post('/logout').then(()=>{
         setUser({})
         setToken(null)
      })
   }
   return (
      <div id="defaultLayout">
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
        <div className='content'>
             <header>
                 <div>
                    Header
                 </div>
                 <div>
                    {user.name}
                    <a className='btn-logout' href='#' onClick={logout}>Logout</a>
                 </div>
             </header>
             <main>
                <Outlet/>
             </main>
        
        </div>
         {
            notification&&(
               <div className='notification'>{notification}</div>
            )
         }
      </div>
      
  )
}

export default DefaultLayout