<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Lista de Clientes'" />
        </template>
        <template #content>
          <ClienteLista />
        </template>
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClienteLista from "@/components/cliente/clienteLista.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "cliente-list",
  props: {
    id: null,
  },
  components: {
    ClienteLista,
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
