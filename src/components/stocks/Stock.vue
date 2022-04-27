<template>
  <v-flex class="pr-3 pb-3" xs12 md6 lg4>
    <v-card class="green darken-3 white--text">
      <v-card-title class="headline">
        <strong
          >{{ stock.name }}<small> (Preço: {{ stock.price | currency }})</small></strong
        >
      </v-card-title>
    </v-card>
    <v-card>
      <v-container fill-height>
        <v-text-field label="Quantidade" type="number" v-model.number="qtd" />
        <v-btn class="green darken-3 white--text" @click="buyStock" :disabled="invalidButton"
          >Comprar</v-btn
        >
      </v-container>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  props: ["stock"],
  computed: {
    funds() {
      return this.$store.getters.getFunds;
    },
    invalidButton() {
      return this.qtd <= 0 || this.qtd * this.stock.price > this.funds;
    },
  },
  data() {
    return {
      qtd: 0,
    };
  },
  methods: {
    buyStock() {
      const order = {
        orderId: this.stock.id,
        orderQtd: this.qtd,
        orderPrice: this.stock.price,
      };
      this.$store.dispatch("buyStock", order);
      this.qtd = 0;
    },
  },
};
</script>