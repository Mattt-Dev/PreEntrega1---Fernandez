let saldoPesos = 0;
let saldoDolares = 0;
let conversionUSD = 385;
let sesionIniciada = false;

function iniciarSesion() {
  let nombre = prompt("Ingrese su nombre de usuario.");
  let password = prompt("Ingrese su contraseña.");
  if (nombre == "" || password == "") {
    alert("Los datos son incorrectos. Vuelva a intentarlo.");
  } else {
    alert("Bienvenido " + nombre + ". Presione OK para continuar.");
    sesionIniciada = true;
  }

  while (sesionIniciada) {
    let opcion = prompt(
      "Elija una opcion para continuar.\n\n1. Ingresar dinero.\n2. Retirar dinero.\n3. Consultar su saldo.\n4. Conversion a USD.\n5. Salir."
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
        alert( "Gracias por utilizar nuestra aplicación. Sesion finalizada exitosamente.");
        sesionIniciada = false;
    }
  }
}

function ingresarDinero() {
  let moneda = prompt("Elija en que moneda desea ingresar su dinero.\n\n1. Pesos\n2. Dolares\n");
  if (moneda === "1") {
    let cantidad = parseFloat(prompt("Ingrese la cantidad de pesos que desea ingresar."));
    if (isNaN(cantidad)) {
      alert("La cantidad ingresada es incorrecta. Vuelva a intentarlo.");
    } else {
      saldoPesos += cantidad;
      alert("Su saldo actual es de $" + saldoPesos + " pesos.");
    }
  }
  else if (moneda ==="2") {
    let cantidad = parseFloat(prompt("Ingrese la cantidad de dolares que desea ingresar."));
    if (isNaN(cantidad)) {
      alert("La cantidad ingresada es incorrecta. Vuelva a intentarlo.");
    } else {
      saldoDolares += cantidad;
      alert("Su saldo actual es de $" + saldoDolares + " dolares.");
    }
  }
  else {
    alert("La opcion ingresada no es correcta. Vuelva a intentarlo.");
  }
}

function retirarDinero() {
  let cuenta = prompt("Ingrese la cuenta de la cual desea retirar su dinero.\n\n1. Pesos\n2. Dolares\n");
  if (cuenta === "1") {
    let cantidad = parseFloat(prompt("Ingrese la cantidad de pesos que desea retirar."));
    if (saldoPesos >= cantidad) {
      saldoPesos -= cantidad;
      alert("Su saldo actual es de $" + saldoPesos + " pesos.");
    } else {
      alert("No tiene suficiente saldo en pesos. Vuelva a intentarlo.");
    }
  } else if(cuenta === "2") {
    let cantidad = parseFloat(prompt("Ingrese la cantidad de dolares que desea retirar."));
    if (saldoDolares >= cantidad) {
      saldoDolares -= cantidad;
      alert("Su saldo actual es de $" + saldoDolares + " dolares.");
    } else {
      alert("No tiene suficiente saldo en dolares. Vuelva a intentarlo.");
    }
  } else {
    alert("La opcion ingresada no es correcta. Vuelva a intentarlo.");
  }
}

function consultarSaldo() {
  let cuenta = prompt("Elija en que cuenta desea consultar su saldo.\n\n1. Pesos\n2. Dolares\n");
  if (cuenta === "1") {
    alert("Su saldo actual es de $" + saldoPesos + " pesos.");
  }
  else if (cuenta ==="2") {
    alert("Su saldo actual es de $" + saldoDolares + " dolares.");
  }
  else {
    alert("La opcion ingresada no es correcta. Vuelva a intentarlo.");
  }
}

function conversionDolares() {
  alert("Saldo actual en cuenta Pesos: $" + saldoPesos + ".\nEsto equivale a $" + (saldoPesos / conversionUSD).toFixed(2) + " dolares.");
}