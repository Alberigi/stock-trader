import Vue from 'vue'

export default {
    initStocks({ commit }) {
        Vue.prototype.$http.get('data.json').then(res=>{
            commit('setStocks', res.data.getStocks)
        })
    },
    loadData({ commit }) {
        Vue.prototype.$http.get('data.json').then(res => {
            commit('setStocks', res.data.getStocks)
            commit('setPortfolio', {
                stocks : res.data.stocksPortfolio ? res.data.stocksPortfolio : [],
                funds : res.data.funds
            })
        })
    }
}