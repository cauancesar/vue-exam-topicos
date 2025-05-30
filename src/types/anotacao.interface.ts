import type { Usuario } from './usuario.interface'

export interface Anotacao {
  id: number
  texto: string
  dataHora: Date
  usuario: Usuario
}
