import { useTrabalhoService } from '@/services/trabalho.service'
import type { Trabalho } from '@/types/trabalho.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const trabalhoStore = defineStore('trabalho', () => {
  const useTrabalho = useTrabalhoService()

  const loading = ref<boolean>(false)
  const erro = ref<string>('')
  const trabalhos = ref<Trabalho[]>([])

  async function atualizar() {
    loading.value = true
    try {
      trabalhos.value = await useTrabalho.getAll()
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
    trabalhos,
  }
})
