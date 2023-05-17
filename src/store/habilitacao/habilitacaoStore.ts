import { defineStore } from "pinia";
import axios from "axios";
import IHabilitacao from "@/interfaces/IHabilitacao";
import { AnyObject } from "yup/lib/types";

export const useHabilitacaoStore = defineStore("habilitacao", {
  state: () => ({
    lista: [],
    loading: false,
    secret_temp:  {} as any,

  }),

  getters: {
    getHabilitacao(state) {
      return state.lista;
    },
  },

  actions: {
    async buscarTodos() {
      try {
        this.loading = true;
        const data = await axios.get("/habilitacoes");
        this.lista = data.data.payload;
        this.loading = false;
        return data.data;

      } 
      catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async buscarTodosPorUsuario(usuario_id: any) {
      try {
        this.loading = true;
        const data = await axios.get("/habilitacoes/usuario/"+usuario_id);
        this.lista = data.data.payload;
        this.loading = false;
        return data.data.payload;

      } 
      catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async getOne(id: any) {
      try {
        const data = await axios.get('habilitacoes/'+id);  
        return data.data.payload;
      } catch (error) {
        console.log(error);
      }
    },
    async cadastrar(dados: any) {
      try {
        const data = await axios.post("/habilitacoes", dados );
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async editar(dados: any) {
      try {
        const data = await axios.put("/habilitacoes/"+dados.id, dados );
        
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async excluir(id: Number) {
      //try {
        const data = await axios.delete("/habilitacoes/"+id );
        this.buscarTodos();
        return data.data;
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
});