<template>
  <v-flex class="pr-3 pb-3" xs12 md6 lg4>
    <v-card class="green darken-3 white--text">
      <v-card-title class="headline">
        <strong
          >{{ stock.name
          }}<small>
            ({{ stock.price | currency }}) {{quantity}}</small
          ></strong
        >
      </v-card-title>
    </v-card>
    <v-card>
      <v-container fill-height>
        <v-text-field label="Quantidade" type="number" v-model.number="qtd" />
        <v-btn
          class="green darken-3 white--text"
          @click="submit"
          :disabled="invalidButton"
          >{{ buttonText }}</v-btn
        >
      </v-container>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  props: ["stock", "isPortfolio"],
  computed: {
    quantity() {
      return this.isPortfolio ? "Qtde: " + this.stock.qtd : "";
    },
    funds() {
      return this.$store.getters.funds;
    },
    buttonText() {
      return this.isPortfolio ? "Vender" : "Comprar";
    },
    invalidButton() {
      const insufficientStock = this.qtd > this.stock.qtd;
      const insufficientFunds = this.qtd * this.stock.price > this.funds;

      return this.qtd <= 0 || this.isPortfolio
        ? insufficientStock
        : insufficientFunds;
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
    sellStock() {
      const order = {
        orderId: this.stock.id,
        orderPrice: this.stock.price,
        orderQtd: this.qtd,
      };
      this.qtd = 0;
      this.$store.dispatch("sellStock", order);
    },
    submit() {
      this.isPortfolio ? this.sellStock() : this.buyStock();
    },
  },
};
</script>