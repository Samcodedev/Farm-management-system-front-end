import React, {useState} from 'react'
import CartList from '../ReuseComponent/CartList/CartList'
import Data from './Data.json'
import './CartPage.css'
import Input from '../ReuseComponent/Input'

const CartPage = () => {
  const [loading, loadinfFunc] = useState(false)

  const inputs = Data.map((item) =>{
    return(
      <Input 
        aria-label={item.area_label}
        aria-describedby={item.aria_describedby}
        placeholder={item.placeholder}
        type={item.type}
      />
    )
  })

  function loading_function(){
    loadinfFunc(!loading)
    // loading stop
    setTimeout(() => {
      loadinfFunc(false)
    }, 5000);
  }

  return (
    <div className='CartPage'>
      <div className="sub-CartPage">
        <div className="cart">
          <div className="body">
            <CartList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
