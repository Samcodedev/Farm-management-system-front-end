import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Checkin/Login/Login'
import Navication from './ReuseComponent/Navbar/Navbar'
import LandingPage from './LandingPage/LandingPage'
import Register from './Checkin/Register/Register'
import Categories from './Categories/Categories'
import ProductDetails from './ProductDetails/ProductDetails'
import CreateStock from './CreateStock/CreateStock'
import ForgetPassword from './Checkin/FogetPassword/ForgetPassword'
import ResetPassword from './Checkin/ResetPassword/ResetPassword'
import CartPage from './CartPage/CartPage'
import UpdateStock from './UpdateStock/UpdateStock'
import AdminProfile from './AdminProfile/AdminProfile'
import StockDataPage from './StockDataPage/StockDataPage'
import StockProfile from './StockProfile/StockProfile'
import ListStock from './ListStock/ListStock'
import FarmRegister from './Checkin/Admin/FarmRegister'

const Components = () => {
  return (
    <Router>
        <Navication />
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/ForgetPassword' element={<ForgetPassword />} />
            <Route path='/ResetPassword' element={<ResetPassword />} />
            <Route path='/Categories' element={<Categories />} />
            <Route path='/Details' element={<ProductDetails />} />
            <Route path='/CreateStock' element={<CreateStock />} />
            <Route path='/UpdateStock' element={<UpdateStock />} />
            <Route path='/Cart' element={<CartPage />} />
            <Route path='/AdminProfile' element={<AdminProfile />} />
            <Route path='/DataTable' element={<StockDataPage />} />
            <Route path='/StockProfile' element={<StockProfile />} />
            <Route path='/ListStock' element={<ListStock />} />
            <Route path='/1234567890' element={<FarmRegister />} />
        </Routes>
    </Router>
  )
}

export default Components
