import Formulario from "../components/Formulario"
import { Form, useNavigate, useActionData, redirect } from "react-router-dom"   //el redirect nos manda a otra pagina
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({request}) {       //siempre debemos pasarle un request a los action, esta dentro del prototype y formData
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

    await agregarCliente(datos)

    //una vez cargado el usuario/cliente, no redireccionamos a pa pagina de clientes(asi se muestra cargado)
    return redirect('/')
    
}




const NuevoCliente = () => {
    const navigate = useNavigate()
    const errores = useActionData()
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
        <p className='mt-3 '>Completa los campos para registrar un nuevo cliente</p>

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
                
                <Formulario />

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

export default NuevoCliente