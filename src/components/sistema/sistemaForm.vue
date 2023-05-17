<template>
  <section v-if="!carregandoPagina">
    <Form id="form">
      <div class="p-fluid formgrid grid">

        <div class="field col-12 md:col-3">
          <label for="nome">Nome: </label>
          <pm-InputText
            type="text"
            name="nome"
            v-model="sistema.nome"
            :class="{ 'p-invalid': errors.nome != '' }"
            @blur="validate('nome')"
            @keypress="validate('nome')"
          />
          <span class="p-error flex justify-content-center span">{{
            errors.nome
          }}</span>
        </div>

        <div class="field col-12 md:col-3">
          <label for="nome">Módulos: </label>
          <pm-InputText
            type="text"
            name="modulo"
            v-model="modulo"
            placeholder="Módulo"
          />
          <pm-Button
            style="margin-top: 34px"
            icon="pi pi-plus"
            class="p-button-rounded p-button-success p-button-text col-12 md:col-1"
            @click="adicionaModulo"
            v-tooltip.top="{
              value: 'Adicionar novo módulo.',
              class: 'custom-tooltip',
            }"
          />

          <pm-Chip
              v-for="v in sistema.modulos"
              :key="v.nome"
              :label="v.nome"
              class="ml-2"
              removable
              @remove="excluiModulo(v.nome)"
            />

        </div>
        
      </div>
    </Form>

    <div
      class="grid grid-nogutter justify-content-between"
      style="padding-top: 40px"
    >
      <pm-Button
        label="Voltar"
        class="p-button-warning"
        @click="voltar()"
        icon="pi pi-angle-left"
      />
      <i></i>
      <div>
        <pm-Button
          label="Salvar"
          class="p-button-success"
          icon="pi pi-save"
          iconPos="right"
          v-if="id == 0"
          @click="cadastrar()"
        />
        <pm-Button
          label="Alterar"
          class="p-button-success"
          icon="pi pi-save"
          iconPos="right"
          v-if="id != 0"
          @click="editar()"
        />
      </div>
    </div>
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
import { defineComponent } from "vue";
import { Form } from "vee-validate";

import { useSistemaStore } from "@/store/sistema/sistemaStore";
import ISistema from "@/interfaces/ISistema";

import * as Yup from "yup";

export default defineComponent({
  name: "SistemaForm",
  components: { Form },
  props: {
    id: { type: Number },
  },

  data() {
    return {
      carregandoPagina: false,
      modal: false,
      sistema: {} as ISistema,
      errors: {
        nome: "" as String
      } as any,
      modulo: "" as String,
    };
  },
  computed: {
    // a computed getter

    flag(): boolean {
      var result = true;
      var keys = Object.keys(this.errors);
      for (var i = 0; i < keys.length; i++) {
        result = result && this.errors[keys[i]] == "";
      }
      return result;
    },
  },
  setup(props) {
    const sistemaStore = useSistemaStore();

    const schema = Yup.object().shape({
      nome: Yup.string().required( "O nome é obrigatório").test("nome_existe", "Nome já existe", async function (value) {
          return await sistemaStore.checaNome(value, props.id); 
          }),
    });

    return {
      schema,
      sistemaStore,
    };
  },
  methods: {
    validate(field: string) {
      this.schema
        .validateAt(field, this.sistema)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[field] = err.message;
        });
    },
    voltar() {
      this.$router.push({
        name: "listar-sistemas",
      });
    },
    procuraModulo(nome: string){
      var i=0;
      for(i=0; i<this.sistema.modulos.length; i++){
        var item=this.sistema.modulos[i] as any;
        if(item.nome==nome){
          return i;
        }
      }
      return -1;
    },
    adicionaModulo(){
      if(this.modulo!=""){
        var index=this.procuraModulo(this.modulo as string);
        if(index==-1){
          var obj: any = { nome: this.modulo, etiqueta: this.modulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(' ','_').toLowerCase() };
          this.sistema.modulos.push(obj);
        }
        else{
          this.$toast.error("Este módulo já foi adicionado!");
        }
        this.modulo='';
      }
      else{
        this.$toast.error("Preencha o nome do módulo!");
      }
    },
    excluiModulo(nome: string){
      var index=this.procuraModulo(nome);
        if(index!=-1){
          this.sistema.modulos.splice(index,1);
        }
    },
    async cadastrar() {
      var keys = Object.keys(this.errors);
      for (var i = 0; i < keys.length; i++) {
        this.validate(keys[i]);
      }
      if (!this.flag) {
        return false;
      }

      if(this.sistema.modulos.length!=0){
        this.carregandoPagina = true;

        const res: any = await this.sistemaStore.cadastrar(this.sistema);
        this.carregandoPagina = false;
        if (res.code == "200") {
          this.$toast.success("Sistema cadastrado com sucesso!");
          this.$router.push({ name: "listar-sistemas" });
        } 
        else {
          this.$toast.error("Houve um erro ao salvar!");
        }
      } 
      else {
        this.$toast.error("Adicione pelo menos um módulo!");
      }
    },
    async editar() {
      var keys = Object.keys(this.errors);
      for (var i = 0; i < keys.length; i++) {
        this.validate(keys[i]);
      }

      if (!this.flag) {
        return false;
      }

      if(this.sistema.modulos.length!=0){
        this.carregandoPagina = true;
        const res: any = await this.sistemaStore.editar(this.sistema);
        this.carregandoPagina = false;
        if (res.code == "200") {
          this.$toast.success("Sistema atualizado com sucesso!");
          this.$router.push({ name: "listar-sistemas" });
        } 
        else {
          this.$toast.error("Houve um erro ao alterar!");
        }
      } 
      else {
        this.$toast.error("Adicione pelo menos um módulo!");
      }
    },
  },
  async beforeMount() {
    this.carregandoPagina = true;

    this.sistema.id = this.id as number;
    this.sistema.modulos=[];
    if (this.id != 0) {
      this.sistema = await this.sistemaStore.getOne(this.sistema.id);
    } 
    this.carregandoPagina = false;
  },
});
</script>

<style>
.custom-tooltip .p-tooltip-text {
  background-color: var(--blue-800);
  color: rgb(255, 255, 255);
}
</style>