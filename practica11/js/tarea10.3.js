// 1. Seleccionamos el contenedor donde pintaremos las criptos
const cryptoDashboard = document.getElementById('cryptoDashboard');

// 2. Variable global para guardar los últimos precios y comparar
let preciosPrevios = {};

// 3. Formateador de dinero usando Intl.NumberFormat
const formatoDinero = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

// 4. Función para cargar los precios de las criptos
async function cargarPrecios() {
  try {
    // 4a. Hacemos fetch a la API para obtener las top 5 criptos
    const res = await fetch('https://api.coincap.io/v2/assets?limit=5');
    const data = await res.json(); // Convertimos la respuesta a JSON

    // 4b. Limpiamos el contenedor antes de pintar
    cryptoDashboard.innerHTML = '';

    // 4c. Recorremos cada cripto
    data.data.forEach(crypto => {
      const nombre = crypto.name;                    // Nombre de la cripto
      const precio = parseFloat(crypto.priceUsd);    // Precio actual convertido a número
      let color = 'black';                            // Color por defecto

      // 4d. Comparamos con el precio previo para decidir el color
      if (preciosPrevios[nombre] !== undefined) {
        if (precio > preciosPrevios[nombre]) color = 'green';  // Si subió → verde
        else if (precio < preciosPrevios[nombre]) color = 'red'; // Si bajó → rojo
      }

      // 4e. Guardamos el precio actual para la próxima comparación
      preciosPrevios[nombre] = precio;

      // 4f. Creamos la tarjeta para la cripto
      const card = document.createElement('div');
      card.classList.add('card');

      // 4g. Insertamos el nombre y precio con color según cambio
      card.innerHTML = `
        <h3>${nombre}</h3>
        <p style="color:${color}">${formatoDinero.format(precio)}</p>
      `;

      // 4h. Añadimos la tarjeta al contenedor
      cryptoDashboard.appendChild(card);
    });
  } catch (error) {
    // 4i. Capturamos errores en caso de fallo de la API
    console.error('Error cargando precios:', error);
  }
}

// 5. Ejecutamos la función al cargar la página
cargarPrecios();

// 6. Configuramos auto-refresh cada 5 segundos (5000 ms)
setInterval(cargarPrecios, 5000);