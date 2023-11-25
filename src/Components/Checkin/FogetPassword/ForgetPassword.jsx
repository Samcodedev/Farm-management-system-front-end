import React, { useState } from 'react'
import Data from './Data.json'
import './ForgetPassword.css'
import Input from '../../ReuseComponent/Input'


//bootstrap import
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

const ForgetPassword = () => {
    const [loading, loadinfFunc] = useState(false)
    const [email, emailFunc] = useState('')
    const [alert, alertFunc] = useState(NaN)
    const [pupup, pupupFunc] = useState(false)

    const inputs = Data.map((item) =>{
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
    }

    function loading_function(){
        loadinfFunc(!loading)

        // form validation
        if(!email){
            alertFunc(false)
        }
        else if(email){
            alertFunc(true)
        }

        setTimeout(() => {
            loadinfFunc(false)
            pupupFunc(true)
        }, 5000);
        pupupFunc(false)
    }

  return (
    <div className='ForgetPassword'>
      <form action="">
        <h4>Farm management system</h4>
        {inputs}
        <div className='d-grid gap-2'>
          <Button 
            variant={loading? 'secondary' : 'success'}
            size='lg' 
            onClick={loading_function}
          >
              {loading? 'Loading...': 'Forget Password'}
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
            <p>{alert? 'Request sent successfuly' : 'Unable to send request' } </p>
            <hr />
            <p className='mb-0'>{alert? `A message has been sent to ${email} to reset your password ` : 'Try filing the input field above with the right details'} </p>
          </Alert>
          :
          null
        }
      </form>
    </div>
  )
}

export default ForgetPassword
