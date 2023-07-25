import {
  asignaBanco,
  esValidoIBAN,
  estaBienFormadoIBAN,
  extraeCodigoSucursal,
  extraeDigitoControl,
  extraeCodigoBanco,
  extraeNumeroCuenta,
} from "./validaciones";

describe("estaBienFormadoIBAN", () => {
  test.each([
    ["ES21 1465 0100 72 2030876293", true],
    ["ES66 2100 0418 40 1234567891", true],
    ["ES2114650100722030876293", true],
    ["ES21-1465-0100-72-2030876293", true],
    ["ES6621000418401234567891", true],
    ["2021 1465 0100 72 2030876293", false],
    ["ES211465010072203087629", false],
    ["E121-1465-0100-72-2030876293", false],
    ["ES66210004184012345678912", false],
    ["ES21a1465-0100b72c2030876293", false],
    ["ES21_1465-0100_72-2030876293", false],
    ["es2114650100722030876293", false],
  ])(
    "Deberia devolver para el IBAN %s el valor %s. Queremos poder leer IBAN con espacios, sin espacios, o guiones. No queremos poder leerlo con números de más, de menos, sin letras, con letras de menos, de más,con caracteres distintos del guión medio, con letras interpuestas, con el código de país en minúsculas",
    (valor: string, expected: boolean) => {
      expect(estaBienFormadoIBAN(valor)).toBe(expected);
    }
  );
});

describe("esValidoIBAN", () => {
  test.each([
    ["ES6621000418401234567891", true],
    ["ES6000491500051234567892", true],
    [" ES9420805801101234567891", true],
    ["ES9000246-912501234567891", true],
    ["ES0000000000000000000000", false],
  ])(
    "Deberia devolver para el IBAN %s el valor %s. Testeamos la validación del IBAN de la biblioteca externa 'ibantools' con IBAN bien formados, pero no válidos",
    (valor: string, expected: boolean) => {
      expect(esValidoIBAN(valor)).toBe(expected);
    }
  );
});

describe("extraeCodigoBanco", () => {
  test.each([
    ["ES9420805801101234567891", "2080"],
    ["ES6621000418401234567891", "2100"],
    ["ES6000491500051234567892", "0049"],
  ])(
    "Deberia devolver para el IBAN %s el valor %s. Devuelve los dígitos correspondientes al código de la entidad bancaria, esto es, los 4 primeros tras los dígitos de control",
    (valor: string, expected: string) => {
      expect(extraeCodigoBanco(valor)).toBe(expected);
    }
  );
});

describe("asignaBanco", () => {
  test.each([
    ["0049", "Banco Santander"],
    ["0019", "Deutsche Bank SAE"],
    ["1465", "ING Bank NV"],
    ["0182", "Banco Bilbao Vizcaya Argentaria"],
    ["0128", "Bankinter"],
    ["0234", "Banco Caminos"],
    ["0081", "Banco de Sabadell"],
  ])(
    "Deberia devolver para el código de entidad bancaria %s el banco %s. Devuelve el banco correspondiente al código de entidad bancaria",
    (valor: string, expected: string) => {
      expect(asignaBanco(valor)).toBe(expected);
    }
  );
});

describe("extraeDigitoControl", () => {
  test.each([
    ["ES9420805801101234567891", "94"],
    ["ES6621000418401234567891", "66"],
    ["ES6000491500051234567892", "60"],
  ])(
    "Deberia devolver para el IBAN %s el valor %s. Devuelve los dígitos de control, esto es, los dos primeros",
    (valor: string, expected: string) => {
      expect(extraeDigitoControl(valor)).toBe(expected);
    }
  );
});

describe("extraeCodigoSucursal", () => {
  test.each([
    ["ES9420805801101234567891", "5801"],
    ["ES1000492352082414205416", "2352"],
    ["ES9121000418450200051332", "0418"],
  ])(
    "Deberia devolver para el IBAN %s el valor %s. Devuelve el código de la sucursal, esto es, los cuatro números siguientes al código del banco",
    (valor: string, expected: string) => {
      expect(extraeCodigoSucursal(valor)).toBe(expected);
    }
  );
});

describe("extraeNumeroCuenta", () => {
  test.each([
    ["ES9420805801101234567891", "1234567891"],
    ["ES1000492352082414205416", "2414205416"],
    ["ES9121000418450200051332", "0200051332"],
  ])(
    "Deberia devolver para el IBAN %s el valor %s. Devuelve el número de cuenta, esto es, los diez últimos números",
    (valor: string, expected: string) => {
      expect(extraeNumeroCuenta(valor)).toBe(expected);
    }
  );
});
