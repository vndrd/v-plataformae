<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">Covid Tracker</b-navbar-brand>
        <b-navbar-nav>
            <b-nav-item to="/">País</b-nav-item>
            <b-nav-item to="/lista">Grupo de Países</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <a href="https://github.com/pomber/covid19/">API</a>
        </b-navbar-nav>
    </b-navbar>    
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
<script>
//      <router-link to="/">Departamentos</router-link>
//import { SidebarMenu } from 'vue-sidebar-menu'
//      <sidebar-menu :menu="menu" /> 
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
  //  SidebarMenu
  }
}
</script>