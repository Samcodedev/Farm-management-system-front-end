import React, {useEffect} from 'react'
import Header from './Header/Header'
import Stocks from './Stocks/Stocks';
import Service from './Service/Service';

const LandingPage = () => {
  const fix_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1NGEzNzQyZTU2ZmQzNGQ2MDE0MDA4ZSIsIk5hbWUiOiJmZW1pIGFuaWtvbGFwbyIsIkVtYWlsIjoiZmVtaWFuaWtvbGFwb0BnbWFpbC5jb20iLCJQaG9uZSI6IjEyMzQ1Njc4OTAiLCJjcmVhdGVkQVQiOiIyMDIzLTExLTA3VDEzOjEwOjI2LjU3MVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA3VDEzOjEwOjI2LjU3MVoiLCJyb2xlIjoiY2xpZW50In0sImlhdCI6MTY5OTQwNjgyOSwiZXhwIjoxNjk5NDA4NjI5fQ.eNuwDtLY22PEcfsz6M_Aib41C05Ez1e_O16O2HUCfNk'
  
  
  const handleStock = async () =>{
    let result = await fetch(
      "http://localhost:5001/api/stock/",
      {
        method: "get",
        credencials: "include",
        mode: "cors",
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    localStorage.setItem('stocks', JSON.stringify(result))
  }
  
  const handleListedStock = async () =>{
    let result = await fetch(
      "http://localhost:5001/api/sale/",
      {
        method: "get",
        credencials: "include",
        mode: "cors",
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    localStorage.setItem('listedstocks', JSON.stringify(result))
    console.log(result);
  }

  
const weather = async () =>{
  let result = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=ad064c1cf6b14c5aada113203230111&q=nigeria&aqi=yes",
    {
      method: 'get'
    }
  )
  result = await result.json()
  localStorage.setItem('weather', JSON.stringify(result))
  console.log(result);
}


  useEffect(()=>{
    handleListedStock()
    handleStock()
    weather()
    localStorage.setItem('validationToken', fix_token)
  },[])

  return (
    <>
      <Header />
      <Stocks />
      <Service />
    </>
  )
}

export default LandingPage
