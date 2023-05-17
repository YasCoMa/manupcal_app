import { defineStore } from "pinia";
import axios from "axios";
import ISistema from "@/interfaces/ISistema";
import { AnyObject } from "yup/lib/types";

export const useSistemaStore = defineStore("sistena", {
  state: () => ({
    lista: [],
    loading: false,
    secret_temp:  {} as any,

  }),

  getters: {
    getSistema(state) {
      return state.lista;
    },
  },

  actions: {
    async buscarTodos() {
      try {
        this.loading = true;
        const data = await axios.get("/sistemas");
        this.lista = data.data.payload;
        this.loading = false;
        return data.data.payload;

      } 
      catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async buscarTodosPorCliente(cliente_id: any) {
      try {
        this.loading = true;
        const data = await axios.get("/sistemas/cliente/"+cliente_id);
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
        const data = await axios.get('sistemas/'+id);  
        return data.data.payload;
      } catch (error) {
        console.log(error);
      }
    },
    async checaNome(nome: any, id: any) {
      try {
        const data: any = await axios.get("valida-nome-sistema/" + nome + "/" + id);
        var resp: boolean = !data.data.sistema_existe;
        return resp;
      } catch (error) {
        return false;
      }
    },
    async cadastrar(dados: any) {
      try {
        const data = await axios.post("/sistemas", dados );
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async editar(dados: any) {
      try {
        const data = await axios.put("/sistemas/"+dados.id, dados );
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async excluir(id: Number) {
      try {
        const data = await axios.delete("/sistemas/"+id );
        return data.data;
       } 
       catch (error) {
         console.log(error);
       }
    },
  },
});