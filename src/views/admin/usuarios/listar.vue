<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Lista de Usuários'" />
        </template>
        <template #content>
          <UsuarioListaComponent />
        </template>
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UsuarioListaComponent from "@/components/usuario/UsuarioListaComponent.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "permissao-view",
  props: {
    id: null,
  },
  components: {
    UsuarioListaComponent,
    TituloComponent,
  },

  data() {
    return {};
  },

  beforeMount() {},

  methods: {},
});
</script>

<style></style>
