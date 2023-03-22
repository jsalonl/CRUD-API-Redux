const ErrorContainer = ({ message, errorDetails }) => {
  console.log(errorDetails)
  return (
    <div className="col-12">
      <div className="alert alert-danger" role="alert">
        { message }
      </div>
    </div>
  )
}

export default ErrorContainer