import type { Anotacao } from '@/types/anotacao.interface'
import axios from 'axios'

export async function getAnotacoes(): Promise<Array<Anotacao>> {
  const anotacoes: Array<Anotacao> = (await axios.get('/anotacao')).data
  return anotacoes
}

export async function createAnotacao(details: Partial<Anotacao>) {
  const anotacao = (await axios.post('/anotacao', details)).data
  return anotacao
}

export async function searchAnotacao(nome: string, texto: string): Promise<Array<Anotacao>> {
  const anotacoes: Array<Anotacao> = (await axios.get(`/anotacao/${nome}/${texto}`)).data
  return anotacoes
}
