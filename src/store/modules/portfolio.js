
export default {
    state: {
        funds: 10000,
        stocks: []
    },
    mutations: {
        buyStock(state, order) {
            const record = state.stocks.find(e => e.id == order.orderId)
            if (record) {
                record.qtd += order.orderQtd
            } else {
                state.stocks.push({
                    id: order.orderId,
                    qtd: order.orderQtd
                })
            }
            state.funds -= order.orderPrice * order.orderQtd
        },
        sellStock(state, order) {
            const record = state.stocks.find(e => e.id === order.orderId)
            if (record.qtd > order.orderQtd) {
                record.qtd -= order.orderQtd
            } else {
                state.stocks.splice(state.stocks.indexOf(record), 1)
            }
            state.funds += order.orderPrice * order.orderQtd
        },
        setPortfolio(state, data){
            state.stocks = data.stocks
            state.funds = data.funds
        }
    },
    actions: {
        sellStock({ commit }, order) {
            commit('sellStock', order)
        }
    },
    getters: {
        stocksPortfolio(state, getters) {
            return state.stocks.map(stock => {
                const record = getters.getStocks.find(e => e.id === stock.id)
                return {
                    id: stock.id,
                    name: record.name,
                    price: record.price,
                    qtd: stock.qtd
                }
            })
        },
        funds(state) {
            return state.funds
        }
    }
}