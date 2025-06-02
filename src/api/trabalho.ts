import type { Trabalho } from '@/types/trabalho.interface'
import axios from 'axios'

export async function getTrabalho(): Promise<Array<Trabalho>> {
  const trabalhos: Array<Trabalho> = (await axios.get('/trabalho')).data
  return trabalhos
}
