<template>
  <v-layout row wrap>
    <Stock v-for="stock in stocks" :key="stock.id" :stock="stock" :isPortfolio="true"/>
  </v-layout>
</template>
<script>
import {mapGetters} from 'vuex'
import Stock from "../components/Stock.vue";
export default {
  components: {
    Stock,
  },
  computed: {
      ...mapGetters({stocks:'stocksPortfolio'})
  },
};
</script>