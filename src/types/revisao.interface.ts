import type { Trabalho } from './trabalho.interface'

export interface Revisao {
  id: number
  conteudo: string
  dataHora: Date
  tipo: string | null
  trabalho: Trabalho
}
