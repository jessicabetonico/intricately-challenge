<template>
  <header class="title">
    <h1>{{title}}</h1>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: String,
  },
});
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  height: 10vh;
  align-items: center;
  background-color: #207A00;
  color: #FBE500;
}
</style>
