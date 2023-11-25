import React, { useEffect, useState } from 'react'
import DataTable from '../ReuseComponent/Table/DataTable'
import RoundedNav from '../ReuseComponent/RoundedNav/RoundedNav'
import './StockDataPage.css'

const StockDataPage = () => {
  // const lists = ['Cattle', 'Buffaloes', 'Sheep', 'Goats', 'Pigs', 'Chickens', 'Fish']
  let [lists, listsFunc] = useState()

  const [backendResponse, backendResponseFunc] = useState()
  let [display, displayFunc] = useState()

  const profilePicture = async () =>{
    let result = await fetch(
      `http://localhost:5001/api/picture/`,
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

  const handleRegister = async () =>{
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
    backendResponseFunc(result)
    let getCategories = []
    result.map((item)=>{
      if(!(getCategories.includes(item.stockCategories))){
        getCategories.push(item.stockCategories)
      }
    })
    listsFunc(getCategories)
      console.log(getCategories);
    console.log(result)
  }

  useEffect(()=>{
    handleRegister()
    profilePicture()
  },[])

  return (
    <div className='StockDataPage'>
      <div className="sub-StockDataPage">
        <div className="top">
          <RoundedNav 
            lists={lists}
          />
        </div>
        <div className="body">
          <DataTable 
            data={backendResponse}
          />
        </div>
      </div>
    </div>
  )
}

export default StockDataPage
