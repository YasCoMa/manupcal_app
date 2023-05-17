<template>
  <section v-if="!carregandoPagina">
    <pm-DataTable
      :value="usuarios"
      dataKey="id"
      v-model:filters="filters"
      :rowHover="true"
      filterDisplay="menu"
      responsiveLayout="scroll"
      :rows="20"
      :paginator="true"
    >
      <template #header>
        <div class="p-fluid formgrid grid" style="font-size: 12px">
          <div class="field col-7 md:col-6 lg:col-3" style="margin: 0px">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <pm-InputText
                v-model="filters['global'].value"
                placeholder="Pesquisar nome do usuário"
              />
            </span>
          </div>

          <div class="field col-0 md:col-6 lg:col-7" style="margin: 0px"></div>
          <div class="field col-5 md:col-6 lg:col-2" style="margin: 0px">
            <pm-Button
              type="button"
              label="Cadastrar"
              title="Cadastrar"
              @click="$router.push({ name: 'cadastrar-usuario' })"
              class="p-button-sm p-button-success"
            >
            </pm-Button>
          </div>
        </div>
      </template>
      <!-- <pm-Column
        field="nome"
        sortable
        header="Nome"
        style="font-size: 14px; vertical-align: middle !important"
      ></pm-Column> -->

      <pm-Column
        field="nome"
        sortable
        header="NOME"
        style="font-size: 14px; vertical-align: middle !important"
      >
        <template #body="{ data }">
          {{ data.nome + " " + data.sobrenome }}
        </template>
      </pm-Column>

      <pm-Column
        field="cliente.nome"
        sortable
        header="Cliente"
        style="font-size: 14px; vertical-align: middle !important"
      ></pm-Column>

      <pm-Column
        field="acao"
        header="AÇÕES"
        headerStyle="width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible;width: 357px;vertical-align:middle !important"
      >
        <template #body="{ data }">
          <div class="field col-12 md:col-12 lg:col-12">
            <pm-Button
              type="button"
              icon="pi pi-pencil"
              label="Editar"
              title="Editar"
              @click="editarUsuario(data, data.id)"
              style="margin-left: 5px"
              class="p-button-sm p-button-info p-button-raised btn--responsive"
            >
              <span
                class="pi pi-pencil p-button-icon p-button-icon-left icon--responsive"
              ></span>
              <span class="p-button-label label--responsive">Editar</span>

            </pm-Button>

            <pm-Button
              type="button"
              icon="pi pi-pencil"
              label="Editar"
              title="Editar Permissões"
              @click="editarPermissoes(data, data.id)"
              style="margin-left: 5px"
              class="p-button-sm p-button-raised p-button-secondary btn--responsive"
              v-if="cliente_id==1"
            >
              <span
                class="pi pi-pencil p-button-icon p-button-icon-left icon--responsive"
              ></span>
              <span class="p-button-label label--responsive">Editar Permissões</span>
            </pm-Button>

            <pm-Button
              type="button"
              label="Apagar"
              title="Apagar Permissão"
              @click="apagarUsuario(data.id)"
              style="margin-left: 5px"
              class="p-button-sm p-button-raised p-button-danger buttonAjuste"
            >
              <span
                class="pi pi-times-circle p-button-icon p-button-icon-left icon--responsive"
              ></span>
              <span class="p-button-label label--responsive">Apagar</span>
            </pm-Button>
          </div>
        </template>
      </pm-Column>
    </pm-DataTable>

    <!--Paginação-->
    <!---  <div class="p-paginator p-component p-paginator-bottom" >
         <div class="p-paginator-pages" style="display: inline-flex;">
           <div  v-for="n in links" :key="n">
             <button class="p-paginator-next p-paginator-element p-link" @click="paginas(n)" v-if="!n.active"
             style="border: 0px solid #ebebeb;border-radius: 0;">
               <p class="p-paginator-icon " v-html="n.label"  style="margin-bottom:0px !important;"></p>
             </button>
             <button class="p-paginator-page p-paginator-element p-link p-highlight" @click="paginas(n)" v-if="n.active" style="border-radius: 0;">{{n.label}}</button>
           </div>
         </div>
       </div>-->
    <pm-ConfirmDialog
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '50vw' }"
    ></pm-ConfirmDialog>
  </section>
  <div
    v-if="carregandoPagina"
    class="col-md-12"
    style="text-align: center; padding-top: 255px"
  >
    <pm-ProgressSpinner />
  </div>
</template>

<script lang="ts">
import { useUsuarioStore } from "@/store/usuario/usuarioStore";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { computed, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "UsuarioListaComponent",
  data() {
    return {
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nome: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        sec: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      },
      carregandoPagina: false,
      links: "",
      cliente_id: sessionStorage.getItem('cliente_id') == null ? 0 : parseInt(sessionStorage.getItem('cliente_id') as string),
    };
  },

  setup() {
    const usuarioStore = useUsuarioStore();
    const usuarios = computed(() => {
      return usuarioStore.lista;
    });

    onMounted(() => {
      usuarioStore.getTodos();
    });

    return {
      usuarioStore,
      usuarios,
    };
  },
  beforeMount() {},
  methods: {
    apagarUsuario(id: number) {
      this.$confirm.require({
        message: "Deseja excluir este usuário?",
        header: "Confirmação",
        icon: "pi pi-info-circle",
        acceptLabel: "Excluir",
        rejectLabel: "Cancelar",
        accept: () => {
          this.carregandoPagina = true;
          this.excluir(id);
          this.carregandoPagina = false;
        },
        reject: () => {},
      });
    },
    async excluir(id: number) {
      try {
        const res: any = await this.usuarioStore.apagar(id);
        console.log("aui", res);
        if (res.status == 200) {
          this.$toast.success("Usuário excluído com sucesso");
        } else if (res.code == 402) {
          this.$toast.error(res.erro + "! " + res.validacao);
        }
      } catch (e) {
        return false;
      }
    },
    async editarUsuario(data: any, id: number) {
      try {
        //this.usuarioStore.ItemTemporario(data);
        this.$router.push({ name: "editar-usuario", params: { id: id, modo: 'edicao-de-usuario' } });
      } catch (e) {
        return false;
      }
    },
    async editarPermissoes(data: any, id: number) {
      try {
        //this.usuarioStore.ItemTemporario(data);
        this.$router.push({ name: "editar-usuario", params: { id: id, modo: 'edicao-de-permissoes' } });
      } catch (e) {
        return false;
      }
    },
  },
});
</script>

<style>
@media only screen and (max-width: 992px) {
  .buttonAjuste {
    margin-bottom: 10px;
  }
}
</style>
