import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useData } from '../Context/ContextProvider';
function Users() {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);
  const {setNotification} = useData()
  useEffect(()=>{
    getUser()
  },[])
  const getUser = ()=>{
    setLoading(true);
    axiosClient.get('/users')
    .then(({data})=>{
         setLoading(false);
         setUsers(data.data)
        console.log("this is data: ",data);
    })
    .catch(()=>{
      setLoading(false);
    })
  }
  const onDelete = (u)=>{
       if(!window.confirm("Are you sure you want to delete this user?")){
            return 
       }
       else{
        axiosClient.delete(`/users/${u.id}`)
        .then(()=>{
            setNotification("User deleted successfully")
          getUser()
        })
       }
  }
  return (
    <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
           <h1>Users</h1>
           <Link to="/users/new" className='btn-add'>Add User</Link>
        </div>
        <div className='fadeInDown card animated'> 
             <table>
                <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Create Date</th>
                      <th>Actions</th>
                    </tr>
                </thead>
                {
                loading?(
                <tbody>
                  <tr>
                    <td colSpan="5" className='text-center'>Loading....</td>
                  </tr>
                </tbody>
):(
                <tbody>
                    {
                 users && users.map((u)=>(
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.created_at}</td>
                          <td>
                              <Link to={'/users/'+u.id} className='btn-edit'>Edit</Link>
                              &nbsp;
                              <button onClick={ev=>onDelete(u)}className='btn-delete'>Delete</button>
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
)}
             </table>
        </div>
    </div>
  )
}

export default Users