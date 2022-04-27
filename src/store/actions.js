import Vue from 'vue'

export default {
    initStocks({ commit }) {
        Vue.prototype.$http.get('stocks.json').then(res=>{
                 // eslint-disable-next-line no-console
                 console.log(res.data)
            commit('setStocks', res.data)
        })
    },
    loadData({ commit }) {
        Vue.prototype.$http.get('portfolio.json').then(res => {
            commit('setStocks', res.data.getStocks)
            commit('setPortfolio', {
                stocks : res.data.stockPortfolio ? res.data.stockPortfolio : [],
                funds : res.data.funds
            })
        })
    }
}