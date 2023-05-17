<template>
  <div class="login-body">
    <div id="login" style="">
      <div class="container">
        <div
          id="login-row"
          class="flex flex-column justify-content-center align-items-center"
        >
          <div>
            <img
              src="@/assets/logoLogin.png"
              class="img"
              alt="logo do município"
            />
          </div>
          <div id="login-column" class="col-md-6">
            <div id="login-box" class="col-md-12">
              <Form id="login-form">
                <h3
                  class="text-center"
                  style="padding-bottom: 10px; padding-top: 10px"
                >
                  Sistema de Gerenciamento de Licenças e Clientes
                </h3>

                <div
                  class="p-fluid formgrid grid flex flex-column justify-content-center align-items-center"
                  style="padding: 0px 20px 0px 20px"
                >
                  <!-- <label class="mr-2">Login ou email:</label>
                  <pm-InputText
                    v-model="dados.login"
                    placeholder="Digite o login ou email"
                    :class="{ 'p-invalid': errors.login != '' }"
                    @blur="validate('login')"
                    @keypress="validate('login')"
                    /> -->
                  <span class="p-float-label mt-4 input">
                    <pm-InputText
                      v-model="dados.login"
                      :class="{ 'p-invalid': errors.login != '' }"
                      @blur="validate('login')"
                      @keypress="validate('login')"
                    />
                    <label class="mr-2">Login ou email:</label>
                  </span>
                  <span class="p-error flex justify-content-center span">{{
                    errors.login
                  }}</span>

                  <!-- <label class="mr-2">Senha:</label>
                  <pm-InputText
                    type="password"
                    v-model="dados.senha"
                    placeholder="Digite a senha"
                    :class="{ 'p-invalid': errors.senha != '' }"
                    @blur="validate('senha')"
                    @keypress="validate('senha')"
                  /> -->
                  <span class="p-float-label mt-4 input">
                    <pm-InputText
                      type="password"
                      v-model="dados.senha"
                      :class="{ 'p-invalid': errors.senha != '' }"
                      @blur="validate('senha')"
                      @keypress="validate('senha')"
                    />
                    <label class="mr-2">Senha:</label>
                  </span>
                  <span class="p-error flex justify-content-center span">{{
                    errors.senha
                  }}</span>

                  <VueRecaptcha
                    class="flex mt-5"
                    :sitekey="siteKey"
                    :load-recaptcha-script="true"
                    @verify="handleSuccess"
                    @error="handleError"
                  >
                  </VueRecaptcha>

                  <div class="mt-3 flex" style="margin-bottom: 20px">
                    <pm-Button label="Entrar" @click="logar()" />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { computed, defineComponent } from "vue";
import { VueRecaptcha } from "vue-recaptcha";

import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

import { useUsuarioStore } from "@/store/usuario/usuarioStore";

import { useCriptoStore } from "@/store/store";

var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

