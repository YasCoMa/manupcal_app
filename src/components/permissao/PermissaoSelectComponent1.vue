<template>
  <section>
    <label style="margin-bottom: 7px">Selecione a Permissão:</label>
    <pm-Dropdown
      v-model="permissaoModel"
      :options="permissaos"
      optionLabel="identificador"
      @change="escolhaPermissao(permissaoModel)"
    />
  </section>
</template>

<script lang="ts">
import { usePermissaoStore } from "@/store/permissao/permissaoStore";
import { computed, defineComponent, onMounted } from "vue";

import IUsuario from "@/interfaces/IUsuario";
import { useUsuarioStore } from "@/store/usuario/usuarioStore";

export default defineComponent({
  name: "PermissaoSelectComponent",
  props: {
    permissao: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      permissaoModel: "",
      usuarioTemp: {
        id: 0 as number,
        cod_permissao: 0,
      },
    };
  },
  setup() {
    const usuarioStore = useUsuarioStore();

    const permissaoStore = usePermissaoStore();
    const permissaos = computed(() => {
      return permissaoStore.listaPermissao;
    });
    onMounted(() => {
      permissaoStore.getPermissao();
    });
    return {
      usuarioStore,
      permissaoStore,
      permissaos,
      getPermissao: computed(() => {
        return permissaoStore.permissao;
      }),
    };
  },
  async beforeMount() {
    this.permissaoModel = this.permissao;
    this.usuarioTemp.id = Number(this.id);
    if (Number(this.id) != 0) {
      this.usuarioTemp = await this.usuarioStore.getOne(this.usuarioTemp.id);
    }
  },
  methods: {
    escolhaPermissao(p: any) {
      this.$emit("escolhaPermissao", p);
    },
  },
});
</script>

<style></style>
