import { useLoaderData } from "react-router-dom"
import { obtenerCliente } from "../data/clientes"

export async function loader({params}) {
    //console.log(params) //el id del cliente
    const cliente = await obtenerCliente(params.clienteId)
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultado'
        })
    }
    //console.log(cliente)

    return cliente
}

const EditarCliente = () => {
    const cliente = useLoaderData()
  return (
    <div>Editar Cliente</div>
  )
}

export default EditarCliente