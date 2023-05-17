<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Criar novo cliente'" />
        </template>
        <template #content>
          <ClienteForm :id="0" />
        </template>
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClienteForm from "@/components/cliente/clienteForm.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "cliente-add",
  components: {
    ClienteForm,
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
