import type { Autorizacoes } from './autorizacoes.interface'

export interface Usuario {
  id: number
  nome: string
  autorizacoes: Array<Autorizacoes>
}
