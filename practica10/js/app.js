//variables
const rangeInput = document.getElementById('number');
const rangeValue = document.getElementById('number-value'); 
const solucion = document.getElementById('solucion');
const run = document.getElementById('run'); 
const frase = document.getElementById('frase');
const alfabeto="abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789áéíóúÁÉÍÓÚ@#$%^&*()_+|~`-={}[]:;'<>?,./"

//eventos
rangeInput.addEventListener('input', () => { 
    rangeValue.textContent = rangeInput.value;
});

/*
    cifra una cadena usando una cadena de entrada un paso 
*/
function cifrar(cadena,paso){
    let resultado="";
    for (let i = 0; i < cadena.length; i++) { 
        let caracter = cadena[i];
        let index = alfabeto.indexOf(caracter); 
        if (index === -1) {
            resultado += caracter;
        } else {
            let nuevoIndex = (index + paso) % alfabeto.length; 
            resultado += alfabeto[nuevoIndex];
        }
    }
    return resultado;
}

//evento del botón
run.addEventListener('click', (e) => { 
    e.preventDefault(); 
    const paso = parseInt(rangeInput.value); 
    const texto = frase.value; 
    solucion.textContent = cifrar(texto, paso); 
});


