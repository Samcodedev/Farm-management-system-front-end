import React, { useState, useEffect , useRef } from 'react'
import './AdminProfile.css'
import img from '../Assets/Farmer.jpg'
import { MdAddChart } from 'react-icons/md'
import { BsListCheck } from 'react-icons/bs'
import { RiLineChartLine } from 'react-icons/ri'
import { MdPlaylistRemove, MdOutlineFileUpload } from 'react-icons/md'
import Axios from 'axios'

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
let [Name, NameFunc] = useState()
let [Email, EmailFunc] = useState()
let [Phone, PhoneFunc] = useState()
let [Role, RoleFunc] = useState({})
let [ids, idFunc] = useState()
const [stockCreated, stockCreatedFunc] = useState()
const [stockListed, stockListedFunc] = useState()
const [createdStock, createdStockFunc] = useState()
const [cart, cartFunc] = useState()
let getToken = localStorage.getItem('accessToken')
let [addQuality, addQualityFunc] = useState(0)
let [addPrice, addPriceFunc] = useState(0)
let [display, displayFunc] = useState()
const [postImage, setPostImage] = useState('')
const inputRef = useRef(null);
let [getInput, getInputFunc] = useState(true)

const profilePicture = async () =>{
  let result = await fetch(
    'http://localhost:5001/api/picture/',
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
  displayFunc(result.image)
  console.log(result);
}

const handleProfile = async () =>{

  function add(quantityData){
    let quantitySum = 0
    let priceSum = 0
    for(let i=0; i<quantityData.length; i++){
      quantitySum += quantityData[i].quantity
      priceSum += quantityData[i].price
      // console.log(sum);
    }
    addQualityFunc(quantitySum);
    addPriceFunc(priceSum)
  }


  if(getToken){
    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };
    //   console.log(parseJwt(token || validationToken));
    if(parseJwt(getToken).user.role === 'farmer'){
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
      let {Name, Email, Phone, stockCreated, listedStock, _id } = result
      NameFunc(Name)
      idFunc(_id)
      EmailFunc(Email)
      PhoneFunc(Phone)
      RoleFunc(result)
      if(stockCreated){
        stockCreatedFunc(stockCreated.totalStock)
        createdStockFunc(stockCreated.stocksId)
      }
      if(listedStock){
        stockListedFunc(listedStock.totalListedStock)
      }
      
      console.log(result)
      profilePicture()
    }
    else if(parseJwt(getToken).user.role === 'client'){
      console.log('working');
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
      console.log(result);
      let {Name, Email, Phone, cart, image } = result
      // quantityFunc(cart.cart.products)
      NameFunc(Name)
      EmailFunc(Email)
      PhoneFunc(Phone)
      RoleFunc(result)
      if(cart.cart){
        cartFunc(cart.cart.products.length)
        add(cart.cart.products)
      }
      profilePicture()
    }
  }

  }

  

  const compressImage = () => {
    const input = inputRef.current;
    const originalImage = document.getElementById('originalImage');
    const compressedImage = document.getElementById('compressedImage');

    const file = input.files[0];

    if (file) {
      getInputFunc(false)
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set the canvas size to the image size
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Get the compressed image as a data URL
          const compressedDataURL = canvas.toDataURL('image/jpeg', 0.02); // Adjust quality as needed

          // Display the original and compressed images
          originalImage.src = e.target.result;
          compressedImage.src = compressedDataURL;
          setPostImage(compressedDataURL)
          console.log(compressedDataURL);
        };
      };

      reader.readAsDataURL(file);
    }
  };






  const upload = async (e) =>{
    e.preventDefault();
    let result = await fetch(
      `http://localhost:5001/api/picture/${Role._id}`,
      {
        method: "post",
        credencials: "include",
        mode: "cors",
        body: JSON.stringify({ image: postImage}),
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem('accessToken'),
        },
      }
    );
    result = await result.json();
    console.log(result);
    displayFunc(result.image)
    handleProfile()
    getInputFunc(true)
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
              <h5>{Role.role}</h5>
              <form 
                onSubmit={upload}
              >
                <label for="images" class="drop-container" id="dropcontainer" style={{display: getInput? 'block' : 'none'}}>
                  <input 
                    type="file" 
                    id="images" 
                    accept="image/*" 
                    ref={inputRef} 
                    onChange={compressImage}
                    required 
                  />
                </label>
                <button style={{display: getInput? 'none' : 'block'}} type='submit'>Upload Image <MdOutlineFileUpload fontSize={25} /></button>
              </form>
            </div>
            <div className="img-div">
              <img src={display} alt="" />
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
                <p>{stockCreated? 'Stock Created' : 'Total Cart'}</p>
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
                <h5>{stockListed || addQuality}</h5>
                <p>{stockListed? 'Stock Listed' : 'Total Stocks'}</p>
              </div>
            </Col>
            <Col className="cards" onClick={()=> chartActiveFunc(2)}
              style={{
                backgroundColor: chartActive === 2? '#6bbb96' : 'var(--subBrand)'
              }}>
              <div className="icon">
                {
                  addPrice?
                  <RiLineChartLine />
                  :
                  <MdPlaylistRemove />
                }
              </div>
              <div className="text">
                <h5>{addPrice? `₦${addPrice * addQuality}` : stockCreated - stockListed}</h5>
                <p>{addPrice? 'Total Cost' : 'Unlisted Stock'}</p>
              </div>
            </Col>
          </Row>
          <div className="table" style={{display: stockCreated? 'block' : 'none' }}>
            <DataTable 
              data={createdStock}
            />
          </div>
        </div>
        
        <div>
          {/* <input type="file" accept="image/*" ref={inputRef} onChange={compressImage} />
          <br /> */}
          <img id="originalImage" alt="Original Image" style={{ display: 'none' }} />
          <br />
          <img id="compressedImage" alt="Compressed Image" style={{ display: 'none' }} />
        </div>
        <div className="chat">
          <LineCharts 
            listed={stockListed}
            create={stockCreated}
            unlisted={stockCreated - stockListed}

            cart={cart}
            addQuality={addQuality}
          /> 
              
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
