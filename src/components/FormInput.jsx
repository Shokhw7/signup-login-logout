import React from 'react'

function FormInput({label, name, type}) {
  return (
    <div>
        <label htmlFor="">{label}</label>
        <br />
        <input type={type} name={name} />
        <hr />
    </div>
  )
}

export default FormInput