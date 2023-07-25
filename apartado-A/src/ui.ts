import { BOTON_BUSQUEDA, CAMPO_TEXTO, RESPUESTA_IBAN } from "./constantes";
import {
  asignaBanco,
  esValidoIBAN,
  estaBienFormadoIBAN,
  extraeCodigoSucursal,
  extraeDigitoControl,
  extraeCodigoBanco,
  extraeNumeroCuenta,
} from "./validaciones";

const muestraEsBienFormado = (valor: string) =>
  estaBienFormadoIBAN(valor)
    ? "El IBAN está bien formado"
    : `El IBAN no está bien formado`;

const muestraEsValido = (valor: string) =>
  esValidoIBAN(valor) ? "El IBAN es válido" : `El IBAN no es válido`;

const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = `${texto}`;
  return parrafo;
};

const creaContenedorValidacion = (valor: string): HTMLDivElement => {
  const divValidacion = document.createElement("div");
  divValidacion.classList.add("iban-div");
  divValidacion.append(
    crearElementoParrafo(muestraEsBienFormado(valor)),
    crearElementoParrafo(muestraEsValido(valor))
  );
  return divValidacion;
};

const creaContenedorExtraccion = (valor: string): HTMLDivElement => {
  const elementosIBAN = document.createElement("div");
  elementosIBAN.classList.add("iban-div");
  if (esValidoIBAN(valor)) {
    elementosIBAN.append(
      crearElementoParrafo(`Banco: ${asignaBanco(extraeCodigoBanco(valor))}`),
      crearElementoParrafo(`Código sucursal: ${extraeCodigoSucursal(valor)}`),
      crearElementoParrafo(`Dígito de control: ${extraeDigitoControl(valor)}`),
      crearElementoParrafo(`Número de cuenta: ${extraeNumeroCuenta(valor)}`)
    );
  }
  return elementosIBAN;
};

const limpiaDivRespuesta = () =>
  RESPUESTA_IBAN && RESPUESTA_IBAN instanceof HTMLDivElement
    ? (RESPUESTA_IBAN.innerHTML = "")
    : () => {
        throw new Error("No se ha encontrado el div respuesta");
      };

const pintaRespuesta = (valor: string) =>
  RESPUESTA_IBAN && RESPUESTA_IBAN instanceof HTMLDivElement
    ? RESPUESTA_IBAN.append(
        creaContenedorValidacion(valor),
        creaContenedorExtraccion(valor)
      )
    : () => {
        throw new Error("No se ha encontrado el div respuesta");
      };

if (BOTON_BUSQUEDA && BOTON_BUSQUEDA instanceof HTMLElement) {
  BOTON_BUSQUEDA.addEventListener("click", () => {
    if (CAMPO_TEXTO && CAMPO_TEXTO instanceof HTMLInputElement) {
      limpiaDivRespuesta();
      pintaRespuesta(CAMPO_TEXTO.value);
    }
  });
}
