import React from 'react'
import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import Data from './Data.json'
import Input from '../../ReuseComponent/Input';
import { useState } from 'react';

//bootstrap import
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

const Login = () => {
  const [loading, loadinfFunc] = useState(false)
  const [email, emailFunc] = useState('')
  const [password, passwordFunc] = useState('')
  const [alert, alertFunc] = useState(NaN)
  const [pupup, pupupFunc] = useState(false)
  const [backendResponse, backendResponseFunc] = useState()
  const [users, userFunc] = useState()
  const [login, loginFunc] = useState(null)

  const navigate = useNavigate()


  function clickAdmin(){
    loginFunc('admin')
    console.log(login);
  }

  function clickClient(){
    loginFunc('client')
      console.log(login);
  }

  const handleRegister = async (e) =>{
    e.preventDefault();
    let result = await fetch(
      `http://localhost:5001/api/${login}/login`,
      {
        method: "post",
        credencials: "include",
        mode: "cors",
        body: JSON.stringify({ email, password }),
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
    else if(result.accessToken){
      localStorage.setItem('accessToken', result.accessToken)
      localStorage.setItem('validationToken', result.accessToken)

      const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
      };
      if(parseJwt(result.accessToken).user.role === 'admin'){
        userFunc('admin')
      }
      else if(parseJwt(result.accessToken).user.role === 'client'){
        userFunc('client')
      }
        navigate('/AdminProfile', {state: {users, login}})

      }
    if(result){
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
    if(indicator === 'email'){
      emailFunc(data)
    }
    else if(indicator === 'password'){
      passwordFunc(data)
    }
  }

  function loading_function(){
    loadinfFunc(!loading)

    // form validation
    if(!email && !password){
      alertFunc(false)
    }
    else if(!email || !password){
      alertFunc(false)
    }
    else if(email && password){
      alertFunc(true)
    }
  }

  return (
    <div className='Check'>
      <form action='' onSubmit={handleRegister}>
        <h4>Farm management system</h4>
        <div className="user">
          <Button 
          onClick={clickAdmin}
          >Login as Admin</Button>
          <Button 
          onClick={clickClient}
          >Login as User</Button>
        </div>
        {inputs}
        <Link to='/ForgetPassword'>Forget Password</Link>
        <div className='d-grid gap-2'>
          <Button 
            variant={loading? 'secondary' : 'success'}
            size='lg' 
            onClick={loading_function}
            type='submit'
            style={{display: login === null? 'none' : 'block'}}
          >
              {loading? 'Loading...': 'Login'}
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
            <p>{alert? `Welcome to the Farm management system ` : `${backendResponse}` } </p>
            <hr />
            <p className='mb-0'>{alert? 'You will be taken to your profile page shortly' : 'Try filing all the input field above with the right details'} </p>
          </Alert>
          :
          null
        }
        <small>Don't have an account? <Link to='/Register'><u style={{color: 'red'}}>Register</u></Link></small>
      </form>
    </div>
  )
}

export default Login
