<template>
  <section v-if="!carregandoPagina">
    <Form id="form">
      <pm-Accordion :activeIndex="0" >
        <pm-AccordionTab header="Principais Dados">
          <div class="p-fluid formgrid grid">

            <div class="field col-12 md:col-3">
              <label for="nome">Nome*: </label>
              <pm-InputText
                type="text"
                name="nome"
                v-model="cliente.nome"
                :class="{ 'p-invalid': errors.nome != '' }"
                @blur="validate('nome')"
                @keypress="validate('nome')"
              />
              <span class="p-error flex justify-content-center span">{{
                errors.nome
              }}</span>
            </div>

            <div class="field col-12 md:col-3">
              <label for="remove_imagem">Remover Brazão: </label>
              <pm-InputSwitch
                name="remove_imagem"
                v-model="remove"
                @change="if(remove){ preview=null; troca=false; img=null; } "
              />
            </div>

            <div class="field col-12 md:col-12 mt-12" v-if="!remove">
              <pm-FileUpload class="p-fileupload" mode="basic" accept="image/*" name="nota[]" id="input" @select="defineArquivo"  uploadLabel="Enviar Anexos"  cancelLabel="Cancelar"
                chooseLabel="Escolher Foto do Brazão" />
                
                <div style="text-align: center; width: 100%; margin-top: 10px;"> 
                  <img :src="preview" id="preview" name="preview_brazao" v-if="preview!=null" />
                </div>
            </div>

            <div class="field col-12 md:col-3">
              <label for="modo">Modo: </label>
              <pm-SelectButton v-model="cliente.modo" :options="modos" aria-labelledby="single" ></pm-SelectButton>
            </div>

            <div class="field col-12 md:col-3">
              <label for="expediente">Expediente*: </label>
              <pm-InputText
                type="text"
                name="expediente"
                v-model="cliente.expediente"
                :class="{ 'p-invalid': errors.expediente != '' }"
                @blur="validate('expediente')"
                @keypress="validate('expediente')"
              />
              <span class="p-error flex justify-content-center span">{{
                errors.expediente
              }}</span>
            </div>

            <div class="field col-12 md:col-3">
              <label for="api_chave_youtube">API chave youtube: </label>
              <pm-InputText
                type="text"
                name="api_chave_youtube"
                v-model="cliente.api_chave_youtube"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="id_playlist_youtube">ID playlist youtube: </label>
              <pm-InputText
                type="text"
                name="id_playlist_youtube"
                v-model="cliente.id_playlist_youtube"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="id_analytics">ID analytics: </label>
              <pm-InputText
                type="text"
                name="id_analytics"
                v-model="cliente.id_analytics"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="block_licitacao">Bloquear licitação: </label>
              <pm-InputSwitch
                name="block_licitacao"
                v-model="cliente.block_licitacao"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="mostra_jornalista">Mostrar jornalista: </label>
              <pm-InputSwitch
                name="mostra_jornalista"
                v-model="cliente.mostra_jornalista"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="exibir_menu_vertical">Exibir menu vertical: </label>
              <pm-InputSwitch
                name="exibir_menu_vertical"
                v-model="cliente.exibir_menu_vertical"
              />
            </div>

          </div>
        </pm-AccordionTab>

        <pm-AccordionTab header="Redes Sociais">
          <div class="p-fluid formgrid grid">

            <div class="field col-12 md:col-3">
              <label for="facebook">Facebook: </label>
              <pm-InputText
                type="text"
                name="facebook"
                v-model="cliente.facebook"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="twitter">Twitter: </label>
              <pm-InputText
                type="text"
                name="twitter"
                v-model="cliente.twitter"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="instagram">Instagram: </label>
              <pm-InputText
                type="text"
                name="instagram"
                v-model="cliente.instagram"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="youtube">Youtube: </label>
              <pm-InputText
                type="text"
                name="youtube"
                v-model="cliente.youtube"
              />
            </div>
          </div>
        </pm-AccordionTab>

        <pm-AccordionTab header="Localização e Contatos">
          <div class="p-fluid formgrid grid">

            <div class="field col-12 md:col-3">
              <label for="endereco">Endereço: </label>
              <pm-InputText
                type="text"
                name="endereco"
                v-model="cliente.street.endereco"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="bairro">Bairro: </label>
              <pm-InputText
                type="text"
                name="bairro"
                v-model="cliente.street.bairro"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="cidade">Cidade: </label>
              <pm-InputText
                type="text"
                name="cidade"
                v-model="cliente.street.cidade"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="cep">CEP: </label>
              <pm-InputMask
                type="text"
                name="cep"
                v-model="cliente.street.cep"
                mask="99-999-999"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="maps">Google Maps: </label>
              <pm-InputText
                type="text"
                name="maps"
                v-model="cliente.maps"
              />
            </div>

            <div class="field col-12 md:col-3">
              <label for="nome">E-mail: </label>
              <pm-InputText
                type="text"
                name="email"
                v-model="email"
                placeholder="E-mail"
              />
              <pm-Button
                style="margin-top: 34px"
                icon="pi pi-plus"
                class="p-button-rounded p-button-success p-button-text col-12 md:col-1"
                @click="adicionaEmail"
                v-tooltip.top="{
                  value: 'Adicionar novo e-mail.',
                  class: 'custom-tooltip',
                }"
              />

              <pm-Chip
                  v-for="v in cliente.emails"
                  :key="v"
                  :label="v"
                  class="ml-2"
                  removable
                  @remove="excluiEmail(v)"
                />

            </div>

            <div class="field col-12 md:col-3">
              <label for="nome">Telefone: </label>
              <pm-InputMask
                type="text"
                name="telefone"
                v-model="telefone"
                placeholder="Telefone"
                mask="(99) 9999-9999"
              />
              <pm-Button
                style="margin-top: 34px"
                icon="pi pi-plus"
                class="p-button-rounded p-button-success p-button-text col-12 md:col-1"
                @click="adicionaTelefone('telefone')"
                v-tooltip.top="{
                  value: 'Adicionar novo telefone.',
                  class: 'custom-tooltip',
                }"
              />

              <span v-for="v in cliente.telefones">
                <pm-Chip
                  v-if="v.tipo.toLowerCase()=='telefone'"
                  :key="v.numero"
                  :label="v.numero"
                  class="ml-2"
                  removable
                  @remove="excluiTelefone(v.nome, 'telefone')"
                />
              </span>

            </div>

            <div class="field col-12 md:col-3">
              <label for="nome">Fax: </label>
              <pm-InputMask
                type="text"
                name="fax"
                v-model="fax"
                placeholder="Fax"
                mask="(99) 9999-9999"
              />
              <pm-Button
                style="margin-top: 34px"
                icon="pi pi-plus"
                class="p-button-rounded p-button-success p-button-text col-12 md:col-1"
                @click="adicionaTelefone('fax')"
                v-tooltip.top="{
                  value: 'Adicionar novo fax.',
                  class: 'custom-tooltip',
                }"
              />

              <span v-for="v in cliente.telefones">
                <pm-Chip
                  v-if="v.tipo.toLowerCase()=='fax'"
                  :key="v.numero"
                  :label="v.nome"
                  class="ml-2"
                  removable
                  @remove="excluiTelefone(v.nome, 'fax')"
                />
              </span>

            </div>

          </div>
        </pm-AccordionTab>
      </pm-Accordion>
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

