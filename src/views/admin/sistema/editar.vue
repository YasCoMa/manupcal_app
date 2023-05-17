<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Editar sistema'" />
        </template>
        <template #content>
          <SistemaForm :id="parseInt(this.$route.params.id)" />
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
  name: "sistema-edit",
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
