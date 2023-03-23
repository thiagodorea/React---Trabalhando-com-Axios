import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Formulario from "./formulario";
import Home from "./home";

const router = createBrowserRouter([
    {
        path: "/",
        element:<Home />
    },
    {
        path: "/formulario/:idAluno?",
        element: <Formulario />
    }
])

function Routes(){
    return(
        <>
        <RouterProvider router={router} />
        </>
    )
}

export default Routes;