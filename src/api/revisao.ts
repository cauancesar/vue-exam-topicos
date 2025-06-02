import type { Revisao } from '@/types/revisao.interface'
import axios from 'axios'

export async function getRevisoes(): Promise<Array<Revisao>> {
  const revisoes: Array<Revisao> = (await axios.get('/revisao')).data
  return revisoes
}

export async function createRevisao(details: Partial<Revisao>) {
  const revisao = (await axios.post('/revisao', details)).data
  return revisao
}

export async function searchRevisao(titulo: string, conteudo: string): Promise<Array<Revisao>> {
  const anotacoes: Array<Revisao> = (await axios.get(`/revisao/${titulo}/${conteudo}`)).data
  return anotacoes
}