export default defineComponent({
  name: "Login",
  components: {
    VueRecaptcha,
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    localStorage.removeItem("estoque_novo");
    localStorage.removeItem("estoque");

    const usuarioStore = useUsuarioStore();

    const siteKey = computed(() => {
      return "6Ldn5rUhAAAAANEkb6X5gkE0QtBxoZc_buNmlA0B";
    });

    const schema = Yup.object().shape({
      login: Yup.string().required("O login ou email é obrigatório"),
      senha: Yup.string().required("A senha é obrigatória"),
    });

    const handleError = () => {
      // Do some validation
    };

    const handleSuccess = (response: any) => {
      // Do some validation
    };

    return {
      schema,
      usuarioStore,
      handleSuccess,
      handleError,
      siteKey,
    };
  },
  data() {
    return {
      terminadoLogin: true,
      dados: { codigo: "", login: "", senha: "", sistema_id: 0 },
      token: "",
      errors: { login: "" as String, senha: "" } as any,
    };
  },
  computed: {
    // a computed getter

    flag(): boolean {
      var result = this.errors.login == "" && this.errors.senha == "";
      return result;
    },
  },
  async beforeMount(){
   // var ciphertext = CryptoJS.AES.encrypt('testando', 'program@doresMtwTudoSinistros3000').toString();
    //console.log(ciphertext);


    //Limpar Todos os Storages para não ocorrer Bugs
    var n = sessionStorage.length;
    while(n--) {
      var key = sessionStorage.key(n);
      if(key){
        sessionStorage.removeItem(key);
      }
    }
    var m = localStorage.length;
    while(m--) {
      var key = localStorage.key(m);
      if(key){
        localStorage.removeItem(key);
      }
    }
  },
  methods: {
    validate(field: string) {
      this.schema
        .validateAt(field, this.dados)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[field] = err.message;
        });
    },
    async logar() {
      const criptoStore = useCriptoStore();
      const crypto = await criptoStore.getSecretKey();
      //var chave = criptoStore.getSecretKey();
      //console.log(chave);

      var keys = Object.keys(this.errors);
      for (var i = 0; i < keys.length; i++) {
        this.validate(keys[i]);
      }

      if (!this.flag) {
        return false;
      }

      const input = document.getElementById(
        "g-recaptcha-response"
      ) as HTMLInputElement | null;
      this.dados.codigo = "none";
      if (input != null) {
        //this.dados.codigo = input.value;
      }

      if (this.dados.codigo == "") {
        this.$toast.error("Complete o recaptcha!");
        return false;
      }
      this.dados.sistema_id=criptoStore.sistema_id;
      //console.log(criptoStore.sistema_id);

      const res: any = await this.usuarioStore.autenticar(this.dados);
      if (res.data.code == "200") {
        if (res.data.payload.error == "") {
          sessionStorage.setItem("token", "Bearer " + res.data.payload.jwt);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.payload.jwt;
          this.token = "Bearer " + res.data.payload.jwt;
         

          sessionStorage.setItem("id", res.data.payload.usuario.id);
          sessionStorage.setItem("nome", res.data.payload.usuario.nome);
          sessionStorage.setItem("cliente_id", res.data.payload.usuario.cliente_id);

          //console.log(res.data.payload.usuario.permissao.modulos)
          var ciphertext = criptoStore.encryptGo(JSON.stringify(res.data.payload.usuario.permissao.modulos));
          sessionStorage.setItem("permissao",ciphertext);

          this.$toast.success(
            "Login realizado com sucesso, token enviado por e-mail!"
          );
          //this.$router.push({ name: "listar-usuarios" });
          location.href = "/painel/usuarios/listar";
          
          /*setTimeout(function () {
            //location.href = "/painel/listar/caixa-de-entrada";
          }, 400);*/
        } else {
          this.$toast.error(res.data.payload.error);
          if (res.data.error.indexOf("captcha") != -1) {
            setTimeout(function () {
              location.href = "";
            }, 400);
          }
        }
      } else {
        this.$toast.error(res.data.error);
      }

      this.terminadoLogin = true;
      //}
    },
  },
});
</script>

<style>
.img {
  width: auto;
  height: auto;
}
.login-body {
  margin: 0;
  padding: 0;
  background-image: url("@/assets/fundoLogin.jpg"); 
  background-color: #7e8699;
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  /* margin-top: 120px; */
  /*max-width: 600px;
  height: 320px;*/
  border: 1px solid #9c9c9c;
  background-color: #ffffff;
  border-radius: 8px;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login
  .container
  #login-row
  #login-column
  #login-box
  #login-form
  #register-link {
  margin-top: -85px;
}

.input {
  width: 19.75rem;
}
.input:focus {
  border: none;
}
.span {
  /* padding-left: 30px; */
  font-size: 0.9rem;
}
.p-fluid .p-button {
  width: 9.375rem;
}
</style>