import { useClienteStore } from "@/store/cliente/clienteStore";
import ICliente from "@/interfaces/ICliente";

import axios from "axios";

import * as Yup from "yup";

export default defineComponent({
  name: "ClienteForm",
  components: { Form },
  props: {
    id: { type: Number }
  },

  data() {
    return {
      carregandoPagina: false,
      modal: false,
      cliente: {} as ICliente,
      errors: {
        nome: "" as String,
        expediente: "" as String
      } as any,
      modos: ['Prefeitura', 'Câmara'],
      email: "" as String,
      telefone: "" as String,
      fax: "" as String,
      remove: false,
      troca: false,
      img: null as any,
      preview: null as any,
      baseurl: axios.defaults.baseURL as any,
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
    const clienteStore = useClienteStore();

    const schema = Yup.object().shape({
      nome: Yup.string().required( "O nome é obrigatório").test("nome_existe", "Nome já existe", async function (value) {
          return await clienteStore.checaNome(value, props.id); 
          }),
      expediente: Yup.string().required( "O expediente é obrigatório"),
    });

    return {
      schema,
      clienteStore,
    };
  },
  methods: {
    validate(field: string) {
      this.schema
        .validateAt(field, this.cliente)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[field] = err.message;
        });
    },
    voltar() {
      this.$router.push({
        name: "listar-clientes",
      });
    },
    validaEmail(email: string){
      return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    },
    defineArquivo(event: any){
      this.img=event.files[0];
      this.remove=false;
      this.troca=true;
      this.preview=URL.createObjectURL(this.img);
    },
    procuraEmail(nome: string){
      var i=0;
      for(i=0; i<this.cliente.emails.length; i++){
        var item=this.cliente.emails[i] as any;
        if(item==nome){
          return i;
        }
      }
      return -1;
    },
    adicionaEmail(){
      if(this.email!=""){
        var index=this.procuraEmail(this.email as string);
        if(index==-1){
          if(this.validaEmail(this.email as string)){
            this.cliente.emails.push(this.email);
          }
          else{
            this.$toast.error("E-mail inválido!");
          }
        }
        else{
          this.$toast.error("E-mail já foi adicionado!");
        }
        this.email='';
      }
      else{
        this.$toast.error("Preencha o e-mail!");
      }
    },
    excluiEmail(nome: string){
      var index=this.procuraEmail(nome);
        if(index!=-1){
          this.cliente.emails.splice(index,1);
        }
    },
    procuraTelefone(nome: string, tipo: string){
      var i=0;
      for(i=0; i<this.cliente.telefones.length; i++){
        var item=this.cliente.telefones[i] as any;
        if(item.nome==nome && item.tipo.toLowerCase()==tipo){
          return i;
        }
      }
      return -1;
    },
    adicionaTelefone(tipo: string){
      if(this.telefone!=""){
        var index=this.procuraTelefone(this.telefone as string, tipo);
        if(index==-1){
          var obj: any = { numero: this.telefone, tipo: tipo };
          this.cliente.telefones.push(obj);
        }
        else{
          this.$toast.error("Este "+tipo+" já foi adicionado!");
        }
        this.telefone='';
      }
      else{
        this.$toast.error("Preencha o "+tipo+"!");
      }
    },
    excluiTelefone(nome: string, tipo: string){
      var index=this.procuraTelefone(nome, tipo);
        if(index!=-1){
          this.cliente.telefones.splice(index,1);
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

        this.carregandoPagina = true;

        if(this.remove || this.img==null){
          this.troca=false;
        }
        this.cliente.remove_imagem=this.remove;

        var res: any = await this.clienteStore.cadastrar(this.cliente);
        if(this.troca){
          var formData = new FormData();
          formData.append('id', res.id);
          formData.append('file', this.img);
          res = await this.clienteStore.enviaImagem(res.id, formData);
        }
        
        this.carregandoPagina = false;
        if (res.code == "200") {
          this.$toast.success("Cliente cadastrado com sucesso!");
          this.$router.push({ name: "listar-clientes" });
        } 
        else {
          this.$toast.error("Houve um erro ao salvar!");
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

        this.carregandoPagina = true;
        
        if(this.remove || this.img==null){
          this.troca=false;
        }
        this.cliente.remove_imagem=this.remove;
        
        var res: any = await this.clienteStore.editar(this.cliente);
        
        if(this.troca){
          var formData = new FormData();
          formData.append('id', this.cliente.id+"");
          formData.append('file', this.img);
          res = await this.clienteStore.enviaImagem(this.cliente.id, formData);
        }
        
        this.carregandoPagina = false;
        if (res.code == "200") {
          this.$toast.success("Cliente atualizado com sucesso!");
          this.$router.push({ name: "listar-clientes" });
        } 
        else {
          this.$toast.error("Houve um erro ao alterar!");
        }
    },
  },
  async beforeMount() {
    this.carregandoPagina = true;

    this.cliente.id = this.id as number;
    this.cliente.modo='Prefeitura';
    this.cliente.street={};
    if (this.id != 0) {
      this.cliente = await this.clienteStore.getOne(this.cliente.id);
    } 
    var foto: string = this.cliente.foto_brazao;
    var len = foto.split("/").length;
    this.preview = this.baseurl.replace("api/", "") + "storage/" + foto.split("/")[len - 2] + "/" + foto.split("/")[len - 1];
    console.log(this.preview)

    this.carregandoPagina = false;
  },
});
</script>

<style>
img#preview{
  max-height: 300px;
  margin-top: 10px;
}

.custom-tooltip .p-tooltip-text {
  background-color: var(--blue-800);
  color: rgb(255, 255, 255);
}
</style>