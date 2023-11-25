import React from 'react'
import './Stocks.css'
import img from '../../Assets/animal-2.jpeg'
import {GiCow, GiHighGrass} from 'react-icons/gi'
import {FaUserDoctor} from 'react-icons/fa6'
import {MdManageAccounts, MdHealthAndSafety} from 'react-icons/md'

const Stocks = () => {
  return (
    <div className='stocks'>
      <div className="sub-stocks">
        <div className="cards">
            <div className="icon">
              <GiCow id='icon' />
            </div>
            <p id='p'>Livestock</p>
        </div>
        <div className="cards">
            <div className="icon">
              <FaUserDoctor id='icon' />
            </div>
            <p id='p'>Veterinarian</p>
        </div>
        <div className="cards">
            <div className="icon">
              <GiHighGrass id='icon' />
            </div>
            <p id='p'>Feeding</p>
        </div>
        <div className="cards">
            <div className="icon">
              <MdManageAccounts id='icon' />
            </div>
            <p id='p'>Management</p>
        </div>
        <div className="cards">
            <div className="icon">
              <MdHealthAndSafety id='icon' />
            </div>
            <p id='p'>Health</p>
        </div>
      </div>
    </div>
  )
}

export default Stocks
