<template>
  <section v-if="!carregandoPagina">
    <pm-DataTable
      :value="sistemas"
      dataKey="id"
      :paginator="true"
      :rows="20"
      filterDisplay="menu"
      responsiveLayout="scroll"
      v-model:filters="filters"
    >
      <template #header>
        <div class="table-header-container">
          <div class="p-fluid formgrid grid flex justify-content-between mt-3">
            <div class="field col-12 md:col-6 lg:col-3">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <pm-InputText
                  v-model="filters['global'].value"
                  placeholder="Pesquisar"
                />
              </span>
            </div>
            <div class="field col-12 md:col-6 lg:col-2">
              <pm-Button
                type="button"
                label="Cadastrar"
                title="Cadastrar"
                @click="$router.push({ name: 'cadastrar-sistema' })"
                class="p-button-sm p-button-success"
              >
              </pm-Button>
            </div>
          </div>
        </div>
      </template>

      <template #empty> Nenhum sistema encontrado </template>

      <pm-Column
        field="nome"
        sortable
        header="Nome"
        style="font-size: 14px; vertical-align: middle !important"
      ></pm-Column>

      <pm-Column
        field="qtd_modulos"
        sortable
        header="Quantidade de módulos"
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
            label="Editar Sistema"
            title="Editar Sistema"
            @click="editar(data.id)"
            class="p-button-info p-button-sm ml-2"
          >
          </pm-Button>

          <pm-Button
            type="button"
            label="Apagar"
            title="Remover"
            @click="confirmaExclusao(data.id)"
            class="p-button-sm p-button-danger ml-2"
          >
          </pm-Button>
        </template>
      </pm-Column>

    </pm-DataTable>
  </section>

  <pm-ConfirmDialog
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }"
  ></pm-ConfirmDialog>

  <div
    v-if="carregandoPagina"
    class="col-md-12"
    style="text-align: center; padding-top: 255px"
  >
    <pm-ProgressSpinner />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";

import { useSistemaStore } from "@/store/sistema/sistemaStore";
import ISistema from "@/interfaces/ISistema";

import { FilterMatchMode } from "primevue/api";

export default defineComponent({
  name: "sistema-lista",
  data() {
    return {
      carregandoPagina: false,
      pesquisa: "",
      links: "",
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      sistemas: [] as ISistema[],
    };
  },

  setup() {
    const sistemaStore = useSistemaStore();

    return {
      sistemaStore,
    };
  },
  async beforeMount() {
    this.sistemas = await this.sistemaStore.buscarTodos();
  },
  methods: {
    confirmaExclusao(id: any) {
      this.$confirm.require({
        message: "Deseja excluir este sistema?",
        header: "Confirmação",
        icon: "pi pi-info-circle",
        acceptLabel: "Excluir",
        rejectLabel: "Cancelar",
        accept: () => {
          this.remover(id);
        },
        reject: () => {},
      });
    },

    async remover(id: number) {
      try {
        this.carregandoPagina = true;
        const res: any = await this.sistemaStore.excluir(id);
        if (res.code == "200") {
          this.$toast.success("Sistema removido com sucesso.");
          this.sistemas = await this.sistemaStore.buscarTodos();
        } 
        else {
          this.$toast.error(res.validacao);
        }
        this.carregandoPagina = false;
      } 
      catch (e) {
        this.carregandoPagina = false;
        this.$toast.error("Problema ao apagar o sistema!");
        return false;
      }
    },
    async editar(id: number) {
      try {
        this.$router.push({
          name: "editar-sistema",
          params: { id: id},
        });
      } catch (e) {
        return false;
      }
    },
  },
});
</script>

<style></style>