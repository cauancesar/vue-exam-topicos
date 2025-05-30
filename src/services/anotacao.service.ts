import { createAnotacao, getAnotacoes, searchAnotacao } from '@/api/anotacao'
import type { Anotacao } from '@/types/anotacao.interface'

export function useAnotacaoService() {
  async function getAll(): Promise<Anotacao[]> {
    return await getAnotacoes()
  }

  async function create(details: Partial<Anotacao>) {
    return await createAnotacao(details)
  }

  async function search(nomeUsuario: string, textoPesquisa: string) {
    const base64Nome = encodeURIComponent(nomeUsuario)
    const base64Texto = encodeURIComponent(textoPesquisa)

    return await searchAnotacao(base64Nome, base64Texto)
  }

  return {
    getAll,
    create,
    search,
  }
}
