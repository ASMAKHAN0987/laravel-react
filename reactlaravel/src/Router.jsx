// import React from 'react'
import { createBrowserRouter, createRoutesFromElements,Navigate,Route } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Users from './Pages/Users'
import NotFound from './Pages/NotFound'
import DefaultLayout from './Components/DefaultLayout'
import GuestLayout from './Components/GuestLayout'
import Dashboard from './Pages/Dashboard'
import UserForm from './Pages/UserForm'
const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={<DefaultLayout/>}>
         <Route path='' element={<Navigate to="/users"/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/users/new' element={<UserForm key="userCreate"/>}/>
        <Route path='/users/:id' element={<UserForm key="userUpdate"/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route path='/' element={<GuestLayout/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
    </Route>
))

export default router