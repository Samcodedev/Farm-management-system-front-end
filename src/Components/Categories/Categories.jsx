import React, { useEffect, useState } from 'react'
import CategoriesTop from './Categories-top/CategoriesTop'
import CategoriesList from './Categories-list/CategoriesList'

const Categories = () => {
  const [backendResponse, backendResponseFunc] = useState()
  let [lists, listsFunc] = useState()

  const handleRegister = async () =>{
    let result = await fetch(
      "https://farm-management-system-jsm2.onrender.com/api/sale/",
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
    // console.log(backendResponse);
  },[])

  return (
    <div className='categories'>
      <CategoriesTop 
        data={lists}
      />
      <CategoriesList 
        data={backendResponse}
      />
    </div>
  )
}

export default Categories
