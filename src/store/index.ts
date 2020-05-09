import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import deckApi from '@/services/deckApi';
import Game from '@/services/game';
import types from './mutation-types';

Vue.use(Vuex);
interface Deck {
  rotationCard: string;
  cards: string[];
}
interface Decks {
  [deckId: string]: Deck;
}
interface Store {
  decks: Decks;
  loading: boolean;
  lastDeckId: string;
  error: string;
}

export default new Vuex.Store<Store>({
  state: {
    decks: {},
    loading: false,
    lastDeckId: '',
    error: '',
  },
  getters: {
    deckId: (state) => state.lastDeckId,
    deck: (state) => (deckId: string) => state.decks[deckId],
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
  mutations: {
    [types.CREATE_DECK_REQUEST](state) {
      state.loading = true;
      state.error = '';
    },
    [types.CREATE_DECK_SUCCESS](state, payload) {
      state.loading = false;
      state.decks[payload.deckId] = {
        rotationCard: payload.rotationCard,
        cards: payload.cards,
      };
      state.lastDeckId = payload.deckId;
    },
    [types.CREATE_DECK_FAILURE](state, error) {
      state.loading = false;
      state.error = error;
    },
    [types.LOAD_GAME_REQUEST](state) {
      state.loading = true;
      state.error = '';
    },
    [types.LOAD_GAME_SUCCESS](state) {
      state.loading = false;
    },
    [types.LOAD_GAME_FAILURE](state, error) {
      state.loading = false;
      state.error = error;
    },
  },
  actions: {
    async createDeck({ commit }, { cards, rotationCard }: Deck) {
      try {
        commit(types.CREATE_DECK_REQUEST);
        const deck = await deckApi.brandNewDeck();
        await deckApi.drawCards(deck.deck_id);
        await deckApi.addPiles(deck.deck_id, cards);
        console.log('createDeck', cards, rotationCard);
        commit(types.CREATE_DECK_SUCCESS, {
          deckId: deck.deck_id,
          cards,
          rotationCard,
        });
      } catch (error) {
        commit(types.CREATE_DECK_FAILURE, 'Error create game');
        console.error(error);
        throw error;
      }
    },
    async loadGame({ commit, state }, deckId: string) {
      try {
        commit(types.LOAD_GAME_REQUEST);
        const deck = state.decks[deckId];
        if (deck) {
          const { rotationCard, cards } = deck;
          const { fullHouse, highCard, orderedPile } = Game(rotationCard, cards);
          commit(types.LOAD_GAME_SUCCESS);
          return {
            fullHouse,
            highCard,
            orderedPile,
          };
        }
        throw new Error('Game not exists.');
      } catch (error) {
        commit(types.LOAD_GAME_FAILURE, 'Error load game');
        console.error(error);
        throw error;
      }
    },
  },
  plugins: [new VuexPersistence().plugin],
  modules: {
  },
});
