<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Criar novo usuário'" />
        </template>
        <template #content>
          <UsuarioFormComponent :id="0" />
        </template>
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UsuarioFormComponent from "@/components/usuario/UsuarioFormComponent.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "permissao-add",
  components: {
    UsuarioFormComponent,
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
