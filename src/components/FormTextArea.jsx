function FormTextArea({label, name, type}) {
  return (
    <div>
        <label htmlFor="">{label}</label>
        <br />
        <textarea type={type} name={name} />
        <hr />
    </div>
  )
}

export default FormTextArea