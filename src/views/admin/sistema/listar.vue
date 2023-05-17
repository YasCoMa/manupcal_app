<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Lista de Sistemas'" />
        </template>
        <template #content>
          <SistemaLista />
        </template>
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SistemaLista from "@/components/sistema/sistemaLista.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "sistema-list",
  props: {
    id: null,
  },
  components: {
    SistemaLista,
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
