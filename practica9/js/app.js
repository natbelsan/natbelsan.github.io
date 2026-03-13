//variables
let botonAnyadir=document.getElementById("botonAnyadir")
let panel=document.getElementById("panel")
let nombre=document.getElementById("nombre")
let solucion=document.getElementById("solucion")
let botonResuelve=document.getElementById("botonResuelve")

//uso de array para almacenar amigos
let amigos=[]
let solucionClientes = new Map() 

//funciones
//Muestra la lista de amigos en pantalla
function render(){
    console.log("AMIGOS:", amigos)

    panel.innerHTML="" 

    const lista = document.createElement("ul") 

    amigos.forEach((amigo)=>{ 

        let li = document.createElement("li") 

        let boton = document.createElement("input")
        boton.type="button" 
        boton.value="Borrar" 

        // dataset permite guardar datos en el botón
        boton.dataset.id = amigo 
        boton.dataset.action = "borrar" 

        let texto = document.createElement("span")
        texto.innerHTML = " " + amigo

        li.append(boton) 
        li.append(texto) 

        lista.append(li)
    })

    panel.append(lista) 
}

//Muestra el resultado del sorteo
function renderSolucion(){ 
    solucion.innerHTML="" 

    solucionClientes.forEach((cliente, amigo)=>{ 
        solucion.innerHTML += amigo + " → " + cliente + "<br>"
    })
}

//Elimina un amigo del array
function borraAmigo(nombre){
    let indice = amigos.indexOf(nombre) 

    if(indice!=-1){ 
        amigos.splice(indice,1) 
    }

    render() 
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/*
    devuelve false si el último se asigna a si mismo
*/

function reparto(){
    let clientes=amigos.slice() 
    solucionClientes = new Map() 
    let esCorrecto=true 

    //TO DO: COMPLETA EL ALGORITMO PARA QUE FUNCIONE:
    amigos.forEach((amigo)=>{ 
        
        if(clientes.length == 0) return 
        
        let indice = aleatorio(0, clientes.length-1) 
        let cliente = clientes[indice] 

        // si el último se asigna a si mismo
        if(clientes.length == 1 && cliente == amigo){
            esCorrecto = false
            return
        }

        // evitar que alguien se regale a si mismo
        while(cliente == amigo){
            indice = aleatorio(0, clientes.length-1)
            cliente = clientes[indice]
        }

        solucionClientes.set(amigo, cliente) 

        clientes.splice(indice,1)
    })

    return esCorrecto    
}

// funcion anonima
const unoMas = function(nombre){
    amigos.push(nombre)
}

// funcion flecha
const otroMas = (nombre)=>{
    amigos.push(nombre)
}

// ejemplos
unoMas("Laura")
otroMas("Lola")

//eventos
// añadir amigo desde formulario
botonAnyadir.addEventListener("click",(e) => { 
    //capturar el formulario
    e.preventDefault() 
    if(nombre.value.trim() == "") return 
    amigos.push(nombre.value) 
    nombre.value="" 
    render() 
})

// EVENTO BORRAR usando dataset
panel.addEventListener("click", (e)=>{ 
    let nombre=e.target.dataset.id 
    console.log("Quieres borrar: "+ nombre)
    borraAmigo(nombre) 
})
// BOTON RESOLVER: ejecuta el reparto hasta que salga bien
botonResuelve.addEventListener("click", (e)=>{ 
    console.log("Voy a resolver ")
    let correcto=reparto() 
    while (!correcto){ 
        if (!correcto)
            console.log("El mapa no acabo correctamente.")
        correcto=reparto()
    }
    
    // c --> c
    renderSolucion()
})


































































