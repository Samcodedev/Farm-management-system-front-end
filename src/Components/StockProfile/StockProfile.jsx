import React, { useEffect, useState } from 'react'
import './StockProfile.css'
import img from '../Assets/dummy.png'
// import weader from '../../../public/weather/64x64/day/ii3.png'
// import img2 from '../Assets/weather/64x64/day/'
import farmer from '../Assets/download.jpg'

// import Table from 'react-bootstrap/esm/Table'
import { useLocation, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const StockProfile = () => {
    const data = useLocation().state
    const weatherapi = localStorage.getItem('weather')
    let weather = JSON.parse(weatherapi)
    let token = localStorage.getItem('accessToken')
    let validationToken = localStorage.getItem('validationToken')
    let [user, userFunc] = useState()
    const [show, setShow] = useState(false);

    
    const [stockPrice, stockPriceFunc] = useState()
    const [stockDescription, stockDescriptionFunc] = useState()
    const [stockReview, stockReviewFunc] = useState()
    const [backendResponse, backendResponseFunc] = useState({})
    const [pupUp, pupUpFunc] = useState(false)
    const [farmerImage, farmerImageFunc] = useState()
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };
    //   console.log(parseJwt(token || validationToken));
      if(parseJwt(token).exp * 1000 > Date.now()){
        userFunc(parseJwt(token).user._id)
        console.log('djdjdjjd');
      }
      else{
        userFunc(parseJwt(token).user._id)
      }
    })

    let icon = weather.current.condition.icon
    let weather_icon = icon.split("//cdn.weatherapi.com/")[1]

    let [hours, hoursFunc] = useState()
    let [minutes, minutesFunc] = useState()
    let [seconds, secondsFunc] = useState()
    setInterval(() => {
        let time = new Date()
        hoursFunc(time.getHours())
        minutesFunc(time.getMinutes())
        secondsFunc(time.getSeconds())
    }, 1000);




    const farmerPicture = async (e) =>{
        let result = await fetch(
            `http://localhost:5001/api/picture`,
            {
                method: "get",
                credencials: "include",
                mode: "cors",
                headers: {
                    "content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem('accessToken'),
                },
            }
        )
        result = await result.json()
        farmerImageFunc(result.image)
    }


    useEffect(()=>{
        farmerPicture()
    })



    
    const ListStock = async (e) =>{
        e.preventDefault();
        let result = await fetch(
            `http://localhost:5001/api/sale/${data._id}`,
            {
                method: "post",
                credencials: "include",
                mode: "cors",
                body: JSON.stringify({
                    stockPrice,
                    stockReview,
                    stockDescription
                }),
                headers: {
                  "content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem('accessToken'),
                }
            }
        )
        result = await result.json()
        if(result.success){
            backendResponseFunc(result)
            pupUpFunc(true)
        }
        else{
            backendResponseFunc(result)
            pupUpFunc(true)
        }
    }

    // console.log(data.userId, user);
    // console.log(data.userId, user);

  return (
    <div className='StockProfile'>
        <div className="sub-StockProfile">
            <div className="farmer">
                <div className="details">
                    <div className="img-div">
                        <img src={farmerImage || farmer} alt="farmer" />
                    </div>
                    <div className="text-div">
                        
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}
                        <h4>Farmer: <span>{data.farmerName}</span></h4>
                        <h4>Veterinarian: <span>{data.stockVeterinarian}</span></h4>
                        <Link to='/UpdateStock' style={{display: data.userId === user? 'block' : 'none' }} state={data}><Button style={{color: 'var(--brandcolor-dark)'}}  variant="primary">Update Stock</Button></Link>
                        <Button style={{display: data.userId === user? 'block' : 'none', color: 'var(--brandcolor-dark)' }} onClick={handleShow}>List Stock</Button>
                    </div>
                </div>
                <div className="weather">
                    <div className="content">
                        <h3>{weather.current.condition.text}</h3>
                        <h1>{weather.current.temp_c}°c</h1>
                        <h5>{weather.location.country}</h5>
                        <small>{(weather.location.localtime).split(" ")[0]}, {hours}:{minutes}:{seconds} </small><br />
                    </div>
                    <div className="img-div">
                        <img src={weather_icon} alt='' />
                    </div>
                </div>
            </div>
            <div className="stock">
                <div className="img-div">
                    <img src={data.image || data.stockImage} alt="stock" />
                </div>
                <div className="text-div">
                    <div className="box">
                        <h3>Stock Type</h3>
                        <p>{data.stockCategories}</p>
                    </div>
                    <div className="box">
                        <h3>Stock Breed</h3>
                        <p>{data.stockBreed}</p>
                    </div>
                    <div className="box">
                        <h3>Stock Group</h3>
                        <p>{data.stockGroup}</p>
                    </div>
                    <div className="box">
                        <h3>Stock Age</h3>
                        <p>{data.stockAge}</p>
                    </div>
                    <div className="box">
                        <h3>Stock Health Status</h3>
                        <p>{data.stockHealthStatus}</p>
                    </div>
                    <div className="box">
                        <h3>Stock Weight</h3>
                        <p>{data.stockWeight}kg</p>
                    </div>
                    <div className="box">
                        <h3>Stock Gender</h3>
                        <p>{data.stockGeder}</p>
                    </div>
                    <div className="box">
                        <h3>Stock Current Location</h3>
                        <p>{data.stockCurrentLocation}</p>
                    </div>
                    <div className="box">
                        <h3>Last Veterinarian Check</h3>
                        <p>{data.stockLastVeterinarianCheck}</p>
                    </div>
                    <div className="box">
                        <h3>Last Diagnosis</h3>
                        <p>{data.stockLastDiagnosis}</p>
                    </div>
                    <div className="box">
                        <h3>Verccine Name</h3>
                        <p>{data.stockVerccineName}</p>
                    </div>
                </div>
            </div>

            <>
                <Modal show={show} onHide={handleClose} centered size="lg">
                    <Modal.Header closeButton>
                    <Modal.Title>List stock for sale</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={ListStock}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Listed price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Price in ₦"
                            autoFocus
                            onChange={(e) => stockPriceFunc(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="rating 0 - 5"
                            onChange={(e) => stockReviewFunc(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        onChange={(e) => stockDescriptionFunc(e.target.value)}
                        >
                        <Form.Label>Stock description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" type='submit'>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Form>
                    <Alert style={{display: pupUp? 'block' : 'none'}} variant={backendResponse.success? 'success' : 'warning'}>
                        Stock listed successfully
                        {backendResponse? 'stock listed successfully' : `${backendResponse.message}`}
                    </Alert>
                </Modal.Body>
            </Modal>
            </>
        </div>
    </div>
  )
}

export default StockProfile
