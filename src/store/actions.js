import Vue from 'vue'

export default {
    loadData({ commit }) {
        Vue.prototype.$http.get('data.json').then(res => {
            commit('setStocks', res.data.getStocks)
            commit('setPortfolio', {
                stocks : res.data.stockPortfolio ? res.data.stockPortfolio : [],
                funds : res.data.funds
            })
        })
    }
}