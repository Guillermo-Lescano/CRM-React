import { obtenerCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import { Form, useNavigate, useLoaderData } from "react-router-dom"

export async function loader({params}) {
    //console.log(params) //el id del cliente
    const cliente = await obtenerCliente(params.clienteId)
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados de la busqueda'
        })
    }
    //console.log(cliente)

    return cliente
}

const EditarCliente = () => {
    const cliente = useLoaderData()
    const navigate = useNavigate()
    
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3 '>A continuacion podra modificar los datos del cliente</p>

        <div className="flex justify-end">
            <button
                className='bg-blue-800 text-white px-3 py-1 uppercase font-bold'
                onClick={() => navigate ('/')}  //se puede utilizar en navigate(-1)
            >
                Volver
            </button>
        </div>  

        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">

           {/*  {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error>)} */}
            <Form
                method="post"
                noValidate>
                
                <Formulario
                  cliente={cliente}
                />

                <input 
                    type="submit"
                    className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                    value='Registrar Cliente '
                />
            </Form>
        </div>
    </>
  )
}

export default EditarCliente