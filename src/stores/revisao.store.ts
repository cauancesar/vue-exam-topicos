import { useRevisaoService } from '@/services/revisao.service'
import type { Revisao } from '@/types/revisao.interface'
import type { Trabalho } from '@/types/trabalho.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const revisaoStore = defineStore('revisao', () => {
  const useRevisao = useRevisaoService()

  const loading = ref<boolean>(false)
  const erro = ref<string>('')
  const revisoes = ref<Revisao[]>([])

  const trabalho = ref<Trabalho>({
    id: 0,
    titulo: '',
    dataHoraEntrega: new Date(),
    descricao: '',
    grupo: '',
    nota: 0,
    justificativa: ''
  })

  const conteudo = ref<string>('')
  const dataHora = ref<Date>()
  const tipo = ref<string | null>(null)

  const trabalhoPesquisa = ref<Trabalho>({
    id: 0,
    titulo: '',
    dataHoraEntrega: new Date(),
    descricao: '',
    grupo: '',
    nota: 0,
    justificativa: ''
  })
  const conteudoPesquisa = ref<string>('')


  async function atualizar() {
    loading.value = true
    try {
      revisoes.value = await useRevisao.getAll()
      erro.value = ''
    } catch (error) {
      erro.value = (error as Error).message
    } finally {
      loading.value = false
    }
  }

  async function incluir() {
    try {
      const details: Partial<Revisao> = {
        conteudo: conteudo.value,
        dataHora: dataHora.value,
        tipo: tipo.value,
        trabalho: trabalho.value
      }
      await useRevisao.create(details)

      erro.value = ''
      conteudo.value = ''
      dataHora.value = undefined
      tipo.value = null
      trabalho.value.id = 0

      atualizar()
    } catch (error) {
      erro.value = (error as Error).message
    }
  }

  async function pesquisar() {
    loading.value = true
    try {
      revisoes.value = await useRevisao.search(conteudoPesquisa.value, trabalhoPesquisa.value.titulo)
      erro.value = ''
    } catch (error) {
      erro.value = (error as Error).message
    } finally {
      loading.value = false
      conteudoPesquisa.value = ''
      trabalhoPesquisa.value.titulo = ''
    }
  }

  return {
    conteudoPesquisa,
    trabalhoPesquisa,
    pesquisar,
    loading,
    conteudo,
    dataHora,
    tipo,
    trabalho,
    erro,
    atualizar,
    revisoes,
    incluir
  }
})
