<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Criar novo sistema'" />
        </template>
        <template #content>
          <SistemaForm :id="0" />
        </template>
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SistemaForm from "@/components/sistema/sistemaForm.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "sistema-add",
  components: {
    SistemaForm,
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
