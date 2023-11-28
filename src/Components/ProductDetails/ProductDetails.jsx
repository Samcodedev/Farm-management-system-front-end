import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import { MdStar, MdStarOutline , MdDone} from 'react-icons/md'
import { TbSquareCheck } from 'react-icons/tb'
import { BsCartPlus } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { BiLoaderAlt } from 'react-icons/bi'
import img from '../Assets/animal-2.jpeg'
import { useLocation } from 'react-router-dom'

import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

const ProductDetails = () => {
    let stockData = useLocation().state
    const {_id, stockBreed, stockPrice } = stockData
    let [message, messageFunc] = useState()
    let [star, starFunc] = useState()
    useEffect(()=>{
        if(stockData.stockReview <= '1'){
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
        else if(stockData.stockReview === '2'){
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
        else if(stockData.stockReview === '3'){
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
        else if(stockData.stockReview === '4'){
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
    
    
    const addCart = async () =>{
        messageFunc('Adding to cart')
        let result = await fetch(
            'https://farm-management-system-jsm2.onrender.com/api/cart/',
            {
                method: "post",
                credencials: "include",
                mode: "cors",
                body: JSON.stringify({
                    productId:_id, 
                    quantity: 1, 
                    name: stockBreed, 
                    price: stockPrice
                }),
                headers: {
                  "content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem('accessToken'),
                },
            }
        )
        result = await result.json()
        if(result.status > 200){
            messageFunc(result.title)
        }
        else if(result.active){
            messageFunc('done')
        }
        console.log(result);
    }


  return (
    <div className='ProductDetails'>
      <div className="sub-ProductDetails">
        <div className="img-div">
            <img src={stockData.stockImage} alt="product" />
        </div>
        <div className="details">
            <div className="top">
                <small>Available <TbSquareCheck fontSize={20} /></small>
                <h2>{stockData.stockBreed}</h2>
                <p>{stockData.userName}</p>
                <div className="star">
                    {star}
                </div>
                <h1>₦{stockData.stockPrice}</h1>
            </div>
            <div className="body">
                <p>{stockData.stockDescription}</p>
                <Accordion defaultActiveKey='0'>
                    <Accordion.Item eventKey='1'>
                        <Accordion.Header>
                            Details
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover variant='light'>
                                <thead>
                                    <tr>
                                        <th>Gender</th>
                                        <th>Weight</th>
                                        <th>Breed</th>
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{stockData.stockGeder}</td>
                                        <td>{stockData.stockWeight}kg</td>
                                        <td>{stockData.stockBreed}</td>
                                        <td>{stockData.stockAge}years</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey='2'>
                        <Accordion.Header>
                            Rating
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover variant='light'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Rating</th>
                                        <th>Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                    <tr>
                                        <td>Ogundigi</td>
                                        <td><MdStar /><MdStar /><MdStar /></td>
                                        <td>This cow is very nice and productive for working</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item> */}
                    <Accordion.Item eventKey='3'>
                        <Accordion.Header>
                            Contact
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover variant='light'>
                                <thead>
                                    <tr>
                                        <th>Marketer</th>
                                        <th>Tel</th>
                                        <th>Mail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{stockData.userName}</td>
                                        <td>{stockData.userPhone}</td>
                                        <td>{stockData.userEmail}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className="bottom">
                <Button variant='danger' style={{display: message === 'Unauthorized'? 'block': 'none'}}>User {message}<RxCross2 /></Button>
                <Button variant='success' style={{display: message === 'done'? 'block' : 'none'}} >DONE <MdDone /></Button>
                <Button variant='success' style={{display: message? 'none' : 'block'}} onClick={addCart}>ADD TO CART <BsCartPlus /></Button>
                <Button variant='secondary' style={{display: message === 'Adding to cart'? 'block' : 'none'}}>ADDING TO CART  <BiLoaderAlt id='loading' /></Button>

            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
