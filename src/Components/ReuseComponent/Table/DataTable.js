import React, { useState } from 'react'
import Table from 'react-bootstrap/esm/Table'
// import img from '../../Assets/dummy.png'
import './DataTable.css'
import { Link } from 'react-router-dom'

const DataTable = ({data}) => {
  const [stock, stockFunc] = useState()
  const savedData = localStorage.getItem('stocks')

  setTimeout(() => {
    // const obj = Object.values(Object.keys(data))
    stockFunc(
     (data? data : JSON.parse(savedData)).slice(0)
     .reverse().map((item) =>{
        return(
          <tr>
              <td>
                <Link to='/StockProfile' state={item}>
                    <img src={item.stockImage} alt='product-img' />
                </Link>
              </td>
              <td>{item.stockCategories}</td>
              <td>{item.stockBreed}</td>
              <td>{item.stockGeder}</td>
              <td>{item.stockGroup}</td>
              <td>{item.stockWeight}kg</td>
              <td>{item.stockCurrentLocation}</td>
              <td>{(item.updatedAt).split(':')[0]}</td>
              <td>{item.stockAge}</td>
              <td>{item.stockHealthStatus}</td>
          </tr>
        )
      })
    )
  }, 2000);
  return (
    <Table responsive striped hover>
      <thead>
        <tr>
            <th>Image</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Group</th>
            <th>Weight</th>
            <th>Current Location</th>
            <th>Last Updated</th>
            <th>Age</th>
            <th>Health Status</th>
        </tr>
      </thead>
      <tbody>
        {stock}
      </tbody>
    </Table>
  )
}

export default DataTable
