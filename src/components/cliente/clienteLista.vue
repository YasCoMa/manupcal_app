<template>
  <section v-if="!carregandoPagina">
    <pm-DataTable
      :value="clientes"
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
                @click="$router.push({ name: 'cadastrar-cliente' })"
                class="p-button-sm p-button-success"
              >
              </pm-Button>
            </div>
          </div>
        </div>
      </template>

      <template #empty> Nenhum cliente encontrado </template>

      <pm-Column
        field="nome"
        sortable
        header="Nome"
        style="font-size: 14px; vertical-align: middle !important"
      ></pm-Column>

      <pm-Column
        field="modo"
        sortable
        header="Modo"
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
            label="Editar Cliente"
            title="Editar Cliente"
            @click="editar(data.id)"
            class="p-button-info p-button-sm ml-2"
          >
          </pm-Button>

          <pm-Button
            type="button"
            icon="pi pi-pencil"
            label="Editar Concessões"
            title="Editar Concessões"
            @click="editarConcessoes(data.id)"
            class="p-button-secondary p-button-sm ml-2"
            v-if="cliente_id==1"
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

import { useClienteStore } from "@/store/cliente/clienteStore";
import ICliente from "@/interfaces/ICliente";

import { FilterMatchMode } from "primevue/api";

export default defineComponent({
  name: "cliente-lista",
  data() {
    return {
      carregandoPagina: false,
      pesquisa: "",
      links: "",
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      clientes: [] as ICliente[],
      cliente_id: sessionStorage.getItem('cliente_id') == null ? 0 : parseInt(sessionStorage.getItem('cliente_id') as string),
    };
  },

  setup() {
    const clienteStore = useClienteStore();

    return {
      clienteStore,
    };
  },
  async beforeMount() {
    this.clientes = await this.clienteStore.buscarTodos();
  },
  methods: {
    confirmaExclusao(id: any) {
      this.$confirm.require({
        message: "Deseja excluir este cliente?",
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
        const res: any = await this.clienteStore.excluir(id);
        if (res.code == "200") {
          this.$toast.success("Cliente removido com sucesso.");
          this.clientes = await this.clienteStore.buscarTodos();
        } 
        else {
          this.$toast.error(res.validacao);
        }
        this.carregandoPagina = false;
      } 
      catch (e) {
        this.carregandoPagina = false;
        this.$toast.error("Problema ao apagar o cliente!");
        return false;
      }
    },
    async editar(id: number) {
      try {
        this.$router.push({
          name: "editar-cliente",
          params: { id: id, modo: 'edicao-do-cliente'},
        });
      } catch (e) {
        return false;
      }
    },
    async editarConcessoes(id: number) {
      try {
        this.$router.push({
          name: "editar-cliente",
          params: { id: id, modo: 'edicao-de-concessoes'},
        });
      } catch (e) {
        return false;
      }
    },
  },
});
</script>

<style></style>