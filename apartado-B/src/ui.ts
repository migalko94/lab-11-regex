import { BOTON_EXTRACCION, CAMPO_TEXTO, RESPUESTA_IMG } from "./constantes";
import { extraeUrlPatrones } from "./motor";

const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = `${texto}`;
  return parrafo;
};

const creaElementoImagen = (url: string): HTMLImageElement => {
  const imagen = document.createElement("img");
  imagen.src = url;
  return imagen;
};

const creaContenedorImagenes = (texto: string): HTMLDivElement => {
  const divMuestra = document.createElement("div");
  divMuestra.classList.add("muestra-img");
  extraeUrlPatrones(texto).forEach((url) => {
    divMuestra.append(creaElementoImagen(url));
  });

  return divMuestra;
};

const creaContenedorEnlaces = (texto: string): HTMLDivElement => {
  const divMuestra = document.createElement("div");
  divMuestra.classList.add("muestra-enlaces");
  extraeUrlPatrones(texto).forEach((url) => {
    divMuestra.append(crearElementoParrafo(url));
  });

  return divMuestra;
};

const limpiaDivRespuesta = () => {
  if (RESPUESTA_IMG && RESPUESTA_IMG instanceof HTMLDivElement) {
    RESPUESTA_IMG.innerHTML = "";
  }
};

const pintaRespuesta = (texto: string) => {
  if (RESPUESTA_IMG && RESPUESTA_IMG instanceof HTMLDivElement) {
    RESPUESTA_IMG.append(
      creaContenedorImagenes(texto),
      creaContenedorEnlaces(texto)
    );
  }
};

if (BOTON_EXTRACCION && BOTON_EXTRACCION instanceof HTMLElement) {
  BOTON_EXTRACCION.addEventListener("click", () => {
    if (CAMPO_TEXTO && CAMPO_TEXTO instanceof HTMLTextAreaElement) {
      limpiaDivRespuesta();
      pintaRespuesta(CAMPO_TEXTO.value);
    }
  });
}
