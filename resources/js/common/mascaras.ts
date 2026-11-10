export const somenteDigitos = (valor: string, limite?: number) => {
  const limpo = valor.replace(/\D/g, "");
  return limite ? limpo.slice(0, limite) : limpo;
};

export const sanitizarCnpj = (valor: string) =>
  valor.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 14);

export const mascararCnpj = (valor: string) => {
  const limpo = sanitizarCnpj(valor);
  return limpo
    .replace(/^(.{2})(.)/, "$1.$2")
    .replace(/^(.{2})\.(.{3})(.)/, "$1.$2.$3")
    .replace(/^(.{2})\.(.{3})\.(.{3})(.)/, "$1.$2.$3/$4")
    .replace(/^(.{2})\.(.{3})\.(.{3})\/(.{4})(.)/, "$1.$2.$3/$4-$5");
};

export const mascararCep = (valor: string) =>
  somenteDigitos(valor, 8).replace(/^(\d{5})(\d)/, "$1-$2");

export const mascararTelefone = (valor: string) => {
  const digitos = somenteDigitos(valor, 11);
  if (digitos.length <= 10) {
    return digitos.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digitos.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};

const digitoCnpj = (base: string, pesos: number[]) => {
  const soma = [...base].reduce((total, caractere, indice) =>
    total + (caractere.charCodeAt(0) - 48) * pesos[indice], 0);
  const resto = soma % 11;
  return String(resto < 2 ? 0 : 11 - resto);
};

export const cnpjValido = (valor: string) => {
  const cnpj = sanitizarCnpj(valor);
  if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj) || /^(.)\1{13}$/.test(cnpj)) return false;
  const base = cnpj.slice(0, 12);
  const primeiro = digitoCnpj(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const segundo = digitoCnpj(base + primeiro, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return cnpj.slice(-2) === primeiro + segundo;
};
