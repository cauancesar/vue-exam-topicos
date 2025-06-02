import { getTrabalho } from '@/api/trabalho'
import type { Trabalho } from '@/types/trabalho.interface'

export function useTrabalhoService() {
  async function getAll(): Promise<Trabalho[]> {
    return await getTrabalho()
  }

  return {
    getAll,
  }
}
