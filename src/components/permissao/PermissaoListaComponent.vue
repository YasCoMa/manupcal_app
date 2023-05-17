<template>
  <section>
    <pm-DataTable
      :value="permissao"
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
                placeholder="Pesquisar Nome das Permissões"
              />
            </span>
          </div>
          <div class="field col-0 md:col-6 lg:col-7" style="margin: 0px"></div>
          <div class="field col-5 md:col-6 lg:col-2" style="margin: 0px">
            <pm-Button
              type="button"
              label="Cadastrar"
              title="Cadastrar"
              @click="$router.push({ name: 'adicionar-permissao' })"
              class="p-button-sm p-button-success"
            >
            </pm-Button>
          </div>
        </div>
      </template>
      
      <pm-Column
        field="identificador"
        sortable
        header="Nome"
        style="font-size: 14px; vertical-align: middle !important"
      ></pm-Column>

      <pm-Column
        field="sistema.nome"
        sortable
        header="Sistema"
        style="font-size: 14px; vertical-align: middle !important"
      ></pm-Column>

      <pm-Column
        field="acao"
        header="AÇÕES"
        headerStyle="width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible;width: 357px;vertical-align:middle !important"
      >
        <template #body="{ data }">
          <pm-Button
            type="button"
            icon="pi pi-pencil"
            label="Editar"
            title="Editar"
            @click="editarPermissao(data, data.id)"
            style="margin-left: 5px"
            class="p-button-sm p-button-raised btn--responsive"
          >
            <span
              class="pi pi-pencil p-button-icon p-button-icon-left icon--responsive"
            ></span>
            <span class="p-button-label label--responsive">Editar</span>
          </pm-Button>

          <pm-Button
            type="button"
            label="Apagar"
            title="Apagar Permissão"
            @click="apagarPermissao(data.id)"
            style="margin-left: 5px"
            class="p-button-sm p-button-raised p-button-danger buttonAjuste"
          >
            <span
              class="pi pi-times-circle p-button-icon p-button-icon-left icon--responsive"
            ></span>
            <span class="p-button-label label--responsive">Apagar</span>
          </pm-Button>
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
</template>

<script lang="ts">
import { usePermissaoStore } from "@/store/permissao/permissaoStore";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { computed, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "PermissaoListaComponent",
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
      },
      links: "",
    };
  },

  setup() {
    const permissaoStore = usePermissaoStore();
    const permissao = computed(() => {
      return permissaoStore.listaPermissao;
    });

    onMounted(() => {
      permissaoStore.getPermissaoCliente();
    });

    return {
      permissaoStore,
      permissao,
      getPermissao: computed(() => {
        return permissaoStore.permissao;
      }),
    };
  },
  beforeMount() { },
  methods: {
    async apagarPermissao(id: number) {
      try {


      this.$confirm.require({
        message: "Deseja excluir esta permição?",
        header: "Confirmação",
        icon: "pi pi-info-circle",
        acceptLabel: "Excluir",
        rejectLabel: "Cancelar",
        accept: () => {
          this.excluir(id);
        },
        reject: () => {},
      });
      } catch (e) {
        console.log(e)
        return false;
      }
    },
    async excluir(id : number) {
      try {
        const res: any = await this.permissaoStore.apagarPermissao(id);
        console.log(res);
        if (res.code == 402) {
          this.$toast.error(res.erro+'! ' + res.validacao);
        }
      }
      catch (e) {
        return false;
      }
    },
    async editarPermissao(data: any, id: number) {
      try {
        this.$router.push({ name: "editar-permissao", params: { id: id } });
      } catch (e) {
        return false;
      }
    },
  },
});
</script>

<style>
.buttonAjuste {
}

@media only screen and (max-width: 992px) {
  .buttonAjuste {
    margin-top: 8px;
  }
}
</style>
