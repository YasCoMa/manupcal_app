<template>
  <section>
    <Form id="form">

      <div class="p-fluid formgrid grid">
        
        <div class="col-12 md:col-3" style="display: inline-block" v-if="cliente_id==1">
          <label for="cliente" >Selecione o cliente ao qual esta permissão pertence:</label
          >
          <pm-Dropdown
            v-model="permissao.cliente"
            :options="clientes"
            optionLabel="nome"
            placeholder="Selecione o cliente"
            class="mr-2"
            onChange="mudaSistemas"
          />
        </div>

        <div class="col-12 md:col-3" style="display: inline-block" v-if="cliente_id==1">
          <label for="sistema" >Selecione o sistema ao qual esta permissão pertence:</label
          >
          <pm-Dropdown
            v-model="permissao.sistema"
            :options="sistemas"
            optionLabel="nome"
            placeholder="Selecione o sistema"
            class="mr-2"
            onChange="mudaModulos"
          />
        </div>

        <div class="field col-12 md:col-5">
          <label for="nome">Nome da Permissão:</label>
          <pm-InputText
            type="text"
            name="identificador"
            v-model="permissao.identificador"
            :class="{ 'p-invalid': errors.identificador != '' }"
            @blur="validate('identificador')"
            @keypress="validate('identificador')"
          />
          <span class="p-error flex justify-content-center span">{{
            errors.identificador
          }}</span>
        </div>

        <div class=" formgrid grid mt-3" v-if="this.permissao.sistema!=undefined" >
          <div v-for="f in permissao.sistema.modulos" class="field col-12 md:col-2" >
            <div class="field col-12 md:col-12" v-if="permissao.sistema.modulos_ativos[f.etiqueta]" >
              <h5>Habilitar {{ f.nome }}</h5>
              <pm-InputSwitch v-model="permissao.modulos[f.etiqueta]" />
            </div>
          </div>
        </div>

      </div>

      <div class="grid grid-nogutter justify-content-between" style="padding-top: 40px" >
        <pm-Button label="Voltar" class="p-button-warning"  @click="voltar()" icon="pi pi-angle-left" />

        <i></i>

        <pm-Button label="Salvar" class="p-button-success" @click="adiciona" icon="pi pi-save" iconPos="right" v-if="id == 0"  />

        <pm-Button label="Alterar" class="p-button-success" @click="edita" icon="pi pi-save" iconPos="right" v-if="id != 0" />
      </div>

    </Form>

  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

import IPermissao from "@/interfaces/IPermissao";
import ICliente from "@/interfaces/ICliente";
import ISistema from "@/interfaces/ISistema";

import { usePermissaoStore } from "@/store/permissao/permissaoStore";
import { useClienteStore } from "@/store/cliente/clienteStore";
import { useSistemaStore } from "@/store/sistema/sistemaStore";

export default defineComponent({
  name: "PermissaoFormComponent",
  components: { Form, Field, ErrorMessage },
  props: {
    id: { type: Number },
    editar: { type: Number },
    sistema: { type: Number },
  },

  data() {
    return {
      permissao: {} as IPermissao,
      nome_valido: false,
      errorColorNome: "",
      flagNome: true,
      errors: { identificador: "" as String } as any,
      clientes: [] as ICliente[],
      sistemas: [] as ISistema[],
      cliente_id: sessionStorage.getItem('cliente_id') == null ? 0 : parseInt(sessionStorage.getItem('cliente_id') as string),
    };
  },
  computed: {
    // a computed getter

    flag(): boolean {
      var result = this.errors.identificador == "";
      return result;
    },
  },
  setup(props) {
    const permissaoStore = usePermissaoStore();
    const clienteStore = useClienteStore();
    const sistemaStore = useSistemaStore();
    
    const schema = Yup.object().shape({
      identificador: Yup.string()
        .min(4, "Deve conter no mínimo 4 caracteres")
        .required("O identificador é obrigatório")
        .test(
          "identificador_existe",
          "Identificador já existe",
          async function (value) {
            return await permissaoStore.checaIdentificador(value, props.id, props.sistema);
          }
        ),
    });

    return {
      schema,
      permissaoStore,
      addPermissao: permissaoStore.cadastrar,
      editPermissao: permissaoStore.editar,
      clienteStore,
      sistemaStore
    };
  },
  async beforeMount() {
    this.clientes = await this.clienteStore.buscarTodos();
    this.sistemas = await this.sistemaStore.buscarTodos();

    if (this.editar == 1) {
      this.permissao.id = Number(this.id);
      if (this.permissao.id != 0) {
        this.permissao = await this.permissaoStore.getOnePermissaoCliente(this.permissao.id);
        this.mudaSistema();
        //this.mudaModulos();
      } 
      else {
        this.$router.push({
          name: "listar-permissao",
        });
      }
    }

    if(this.permissao.cliente==null){
      this.permissao.cliente=this.clientes[0];
      this.mudaSistema();
      this.mudaModulos();
    }
  },
  methods: {
    mudaSistema(){
      this.sistemas=this.permissao.cliente.sistemas;
      if(this.sistemas.length>0 && this.permissao.sistema==null){
        this.permissao.sistema=this.sistemas[0];
      }
    },
    mudaModulos(){
      var modulos=this.permissao.sistema.modulos_ativos;
      var keys = Object.keys(modulos);
      this.permissao.modulos={};
      for (var i = 0; i <= keys.length; i++) {
        this.permissao.modulos[keys[i]]=false;
      }
    },
    validate(field: string) {
      this.schema
        .validateAt(field, this.permissao)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[field] = err.message;
          // console.log(this.errors);
        });
    },
    voltar() {
      this.$router.push({
        name: "listar-permissao",
      });
    },
    adiciona() {
      var keys = ["identificador"];
      for (var i = 0; i <= keys.length; i++) {
        this.validate(keys[i]);
      }

      if (this.flag) {
        if(this.permissao.sistema!=null){
          if(this.permissao.cliente!=null){
            this.permissao.sistema_id=this.permissao.sistema.id;
            this.permissao.cliente_id=this.permissao.cliente.id;
            
            this.addPermissao(this.permissao);
            this.$router.push({ name: "listar-permissao" });
          }
          else{
            this.$toast.error("Escolha o cliente");
          }
        }
        else{
          this.$toast.error("Escolha o sistema");
        }
      }
    },
    edita() {
      var keys = ["identificador"];
      for (var i = 0; i <= keys.length; i++) {
        this.validate(keys[i]);
      }

      if (this.flag) {
        if(this.permissao.sistema!=null){
          if(this.permissao.cliente!=null){
            this.permissao.sistema_id=this.permissao.sistema.id;
            this.permissao.cliente_id=this.permissao.cliente.id;

            this.editPermissao(this.permissao);
            this.$router.push({ name: "listar-permissao" });
          }
          else{
            this.$toast.error("Escolha o cliente");
          }
        }
        else{
          this.$toast.error("Escolha o sistema");
        }
      }
    },
  },
});
</script>

<style></style>
