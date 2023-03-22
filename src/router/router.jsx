import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Error from "../pages/Error"
import Home from "../pages/Home"
import UserAdd from "../pages/user/UserAdd"
import UserDetails from "../pages/user/UserDetails"
import UserIndex from "../pages/user/UserIndex"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <UserIndex />
          },
          {
            path: "add",
            element: <UserAdd />
          },
          {
            path: ":id",
            element: <UserDetails />
          }
        ]
      },
      {
        path: "*",
        element: <Error/>
      }
    ]
  }
])

export default router