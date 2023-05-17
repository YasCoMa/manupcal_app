<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>

        <template #title>
          <TituloComponent :titulo="'Editar cliente'" />
        </template>
        
        <template #content>
          <ClienteForm :id="id" v-if="cliente_id!=1" />

          <pm-TabView v-model:activeIndex="activeIndex" v-else>
            <pm-TabPanel header="Editar Cliente">
              <ClienteForm :id="id" />
            </pm-TabPanel>

            <pm-TabPanel header="Editar Concessões">
              <ClienteConcessaoSistema :id="id"  />
            </pm-TabPanel>
          </pm-TabView>
        </template>
        
        <template #footer> </template>
      </pm-Card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClienteForm from "@/components/cliente/clienteForm.vue";
import ClienteConcessaoSistema from "@/components/cliente/ClienteConcessaoSistema.vue";
import TituloComponent from "@/components/TituloComponent.vue";

export default defineComponent({
  name: "sistema-edit",
  components: {
    ClienteForm,
    ClienteConcessaoSistema,
    TituloComponent,
  },

  data() {
    return {
      cliente_id: sessionStorage.getItem('cliente_id') == null ? 0 : parseInt(sessionStorage.getItem('cliente_id') as string),
      activeIndex: 0,
      id: 0,
    };
  },

  beforeMount() {
    this.id = parseInt(this.$route.params.id as string);
    var modo: any = this.$route.params.modo;
    if(modo!=null){
      if (modo == "edicao-do-cliente") {
        this.activeIndex = 0;
      }
      if (modo == "edicao-de-concessoes") {
        this.activeIndex = 1;
      }
    }
  },

  methods: {},
});
</script>

<style></style>
