import React, { useState, useEffect } from 'react'
import './ProductCards.css'
import img from '../../Assets/animal-2.jpeg'
import { 
  MdReadMore,
  MdStarOutline,
  MdStar
 } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

const ProductCards = ({data,stockBreed,stockPrice,stockDescription,stockReview, stockImage}) => {
  
  let [star, starFunc] = useState()
  useEffect(()=>{
      if(stockReview <= '1'){
          starFunc(
              <>
                  <MdStar />
                  <MdStarOutline />
                  <MdStarOutline />
                  <MdStarOutline />
                  <MdStarOutline />
              </>
          )
      }
      else if(stockReview === '2'){
          starFunc(
              <>
                  <MdStar />
                  <MdStar />
                  <MdStarOutline />
                  <MdStarOutline />
                  <MdStarOutline />
              </>
          )
      }
      else if(stockReview === '3'){
          starFunc(
              <>
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStarOutline />
                  <MdStarOutline />
              </>
          )
      }
      else if(stockReview === '4'){
          starFunc(
              <>
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStarOutline />
              </>
          )
      }
      else{
          starFunc(
              <>
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStar />
              </>
          )
      }
  }, [])
  
  
  return (
    <div className='ProductCards my-slide'>
        <div className='img-div'>
          <img src={stockImage || img} alt='product'  id='product'/>
        </div>
        <div className='details'>
            <h5>{stockBreed}</h5>
            <div className='star'>
              {star}
            </div>
            <p>{((stockDescription.split(' ')).slice(0, 10)).map((item)=> {return item + ' '})}...</p>
            <h4>₦{stockPrice} <s>₦{stockPrice+.99}</s></h4>
            <Link to='/Details' state={data}><Button variant='success'>Details <MdReadMore /> </Button></Link>
        </div>
    </div>
  )
}

export default ProductCards
