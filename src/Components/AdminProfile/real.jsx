import React, { useState, useEffect } from 'react'
import './AdminProfile.css'
import img from '../Assets/Farmer.jpg'
import { MdAddChart } from 'react-icons/md'
import { BsListCheck } from 'react-icons/bs'
import { RiLineChartLine } from 'react-icons/ri'
import { MdPlaylistRemove } from 'react-icons/md'

import { useLocation } from 'react-router-dom'

// import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import PieChartShaped from '../ReuseComponent/Charts/PieChartShaped'
import LineCharts from '../ReuseComponent/Charts/LineCharts'
import Table from 'react-bootstrap/esm/Table'
import DataTable from '../ReuseComponent/Table/DataTable'

const AdminProfile = () => {

  const data = useLocation()

const [chartActive, chartActiveFunc] = useState(0)
const [Name, NameFunc] = useState()
const [Email, EmailFunc] = useState()
const [Phone, PhoneFunc] = useState()
const [Role, RoleFunc] = useState()
const [stockCreated, stockCreatedFunc] = useState()
const [stockListed, stockListedFunc] = useState()
const [createdStock, createdStockFunc] = useState()
const [cart, cartFunc] = useState()
let getToken = localStorage.getItem('accessToken')

const handleProfile = async () =>{
  if(getToken){
    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };
    //   console.log(parseJwt(token || validationToken));
    if(parseJwt(getToken).user.role === 'admin'){
      let result = await fetch(
        `http://localhost:5001/api/admin/`,
        {
          method: "get",
          credencials: "include",
          mode: "cors",
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
          },
        }
      );
      result = await result.json();
      let {Name, Email, Phone, role, stockCreated, listedStock } = result
      NameFunc(Name)
      EmailFunc(Email)
      PhoneFunc(Phone)
      RoleFunc(role)
      stockCreatedFunc(stockCreated.totalStock)
      stockListedFunc(listedStock.totalListedStock)
      createdStockFunc(stockCreated.stocksId)
    
      console.log(result)
    }
    else if(parseJwt(getToken).user.role === 'client'){
      let result = await fetch(
        `http://localhost:5001/api/client/`,
        {
          method: "get",
          credencials: "include",
          mode: "cors",
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
          },
        }
      );
      result = await result.json();
      let {Name, Email, Phone, role, cart } = result
      NameFunc(Name)
      EmailFunc(Email)
      PhoneFunc(Phone)
      RoleFunc(role)
      cartFunc(cart.cart.products.length)
      // console.log();
      console.log(result)
    }

  }

}

useEffect(()=>{
  handleProfile()
}, [])

  return (
    <div className='AdminProfile'>
      <div className="sub-AdminProfile">
        <div className="details">
          <div className="profile">
            <div className="content">
              <h2>{Name}</h2>
              <h5>{Email}</h5>
              <h5>{Phone}</h5>
              <h5>{Role}</h5>
            </div>
            <div className="img-div">
              <img src={img} alt="" />
            </div>
          </div>
          <Row className="container">
            <Col className="cards" onClick={()=> chartActiveFunc(0)} 
              style={{
                backgroundColor: chartActive === 0? '#6bbb96' : 'var(--subBrand)'
              }}>
              <div className="icon">
                <MdAddChart />
              </div>
              <div className="text">
                <h5>{stockCreated || cart}</h5>
                <p>{stockCreated? 'Stock created' : 'Total cart'}</p>
              </div>
            </Col>
            <Col className="cards" onClick={()=> chartActiveFunc(1)}
              style={{
                backgroundColor: chartActive === 1? '#6bbb96' : 'var(--subBrand)'
              }}>
              <div className="icon">
                <BsListCheck />
              </div>
              <div className="text">
                <h5>{stockListed}</h5>
                <p>Stock listed</p>
              </div>
            </Col>
            <Col className="cards" onClick={()=> chartActiveFunc(2)}
              style={{
                backgroundColor: chartActive === 2? '#6bbb96' : 'var(--subBrand)'
              }}>
              <div className="icon">
                <RiLineChartLine />
              </div>
              <div className="text">
                <h5>8</h5>
                <p>Stock sold</p>
              </div>
            </Col>
            <Col className="cards" onClick={()=> chartActiveFunc(3)}
              style={{
                backgroundColor: chartActive === 3? '#6bbb96' : 'var(--subBrand)'
              }}>
              <div className="icon">
                <MdPlaylistRemove />
              </div>
              <div className="text">
                <h5>5</h5>
                <p>Stock motality</p>
              </div>
            </Col>
          </Row>
          <DataTable 
            data={createdStock}
          />
        </div>
        <div className="chat">
              <LineCharts />
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
