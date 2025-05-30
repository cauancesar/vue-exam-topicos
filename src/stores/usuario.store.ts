import { useAnotacaoService } from '@/services/anotacao.service'
import { useUsuarioService } from '@/services/usuario.service'
import type { Anotacao } from '@/types/anotacao.interface'
import type { Usuario } from '@/types/usuario.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usuarioStore = defineStore('usuario', () => {
  const useUsuario = useUsuarioService()

  const loading = ref<boolean>(false)
  const erro = ref<string>('')
  const usuarios = ref<Usuario[]>([])

  async function atualizar() {
    loading.value = true
    try {
      usuarios.value = await useUsuario.getAll()
      erro.value = ''
    } catch (error) {
      erro.value = (error as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    erro,
    atualizar,
    usuarios,
  }
})
