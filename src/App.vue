<template>
  <div id="app">
      <sidebar-menu :menu="menu" /> 
    <div id="nav">

    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
<script>
//      <router-link to="/">Departamentos</router-link>
import { SidebarMenu } from 'vue-sidebar-menu'
  export default {
    data() {
            return {
                menu: [/*
                    {
                        header: true,
                        title: 'Main Navigation',
                        hiddenOnCollapse: true
                    },*/
                    {
                        href: '/',
                        title: 'General',
                        icon: 'fa fa-chart-area'
                    },
                    {
                        title: 'Por Municipios',
                        icon: 'fa fa-chart-bar'
                    },
                    {
                        title: 'Por Grupos de Contagio',
                        icon: 'fa fa-chart-pie'
                    },
                    {
                        
                        title: 'Evolución de los Casos COVID-19',
                        icon: 'fa fa-chart-area',
                        /*
                        child: [
                            {
                                href: '/charts/sublink',
                                title: 'Sub Link'
                            }
                        ]*/
                    }
                ]
            }
        },
  components: {
    SidebarMenu
  }
}
</script>