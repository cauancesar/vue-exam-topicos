import { getUsuarios } from '@/api/usuario'
import type { Usuario } from '@/types/usuario.interface'

export function useUsuarioService() {
  async function getAll(): Promise<Usuario[]> {
    return await getUsuarios()
  }

  return {
    getAll,
  }
}
