<template>
  <div>
    <AppHeader title='ORDERED PILE' />
    <AppContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppContainer from './AppContainer.vue';

export default Vue.extend({
  components: {
    AppHeader,
    AppContainer,
  },
});
</script>
