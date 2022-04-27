<template>
  <v-flex class="pr-3 pb-3" xs12 md6 lg4>
    <v-card class="blue darken-3 white--text">
      <v-card-title class="headline">
        <strong
          >{{ stock.name }}<small> (Preço: {{ stock.price | currency }}) | Qtde: {{stock.qtd}}</small></strong
        >
      </v-card-title>
    </v-card>
    <v-card>
      <v-container fill-height>
        <v-text-field label="Quantidade" type="number" v-model.number="qtd" />
        <v-btn
          class="blue darken-3 white--text"
          @click="sellStock"
          :disabled="invalidButton"
          >Vender</v-btn
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
      return this.$store.getters.funds;
    },
    invalidButton() {
      return this.qtd <= 0 || this.qtd > this.stock.qtd;
    },
  },
  data() {
    return {
      qtd: 0,
    };
  },
  methods: {
    sellStock() {
      const order = {
        orderId: this.stock.id,
        orderPrice: this.stock.price,
        orderQtd: this.qtd,
      };
      this.qtd = 0;
      this.$store.dispatch('sellStock', order)
    },
  },
};
</script>