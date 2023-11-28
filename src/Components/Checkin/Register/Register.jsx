import React from 'react'
import './Register.css'
import {Link, useNavigate} from 'react-router-dom'
import Data from './Data.json'
import Input from '../../ReuseComponent/Input';
import { useState } from 'react';

//bootstrap import
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

const Register = () => {
    const [loading, loadinfFunc] = useState(false)
    
    const [name, nameFunc] = useState('')
    const [email, emailFunc] = useState('')
    const [phone, phoneFunc] = useState('')
    const [password, passwordFunc] = useState('')
    const [confirmpassword, confirmpasswordFunc] = useState('')

    const [alert, alertFunc] = useState(NaN)
    const [pupup, pupupFunc] = useState(false)
    const [backendResponse, backendResponseFunc] = useState()
    
    const navigate = useNavigate()

    const handleRegister = async (e) =>{
      e.preventDefault();
      let result = await fetch(
        "https://farm-management-system-jsm2.onrender.com/api/client/register",
        {
          method: "post",
          credencials: "include",
          mode: "cors",
          body: JSON.stringify({ name, email, phone, password }),
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      if(result.message){
        backendResponseFunc(result.message)
        alertFunc(false)
      }
      else if(result.Email){
        backendResponseFunc(result)
        setTimeout(() => {
          navigate('/Login')
        }, 5000);
      }
      if(result){
        // loading stop
        setTimeout(() => {
          loadinfFunc(false)
          pupupFunc(true)

        }, 5000);
        pupupFunc(false)
      }
      console.log(result)
    }
    const inputs = Data.map((item)=>{
      return(
        <Input 
          aria-label={item.area_label}
          aria-describedby={item.aria_describedby}
          placeholder={item.placeholder}
          type={item.type}
          onChange={(e) => onChangeFunc((e.target.value), item.onChange)}
        />
      )
    })
  
    
    function onChangeFunc(data, indicator){
      if(indicator === 'fullname'){
        nameFunc(data)
      }
      else if(indicator === 'email'){
        emailFunc(data)
      }
      else if(indicator === 'phone'){
        phoneFunc(data)
      }
      else if(indicator === 'password'){
        passwordFunc(data)
      }
      else if(indicator === 'confirmpassword'){
        confirmpasswordFunc(data)
      }
    }
  
    function loading_function(){
      loadinfFunc(!loading)
  
      // form validation
      if(!name && !password && !email && !phone && !password && !confirmpassword){
        alertFunc(false)
      }
      else if(!name || !password || !email || !phone || !password || !confirmpassword){
        alertFunc(false)
      }
      else if(name && password && email && phone && password && confirmpassword){
        alertFunc(true)
      }
    }

  return (
    <div className='Check'>
      <form action='' onSubmit={handleRegister} >
        <h4>Farm management system</h4>
        {inputs}
        <div className='d-grid gap-2'>
        <Button 
            variant={loading? 'secondary' : 'success'}
            size='lg' 
            onClick={loading_function}
            type='submit'
          >
              {loading? 'Loading...': 'Register'}
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
            <p>{alert? `Welcome to the Farm management system` : `${backendResponse}` } </p>
            <hr />
            <p className='mb-0'>{alert? 'You will be taken to your profile page shortly' : 'Try filing all the input field above with the correct details'} </p>
          </Alert>
          :
          null
        }
        <small>Already have an account? <Link to='/Login'><u style={{color: 'red'}}>Login</u></Link></small>
      </form>
    </div>
  )
}

export default Register
