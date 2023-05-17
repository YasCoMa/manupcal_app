<template>
  <section v-if="!carregandoPagina">
    <Form id="form">
      <div class="p-fluid formgrid grid">

        <div class="col-12 md:col-3" style="display: inline-block" v-if="cliente_id==1">
          <label for="cliente" >Selecione o cliente ao qual este usuário pertence:</label
          >
          <pm-Dropdown
            v-model="usuarioTemp.cliente"
            :options="clientes"
            optionLabel="nome"
            placeholder="Selecione o cliente"
            class="mr-2"
          />
        </div>

        <div class="field col-12 md:col-2">
          <label for="nome">Nome do usuário: </label>
          <pm-InputText
            type="text"
            name="nome"
            v-model="usuarioTemp.nome"
            :class="{ 'p-invalid': errors.nome != '' }"
            @blur="validate('nome')"
            @keypress="validate('nome')"
          />
          <span class="p-error flex justify-content-center span">{{
            errors.nome
          }}</span>
        </div>

        <div class="field col-12 md:col-3">
          <label for="sobrenomme">Sobrenome do usuário:</label>
          <pm-InputText
            type="text"
            name="sobrenome"
            v-model="usuarioTemp.sobrenome"
            :class="{ 'p-invalid': errors.sobrenome != '' }"
            @blur="validate('sobrenome')"
            @keypress="validate('sobrenome')"
          />
          <span class="p-error flex justify-content-center span">{{
            errors.sobrenome
          }}</span>
        </div>

        <div class="field col-12 md:col-4">
          <label for="email">Email:</label>
          <pm-InputText
            type="email"
            name="email"
            v-model="usuarioTemp.email"
            :class="{ 'p-invalid': errors.email != '' }"
            @blur="validate('email')"
            @keypress="validate('email')"
          />
          <span class="p-error flex justify-content-center span">{{
            errors.email
          }}</span>
        </div>

        <div class="field col-12 md:col-2">
          <label for="login">Login:</label>
          <pm-InputText
            type="text"
            name="login"
            v-model="usuarioTemp.login"
            :class="{ 'p-invalid': errors.login != '' }"
            @blur="validate('login')"
            @keypress="validate('login')"
          />
          <span class="p-error flex justify-content-center span">{{
            errors.login
          }}</span>
        </div>
        <div class="field col-12 md:col-4">
          <label for="senha">Senha:</label>
          <pm-InputText
            type="password"
            name="senha"
            v-model="usuarioTemp.senha"
            :class="{ 'p-invalid': errors.senha != '' }"
            @blur="validate('senha')"
            @keypress="validate('senha')"
          />
          <span class="p-error flex justify-content-center span">{{
            errors.senha
          }}</span>
        </div>

        <div class="field col-12 md:col-4">
          <label for="confirmaSenha">Confirmar Senha:</label>
          <pm-InputText
            type="password"
            name="confirmaSenha"
            v-model="usuarioTemp.confirmaSenha"
            :class="{ 'p-invalid': errors.confirmaSenha != '' }"
            @blur="validate('confirmaSenha')"
            @keypress="validate('confirmaSenha')"
          />
          <span class="p-error flex justify-content-center span">{{
            errors.confirmaSenha
          }}</span>
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
      <pm-Button
        label="Cadastrar"
        class="p-button-success"
        icon="pi pi-save"
        iconPos="right"
        v-if="id == 0"
        @click="cadastrarUsuario()"
      />
      <pm-Button
        label="Alterar"
        class="p-button-success"
        icon="pi pi-save"
        iconPos="right"
        v-if="id != 0"
        @click="editarUsuario()"
      />
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
import { computed, defineComponent, onMounted } from "vue";

import IUsuario from "@/interfaces/IUsuario";
import ICliente from "@/interfaces/ICliente";

import { useUsuarioStore } from "@/store/usuario/usuarioStore";
import { useClienteStore } from "@/store/cliente/clienteStore";

import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

import { useCriptoStore } from "@/store/store";

