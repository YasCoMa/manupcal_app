import { ref, computed } from "vue";

// variáveis para settar o estado da sidebar e dropdown
export const collapsed = ref(false);
export const collapsedDropdown = ref(false);
// função que retorna o estado ao contrário do atual
export const toggleSidebar = () => (collapsed.value = !collapsed.value);

// variáveis para settar o tamanho da sidebar minimizada e maximizada
export const SIDEBAR_WIDTH = 250;
export const SIDEBAR_WIDTH_COLLAPSED = 250;
// variável que recebe uma função que vê o estado do collapsed e a partir disso usar o tamanho
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
);

