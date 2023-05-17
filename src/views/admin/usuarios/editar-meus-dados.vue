<template>
    <section>
      <div class="wrapper">
        <pm-Card style="background-color: #f8f9fa">
          <template #header> </template>
          <template #title>
            <TituloComponent :titulo="'Alterar Meus Dados'"/>
          </template>
          <template #content>
             <UsuarioFormComponent :id="id" />
          </template>
          <template #footer> </template>
        </pm-Card>
      </div>
    </section>
  </template>
  
  <script >
  import { defineComponent } from 'vue';
  import UsuarioFormComponent from "@/components/usuario/UsuarioFormComponent.vue";
  import TituloComponent from "@/components/TituloComponent.vue";
  
  export default defineComponent({
    name: 'meus-dados-editar',
    components: {
      UsuarioFormComponent,TituloComponent
    },
   
    data() {
      return {
          id: sessionStorage.getItem('id') == null ? 0 : parseInt(sessionStorage.getItem('id'))
      }
    },
  
     beforeMount() {
      // console.log(this.$route.params.id)
    },
  
    methods: {
     
    },
  
  });
  </script>
  
  <style>
  
  </style>