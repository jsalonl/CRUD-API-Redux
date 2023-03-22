import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetUserByIdQuery, useSaveUserMutation, useUpdateUserMutation } from "../../store/apis/userApi"

const UserForm = () => {

  const initialState = {
    "nombres": "",
    "apellidos": "",
    "edad": "",
    "genero": "",
    "correo": "",
    "celular": "",
    "imagen": "",
    "infoIdentificacion": {
      "tipoId": "CC",
      "numeroId": "",
      "fechaExpedicion": ""
    },
    "infoLaboral": {
      "razonSocial": "",
      "nit": "",
      "programa": "",
      "cargo": ""
    }
  }

  
  const [user, setUser] = useState(initialState)
  const [ saveUser ] = useSaveUserMutation()
  const [ updateUser ] = useUpdateUserMutation()
  const [isLoadingButton, setLoadingButton] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const getUserQuery = useGetUserByIdQuery(params.id)

  useEffect(() => {
    if(params.id && getUserQuery.data){
      setUser(getUserQuery.data)
    }
  }, [params, getUserQuery.data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user.nombres.trim() || !user.apellidos.trim()) {
      return console.log("Todos los campos son obligatorios")
    }
    setLoadingButton(true)
    if(params.id){
      const payload = {...user, id: params.id}
      await updateUser(payload).unwrap()
    }else{
      const payload = [user]
      await saveUser(payload).unwrap()
    }
    setLoadingButton(false)
    return navigate("/users")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "nombres" || name === "apellidos" || name === "edad" || name === "genero" || name === "correo" || name === "celular" || name === "imagen") {
      setUser({
        ...user,
        imagen: `https://robohash.org/${user.nombres}-${user.apellidos}.png`,
        [name]: value
      })
    }
    if (name === "tipoId" || name === "fechaExpedicion" || name === "numeroId") {
      setUser({
        ...user,
        infoIdentificacion: {
          ...user.infoIdentificacion,
          [name]: value
        }
      })
    }
    if (name === "razonSocial" || name === "nit" || name === "programa" || name === "cargo") {
      setUser({
        ...user,
        infoLaboral: {
          ...user.infoLaboral,
          [name]: value
        }
      })
    }
  }

  return (
    <div className="col-md-12">
      <form onSubmit={handleSubmit} className="row g-2 mt-3">
        <h3>Datos personales</h3>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="text"
            className="form-control"
            name="nombres"
            onChange={handleChange}
            value={user.nombres}
            placeholder="Nombres" />
          <label htmlFor="nombres">Nombres</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="text"
            className="form-control"
            name="apellidos"
            onChange={handleChange}
            value={user.apellidos}
            placeholder="Apellidos" />
          <label htmlFor="apellidos">Apellidos</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="text"
            className="form-control"
            name="genero"
            onChange={handleChange}
            value={user.genero}
            placeholder="Genero" />
          <label htmlFor="genero">Genero</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input type="tel"
            className="form-control"
            name="edad"
            onChange={handleChange}
            value={user.edad}
            placeholder="Edad" />
          <label htmlFor="edad">Edad</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="email"
            className="form-control"
            name="correo"
            value={user.correo}
            onChange={handleChange}
            placeholder="Correo electrónico" />
          <label htmlFor="correo">Correo electrónico</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="tel"
            className="form-control"
            name="celular"
            onChange={handleChange}
            value={user.celular}
            placeholder="Celular" />
          <label htmlFor="celular">Celular</label>
        </div>

        <h3>Datos de identificación</h3>

        <div className="form-floating mb-3 col-md-4">
          <select
            className="form-select"
            name="tipoId"
            onChange={handleChange}>
            <option value="CC">Cédula ciudadanía</option>
            <option value="CE">Cédula extranjería</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="PAS">Pasaporte</option>
          </select>
          <label htmlFor="tipoId">Tipo de identificación</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="tel"
            className="form-control"
            name="numeroId"
            onChange={handleChange}
            value={user.infoIdentificacion.numeroId}
            placeholder="Número identificación" />
          <label htmlFor="numeroId">Número identificación</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="date"
            className="form-control"
            name="fechaExpedicion"
            value={user.infoIdentificacion.fechaExpedicion}
            onChange={handleChange}
            placeholder="Fecha Expedición" />
          <label htmlFor="fechaExpedicion">Fecha Expedición</label>
        </div>

        <h3>Datos Laborales</h3>

        <div className="form-floating mb-3 col-md-4">
          <input
            type="tel"
            className="form-control"
            name="nit"
            onChange={handleChange}
            value={user.infoLaboral.nit}
            placeholder="Nit" />
          <label htmlFor="nit">NIT</label>
        </div>
        <div className="form-floating mb-3 col-md-8">
          <input
            type="text"
            className="form-control"
            name="razonSocial"
            onChange={handleChange}
            value={user.infoLaboral.razonSocial}
            placeholder="Razón social" />
          <label htmlFor="razonSocial">Razón social</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="text"
            className="form-control"
            name="cargo"
            onChange={handleChange}
            value={user.infoLaboral.cargo}
            placeholder="Cargo" />
          <label htmlFor="cargo">Cargo</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="text"
            className="form-control"
            name="programa"
            onChange={handleChange}
            value={user.infoLaboral.programa}
            placeholder="Programa" />
          <label htmlFor="programa">Programa</label>
        </div>

        <div className="d-grid">
          <button
            className="btn btn-success mb-3"
            disabled={isLoadingButton}
            type="submit">
            {isLoadingButton
              ? <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"></span>
                <span className="visually-hidden">Cargando...</span>
              </>
              : "Agregar Usuario"
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm