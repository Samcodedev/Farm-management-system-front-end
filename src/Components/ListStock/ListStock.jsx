import React, { useState } from 'react'
import data from './data.json'
import Input from '../ReuseComponent/Input'
import './ListStock.css'
import { useLocation } from 'react-router-dom'

//bootstrap import
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import {useNavigate} from 'react-router-dom'

const ListStock = () => {
    const [loading, loadinfFunc] = useState(false)
    const [alert, alertFunc] = useState(NaN)
    const [pupup, pupupFunc] = useState(false)
    const [backendResponse, backendResponseFunc] = useState()

    const [stockPrice, stockPriceFunc] = useState()
    const [stockDescription, stockDescriptionFunc] = useState()
    const [stockReview, stockReviewFunc] = useState()

    const stockId = useLocation()
    const navigate = useNavigate()

    // console.log(stockId);

    const ListStock = async (e) =>{
        e.preventDefault();
        console.log(stockId.state);
        let result = await fetch(
            `http://localhost:5001/api/sale/${stockId.state._id}`,
            {
                method: "post",
                credencials: "include",
                mode: "cors",
                body: JSON.stringify({
                    stockPrice,
                    stockDescription,
                    stockReview
                }),
                headers: {
                  "content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem('accessToken'),
                }
            }
        )
    
        
        result = await result.json()
        if(result){
            backendResponseFunc(result.message)
            alertFunc(false)
        }
        if(result.success){
            backendResponseFunc(result.success)
            alertFunc(true)
            navigate('/Categories')
            // loading stop
            setTimeout(() => {
              loadinfFunc(false)
              pupupFunc(true)
            }, 5000);
            pupupFunc(false)
        }
        console.log(result);
        console.log(backendResponse);
    }


    const inputs = data.map((item)=>{
        return(
            <Col xs={6} md={4}>
              <Input 
                  aria-label={item.area_label}
                  aria-describedby={item.aria_describedby}
                  placeholder={item.placeholder}
                  type={item.type}
                  onChange={(e) => onChangeFunc((item.type === 'file'? URL.createObjectURL(e.target.files[0]) : e.target.value), item.onChange)}
              />
            </Col>
        )
    })

    function onChangeFunc(data, indicator){

        if(indicator === 'discription'){
            stockDescriptionFunc(data)
        }
        else if(indicator === 'price'){
            stockPriceFunc(data)
        }
        else if(indicator === 'rating'){
            stockReviewFunc(data)
        }
    }

    function loading_function(){
        loadinfFunc(!loading)

        // form validation
        if(!stockPrice && !stockDescription && !stockReview){
            alertFunc(false)
        }
        if(!stockPrice || !stockDescription || !stockReview){
            alertFunc(false)
        }
        if(stockPrice < 50){
            alertFunc(false)
        }
        if(stockPrice && stockDescription && stockReview){
            alertFunc(true)
        }
    }

  return (
    <div className='list-stock'>
        <div className="sub-list-stock">
        <form action="" className='g-col-2' onSubmit={ListStock} >
            <h4>List stock</h4>
            <Row>
                {inputs}
            </Row>
            <div className='d-grid gap-2'>
                <Button 
                variant={loading? 'secondary' : 'success'}
                size='lg' 
                onClick={loading_function}
                type='submit'
                >
                    {loading? 'Loading...': 'Create Stock'}
                </Button>
            </div>
            {
                pupup?
                <Alert 
                variant={alert? 'success' : 'warning'}
                className='warning'
                dismissible
                >
                <Alert.Heading>{alert? 'Congratulation' : 'OOh! Sorry'}</Alert.Heading>
                <p> </p>
                <hr />
                <p className='mb-0'>{alert? `${backendResponse.stockBreed} stock listed for sale` : 'Try filing all the input field above with the right details'} </p>
                </Alert>
                :
                null
            }
        </form>
        </div>
    </div>
  )
}

export default ListStock
