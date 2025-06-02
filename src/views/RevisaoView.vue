<template>
  <main>
    <h1>Revisão de Trabalhos</h1>

    <section class="formulario">
      <form @submit.prevent="storeRevisao.incluir" class="formulario">
        <div>
          <label>Conteudo: </label>
          <input type="text" v-model="storeRevisao.conteudo" required />
        </div>

        <div>
          <label>Data/Hora: </label>
          <input type="datetime-local" v-model="storeRevisao.dataHora" required />
        </div>

        <div>
          <label>Tipo: </label>
          <input type="text" v-model="storeRevisao.tipo" />
        </div>

        <div>
          <label>Trabalho:
            <select name="trabalho" id="trabalho" v-model="storeRevisao.trabalho.id" required>
              <option v-for="(trabalho, index) in storeTrabalho.trabalhos" :key="index" :value="trabalho.id">
                Trabalho {{ trabalho.titulo }} - Grupo {{ trabalho.grupo }}
              </option>
            </select>
          </label>
        </div>
        <button type="submit">Incluir</button>
      </form>
      <p v-if="storeRevisao.erro">{{ storeRevisao.erro }}</p>
    </section>

    <section class="formulario">
      <form @submit.prevent="storeRevisao.pesquisar">
        <div>
          <label>Conteúdo: </label>
          <input type="text" v-model="storeRevisao.conteudoPesquisa" required />
        </div>
        <div>
          <label>Trabalho: </label>
          <select name="trabalhoPesquisa" id="trabalhoPesquisa" v-model="storeRevisao.trabalhoPesquisa.titulo" required>
            <option v-for="(trabalho, index) in storeTrabalho.trabalhos" :key="index" :value="trabalho.titulo">
              {{ trabalho.titulo }}
            </option>
          </select>
        </div>

        <button type="submit">Pesquisar</button>
      </form>
    </section>

    <button @click="storeRevisao.atualizar">Buscar Todos</button>

    <section>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Conteúdo</td>
            <td>Título do Trabalho</td>
            <td>Grupo</td>
            <td>Estado</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="storeRevisao.loading">
            <td colspan="4">
              <Loading :loading="storeRevisao.loading" />
            </td>
          </tr>
          <tr v-else-if="storeRevisao.revisoes.length <= 0">
            <td colspan="4">
              <h3>Nenhum registro foi encontrado para os critérios fornecidos</h3>
            </td>
          </tr>
          <tr v-else v-for="(revisao, index) in storeRevisao.revisoes" :key="index">
            <td>{{ revisao.id }}</td>
            <td>{{ revisao.conteudo }}</td>
            <td>{{ revisao.trabalho.titulo }}</td>
            <td>{{ revisao.trabalho.grupo }}</td>
            <td>{{ revisao.trabalho.nota !== null ? 'finalizada' : 'pendente' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import { revisaoStore } from '@/stores/revisao.store';
import { trabalhoStore } from '@/stores/trabalho.store';
import { onMounted } from 'vue';

const storeRevisao = revisaoStore()
const storeTrabalho = trabalhoStore()

onMounted(async () => {
  await storeTrabalho.atualizar()
  await storeRevisao.atualizar()
})
</script>

<style lang="css" scoped>
h1 {
  text-align: center;;
}
h3 {
  text-align: center;
}
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