export default defineComponent({
  name: "UsuarioFormComponent",
  components: { Form, Field, ErrorMessage },
  props: {
    id: { type: Number },
  },

  data() {
    return {
      permissao: 0,
      carregandoPagina: false,
      usuarioTemp: {} as IUsuario,
      errors: {
        nome: "" as String,
        sobrenome: "" as String,
        email: "" as String,
        login: "" as String,
        senha: "" as String,
        confirmaSenha: "" as String,
      } as any,
      cliente_id: sessionStorage.getItem('cliente_id') == null ? 0 : parseInt(sessionStorage.getItem('cliente_id') as string),
      clientes: [] as ICliente[]
    };
  },
  computed: {
    // a computed getter

    flag(): boolean {
      var result =
        this.errors.nome == "" &&
        this.errors.sobrenome == "" &&
        this.errors.email == "" &&
        this.errors.login == "" &&
        this.errors.senha == "" &&
        this.errors.confirmaSenha == "";
      return result;
    },
  },
  setup(props) {
    const usuarioStore = useUsuarioStore();
    const clienteStore = useClienteStore();

    const schema = Yup.object().shape({
      nome: Yup.string().required("O nome é obrigatório"),
      sobrenome: Yup.string().required("O sobrenome é obrigatório"),
      login: Yup.string()
        .min(3, "Login deve conter no mínimo 3 caracteres.")
        .required("O login é obrigatório")
        .test("login_existe", "Login já existe", async function (value) {
          return await usuarioStore.checaLogin(value, props.id);
        }),
      email: Yup.string()
        .email("E-mail inválido")
        .required("O e-mail é obrigatório")
        .test("email_existe", "E-mail já existe", async function (value) {
          return await usuarioStore.checaEmail(value, props.id);
        }),
      senha: Yup.string()
        .min(6, "Senha deve conter no mínimo 6 caracteres.")
        .required("A senha é obrigatória"),
      confirmaSenha: Yup.string()
        .oneOf([Yup.ref("senha")], "As senhas devem ser iguais")
        .required("A confirmacao de senha é obrigatória"),
    });

    return {
      schema,
      usuarioStore,
      clienteStore
    };
  },
  methods: {
    validate(field: string) {
      this.schema
        .validateAt(field, this.usuarioTemp)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[field] = err.message;
          // console.log(this.errors)
        });
    },
    voltar() {
      this.$router.push({
        name: "listar-usuarios",
      });
    },
    /*escolhaPermissao(p:any){
        console.log(p)
        this.usuarioTemp.cod_permissao  = p.id;
      },*/
    async cadastrarUsuario() {
      var keys = Object.keys(this.errors);
      for (var i = 0; i < keys.length; i++) {
        this.validate(keys[i]);
      }
      if (!this.flag) {
        return false;
      }

        // return true;
        if(this.usuarioTemp.cliente!=null){
          this.carregandoPagina = true;
          this.usuarioTemp.cliente_id = this.usuarioTemp.cliente.id;

          const res: any = await this.usuarioStore.cadastrar(this.usuarioTemp);
          try {
            if (res.data.code == "200") {
              this.carregandoPagina = false;
              this.$toast.success("Usuário cadastrado com sucesso!");
              this.$router.push({ name: "listar-usuarios" });
            } else {
              //deixar os arrays de vinculo vazios, pois o usuário só pode ter 1 vinculo até o momento
              
              this.carregandoPagina = false;
              this.$toast.error(res.response.data.extras.mensagem);
            }
          } 
          catch (e) {
            //deixar os arrays de vinculo vazios, pois o usuário só pode ter 1 vinculo até o momento
            this.carregandoPagina = false;
            let msg = res.response.data.validacao;
            // if (res.response.data.extras.mensagem != undefined)
            //   this.$toast.error(res.response.data.extras.mensagem);

            this.$toast.error(res.response.data.validacao);
            return false;
          }
        }
        else{
          this.$toast.error('Escolha um cliente para este usuário.');
        }
    },
    async editarUsuario() {
      var keys = Object.keys(this.errors);
      for (var i = 0; i < keys.length; i++) {
        this.validate(keys[i]);
      }

      if (!this.flag) {
        return false;
      }
      
        if(this.usuarioTemp.cliente!=null){
          this.carregandoPagina = true;

          this.usuarioTemp.cliente_id = this.usuarioTemp.cliente.id;

          try {
            const res: any = await this.usuarioStore.atualizar(this.usuarioTemp);
            if (res.data.code == "200") {
              this.carregandoPagina = false;
              this.$toast.success("Usuário editado com sucesso!");
              this.$router.push({ name: "listar-usuarios" });
            } 
            else {
              this.carregandoPagina = false;
              this.$toast.error(res.response.data.extras.mensagem);
            }
          } catch (e: any) {
            this.carregandoPagina = false;
            // console.log('erro',e)
            this.$toast.error(e.response.data.validacao);
          }
        }
        else{
          this.$toast.error('Escolha um cliente para este usuário.');
        }
    },
  },
  async beforeMount() {
    this.carregandoPagina = true;

    this.clientes = await this.clienteStore.buscarTodos();

    this.usuarioTemp.id = Number(this.id);
    if (Number(this.id) != 0) {
      try {
        this.usuarioTemp = await this.usuarioStore.getOne(this.usuarioTemp.id);
        this.usuarioTemp.senha = "";
        this.usuarioTemp.confirmaSenha = "";
      } 
      catch (error: any) {
        this.$router.push({ name: "listar-usuarios" });
        this.$toast.error(error.response.data.validacao);
      }
    } 

    this.carregandoPagina = false;
  },
});
</script>

<style></style>
