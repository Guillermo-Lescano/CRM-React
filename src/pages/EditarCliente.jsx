import { obtenerCliente, editarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import Error from "../components/Error"

export async function loader({params}) {
    //este loader sirve para cuando apretamos editar, tome la informacion y lo vuelva a cargar en los inout, pero tambien vamos a necesitar 
    //un actions
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

export async function action({request, params}){   //el request siempre va, y el params es para saber cual cliente queremos actualizar
                                                    //siempre debemos pasarle un request a los action, esta dentro del prototype y formData
    const formData = await request.formData();  //guard alo que se cargo en el Form

    const datos = Object.fromEntries(formData);
    //console.log(datos); //aca mostramos lo que cargamos en el formulario

    const email = formData.get('email')

    //Validacion
    const errores = []
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios')
    }
    console.log(errores)

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)) {
        errores.push('El email no es valido')
    }

    //retornar datos si hay errores
    if(Object.keys(errores).length){
        return errores
    }

    //Actualizar el cliente
    await editarCliente(params.clienteId, datos)    //toma el ide, y luego los datos ingresados en el formulario

    //una vez cargado el usuario/cliente, no redireccionamos a pa pagina de clientes(asi se muestra cargado)
    return redirect('/')
        
}

const EditarCliente = () => {
    const cliente = useLoaderData()
    const navigate = useNavigate()
    const errores = useActionData()
    
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

            {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error>)}
            <Form
                method="post"
                noValidate>
                
                <Formulario
                  cliente={cliente}
                />

                <input 
                    type="submit"
                    className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                    value='Actualizar cliente'
                />
            </Form>
        </div>
    </>
  )
}

export default EditarCliente