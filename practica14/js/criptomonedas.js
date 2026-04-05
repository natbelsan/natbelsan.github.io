    //variables
    let lista= ["BTC", "ETH", "SOL", "DOGE"] // criptos
    let cantidad = document.getElementById("cantidad");
    let monedaSelect = document.getElementById("moneda");
    let convertirBtn = document.getElementById("convertir");
    let resultados = document.getElementById("resultados");
    let error = document.getElementById("error");

    
    /*
      Devuelve un li con los datos de la moneda
    */
    function creaElemento(cripto,cambio,cantidad,moneda) {    
      /*  ACABALO  */        
      let total = cantidad / cambio;
      let liElement = document.createElement("li");
      /*liElement.textContent = `${cantidad} EUR = ${total.toFixed(6)} ${cripto}`;*/
      liElement.innerHTML = `
        <div class="crypto-code">${cripto}</div>
        <div class="crypto-value">${cantidad} ${moneda} = ${total.toFixed(6)} ${cripto}</div>
        <div class="crypto-rate">1 ${cripto} = ${cambio} ${moneda}</div>
      `;
      /*  FIN ACABALO  */
      return liElement
    }
    

    async function convertir() {
      error.textContent = "";
      resultados.innerHTML = "";
      
      // cuanto dinero
      const valor = parseFloat(cantidad.value);
      const moneda = monedaSelect.value;
      //errores
      if (isNaN(valor) || valor <= 0) {
        error.textContent = "Introduce una cantidad válida";
        return;
      }


      // pido el precio de cada cripto
      let listaResultados = [];
      let url =""
      let ulElement=document.createElement("ul")

      // esta api solo permite 1 moneda cada vez por eso el bucle
      lista.forEach((cripto) => {
        console.log(cripto)
        url = `https://api.coinbase.com/v2/prices/${cripto}-${moneda}/spot`;

        fetch(url)
        .then(response => response.json())
        .then(datos => {
            /*  ACABALO  */
            // haz cosas con los datos                
            let cambio=parseFloat(datos.data.amount);
            console.log("==>"+cambio);
            //usa creaElemento(cripto,cambio,cantidad)
            let li = creaElemento(cripto, cambio, valor, moneda);
            ulElement.appendChild(li);
            /*  FIN ACABALO  */    

        })
        .catch(e => {
          console.log("ERROR: " + e)
          error.textContent = "Error al obtener los datos"
        });       
      })
      resultados.appendChild(ulElement)

    }

    //eventos
    convertirBtn.addEventListener("click", () => {
      console.log("click")
      convertir()
    });