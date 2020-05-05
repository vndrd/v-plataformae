//import axios from 'axios'

const state =  {
    countriesData:  [],
    ejemplo: 'qwe',
}
const getters =  {
    allCountries:  state => state.countriesData,
    allNameCountries:  state => state.countriesData.map(({name}) => name),
    getEjemplo:         state => state.ejemplo,
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
        console.log("responser psoenrspeonrsposerpresponse")
        console.log(res)
        commit('setCountries',res)
    }
}
const mutations =  {
    setCountries: (state, res) => state.countriesData = res
}

export default {
    state,
    getters,
    actions,
    mutations
}
