import { defineStore } from "pinia";
import axios from "axios";
import IPermissao from "@/interfaces/IPermissao";
import {useToast} from 'vue-toast-notification';

interface State {
  listaPermissao: IPermissao[];
  permiss_temp: any;
}

export const usePermissaoStore = defineStore("permissao", {
  state: (): State => {
    return {
        listaPermissao: [],
        permiss_temp: {}
    };
  },
  getters: {
    //computed
    permissao(state) {
      return state.listaPermissao;
    },
  },
  actions: {
    async ItemTemporario(p: any) {
      try {
        this.permiss_temp = [];
        this.permiss_temp = p;
      } catch (error) {
        console.log(error);
      }
    },
    async checaIdentificador(identificador: any, id: any, sistema: any) {
      try {
        const cliente: any = sessionStorage.getItem('cliente_id');
        const data: any = await axios.get("valida-identificador/"+identificador+"/"+id+"/"+sistema+"/"+cliente);  
        var resp: boolean = ! data.data.permissao_existe;
        return resp;
      } catch (error) {
        return false;
      }
    },
    async getPermissao() {
      try {
        const data = await axios.get("permissoes");  
        var permissoes: IPermissao[] = data.data.payload;
        this.listaPermissao = [];
        for (const el of permissoes) {
            this.listaPermissao.push(el);  
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getPermissaoCliente() {
      try {
        const cliente: any = sessionStorage.getItem('cliente_id');
        const data = await axios.get("permissoes/cliente/"+cliente);  
        var permissoes: IPermissao[] = data.data.payload;
        this.listaPermissao = [];
        for (const el of permissoes) {
            this.listaPermissao.push(el);  
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getOnePermissao(id: number) {
      try {
        const data = await axios.get('permissoes/'+id);  
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getOnePermissaoCliente(id: number) {
      try {
        const cliente: any = sessionStorage.getItem('cliente_id');
        const data = await axios.get('permissoes/cliente/'+cliente+'/'+id);  
        return data.data.payload;
      } catch (error) {
        console.log(error);
      }
    },
    async apagarPermissao(id: number) {
      try {
        const data = await axios.delete('permissoes/'+id);  
        this.getPermissaoCliente();
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async cadastrar(permissao: IPermissao) {
      try {
        const toast = useToast();
        const data = await axios.post('permissoes', permissao)
        .then(function (response) {
          toast.success("Nível de Permissão cadastrado com sucesso!");
        })
        .catch(function (error) {
          if (error.response) {
            //console.log(error.response.data);
            for (let i = 0; i < error.response.data.extras.length; i++) {
              if(error.response.data.extras[i].identificador){
                toast.error(error.response.data.extras[i].identificador[0]);
              }
            }
          }
        });  
        
      
        this.getPermissaoCliente()
      } catch (error) {

      }
    },
    async editar(permissao: IPermissao) {
      try {
        const toast = useToast();
        const data = await axios.put('permissoes/'+permissao.id, permissao) 
        .then(function (response) {  
          toast.success("Nível de Permissão editado com sucesso!");
        })
        .catch(function (error) {
          for (let i = 0; i < error.response.data.extras.length; i++) {
            if(error.response.data.extras[i].identificador){
              toast.error(error.response.data.extras[i].identificador[0]);
            }
          }
        });  
        
        this.getPermissaoCliente()
      } catch (error) {
        console.log(error);
      }
    },
  },
});
