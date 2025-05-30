<template>
  <main>
    <section class="formulario">
      <form @submit.prevent="storeAnotacao.incluir" class="formulario">
        <div>
          <label>Texto: </label>
          <input type="text" v-model="storeAnotacao.texto" required />
        </div>

        <div>
          <label>Data/Hora: </label>
          <input type="datetime-local" v-model="storeAnotacao.dataHora" required />
        </div>

        <div>
          <label>Usuário:
            <select name="usuario" id="usuario" v-model="storeAnotacao.usuario.id" required>
              <option v-for="(user, index) in storeUsuario.usuarios" :key="index" :value="user.id">{{ user.nome }}
              </option>
            </select>
          </label>
        </div>
        <button type="submit">Incluir</button>
      </form>
      <p v-if="storeAnotacao.erro">{{ storeAnotacao.erro }}</p>
    </section>

    <section class="formulario">
      <form @submit.prevent="storeAnotacao.pesquisar">
        <div>
          <label>Texto: </label>
          <input type="text" v-model="storeAnotacao.textoPesquisa" required />
        </div>
        <div>
          <label>Usuário: </label>
          <select name="usuarioPesquisa" id="usuarioPesquisa" v-model="storeAnotacao.usuarioPesquisa.nome" required>
            <option v-for="(user, index) in storeUsuario.usuarios" :key="index" :value="user.nome">{{ user.nome }}
            </option>
          </select>
        </div>

        <button type="submit">Pesquisar</button>
      </form>
    </section>

    <button @click="storeAnotacao.atualizar">Buscar Todos</button>

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
          <tr v-if="storeAnotacao.loading">
            <td colspan="4">
              <Loading :loading="storeAnotacao.loading" />
            </td>
          </tr>
          <tr v-else v-for="(anotacao, index) in storeAnotacao.anotacoes" :key="index">
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
import { anotacaoStore } from '@/stores/anotacao.store';
import { usuarioStore } from '@/stores/usuario.store';
import { calcularAntiguidade } from '@/utils/date';
import { onMounted } from 'vue';

const storeAnotacao = anotacaoStore()
const storeUsuario = usuarioStore()

onMounted(async () => {
  await storeAnotacao.atualizar()
  await storeUsuario.atualizar()
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
