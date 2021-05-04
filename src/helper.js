export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year;
}

export function calcularMarca(marca) {
  let incremento;

  switch (marca) {
    case "europeo":
      incremento = 1.3;
      break;
    case "americano":
      incremento = 1.15;
      break;
    case "asiatico":
      incremento = 1.5;
      break;
    default:
      break;
  }

  return incremento;
}

/* calcula el tipo de seguro */
export function obtenerPlan(plan) {
  return plan === "basico" ? 1.2 : 1.5;
}

/* Muestra la primera letra en mayuscula */
export function primeraMayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
