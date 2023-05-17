<template>
  <section v-if="!carregandoPagina">
    <article v-if="areaForm">
      <Form id="form">
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-3">
            <label for="sistema">Sistema:</label>
            <pm-Dropdown
              v-model="item.sistema"
              :options="sistemas"
              optionLabel="nome"
              placeholder="Selecione o sistema"
              class="mr-2"
            :class="{ 'p-invalid': errors.sistema != '' }"

              @blur="validate('sistema')"
              @keypress="validate('sistema')"
            />
            <span class="p-error flex justify-content-center span">{{
            errors.sistema
          }}</span>
          </div>

          <div class="field col-12 md:col-3">
            <label for="sistema">Nível de Permissão:</label>
            <pm-Dropdown
              v-model="item.permissao"
              :options="item.sistema.permissoes"
              optionLabel="identificador"
              placeholder="Selecione a Permissão"
              class="mr-2"
            :class="{ 'p-invalid': errors.permissao != '' }"

              @blur="validate('permissao')"
              @keypress="validate('permissao')"

            />
            <span class="p-error flex justify-content-center span">{{
            errors.permissao
          }}</span>
          </div>

        </div>
      </Form>

      <div
        class="grid grid-nogutter justify-content-between"
        style="padding-top: 40px"
      >
        <pm-Button
          label="Cancelar"
          class="p-button-warning"
          @click="areaForm = false"
        />
        <i></i>
        <pm-Button
          label="Salvar"
          class="p-button-success"
          icon="pi pi-save"
          iconPos="right"
          v-if="item.id == 0"
          @click="cadastrarItem()"
        />

        <pm-Button
          label="Alterar"
          class="p-button-success"
          icon="pi pi-save"
          iconPos="right"
          v-if="item.id != 0"
          @click="editarItem()"
        />
      </div>
    </article>

    <pm-DataTable
      :value="habilitacoes"
      dataKey="id"
      :paginator="true"
      :rows="20"
      filterDisplay="menu"
      responsiveLayout="scroll"
      v-model:filters="filters"
      class="mt-3"
    >
      <template #header>
        <div class="table-header-container">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <pm-InputText
              v-model="filters['global'].value"
              placeholder="Pesquisar "
            />
          </span>

          <pm-Button
            type="button"
            label="Cadastrar"
            title="Cadastrar"
            @click="
              limpaObjeto({id: 0});
              areaForm = true;
            "
            class="p-button-sm p-button-success ml-2"
          >
          </pm-Button>
        </div>
      </template>

      <template #empty> Nenhum item encontrado </template>

      <pm-Column
        field="sistema.nome"
        sortable
        header="Sistema"
        style="font-size: 14px; vertical-align: middle !important"
      ></pm-Column>

      <pm-Column
        field="permissao.identificador"
        sortable
        header="Nível de Permissão"
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
            @click="
              limpaObjeto(data); 
              areaForm = true;
              scrollToTop();
            "
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
import { defineComponent } from "vue";
import { FilterMatchMode } from "primevue/api";
import { Form } from "vee-validate";

import { useSistemaStore } from "@/store/sistema/sistemaStore";
import { useHabilitacaoStore } from "@/store/habilitacao/habilitacaoStore";

import IHabilitacao from "@/interfaces/IHabilitacao";
import ISistema from "@/interfaces/ISistema";
import * as Yup from "yup";

