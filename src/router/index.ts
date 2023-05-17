import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import DashboardLayout from "@/layout/dashboard.vue";
import { useCriptoStore } from "@/store/store";

const checkAuth = async function (to:any) {
  try {
    if (!window.sessionStorage.getItem('token')) {
      return false;
    }
    const criptoStore = useCriptoStore();
    var permissoes = await criptoStore.decryptBack(sessionStorage.getItem("permissao"));
  
    let verificacao=true;
    permissoes = JSON.parse(permissoes);

    if(to.meta.modulo in permissoes){
      verificacao = permissoes[to.meta.modulo];
    }

    return verificacao;
  } catch (error) {
      // console.log(error)
  }
  
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    redirect: { name: "listar-usuarios" }, // Trocar depois para as lista de licenças concedidas
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },

  {
    name: "administracao",
    path: "/painel",
    component: DashboardLayout,
    beforeEnter: async (to, from, next) => {
      try {
        return next();
      } catch (e) {
        next("/autenticacao/login");
      }
    },
    children: [
      // Permissoes visualizar
      {
        name: "listar-permissao",
        path: "permissao/listar",
        props: true,
        component: () => import("@/views/admin/permissao/permissao.vue"),
        meta: {
          title: 'Gerenciar Permissão',
          modulo: 'permissao'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
      // Permissoes adicionar
      {
        name: "adicionar-permissao",
        path: "permissao/cadastrar",
        props: true,
        component: () => import("@/views/admin/permissao/addPermissao.vue"),
        meta: {
          title: 'Adicionar Permissão',
          modulo: 'permissao'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
      // Permissoes Editar
      {
        name: "editar-permissao",
        path: "permissao/editar/:id",
        props: true,
        component: () => import("@/views/admin/permissao/editarPermissao.vue"),
        meta: {
          title: 'Editar Permissão',
          modulo: 'permissao'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
      // Usuarios
      // Cadastrar usuario
      {
        name: "cadastrar-usuario",
        path: "usuario/cadastrar",
        props: true,
        component: () => import("@/views/admin/usuarios/cadastrar.vue"),
        meta: {
          title: 'Cadastrar Usuario',
          modulo: 'usuario'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
      // Editar usuario
      {
        name: "editar-usuario",
        path: "usuario/editar/:modo/:id",
        props: true,
        component: () => import("@/views/admin/usuarios/editar.vue"),
        meta: {
          title: 'Editar Usuario',
          modulo: 'usuario'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
      // Editar usuario
      /*{
        name: "meus-dados-usuario",
        path: "usuario/meus-dados",
        props: true,
        component: () => import("@/views/admin/usuarios/editar-meus-dados.vue"),
        meta: {
          title: 'Gerenciar Permissão',
          modulo: 'permissao'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },*/

      // Listar de usuario
      {
        name: "listar-usuarios",
        path: "usuarios/listar",
        props: true,
        component: () => import("@/views/admin/usuarios/listar.vue"),
        meta: {
          title: 'Gerenciar Usuario',
          modulo: 'usuario'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
      // Sistemas
      // Cadastrar sistema
      {
        name: "cadastrar-sistema",
        path: "sistema/cadastrar",
        props: true,
        component: () => import("@/views/admin/sistema/cadastrar.vue"),
        meta: {
          title: 'Cadastrar Sistema',
          modulo: 'sistema'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
      // Editar sistema
      {
        name: "editar-sistema",
        path: "sistema/editar/:id",
        props: true,
        component: () => import("@/views/admin/sistema/editar.vue"),
        meta: {
          title: 'Editar Sistema',
          modulo: 'sistema'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },

      // Listar sistema
      {
        name: "listar-sistemas",
        path: "sistemas/listar",
        props: true,
        component: () => import("@/views/admin/sistema/listar.vue"),
        meta: {
          title: 'Gerenciar Sistema',
          modulo: 'sistema'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },

      // Clientes
      // Cadastrar cliente
      {
        name: "cadastrar-cliente",
        path: "cliente/cadastrar",
        props: true,
        component: () => import("@/views/admin/cliente/cadastrar.vue"),
        meta: {
          title: 'Cadastrar Sistema',
          modulo: 'cliente'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
      // Editar cliente
      {
        name: "editar-cliente",
        path: "cliente/editar/:modo/:id",
        props: true,
        component: () => import("@/views/admin/cliente/editar.vue"),
        meta: {
          title: 'Editar Sistema',
          modulo: 'cliente'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },

      // Listar cliente
      {
        name: "listar-clientes",
        path: "clientes/listar",
        props: true,
        component: () => import("@/views/admin/cliente/listar.vue"),
        meta: {
          title: 'Gerenciar Sistema',
          modulo: 'cliente'
        },
        beforeEnter: async (to, from, next) => {
          try {
            if(await checkAuth(to)){
              return next();
            }else{
              next("/autenticacao/login");
            }
          } catch (e) {
            next("/autenticacao/login");
          }
        },
      },
    ],
  },
  {
    name: "login",
    path: "/autenticacao/login",
    component: () => import("@/views/auth/login.vue"),
    meta: {
      titulo: "Autenticação",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
