import React from 'react'
import './Header.css'
import img from '../../Assets/stock_1.jpg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <div className="sub-header">
        <div className="text-div">
          <h4>_DU-FARM</h4>
          <h1>Farm Management System</h1>
          <p>Welcome to DU-FARM, a cutting-edge livestock management system designed to revolutionize the way you oversee and optimize your herd. Whether you're a seasoned rancher or just starting out, our comprehensive platform empowers you to efficiently track, analyze.</p>
          <Link to='/Categories'><button className='but'>Visit livestock</button></Link>
        </div>
        <div className="img-div">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
