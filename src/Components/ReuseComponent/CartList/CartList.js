import React, { useEffect, useState } from 'react'
import './CartList.css'

import {MdOutlineDeleteForever, MdShoppingCartCheckout} from 'react-icons/md'
import {RxUpdate} from 'react-icons/rx'
//bootstrap import
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/esm/Table'
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const CartList = () => {
    let [productId, productIdFunc] = useState()
    let [quantity, quantityFunc] = useState()
    let [name, nameFunc] = useState()
    let [price, priceFunc] = useState()
    let [backendResponse, backendResponseFunc] = useState(0)
    const [CartAvailable, CartAvailableFunc] = useState(0)
    let [totalAmount, totalAmountFunc] = useState(0)
    const [alertShow, alertSetShow] = useState(null)
    let [alertMessage, alertMessageFunc] = useState(false)

    
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const cart = async () =>{
        let result = await fetch(
            'https://farm-management-system-jsm2.onrender.com/api/cart/',
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
          CartAvailableFunc(result.products)
        result.products.map((item)=>{
            totalAmountFunc(totalAmount + item.price)
        })
        backendResponseFunc( (result.products || null).map((item, index) =>{
            return(
                <tr>
                    <td>
                        <div className='flex'>
                            {/* <img src={img} alt='product-img' /> */}
                            <div className='details'>
                                <h4>{item.name}</h4>
                                <h5>{index}</h5>
                            </div>
                        </div>
                    </td>
                    <td>
                        <input type='number' placeholder={item.quantity} onChange={(e) => update((e.target.value), index)} />
                    </td>
                    <td><p>₦{item.price}</p></td>
                    <td><p>₦{item.price * item.quantity}</p></td>
                    <td>
                        <Button variant="danger" onClick={delCart}>remove <MdOutlineDeleteForever fontSize={23} /> </Button><br/>
                        <Button variant="warning" onClick={addCart}>update <RxUpdate fontSize={23} /> </Button>
                    </td>
                </tr>
            )
        })
        )
// 7b4313119ad3
        
        function update(data, index){
            quantityFunc(data)

            // if(data === 0){
            //     delCart()
            // }
             
            productIdFunc(result.products[index].productId)
            nameFunc(result.products[index].name)
            priceFunc(result.products[index].price)
        }
    }

    const addCart = async () =>{
        let result = await fetch(
            'https://farm-management-system-jsm2.onrender.com/api/cart/',
            {
                method: "post",
                credencials: "include",
                mode: "cors",
                body: JSON.stringify({
                    productId, 
                    quantity, 
                    name, 
                    price
                }),
                headers: {
                  "content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem('accessToken'),
                },
            }
        )
        result = await result.json()
        console.log(result);
        alertSetShow(true)
        alertMessageFunc(true)
        cart()
    }

    const delCart = async () =>{
        let result = await fetch(
            'https://farm-management-system-jsm2.onrender.com/api/cart/',
            {
                method: "delete",
                credencials: "include",
                mode: "cors",
                body: JSON.stringify({
                    productId
                }),
                headers: {
                  "content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem('accessToken'),
                },
            }
        )
        result = await result.json()
        console.log(result);
        alertSetShow(false)
        alertMessageFunc(true)
        cart()
    }
    
    // function del(data, index){
    //     quantityFunc(data)
    //     if(data === 0){
    //         delCart()
    //     }
    //     productIdFunc(CartAvailable[index].productId)
    // }

    useEffect(()=>{
        cart()
    })


  return (
    <div className='CartList'>
        <div className="head">
            <h3>Product Cart</h3>
            <h3>{CartAvailable.length} Item{CartAvailable <= 1 ? '' : 's'}</h3>
            <Button variant="success" onClick={handleShow}>Check Out <MdShoppingCartCheckout fontSize={23} /> </Button>
        </div>
        <Table>
            <thead>
                <tr>
                    <th>Product details</th>
                    <th>Quality</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {backendResponse === null? 'nothing in your cart' : backendResponse}
            </tbody>
        </Table>
        <Alert style={{display: alertMessage? 'block' : 'none'}} variant='success' onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Hello </Alert.Heading>
            <p>
            {alertShow? 'stock quality as been updated successfully' : 'stock as been successfully deleted from cart'}
            </p>
        </Alert>


        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Payment Check Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Total lists: {(CartAvailable || [1,2]).map((item) => {return  <small>₦{item.price * item.quantity}, </small>})}  <br />
                click "MAKE PAYMENT" to proceed.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <a href='https://sandbox-flw-web-v3.herokuapp.com/pay/e8iuzkfgn9qx'><Button variant="primary">Make payment</Button></a>
            
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default CartList
