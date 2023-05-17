<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Lista de Permissões'" />
        </template>
        <template #content>
          <PermissaoListaComponent />
        </template>
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PermissaoListaComponent from "@/components/permissao/PermissaoListaComponent.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "permissao-view",
  props: {
    id: null,
  },
  components: {
    PermissaoListaComponent,
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
