const FormContainer = ({children}) => {
  return (
    <div className="container">
      <div className="row-auto justify-center mt-5">
        <div className="col-auto p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
export default FormContainer