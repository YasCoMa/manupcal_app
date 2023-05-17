<template>
  <section>
    <div class="col-md-12">
      <h1 class="titulo">{{ titulo }}</h1>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TituloComponent",
  props: {
    titulo: {
      default: "",
    },
  },
  data() {
    return {};
  },

  methods: {},
});
</script>

<style>
.titulo {
  text-transform: uppercase;
  color: #767676;
  padding: 15px;
  font-weight: 700;
  font-size: 28px;
}

@media only screen and (max-width: 800px) {
  .titulo-escola {
    font-size: 15px;
  }
}
</style>
