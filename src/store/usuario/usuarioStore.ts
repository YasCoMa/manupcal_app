import { defineStore } from "pinia";
import axios from "axios";
import IUsuario from "@/interfaces/IUsuario";
//import { useCriptoStore } from "@/store/store";

interface State {
  lista: IUsuario[];
  permiss_temp: any;
}

export const useUsuarioStore = defineStore("usuario", {
  state: (): State => {
    return {
      lista: [],
      permiss_temp: {},
    };
  },
  getters: {
    //computed
    usuario(state) {
      return state.lista;
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
    async getOne(id: number) {
      // try {
      const data = await axios.get("usuarios/" + id);
      return data.data.payload;
      // } catch (error) {
      // console.log(error);
      // }
    },
    async getTodos() {
      try {
        //const criptoStore = useCriptoStore();
        //const data = await axios.get("usuarios/sistema/"+criptoStore.sistema_id);
        const data = await axios.get("usuarios");
        var usuarios: IUsuario[] = data.data.payload;
        this.lista = [];
        for (const el of usuarios) {
          this.lista.push(el);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checaLogin(login: any, id: any) {
      try {
        const data: any = await axios.get("valida-login/" + login + "/" + id);
        var resp: boolean = !data.data.usuario_existe;
        return resp;
      } catch (error) {
        return false;
      }
    },
    async checaEmail(email: any, id: any) {
      try {
        const data: any = await axios.get("valida-email/" + email + "/" + id);

        var resp: boolean = !data.data.usuario_existe;
        return resp;
      } catch (error) {
        return false;
      }
    },
    async autenticar(dado: object) {
      try {
        const data = await axios.post("/autenticacao", dado);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async apagar(id: number) {
      try {
        const data = await axios.delete("/usuarios/" + id);
        this.getTodos();
        return data;
      } catch (error) {
        return error;
      }
    },
    async cadastrar(dado: IUsuario) {
      try {
        const data = await axios.post("/usuarios", dado);
        this.getTodos();
        return data;
      } catch (error) {
        return error;
      }
    },
    async atualizar(dado: IUsuario) {
      // try {
      const data = await axios.put("/usuarios/" + dado.id, dado);
      this.getTodos();
      return data;
      // } catch (error) {
      //    return error;
      // }
    },
  },
});
