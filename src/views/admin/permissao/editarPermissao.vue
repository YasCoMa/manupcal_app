<template>
  <section>
    <div class="wrapper">
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        
        <template #title>
          <TituloComponent :titulo="'Editar Permissão'" />
        </template>

        <template #content>
          <PermissaoFormComponent :id="permissao.id" :editar="1" :sistema="permissao.sistema_id" />
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

import IPermissao from "@/interfaces/IPermissao";
import { usePermissaoStore } from "@/store/permissao/permissaoStore";

export default defineComponent({
  name: "permissao-editar",
  components: {
    PermissaoFormComponent,
    TituloComponent,
  },
  setup(props) {
    const permissaoStore = usePermissaoStore();

    return {
      permissaoStore,
    };
  },
  data() {
    return {
      permissao: {} as IPermissao,
    };
  },

  async beforeMount() {
    //console.log(this.$route.params.id)
    var id = this.$route.params.id;
    if(id!=null){
      id = this.$route.params.id as string;
      this.permissao.id = parseInt(id);
    }
    else{
      this.permissao.id = 0;
    }
    this.permissao = await this.permissaoStore.getOnePermissaoCliente(this.permissao.id);
  },

  methods: {},
});
</script>

<style></style>
