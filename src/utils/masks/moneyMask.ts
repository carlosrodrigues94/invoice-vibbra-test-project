export function formatCurrency(amount: number) {
  return `R$ ${amount
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+,)/g, "$1.")}`;
}

export function addMoneyMask(amount: string) {
  return `R$ ${
    amount
      .replace(/\D/g, "") // permite digitar apenas números
      .replace(/[0-9]{12}/, "inválido") // limita pra máximo 999.999.999,99
      .replace(/(\d{1})(\d{8})$/, "$1.$2") // coloca ponto antes dos últimos 8 digitos
      .replace(/(\d{1})(\d{5})$/, "$1.$2") // coloca ponto antes dos últimos 5 digitos
      .replace(/(\d{1})(\d{1,2})$/, "$1,$2") // coloca virgula antes dos últimos 2 digitos
  }`;
}
