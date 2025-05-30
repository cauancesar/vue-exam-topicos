import { useAnotacaoService } from '@/services/anotacao.service'
import type { Anotacao } from '@/types/anotacao.interface'
import type { Usuario } from '@/types/usuario.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const anotacaoStore = defineStore('anotacao', () => {
  const useAnotacao = useAnotacaoService()

  const loading = ref<boolean>(false)
  const texto = ref<string>('')
  const dataHora = ref<Date>()
  const erro = ref<string>('')
  const usuario = ref<Usuario>({
    id: 0,
    nome: '',
    autorizacoes: [],
  })

  const textoPesquisa = ref<string>('')
  const usuarioPesquisa = ref<Usuario>({
    id: 0,
    nome: '',
    autorizacoes: [],
  })

  const anotacoes = ref<Anotacao[]>([
    {
      id: 0,
      texto: '',
      dataHora: new Date(),
      usuario: {
        id: 0,
        nome: '',
        autorizacoes: [],
      },
    },
  ])

  async function atualizar() {
    loading.value = true
    try {
      anotacoes.value = await useAnotacao.getAll()
      erro.value = ''
    } catch (error) {
      erro.value = (error as Error).message
    } finally {
      loading.value = false
    }
  }

  async function pesquisar() {
    loading.value = true
    try {
      anotacoes.value = await useAnotacao.search(usuarioPesquisa.value.nome, textoPesquisa.value)
      erro.value = ''
    } catch (error) {
      erro.value = (error as Error).message
    } finally {
      loading.value = false
    }
  }

  async function incluir() {
    try {
      const details: Partial<Anotacao> = {
        texto: texto.value,
        dataHora: dataHora.value,
        usuario: usuario.value,
      }
      await useAnotacao.create(details)

      erro.value = ''
      texto.value = ''
      dataHora.value = undefined
      usuario.value.id = 0

      atualizar()
    } catch (error) {
      erro.value = (error as Error).message
    }
  }

  return {
    loading,
    texto,
    dataHora,
    erro,
    usuario,
    textoPesquisa,
    usuarioPesquisa,
    anotacoes,
    atualizar,
    pesquisar,
    incluir,
  }
})
