export function calcularAntiguidade(dataHora: Date | string): string {
  const dataAnotacao = new Date(dataHora)
  const dataAtual = new Date()

  let anos = dataAtual.getFullYear() - dataAnotacao.getFullYear()
  let meses = dataAtual.getMonth() - dataAnotacao.getMonth()
  let dias = dataAtual.getDate() - dataAnotacao.getDate()

  let totalMeses = anos * 12 + meses
  if (dias < 0) {
    totalMeses -= 1
  }
  return totalMeses < 1 ? `0 meses` : `${totalMeses} meses`
}
