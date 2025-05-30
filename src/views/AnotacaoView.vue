<template>
  <main>
    <section class="formulario">
      <form @submit.prevent="incluir" class="formulario">
        <div>
          <label>Texto: </label>
          <input type="text" v-model="texto" required />
        </div>

        <div>
          <label>Data/Hora: </label>
          <input type="datetime-local" v-model="dataHora" required />
        </div>

        <div>
          <label>Usuário:
            <select name="usuario" id="usuario" v-model="usuario.id" required>
              <option v-for="(user, index) in usuarios" :key="index" :value="user.id">{{ user.nome }}</option>
            </select>
          </label>
        </div>
        <button type="submit">Incluir</button>
      </form>
      <p v-if="erro">{{ erro }}</p>
    </section>

    <section class="formulario">
      <form @submit.prevent="pesquisar">
        <div>
          <label>Texto: </label>
          <input type="text" v-model="textoPesquisa" required />
        </div>
        <div>
          <label>Usuário: </label>
          <select name="usuarioPesquisa" id="usuarioPesquisa" v-model="usuarioPesquisa.nome" required>
            <option v-for="(user, index) in usuarios" :key="index" :value="user.nome">{{ user.nome }}</option>
          </select>
        </div>

        <button type="submit">Pesquisar</button>
      </form>
    </section>

    <button @click="atualizar">Buscar Todos</button>

    <section>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Texto</td>
            <td>Antiguidade</td>
            <td>Usuário</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4">
              <Loading :loading="loading" />
            </td>
          </tr>
          <tr v-else v-for="(anotacao, index) in anotacoes" :key="index">
            <td>{{ anotacao.id }}</td>
            <td>{{ anotacao.texto }}</td>
            <td>{{ calcularAntiguidade(anotacao.dataHora) }}</td>
            <td>{{ anotacao.usuario.nome }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import { useAnotacaoService } from '@/services/anotacao.service';
import { useUsuarioService } from '@/services/usuario.service';
import type { Anotacao } from '@/types/anotacao.interface';
import type { Usuario } from '@/types/usuario.interface';
import { onMounted, ref } from 'vue';

const useAnotacao = useAnotacaoService()
const useUsuario = useUsuarioService()

const textoPesquisa = ref<string>('')
const usuarioPesquisa = ref<Usuario>({
  id: 0,
  nome: '',
  autorizacoes: []
})

const loading = ref<boolean>(false)
const texto = ref<string>('')
const dataHora = ref<Date>()
const erro = ref<string>('')
const usuario = ref<Usuario>({
  id: 0,
  nome: '',
  autorizacoes: []
})

const usuarios = ref<Usuario[]>([{
  id: 0,
  nome: '',
  autorizacoes: []
}])
const anotacoes = ref<Anotacao[]>([{
  id: 0,
  texto: '',
  dataHora: new Date(),
  usuario: {
    id: 0,
    nome: '',
    autorizacoes: []
  }
}])

function calcularAntiguidade(dataHora: Date | string): string {
  const dataAnotacao = new Date(dataHora)
  const dataAtual = new Date()

  let anos = dataAtual.getFullYear() - dataAnotacao.getFullYear()
  let meses = dataAtual.getMonth() - dataAnotacao.getMonth()
  let dias = dataAtual.getDate() - dataAnotacao.getDate()

  let totalMeses = anos * 12 + meses
  if (dias < 0) {
    totalMeses -= 1
  }
  return totalMeses < 1 ? `0 meses` : `${totalMeses} meses`
}

async function atualizar() {
  loading.value = true
  try {
    anotacoes.value = await useAnotacao.getAll()
    usuarios.value = await useUsuario.getAll()
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
      usuario: usuario.value
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

onMounted(() => {
  atualizar()
})
</script>

<style lang="css" scoped>
main {
  max-width: 800px;
  margin: 32px auto;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.formulario form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
}

.formulario label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  min-width: 180px;
}

.formulario input,
.formulario select {
  margin-top: 4px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.formulario form button {
  max-width: 120px;
  padding: 8px 16px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.formulario form button:hover {
  background: #1565c0;
}

select {
  width: 100%;
}

button {
  margin: 16px 0;
  padding: 8px 20px;
  background: #388e3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}

button:hover {
  background: #2e7031;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background: #1976d2;
  color: #fff;
}

td,
th {
  padding: 10px 8px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

tbody tr:hover {
  background: #3f4e58;
}

p[ v-if="erro"] {
  color: #d32f2f;
  font-weight: bold;
  margin-top: 8px;
}
</style>
