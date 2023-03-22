import { useState } from "react"
import { Link } from "react-router-dom"
import ErrorContainer from "../../components/ErrorContainer"
import LoadingContainer from "../../components/LoadingContainer"
import { useDeleteUserMutation, useGetUsersQuery } from "../../store/apis/userApi"

const UserIndex = () => {

  const { data, isLoading, isError, error } = useGetUsersQuery()
  
  const [ deleteUser ]  = useDeleteUserMutation()

  const [isLoadingButton, setLoadingButton] = useState(false)
  
  const handleDelete = async (id) => {
    setLoadingButton(true)
    await deleteUser(id).unwrap()
    setLoadingButton(false)
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center my-3">Usuarios</h1>
        <div className="col-md-12">
          <div className="d-grid gap-2 mb-3">
            <Link variant="success" className="btn btn-primary" to="/users/add">
              Agregar Usuario
            </Link>
          </div>
        </div>
        {
          isLoading && <LoadingContainer />
        }
        {
          isError && <ErrorContainer message="Ocurrio un error al listar los usuarios" errorDetails={error} />
        }
        {
          data && data.items.length > 0 && data.items.map((user) => (
              <div key={user._uuid} className="col-md-3 mb-3">
                <div className="card">
                  <img className="card-img-top" src={user.imagen} alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{user.nombres} {user.apellidos}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Correo: {user.correo}</li>
                    <li className="list-group-item">Celular: {user.celular}</li>
                    <li className="list-group-item">Género: {user.genero}</li>
                    <li className="list-group-item">Edad: {user.edad}</li>
                  </ul>
                  <div className="card-body">
                    <div className="d-flex justify-content-center gap-2">
                      <Link className="btn btn-info" to={`/users/${user._uuid}`}>Detalles</Link>
                      <button 
                        className="btn btn-danger"
                        disabled={isLoadingButton} 
                        onClick={() => handleDelete(user._uuid)} >
                          { isLoadingButton 
                            ? <>
                              <span 
                                className="spinner-border spinner-border-sm" 
                                role="status" 
                                aria-hidden="true"></span> 
                                <span className="visually-hidden">Loading...</span>
                              </> 
                            : "Eliminar"
                          }
                        </button>
                    </div>
                  </div>
                </div>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default UserIndex