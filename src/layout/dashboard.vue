<template>
  <section>
    <NavbarComponent @ajustarSize="ajustarSize" @click="fecharSideBarMobile" />
    <SidebarComponent @ajustarSize="ajustarSize" />
    <div class="sizeDashBoard" @click="fecharSideBarMobile">
      <router-view />
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { sidebarWidth } from "@/components/sidebar/state.ts";

import NavbarComponent from "@/components/navbar/NavbarComponent.vue";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";

export default defineComponent({
  name: "layout-dashboard",
  components: {
    NavbarComponent,
    SidebarComponent,
  },
  data() {
    return {
      sideBarSize: "255px",
      flag: false,
    };
  },
  setup() {
    // return { sidebarWidth };
  },
  methods: {
    fecharSideBarMobile() {
      if (this.flag) {
        //se for true, fechar a sidebar
        this.flag = !this.flag;
        let width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        if (width <= 800) {
          this.closeSideBar();
        }
        return false;
      } else {
        //cada vez que ele clicar ou na dashboard ou na navbar, trocar o estado da flag
        this.flag = !this.flag;
      }
    },
    closeSideBar() {
      document.getElementById("hideShowSideBar").style.display = "none";
      this.ajustarSize("0px");
    },
    ajustarSize(size) {
      this.sideBarSize = size;
    },
  },
  beforeMount() {
    if (sessionStorage.getItem("token") == null) {
      location.href = "/autenticacao/login";
    }
  },
});
</script>

<style>
.sizeDashBoard {
  margin-left: v-bind(sideBarSize);
  transition: 0.3s ease;
}

@media only screen and (max-width: 800px) {
  .sizeDashBoard {
    margin-left: 2px;
  }
}
</style>
