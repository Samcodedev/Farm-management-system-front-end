import React from 'react'
import Form from 'react-bootstrap/Form'

const Select = ({sale, onChange}) => {
    const opt = sale.map((item) =>{
        return(
            <option value={item}>{item}</option>
        )
    })
    console.log(onChange);
  return (
    <Form.Select
        onChange={onChange}
    >
        {opt}
    </Form.Select>
  )
}

export default Select
