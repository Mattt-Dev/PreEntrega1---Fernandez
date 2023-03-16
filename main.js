let saldoPesos = 0;
let saldoDolares = 0;
let conversionUSD = 385;
let sesionIniciada = false;
let operaciones = 0;
let ultimosMovimientos = [];

const inicioSesion = document.getElementById("inicioSesion");
inicioSesion.onclick = () => {
  iniciarSesion()
}

function iniciarSesion() {
  let nombre = prompt("Ingrese su nombre de usuario.");
  let password = prompt("Ingrese su contraseña.");
  if (nombre == "" || nombre == null || password == "" || password == null) {
    alert("Los datos son incorrectos. Vuelva a intentarlo.");
  } else {
    alert("Bienvenido " + nombre + ". Presione OK para continuar.");
    sesionIniciada = true;
  }

  while (sesionIniciada) {
    let opcion = prompt(
      "Elija una opcion para continuar.\n\n1. Ingresar dinero.\n2. Retirar dinero.\n3. Consultar su saldo.\n4. Conversion a USD.\n5. Ultimos Movimientos.\n6. Salir."
    );
    switch (opcion) {
      case "1":
        ingresarDinero();
        break;
      case "2":
        retirarDinero();
        break;
      case "3":
        consultarSaldo();
        break;
      case "4":
        conversionDolares();
        break;
      case "5":
        verMovimientos();
        break;
      case "6":
        alert(
          "Gracias por utilizar nuestra aplicación. Sesion finalizada exitosamente."
        );
        sesionIniciada = false;
    }
  }
}


function ingresarDinero() {
  let moneda = prompt(
    "Elija en que moneda desea ingresar su dinero.\n\n1. Pesos\n2. Dolares\n"
  );
  if (moneda === "1") {
    let cantidad = parseFloat(
      prompt("Ingrese la cantidad de pesos que desea ingresar.")
    );
    if (isNaN(cantidad)) {
      alert("La cantidad ingresada es incorrecta. Vuelva a intentarlo.");
    } else {
      saldoPesos += cantidad;
      alert("Su saldo actual es de $" + saldoPesos + " pesos.");
      ultimosMovimientos.unshift(
        new Movimientos("PESOS", "DEPOSITO", cantidad)
      );
      operaciones += 1;
    }
  } else if (moneda === "2") {
    let cantidad = parseFloat(
      prompt("Ingrese la cantidad de dolares que desea ingresar.")
    );
    if (isNaN(cantidad)) {
      alert("La cantidad ingresada es incorrecta. Vuelva a intentarlo.");
    } else {
      saldoDolares += cantidad;
      alert("Su saldo actual es de $" + saldoDolares + " dolares.");
      ultimosMovimientos.unshift(
        new Movimientos("DOLARES", "DEPOSITO", cantidad)
      );
      operaciones += 1;
    }
  } else {
    alert("La opcion ingresada no es correcta. Vuelva a intentarlo.");
  }
}

function retirarDinero() {
  let cuenta = prompt(
    "Ingrese la cuenta de la cual desea retirar su dinero.\n\n1. Pesos\n2. Dolares\n"
  );
  if (cuenta === "1") {
    let cantidad = parseFloat(
      prompt("Ingrese la cantidad de pesos que desea retirar.")
    );
    if (isNaN(cantidad)) {
      alert("La cantidad ingresada es incorrecta. Vuelva a intentarlo.");
    } else if (saldoPesos >= cantidad) {
      saldoPesos -= cantidad;
      alert("Su saldo actual es de $" + saldoPesos + " pesos.");
      ultimosMovimientos.unshift(
        new Movimientos("PESOS", "RETIRO", cantidad)
      );
      operaciones += 1;
    } else {
      alert("No tiene suficiente saldo en pesos. Vuelva a intentarlo.");
    }
  } else if (cuenta === "2") {
    let cantidad = parseFloat(
      prompt("Ingrese la cantidad de dolares que desea retirar.")
    );
    if (saldoDolares >= cantidad) {
      saldoDolares -= cantidad;
      alert("Su saldo actual es de $" + saldoDolares + " dolares.");
      ultimosMovimientos.unshift(
        new Movimientos("DOLARES", "RETIRO", cantidad)
      );
      operaciones += 1;
    } else {
      alert("No tiene suficiente saldo en dolares. Vuelva a intentarlo.");
    }
  } else {
    alert("La opcion ingresada no es correcta. Vuelva a intentarlo.");
  }
}

function consultarSaldo() {
  let cuenta = prompt(
    "Elija en que cuenta desea consultar su saldo.\n\n1. Pesos\n2. Dolares\n"
  );
  if (cuenta === "1") {
    alert("Su saldo actual es de $" + saldoPesos + " pesos.");
  } else if (cuenta === "2") {
    alert("Su saldo actual es de $" + saldoDolares + " dolares.");
  } else {
    alert("La opcion ingresada no es correcta. Vuelva a intentarlo.");
  }
}

function conversionDolares() {
  alert(
    "Saldo actual en cuenta Pesos: $" +
      saldoPesos +
      ".\nEsto equivale a $" +
      (saldoPesos / conversionUSD).toFixed(2) +
      " dolares."
  );
}

function verMovimientos() {
  if (operaciones >= 1) {
    switch (ultimosMovimientos.length) {
      case 1:
        alert(
          `Listado de ultimos movimientos: \n1 - Usted realizo un ${ultimosMovimientos[0].operacion} de $${ultimosMovimientos[0].importe} en ${ultimosMovimientos[0].moneda}`
        );
        break;
      case 2:
        alert(
          `Listado de ultimos movimientos: \n1 - Usted realizo un ${ultimosMovimientos[0].operacion} de $${ultimosMovimientos[0].importe} en ${ultimosMovimientos[0].moneda}\n2 - Usted realizo un ${ultimosMovimientos[1].operacion} de $${ultimosMovimientos[1].importe} en ${ultimosMovimientos[1].moneda}`
        );
        break;
      case ultimosMovimientos.length:
        if (ultimosMovimientos.length > 2) {
          alert(
            `Listado de ultimos movimientos: \n1 - Usted realizo un ${ultimosMovimientos[0].operacion} de $${ultimosMovimientos[0].importe} en ${ultimosMovimientos[0].moneda}\n2 - Usted realizo un ${ultimosMovimientos[1].operacion} de $${ultimosMovimientos[1].importe} en ${ultimosMovimientos[1].moneda}\n3 - Usted realizo un ${ultimosMovimientos[2].operacion} de $${ultimosMovimientos[2].importe} en ${ultimosMovimientos[2].moneda}`
          );
        }
    }
  } else {
    alert("No se han realizado operaciones. Vuelva a intentarlo");
  }
}

function Movimientos(moneda, operacion, importe) {
  this.moneda = moneda;
  this.operacion = operacion;
  this.importe = importe;
}