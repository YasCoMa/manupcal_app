<template>
  <div class="navbar">
    <div class="col-md-12" style="width: 100%">
      <div class="dropdown" style="float: left">
        <span
          class="collapse-icon showMenu"
          :class="{ 'rotate-180': collapsed }"
          @click="displaySideBar"
        >
          <i class="fas fa-bars"></i>
        </span>
      </div>
      <div class="dropdown" style="float: right">
        <button
          type="button"
          class="btn btn-primary dropdown-toggle nav-button"
          data-bs-toggle="dropdown"
          style="background-color: #0000; border-color: #0000"
        >
          {{ nome }}
        </button>
        <ul class="dropdown-menu dropdown-menu-itens">
          <!-- <li>
            <router-link
              class="dropdown-item"
              :to="{ name: 'meus-dados-usuario' }"
            >
              Editar Meus dados
            </router-link>
          </li> -->
          <li>
            <a class="dropdown-item" href="javascript:void(0)" @click="sair"
              >Sair</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript"></script>

<script>
import { defineComponent } from "vue";
import {
  collapsed,
  toggleSidebar,
  sidebarWidth,
} from "@/components/sidebar/state.ts";

export default defineComponent({
  name: "NavbarComponent",

  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },

  data() {
    return {
      nome:
        sessionStorage.getItem("nome") == null
          ? "User"
          : sessionStorage.getItem("nome"),
      change: "none",
    };
  },

  methods: {
    ajustarSize(size) {
      this.$emit("ajustarSize", size);
    },
    displaySideBar() {
      //$(".hideShowSideBar").css({display:'block'});
      document.getElementById("hideShowSideBar").style.display = "block";
      this.ajustarSize("255px");
    },
    sair() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("nome");
      sessionStorage.removeItem("permissao");

      location.href = "/autenticacao/login";
    },
  },
});
</script>

<style scoped>
body {
  font-family: "Arial", Serif;
  background-color: #f5f5f5;
  overflow-x: hidden;
}
.nav-button {
  margin-right: 68px;
}
.navbar {
  background-color: #003570;
  /*overflow: hidden;*/
  height: 63px;
}

@media only screen and (max-width: 800px) {
  .navbar {
    height: 100px;
  }
}

.navbaropen {
  background-color: #3b5998;
  /*overflow: hidden;*/
  height: 63px;
  margin-left: 250px;
}

.navbar a {
  float: left;
  display: block;
  /*color: #f2f2f2;*/
  text-align: center;
  padding: 4px 9px;
  text-decoration: none;
  font-size: 17px;
}

.navbar ul {
  margin: 8px 0 0 0;
  list-style: none;
}

.navbar a:hover {
  background-color: #ddd;
  color: #000;
}

.side-nav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.sidenavopen {
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.side-nav a {
  padding: 10px 10px 10px 30px;
  text-decoration: none;
  font-size: 22px;
  color: #ccc;
  display: block;
  transition: 0.3s;
}

.side-nav a:hover {
  color: #fff;
}

.side-nav .btn-close {
  position: absolute;
  top: 0;
  right: 22px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
}

.mainopen {
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  margin-left: 250px;
}

nav {
  transition: margin-left 0.3s;
}

.bar {
  display: block;
  height: 5px;
  width: 35px;
  background: #000;
  margin: 5px auto;
}

.midopen {
  width: 0;
}
.bar {
  transition: all 0.3s ease;
}
.topopen {
  transform: translateY(10px) rotateZ(45deg);
}
.botopen {
  transform: translateY(-10px) rotateZ(-45deg);
}

.showMenu {
  font-size: 18px;
  color: #fff;
  padding: 31px;
}
.showMenu:hover {
  cursor: pointer;
}

.dropdown-menu-itens {
  /* left: -71px !important; */
  --bs-dropdown-min-width: 7rem !important;
  --bs-btn-focus-shadow-rgb: 0, 0 0 !important;
}

.btn-check:focus + .btn,
.btn:focus {
  box-shadow: 0 0 0 0.25rem rgb(3 169 244 / 0%) !important;
}
</style>