export default defineComponent({
  name: "usuario-habilitacao-permissao",
  components: { Form },
  props: {
    id: { type: Number },
    cliente_id: { type: Number }
  },
  data() {
    return {
      carregandoPagina: false,
      pesquisa: "",
      links: "",
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      item: {} as IHabilitacao,
      areaForm: false,
      habilitacoes: [] as IHabilitacao[],
      sistemas: [] as ISistema[],
      permissoes: [] as any[],
      errors: {
        sistema: '' as string,
        permissao: '' as string,
      } as any,
    };
  },
  computed: {
    // a computed getter

    flag(): boolean {
      var result =
        this.errors.sistema == "" &&
        this.errors.permissao == "" ;
      return result;
    },
  },
  setup() {
    const sistemaStore = useSistemaStore();
    const habilitacaoStore = useHabilitacaoStore();

    const schema = Yup.object().shape({
      sistema: Yup.object().required("O sistema é obrigatório"),
      permissao: Yup.object().required("A permissão é obrigatória"),
    });

    return {
      sistemaStore,
      habilitacaoStore,
      schema
    };
  },
  methods: {
    validate(field: string) {
      this.schema
        .validateAt(field, this.item)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[field] = err.message;
          // console.log(this.errors)
        });
    },
    mudaSistema(){
      //this.permissoes=this.item.sistema.permissoes;
      if(this.item.permissao==null){
        this.item.permissao=this.permissoes[0];
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    limpaObjeto(data: any) {
      this.item = {} as IHabilitacao;
      if(data.id==0){
        this.item.usuario_id = this.id as number;
        this.item.id = 0;
        this.item.sistema=this.sistemas[0];
      }
      else{
        this.item = JSON.parse(JSON.stringify(data)); 
      }
    },
    procuraDuplicidade() {
      for (let i = 0; i < this.habilitacoes.length; i++) {
        let item = this.habilitacoes[i];
        if (item.sistema.id==this.item.sistema.id && item.id!=this.item.id ) {
          return false;
        }
      }
      return true;
    },
    confirmaExclusao(id: any) {
      this.$confirm.require({
        message: "Deseja excluir este item?",
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
        const res: any = await this.habilitacaoStore.excluir(id);
        if (res.code == "200") {
          this.$toast.success("Item removido com sucesso.");
          this.habilitacoes = await this.habilitacaoStore.buscarTodosPorUsuario(this.id);
        } else {
          this.$toast.error(res.validacao);
        }
        this.carregandoPagina = false;
      } 
      catch (e) {
        this.carregandoPagina = false;
        this.$toast.error("Problema ao apagar o item!");
        return false;
      }
    },
    async editarItem() {
      try {

        var keys = Object.keys(this.errors);
        for (var i = 0; i < keys.length; i++) {
          this.validate(keys[i]);
        }

        if (!this.flag) {
          return false;
        }

        if (this.procuraDuplicidade()) {
          this.carregandoPagina = true;
          this.item.sistema_id = this.item.sistema.id;
          this.item.permissao_id = this.item.permissao.id;

          const res: any = await this.habilitacaoStore.editar(this.item);
          console.log(res.data.code)
          if (res.code == "200") {
            this.$toast.success("Item atualizado com sucesso.");
            this.habilitacoes = await this.habilitacaoStore.buscarTodosPorUsuario(this.id);
            this.areaForm = false;
          } 
          else {
            this.$toast.error(res.validacao);
          }
          this.carregandoPagina = false;
        }
        else{
          this.$toast.error("Já foi adicionada uma permissão para o mesmo sistema para este usuário.");
        }
      } 
      catch (e) {
        return false;
      }
    },
    async cadastrarItem() {
      try {
        var keys = Object.keys(this.errors);
        for (var i = 0; i < keys.length; i++) {
          this.validate(keys[i]);
        }

        if (!this.flag) {
          return false;
        }

          if (this.procuraDuplicidade()) {
            
            this.carregandoPagina = true;
            this.item.sistema_id = this.item.sistema.id;
            this.item.permissao_id = this.item.permissao.id;

            const res: any = await this.habilitacaoStore.cadastrar(this.item);
            if (res.code == "200") {
              this.$toast.success("Item cadastrado com sucesso.");
              this.habilitacoes = await this.habilitacaoStore.buscarTodosPorUsuario(this.id);
              this.limpaObjeto({id: 0});
              this.areaForm = false;
            } 
            else {
              this.$toast.error(res.validacao);
            }
            this.carregandoPagina = false;
          }
          else{
            this.$toast.error("Já foi adicionada uma permissão para o mesmo sistema para este usuário.");
          }

      } 
      catch (e) {
        return false;
      }
    },
  },
  async beforeMount() {
    this.sistemas = await this.sistemaStore.buscarTodosPorCliente(this.cliente_id);
    this.habilitacoes = await this.habilitacaoStore.buscarTodosPorUsuario(this.id);
  },
});
</script>

<style></style>