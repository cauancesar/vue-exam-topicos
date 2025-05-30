import type { Usuario } from '@/types/usuario.interface'
import axios from 'axios'

export async function getUsuarios(): Promise<Array<Usuario>> {
  const usuarios: Array<Usuario> = (await axios.get('/usuario')).data
  return usuarios
}
