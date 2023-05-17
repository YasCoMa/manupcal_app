<template>
  <div id="hideShowSideBar" class="sidebar" :style="{ width: sidebarWidth }">
    <div>
      <span
        class="collapse-icon"
        :class="{ 'rotate-180': collapsed }"
        @click="closeSideBar"
      >
        <i class="pi pi-times"></i>
      </span>
      <!--- <span
       v-if="1 == 0"
        class="collapse-icon"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleSidebar"
      >
        <i class="fas fa-bars"></i>
      </span>-->
      <h2>
        <!-- <span v-if="collapsed">LG</span> -->
        <!-- <span v-else>LOGO</span> -->
        <img
          style="height: 30px"
          v-if="collapsed"
          src="@/assets/logoCopia.png"
          alt="logo"
          class="ml-2"
        />
        <img
          style="height: 70px"
          v-else
          src="@/assets/logoCopia.png"
          alt="logo"
          class="ml-2"
        />
      </h2>
    </div>

    <div>
      <div v-if="novaMensagem">
        <pm-Button
          v-if="collapsed"
          class="p-button-raised p-button-text"
          icon="fas fa-pen"
          @click="openPosition('bottomright')"
        ></pm-Button>
        <pm-Button
          v-else
          class="p-button-raised p-button-text"
          label="Escrever"
          icon="fas fa-pen"
          @click="openPosition('bottomright')"
        ></pm-Button>
      </div>
      <DropdownComponent
        v-for="(item, index) in menuTree"
        :key="index"
        :data="item.children"
        :label="item.label"
        :icon="item.icon"
        :depth="0"
        :smallMenu="false"
        :route="item.route"
        @click="fecharSideBarMobile(item.label)"
      />
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";

import DropdownComponent from "./DropdownComponent.vue";

import { useCriptoStore } from "@/store/store";

export default defineComponent({
  name: "SidebarComponent",
  props: {},
  components: {
    DropdownComponent,
  },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  data() {
    return {
      novaMensagem: false,
      smallSize: false,
      displayPosition: false,
      position: "center",
      menuTree: [],
      id:
        sessionStorage.getItem("mensagem_rascunho") == null
          ? 0
          : parseInt(sessionStorage.getItem("mensagem_rascunho")),
    };
  },
  computed: {},
  methods: {
    fecharSideBarMobile(item) {
      if (item == "Configurações") return false;

      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (width <= 800) {
        this.closeSideBar();
      }
    },
    ajustarSize(size) {
      this.$emit("ajustarSize", size);
    },
    closeSideBar() {
      document.getElementById("hideShowSideBar").style.display = "none";
      this.ajustarSize("0px");
    },
    openPosition(position) {
      this.position = position;
      this.displayPosition = true;
    },
    closePosition() {
      this.displayPosition = false;
    },
  },
  async beforeMount() {
    var main = [
      // { label: "Dashboard", icon: "fas fa-columns", route: "area-de-trabalho" },
    ];

    var base = {};
    const criptoStore = useCriptoStore();
    var permissoes = await criptoStore.decryptBack(
      sessionStorage.getItem("permissao")
    );
    var p = JSON.parse(permissoes);

    //var p = JSON.parse(sessionStorage.getItem("permissao"));

    if (!p) {
      await this.$router.push({ name: "login" });
    }

    if (p.permissao || p.usuario) {
      base = { label: "Configurações", icon: "fas fa-gear", children: [] };
      if (p.nivel_permissao) {
        base.children.push({
          label: "Consultar Permissões",
          icon: "fas fa-list",
          route: "listar-permissao",
        });
      }
      if (p.usuario) {
        base.children.push({
          label: "Lista de usuários",
          icon: "fa-solid fa-users",
          route: "listar-usuarios",
        });
      }
      console.log(p)
      if (p.sistema_mtw) {
        base.children.push({
          label: "Lista de sistemas",
          icon: "fa-solid fa-list",
          route: "listar-sistemas",
        });
      }
      if (p.cliente) {
        base.children.push({
          label: "Lista de clientes",
          icon: "fa-solid fa-list",
          route: "listar-clientes",
        });
      }
      // if (p.hab_admin_secretaria) {
      //   base.children.push({
      //     label: "Relatório de visualizações",
      //     icon: "fa-solid fa-file",
      //     route: "relatorio-visualizacao",
      //   });
      // }

      main.push(base);
    }

    this.menuTree = main;
  },
});
</script>

<!--<style>
:root {
  --sidebar-bg-color: #003570;
  --sidebar-item-hover: #386497;
  --sidebar-item-active: #002044;
}

  .hideShowSideBar {
    display: block;
  }
  @media only screen and (max-width: 800px){
      smallSize
  }

 

</style>-->

<style scoped>
.sidebar {
  color: #fff;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-y: auto;
  bottom: 0;
  padding: 0.5rem;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.collapse-icon {
  position: absolute;
  right: 0;
  padding: 0.75rem;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}
.collapse-icon:hover {
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>

<style lang="scss" scoped>
::v-deep() {
  .p-button-label {
    color: white;
  }
  .p-button-icon {
    color: white;
  }
  .p-button {
    width: 100%;
    margin-bottom: 20px;
    background-color: #ca0003 !important;
  }
  .p-button:hover {
    background-color: #ff0004 !important;
    transition: 0.3s;
  }
}
</style>
