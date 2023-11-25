import React, { useState } from 'react'
import Input from '../../ReuseComponent/Input'
import Data from './Data.json'
import './ResetPassword.css'

//bootstrap import
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

const ResetPassword = () => {
    const [loading, loadinfFunc] = useState(false)
    const [password, passwordFunc] = useState('')
    const [confirmpassword, confirmpasswordFunc] = useState('')
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
        if(indicator === 'password'){
            passwordFunc(data)
        }
        else if(indicator === 'confirmpassword'){
            confirmpasswordFunc(data)
        }
    }

    function loading_function(){
        loadinfFunc(!loading)

        // form validation
        if(!password && !confirmpassword){
            alertFunc(false)
        }
        else if(!password || !confirmpassword){
            alertFunc(false)
        }
        else if(password !== confirmpassword){
            alertFunc(false)
        }
        else if(password === confirmpassword){
            alertFunc(true)
        }

        setTimeout(() => {
            loadinfFunc(false)
            pupupFunc(true)
        }, 5000);
        pupupFunc(false)
    }

  return (
    <div className='ResetPassword'>
      <form action="">
      <h4>Farm management system</h4>
        {inputs}
        <div className='d-grid gap-2'>
          <Button 
            variant={loading? 'secondary' : 'success'}
            size='lg' 
            onClick={loading_function}
          >
              {loading? 'Loading...': 'Reset Password'}
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
            <p>{alert? 'Password reset successfuly' : 'Unable to reset password' } </p>
            <hr />
            <p className='mb-0'>{alert? 'You will be taken to the Login page shortly' : 'Try filing the input field above with the right details'} </p>
          </Alert>
          :
          null
        }
      </form>
    </div>
  )
}

export default ResetPassword
