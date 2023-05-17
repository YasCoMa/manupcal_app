import { defineStore } from "pinia";
import axios from "axios";
import IConcessao from "@/interfaces/IConcessao";
import { AnyObject } from "yup/lib/types";

export const useConcessaoStore = defineStore("concessao", {
  state: () => ({
    lista: [],
    loading: false,
    secret_temp:  {} as any,

  }),

  getters: {
    getConcessao(state) {
      return state.lista;
    },
  },

  actions: {
    async buscarTodos() {
      try {
        this.loading = true;
        const data = await axios.get("/concessoes");
        this.lista = data.data.payload;
        this.loading = false;
        return data.data;

      } 
      catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async buscarTodosPorCliente(cliente_id: any) {
      try {
        this.loading = true;
        const data = await axios.get("/concessoes/cliente/"+cliente_id);
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
        const data = await axios.get('concessoes/'+id);  
        return data.data.payload;
      } catch (error) {
        console.log(error);
      }
    },
    async cadastrar(dados: any) {
      try {
        const data = await axios.post("/concessoes", dados );
        
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async editar(dados: any) {
      try {
        const data = await axios.put("/concessoes/"+dados.id, dados );
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async excluir(id: Number) {
      //try {
        const data = await axios.delete("/concessoes/"+id );
        return data.data;
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
});