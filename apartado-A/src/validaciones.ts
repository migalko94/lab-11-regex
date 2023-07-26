import * as ibantools from "ibantools";

const PATRON_IBAN =
  /^[A-Z]{2}(?<digitoControl>\d{2})(?<codigoBanco>\d{4})(?<codigoSucursal>\d{4})\d{2}(?<numeroCuenta>\d{10})$/;

const DEFAULT_BANCO = "no identificado";

const codigosBancos: { [codigoEntidad: string]: string } = {
  "2080": "Abanca Corporación Bancaria",
  "0061": "Banca March",
  "0188": "Banco Alcalá",
  "0182": "Banco Bilbao Vizcaya Argentaria",
  "0130": "Banco Caixa Geral",
  "0234": "Banco Caminos",
  "2105": "Banco Castilla-La Mancha",
  "0240": "Banco de Crédito Social Cooperativo",
  "0081": "Banco de Sabadell",
  "0487": "Banco Mare Nostrum",
  "0186": "Banco Mediolanum",
  "0238": "Banco Pastor",
  "0075": "Banco Popular Español",
  "0049": "Banco Santander",
  "3873": "Banco Santander Totta",
  "2038": "Bankia",
  "0128": "Bankinter",
  "0138": "Bankoa",
  "0152": "Barclays Bank PLC",
  "3842": "BNP Paribas Paris",
  "3025": "Caixa de Credit del Enginyers",
  "2100": "Caixabank",
  "2045": "Caja de Ahorros y Monte de Piedad de Ontinyent",
  "3035": "Caja Laboral Popular CC",
  "3081": "Caja Rural Castilla-La Mancha",
  "3058": "Cajamar Caja Rural",
  "2000": "Cecabank",
  "1474": "Citibank Europe PLC",
  "3821": "Commerzbank AG",
  "3877": "Danske Bank A/S",
  "0019": "Deutsche Bank SAE",
  "0239": "EVO Banco",
  "2085": "Ibercaja Banco",
  "1465": "ING Bank NV",
  "2095": "Kutxabank",
  "2048": "Liberbank",
  "0131": "Novo Banco",
  "0073": "Open Bank",
  "0108": "Société Générale",
  "2103": "Unicaja Banco",
};

const formateaValor = (valor: string) => valor.replace(/-|\.|\s/g, "");

const devuelveCoincidencias = (valor: string) =>
  PATRON_IBAN.exec(formateaValor(valor))?.groups as any;

const devuelveValidacion = (valor: string): boolean =>
  ibantools.isValidIBAN(valor);

export const estaBienFormadoIBAN = (valor: string): boolean =>
  PATRON_IBAN.test(formateaValor(valor));

export const esValidoIBAN = (valor: string): boolean => {
  const valorFormateado = formateaValor(valor);
  return valorFormateado ? devuelveValidacion(valorFormateado) : false;
};

export const extraeCodigoBanco = (valor: string) =>
  devuelveCoincidencias(valor)?.codigoBanco;

export const extraeDigitoControl = (valor: string) =>
  devuelveCoincidencias(valor)?.digitoControl;

export const extraeCodigoSucursal = (valor: string) =>
  devuelveCoincidencias(valor)?.codigoSucursal;

export const extraeNumeroCuenta = (valor: string) =>
  devuelveCoincidencias(valor)?.numeroCuenta;

export const asignaBanco = (codigoBanco: string) =>
  codigosBancos[codigoBanco] || DEFAULT_BANCO;
