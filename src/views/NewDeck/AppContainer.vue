<template>
  <div class="new-deck">
    <div class="loading-page">
      <AppLoadPage v-if="loading" />
    </div>
    <form @submit.prevent="handleSubmit">
      <section class="input-cards">
        <div class="row">
          <div v-for="(card, index) in 5" class="inputs" :key="index">
            <label for="">Card {{ index + 1}}</label>
            <input
              type="text"
              v-model="cards[index]"
              :key="index"
              placeholder="Enter card"
            />
          </div>
        </div>
        <div class="row">
          <div v-for="(card, index) in 5" class="inputs" :key="index">
            <label for="">Card {{ index + 6}}</label>
            <input
              type="text"
              v-model="cards[index+5]"
              :key="index"
              placeholder="Enter card"
            />
          </div>
        </div>
      </section>
      <section class="rotation-card">
        <div class="container-rotation-card">
          <label class="label-rotation-card" for="Rotation card">Rotation card</label>
          <input
            type="text"
            placeholder="Enter card"
            @input="rotationCard = $event.target.value"
          />
        </div>
      </section>
      <section class="button-submit">
        <button class="button" type="submit">Submit</button>
      </section>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppLoadPage from '@/components/AppLoadPage.vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  data() {
    return {
      cards: [],
      rotationCard: '',
    };
  },
  components: {
    AppLoadPage,
  },
  computed: {
    ...mapGetters([
      'deckId',
      'loading',
    ]),
  },
  methods: {
    ...mapActions([
      'createDeck',
    ]),
    handleSubmit() {
      console.log('Cards => ', this.cards);
      console.log('Rotation =>', this.rotationCard);
      const newCards = this.cards.filter((card) => !!card);
      this.createDeck({
        cards: newCards,
        rotationCard: this.rotationCard,
      }).then(() => {
        this.$router.push({ name: 'deck', params: { deckId: `${this.deckId}` } });
      });
      // Game(this.rotationCard, this.cards);
    },
  },
});
</script>

<style>
.new-deck {
  display: flex;
  flex-direction: column;
}
.loading-page {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
}
.input-cards {
  margin: 50px 50px 0 50px;
  display: flex;
  flex-direction: column;
}
.inputs {
  margin: 10px;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.rotation-card {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.container-rotation-card {
  display: flex;
  width: 500px;
}
.label-rotation-card {
  width: 240px;
  font-size: 25px;
}
.button-submit {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 48vh;
}
.button {
  color: #FBE500;
  border: 1px solid #dcdce6;
  background-color: #1C0063;
  border-radius: 18px;
  width: 150px;
  font-size: 25px;
}
</style>
