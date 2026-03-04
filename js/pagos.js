function abrirFormulario(plan, precio) {
  document.getElementById("formularioPago").classList.remove("hidden");
  document.getElementById("planSeleccionado").innerText =
    "Plan " + plan + " - $" + precio.toLocaleString();
}

const tarjeta = document.getElementById("tarjeta");
tarjeta.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").slice(0, 16);
});

const cvv = document.getElementById("cvv");
cvv.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").slice(0, 3);
});

const fecha = document.getElementById("fecha");
fecha.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
  if (this.value.length >= 3) {
    this.value = this.value.slice(0, 2) + "/" + this.value.slice(2, 4);
  }
});

document.getElementById("formPago").addEventListener("submit", function (e) {
  e.preventDefault();

  if (tarjeta.value.length !== 16) {
    alert("La tarjeta debe tener 16 números");
    return;
  }

  if (cvv.value.length !== 3) {
    alert("El CVV debe tener 3 números");
    return;
  }

  document.getElementById("modalExito").classList.remove("hidden");
});