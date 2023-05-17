<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Criar nova Permissão'" />
        </template>
        <template #content>
          <PermissaoFormComponent :id="0" :editar="0" :sistema="0" />
        </template>
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PermissaoFormComponent from "@/components/permissao/PermissaoFormComponent.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "permissao-add",
  components: {
    PermissaoFormComponent,
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
