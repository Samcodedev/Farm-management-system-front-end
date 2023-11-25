import React from 'react'
import './RoundedNav.css'
import { Link } from 'react-router-dom'

const RoundedNav = ({lists}) => {
    const list = (lists || ['loading', 'loading', 'loading']).map((item) => {
        return(
            <Link><li>{item}</li></Link>
        )
    })
  return (
    <div className='RoundedNav'>
      {list}
    </div>
  )
}

export default RoundedNav
