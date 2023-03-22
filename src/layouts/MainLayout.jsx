import { Outlet } from "react-router-dom"
import NavbarApp from "../components/NavbarApp"

const MainLayout = () => {
  return(
    <div className="row-fluid">
      <NavbarApp/>
      <Outlet/>
    </div>
  )
}

export default MainLayout