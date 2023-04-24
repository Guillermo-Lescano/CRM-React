import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/Index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  //una vez hecho el 'npm install react-router-dom', importamos esto
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/editarCliente'
import ErrorPage from './components/ErrorPage'


const router = createBrowserRouter([
  {
    path: '/', //path es la forma en la que vas definiendo las 
    element: <Layout />, //<h1>Inicio</h1> es lo que se va a mostrar en pantalla puede ser html o un componente
    children:[
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo', 
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      }
    ]
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
