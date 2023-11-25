import React, { useEffect, useState } from 'react'
import './CategoriesTop.css'
import RoundedNav from '../../ReuseComponent/RoundedNav/RoundedNav'

const CategoriesTop = ({data}) => {
  return (
    <div className='CategoriesTop'>
      <RoundedNav 
        lists={data}
      />
    </div>
  )
}

export default CategoriesTop
