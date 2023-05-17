<template>
  <div class="menu-item" :class="{ expanded: expanded }">
    <router-link :to="{ name: route }" class="link">
      <div
        class="label"
        :class="{ active: isActive }"
        @click="toggleMenu()"
        :style="{ paddingLeft: depth * 20 + 20 + 'px' }"
      >
        <div>
          <i v-if="icon" :class="icon"></i>
          <span v-if="showLabel && !collapsed">{{ label }}</span>
        </div>

        <div v-if="data && !collapsed">
          <i
            class="pi pi-angle-down expand"
            :class="{ expanded: expanded }"
          ></i>
        </div>
      </div>
    </router-link>

    <div
      v-show="showChildren"
      :class="{ 'small-menu': smallMenu }"
      class="items-container"
      :style="{ height: containerHeight }"
      ref="container"
    >
      <dropdown-component
        :class="{ opened: showChildren }"
        v-for="(item, index) in data"
        :key="index"
        :data="item.children"
        :label="item.label"
        :icon="item.icon"
        :depth="depth + 1"
        :smallMenu="smallMenu"
        :route="item.route"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { collapsed } from "./state";
export default defineComponent({
  name: "DropdownComponent",
  props: {
    data: {
      type: Array,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    depth: {
      type: Number,
    },
    smallMenu: {
      type: Boolean,
    },
    route: {
      type: String,
    },
    action:{
      type: Event
    }
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.name === props.route);

    return { collapsed, isActive };
  },
  data: () => ({
    showChildren: false,
    expanded: false,
    containerHeight: 0,
  }),
  computed: {
    showLabel() {
      return this.smallMenu ? this.depth > 0 : true;
    },
  },
  methods: {
    toggleMenu() {
      this.expanded = !this.expanded;
      //Caso o menu item esteja fechado
      if (!this.showChildren) {
        this.showChildren = true;
        this.$nextTick(() => {
          //pega a altura dos itens filhos para iniciar a animação
          this.containerHeight = this.$refs["container"].scrollHeight + "px";
          setTimeout(() => {
            this.containerHeight = "fit-content";
            // define o overflow do container para visivel no final da animação
            this.$refs["container"].style.overflow = "visible";
          }, 300); // duração da animação
        });
      } else {
        this.containerHeight = this.$refs["container"].scrollHeight + "px";
        // define os filhos como hidden para evitar a sobreposição do texto durante a animação
        this.$refs["container"].style.overflow = "hidden";
        setTimeout(() => {
          this.containerHeight = 0 + "px";
        }, 10);
        setTimeout(() => {
          this.showChildren = false;
        }, 300); // duração da animação
      }
    },
  },
});
</script>

<style lang="scss">
.menu-item {
  position: relative;
  width: 100%;
  .label {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    white-space: nowrap;
    user-select: none;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 14px;
    color: #fff;
    transition: all 0.3s ease;
    > div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    i {
      font-size: 20px;
      color: #fff;
      transition: all 0.3s ease;
      &.expand {
        font-size: 16px;
        color: #cacaca;
        &.expanded {
          transform: rotate(180deg);
        }
      }
    }
    &.small-item {
      width: fit-content;
    }
    &:hover {
      background: var(--sidebar-item-hover);
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .items-container {
    width: 100%;
    left: calc(100% + 6px);
    transition: height 0.3s ease;
    overflow: hidden;
    &.small-menu {
      width: fit-content;
      position: absolute;
      background: #fff;
      box-shadow: 0 0 10px #ebebeb;
      top: 0;
      .label {
        width: 100% !important;
        padding-left: 20px !important;
      }
    }
  }
}
</style>

<style scoped>
.link {
  color: #fff;
  text-decoration: none;
}
.active {
  background-color: var(--sidebar-item-active);
  border-radius: 5px;
}
</style>
