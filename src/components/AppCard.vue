<template>
  <div class="card">
    <div class="suit">
      <div class="content-card">
        {{getValue}}
        <img :src="require('@/assets/suits/' + getSuit + '.png')">
      </div>
    </div>
    <div class="suit-reverse">
      <div class="content-card-reverse">
        {{getValue}}
        <img :src="require('@/assets/suits/' + getSuit + '.png')">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    card: String,
  },
  computed: {
    getSuit() {
      const exp = new RegExp('([2-9JQKA]|10)(H|S|D|C)', 'g');
      return exp.exec(this.card)![2];
    },
    getValue() {
      console.log('chamou o get value');
      const exp = new RegExp('([2-9JQKA]|10)(H|S|D|C)', 'g');
      return exp.exec(this.card)![1];
    },
  },
});
</script>

<style scoped>
.card {
  display: flex;
  width: 100px;
  border-radius: 12px;
  background-color: white;
  flex-direction: column;
  height: 100%;
  margin-right: 20px;
}
.suit {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  height: 90px;
}
.suit-reverse {
  padding: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 90px;
}
.content-card {
  font-size: 25px;
  font-weight: bold;
}
.content-card-reverse {
  font-size: 25px;
  font-weight: bold;
  transform: rotate(180deg);
}
</style>
