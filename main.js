let saldoPesos = JSON.parse(localStorage.getItem("saldoPesos")) || 0;
let saldoDolares = JSON.parse(localStorage.getItem("saldoDolares")) || 0;
let operaciones = JSON.parse(localStorage.getItem("operaciones")) || 0;
let ultimosMovimientos =
  JSON.parse(localStorage.getItem("ultimosMovimientos")) || [];
let accionElegida = document.querySelector("#accionElegida");
let pesos = document.querySelector("#saldoEnPesos");
let dolares = document.querySelector("#saldoEnDolares");
pesos.innerHTML = `$ ${saldoPesos}`;
dolares.innerHTML = `$ ${saldoDolares}`;

function iniciarSesion() {
  event.preventDefault();
  let nombre = document.querySelector("#usuario").value;
  let password = document.querySelector("#password").value;
  if (nombre == "" || nombre == null || password == "" || password == null) {
    alert("Los datos son incorrectos. Vuelva a intentarlo.");
  } else {
    alertInicioSesion(nombre);
  }
}

function ingresarDinero() {
  accionElegida.innerHTML = "";
  accionElegida.innerHTML = `<div> INGRESAR DINERO: 
                                                      <p>Tipo de Moneda: </p>
                                                      <select id="moneda">
                                                        <option value="pesos">Pesos</option>
                                                        <option value="dolares">Dolares</option>
                                                      </select>
                                                      <label>Cantidad: </label>
                                                      <input type="number" id="cantidad">
                                                      <button id="ingresar">Ingresar</button>
                                                      </div>`;

  document.querySelector("#ingresar").addEventListener("click", () => {
    let cantidad = document.querySelector("#cantidad").value;
    let tipoDeMoneda = document.querySelector("#moneda").value;
    Deposito(cantidad, tipoDeMoneda);
  });
}

function retirarDinero() {
  accionElegida.innerHTML = "";
  accionElegida.innerHTML = `<div> RETIRAR DINERO: 
                                                      <p>Tipo de Moneda: </p>
                                                      <select id="moneda">
                                                        <option value="pesos">Pesos</option>
                                                        <option value="dolares">Dolares</option>
                                                      </select>
                                                      <label>Cantidad: </label>
                                                      <input type="number" id="cantidad">
                                                      <button id="ingresar">Retirar</button>
                                                      </div>`;

  document.querySelector("#ingresar").addEventListener("click", () => {
    let cantidad = document.querySelector("#cantidad").value;
    let tipoDeMoneda = document.querySelector("#moneda").value;
    Extraccion(cantidad, tipoDeMoneda);
  });
}

function verMovimientos() {
  if (operaciones >= 1) {
    accionElegida.innerHTML = `<div id="movimientos"> ULTIMOS MOVIMIENTOS:
                                                      </div>`;
    cargarDeLocalStorage();
  } else {
    accionElegida.innerHTML =
      "No se han realizado operaciones. Vuelva a intentarlo";
  }
}

function Movimientos(moneda, operacion, importe) {
  this.moneda = moneda;
  this.operacion = operacion;
  this.importe = importe;
}

function guardarEnLocalStorage() {
  localStorage.setItem(
    "ultimosMovimientos",
    JSON.stringify(ultimosMovimientos)
  );
  localStorage.setItem("saldoPesos", JSON.stringify(saldoPesos));
  localStorage.setItem("saldoDolares", JSON.stringify(saldoDolares));
  localStorage.setItem("operaciones", JSON.stringify(operaciones));
}

function cargarDeLocalStorage() {
  let movimientos = JSON.parse(localStorage.getItem("ultimosMovimientos"));
  let ultimosMovimientos = movimientos.slice(-3);
  ultimosMovimientos.forEach((movimiento) => {
    let div = document.createElement("ul");
    div.innerHTML = `<li> Se realizo un <strong>${movimiento.operacion}</strong> en <strong>${movimiento.moneda}</strong> por el valor de <strong>$${movimiento.importe}</strong>.</li>`;
    document.querySelector("#movimientos").appendChild(div);
  });
}

function Deposito(cantidad, tipoDeMoneda) {
  if (parseFloat(cantidad) > 0) {
    switch (tipoDeMoneda) {
      case "pesos":
        saldoPesos += parseFloat(cantidad);
        pesos.innerHTML = `$${saldoPesos}`;
        ultimosMovimientos.push(new Movimientos("Pesos", "Deposito", cantidad));
        operaciones++;
        guardarEnLocalStorage();
        alertOperacion();
        break;
      case "dolares":
        saldoDolares += parseFloat(cantidad);
        dolares.innerHTML = `$${saldoDolares}`;
        ultimosMovimientos.push(
          new Movimientos("Dolares", "Deposito", cantidad)
        );
        operaciones++;
        guardarEnLocalStorage();
        alertOperacion();
        break;
    }
  } else {
    alertError();
  }
}

function Extraccion(cantidad, tipoDeMoneda) {
  switch (tipoDeMoneda) {
    case "pesos":
      if (parseFloat(cantidad) >= 1) {
        if (saldoPesos >= parseFloat(cantidad)) {
          saldoPesos -= parseFloat(cantidad);
          ultimosMovimientos.push(new Movimientos("Pesos", "Retiro", cantidad));
          operaciones++;
          guardarEnLocalStorage();
          pesos.innerHTML = `$${saldoPesos}`;
          alertOperacion();
          break;
        } else {
          alertError();
          break;
        }
      } else {
        alertError();
        break;
      }
    case "dolares":
      if (parseFloat(cantidad) >= 1) {
        if (saldoDolares >= parseFloat(cantidad)) {
          saldoDolares -= parseFloat(cantidad);
          ultimosMovimientos.push(
            new Movimientos("Dolares", "Retiro", cantidad)
          );
          operaciones++;
          guardarEnLocalStorage();
          dolares.innerHTML = `$${saldoDolares}`;
          alertOperacion();
          break;
        } else {
          alertError();
        }
      } else {
        alertError();
        break;
      }
  }
}

function alertInicioSesion(nombre) {
  Swal.fire({
    icon: "info",
    title: `Bienvenido ${nombre}`,
    text: "Inicio de sesión exitoso.",
    timer: 1500,
  }).then(() => {
    window.location.href = "cuenta.html";
  });
}

function alertOperacion() {
  Swal.fire({
    icon: "success",
    title: "Transaccion Exitosa",
    timer: 1500,
  }).then(() => {
    accionElegida.innerHTML = "";
  });
}

function alertError() {
  Swal.fire({
    icon: "error",
    title: "Transaccion Fallida",
    text: "No se puede realizar la operacion. Vuelva a intentarlo.",
    timer: 1500,
  }).then(() => {
    accionElegida.innerHTML = "";
  });
}
