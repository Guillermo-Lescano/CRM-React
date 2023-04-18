export async function obtenerClientes() {
    const respuesta = await fetch(import.meta.env.VITE_API_URL)     //GET
    const resultado = await respuesta.json()
    return resultado
}

export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)     //PUT
    const resultado = await respuesta.json()
    return resultado
}

export async function agregarCliente(datos) {

    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',     //aca se aclara el metodo , en el get no, porque por defecto es get
            body: JSON.stringify(datos),  //son los datos que vamos a mandar al sevidor
            headers: {
                'Content-Type' : 'application/json'    //mandamos este formato 
            }
        })
        await respuesta.json()  //retorna true o false
    } catch (error) {
        console.log(error)
    }

    console.log('se muestran los datos del form', datos)
}