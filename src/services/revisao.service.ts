import { createRevisao, getRevisoes, searchRevisao } from '@/api/revisao'
import type { Revisao } from '@/types/revisao.interface'

export function useRevisaoService() {
  async function getAll(): Promise<Revisao[]> {
    return await getRevisoes()
  }

  async function create(details: Partial<Revisao>) {
    return await createRevisao(details)
  }

  async function search(conteudo: string, tituloTrabalho: string) {
    const base64conteudo = encodeURIComponent(conteudo)
    const base64titulo = encodeURIComponent(tituloTrabalho)

    console.log(base64conteudo, base64titulo);

    return await searchRevisao(tituloTrabalho, conteudo)
  }

  return {
    getAll,
    create,
    search
  }
}
