<template>
  <div v-if="!error" class="game">
    <section class="cards">
      <div class="row">
        <AppCard :card="card" v-for="card in orderedPile" :key="card" />
      </div>
    </section>
    <section class="result">
      <div class="align-result">
        <div class="high-cards">
          <label for=">High Card" class="text-label">High Card:</label> {{ highCard }}
        </div>
        <div>
          <label for="highCard" class="text-label">Full House Combo:
            <span class="text-span" v-if="fullHouse.length === 0">None</span></label>
            <div class="full-house-cards" v-if="fullHouse.length > 0">
              <span v-for="cards in fullHouse" :key="cards">{{cards.join(', ')}}</span>
            </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="error">
    <span>Invalid deck. Try create another one.</span>
    <button class="button-new-deck" type="button" @click="goNewDeck">Go new deck</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppCard from '@/components/AppCard.vue';
import { mapGetters, mapActions } from 'vuex';

interface GameCards {
  fullHouse: string[][];
  orderedPile: string[];
  highCard: string;
}
export default Vue.extend({
  data() {
    return {
      orderedPile: [] as string[],
      highCard: '',
      fullHouse: [] as string[][],
    };
  },
  components: {
    AppCard,
  },
  computed: {
    ...mapGetters([
      'deck',
      'error',
      'loading',
    ]),
  },
  methods: {
    ...mapActions([
      'loadGame',
    ]),
    goNewDeck() {
      this.$router.push({ path: '/deck/new' });
    },
  },
  mounted() {
    try {
      const { deckId } = this.$route.params;
      this.loadGame(deckId).then((res: GameCards) => {
        console.log(res);
        this.fullHouse = res.fullHouse;
        this.highCard = res.highCard;
        this.orderedPile = res.orderedPile;
      });
    } catch (error) {
      console.error(error);
    }
  },
});
</script>

<style>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  font-size: 25px;
  font-weight: bold;
  flex-direction: column;
}
.cards{
  margin-top: 50px;
  border: black 1px solid;
  background-color: #D8D8D8;
  padding: 20px;
  width: 750px;
  align-content: flex-start;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.result {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  font-size: 25px;
}
.text-label {
  font-weight: bold;
}
.text-span {
  font-weight: normal;
}
.high-cards {
  margin-bottom: 10px;
}
.full-house-cards {
  display: flex;
  flex-direction: column;
}
.button-new-deck {
  border-radius: 15px;
  background-color: #207A00;
  color: white;
  height: 40px;
  width: 125px;
}
</style>
