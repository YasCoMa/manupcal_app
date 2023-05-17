import { defineStore } from "pinia";
import axios from "axios";
import ICliente from "@/interfaces/ICliente";
import { AnyObject } from "yup/lib/types";

export const useClienteStore = defineStore("cliente", {
  state: () => ({
    lista: [],
    loading: false,
    secret_temp:  {} as any,

  }),

  getters: {
    getCliente(state) {
      return state.lista;
    },
  },

  actions: {
    async buscarTodos() {
      try {
        this.loading = true;
        const data = await axios.get("/clientes");
        this.lista = data.data.payload;
        this.loading = false;
        return data.data.payload;

      } 
      catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async checaNome(nome: any, id: any) {
      try {
        const data: any = await axios.get("valida-nome-cliente/" + nome + "/" + id);
        var resp: boolean = !data.data.cliente_existe;
        return resp;
      } catch (error) {
        return false;
      }
    },
    async getOne(id: any) {
      try {
        const data = await axios.get('clientes/'+id);  
        return data.data.payload;
      } catch (error) {
        console.log(error);
      }
    },
    async enviaImagem(id: any, formData: any) {
      try {
        const data = await axios.post("/clientes/imagem/"+id, formData, { headers: {'Content-Type': 'multipart/form-data', 'key': sessionStorage.getItem('token') as string } } );
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async cadastrar(dados: any) {
      try {
        const data = await axios.post("/clientes", dados );
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async editar(dados: any) {
      try {
        const data = await axios.put("/clientes/"+dados.id, dados );
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async excluir(id: Number) {
      //try {
        const data = await axios.delete("/clientes/"+id );
        return data.data;
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
});