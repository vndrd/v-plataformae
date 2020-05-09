//import axios from 'axios'
const getDefaultState = () => {
    return {
        countriesData:  [],
        loading: false,
    }
}  
const state = getDefaultState()

const getters =  {
    allCountries:  state => state.countriesData,
    allNameCountries:  state => state.countriesData.map(({name}) => name),
    getLoading:         state => state.loading,
}
const actions =  {
    async fetchCountries({commit}){
        const res = await fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                let countries = [];
                for (var property in data) {
                    //countries.push({value: property, text: property})
                    countries.push({name: property, timeseries: data[property]})
                }
                return countries
            });
        res.map(country => country.timeseries.map(day => {
            day.active = day.confirmed - day.deaths - day.recovered
        }))
        res.map(country => {
            country.active = country.timeseries.slice(-1)[0].active
            country.recovered = country.timeseries.slice(-1)[0].recovered
            country.deaths = country.timeseries.slice(-1)[0].deaths
            country.confirmed = country.timeseries.slice(-1)[0].confirmed
        })
        commit('setCountries',res)
    },
    resetCartState ({ commit }) {
        commit('resetState')
    },
}
const mutations =  {
    setCountries: (state, res) => state.countriesData = res,
    setLoading: (state, bool) => state.loading = bool,
    resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
        Object.assign(state, getDefaultState())
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
