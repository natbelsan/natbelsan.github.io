        const cantidad = document.getElementById("cantidad");
        const monedaSelect = document.getElementById("moneda");
        const convertirBtn = document.getElementById("convertir");
        const resultado = document.getElementById("resultado");

        const countryNames = {
            EUR: "Eurozone", USD: "United States", GBP: "United Kingdom", JPY: "Japan",
            CHF: "Switzerland", CAD: "Canada", AUD: "Australia", CNY: "China",
            SEK: "Sweden", NZD: "New Zealand", MXN: "Mexico", SGD: "Singapore",
            HKD: "Hong Kong", NOK: "Norway", KRW: "South Korea", TRY: "Turkey",
            INR: "India", RUB: "Russia", ZAR: "South Africa", BRL: "Brazil",
            DKK: "Denmark", PLN: "Poland", TWD: "Taiwan", THB: "Thailand",
            MYR: "Malaysia", IDR: "Indonesia", CZK: "Czech Republic", HUF: "Hungary",
            ILS: "Israel", CLP: "Chile", PHP: "Philippines", AED: "United Arab Emirates",
            COP: "Colombia", SAR: "Saudi Arabia", RON: "Romania", ARS: "Argentina",
            VND: "Vietnam", EGP: "Egypt"
        };

        function creaElemento(valor, clave, base) {
            const total = Math.round(parseFloat(cantidad.value) * parseFloat(valor) * 100) / 100;
            const li = document.createElement("li"); 
            //li.textContent = `${cantidad.value} ${base} = ${total} ${clave}`;
            li.innerHTML = `
                <div class="currency-name">${clave} - ${countryNames[clave] || "Unknown"}</div>
                <div  class="base_conver">${cantidad.value} ${base} = ${total} ${clave}</div>
                <div class="conversion">${total} ${clave}</div>
                <div class="unit-rate">1 ${base} = ${Math.round(valor*1000)/1000} ${clave}</div>
            `;
            return li;
        }

        async function convertir() {
            const moneda = monedaSelect.value;
            const url = `https://api.frankfurter.dev/v1/latest?base=${moneda}`;

            try {
                const response = await fetch(url);
                const datos = await response.json();

                const cambios = Object.entries(datos.rates);
                const ul = document.createElement("ul");
                cambios.forEach(([clave, valor]) => {
                    ul.appendChild(creaElemento(valor, clave, moneda));
                });

                resultado.innerHTML = "";
                resultado.appendChild(ul);
            } catch (error) {
                console.error(error);
            }
        }

        convertirBtn.addEventListener("click", convertir);