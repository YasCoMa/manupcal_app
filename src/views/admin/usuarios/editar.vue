<template>
  <section>
    <div class="wrapper"  v-if="!loading" >
      <pm-Card style="background-color: #f8f9fa">
        <template #header> </template>
        <template #title>
          <TituloComponent :titulo="'Editar Usuário'" />
        </template>

        <template #content>
          <UsuarioFormComponent :id="usuario.id" v-if="cliente_id!=1" />

          <pm-TabView v-model:activeIndex="activeIndex" v-else>
            <pm-TabPanel header="Editar Usuário">
              <UsuarioFormComponent :id="usuario.id" />
            </pm-TabPanel>

            <pm-TabPanel header="Editar Permissões">
              <UsuarioHabilitacaoPermissao :id="usuario.id" :cliente_id="usuario.cliente_id" />
            </pm-TabPanel>
          </pm-TabView>

        </template>
        
        <template #footer> </template>
      </pm-Card>
    </div>

    <div
      v-if="loading"
      class="col-md-12"
      style="text-align: center; padding-top: 255px"
    >
      <pm-ProgressSpinner />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UsuarioFormComponent from "@/components/usuario/UsuarioFormComponent.vue";
import UsuarioHabilitacaoPermissao from "@/components/usuario/UsuarioHabilitacaoPermissao.vue";
import TituloComponent from "@/components/TituloComponent.vue";

import IUsuario from "@/interfaces/IUsuario";
import { useUsuarioStore } from "@/store/usuario/usuarioStore";

export default defineComponent({
  name: "usuario-editar",
  props: {
    id: null,
  },
  components: {
    UsuarioFormComponent,
    TituloComponent,
    UsuarioHabilitacaoPermissao
  },
  setup(props) {
    const usuarioStore = useUsuarioStore();

    return {
      usuarioStore,
    };
  },
  data() {
    return {
      usuario: {} as IUsuario,
      cliente_id: sessionStorage.getItem('cliente_id') == null ? 0 : parseInt(sessionStorage.getItem('cliente_id') as string),
      activeIndex: 0,
      loading: false,
    };
  },

  async beforeMount() {
    this.loading=true;

    this.usuario.id = 0;

    // console.log(this.$route.params.id);
    var id = this.$route.params.id;
    if(id!=null){
      id = this.$route.params.id as string;
      this.usuario.id = parseInt(id);
    }
    else{
      this.usuario.id = 0;
    }
    this.usuario = await this.usuarioStore.getOne(this.usuario.id);

    var modo: any = this.$route.params.modo;
    if(modo!=null){
      if (modo == "edicao-de-usuario") {
        this.activeIndex = 0;
      }
      if (modo == "edicao-de-permissoes") {
        this.activeIndex = 1;
      }
    }
    this.loading=false;
  },

  methods: {},
});
</script>

<style></style>
