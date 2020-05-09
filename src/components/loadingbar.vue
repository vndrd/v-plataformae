<template>
  <div class="loading-bar" v-show="show">
    <div class="inner" :style="styles"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

let _loadingInterval = 0;

export default {
  name: "LoadingBar",

  data() {
    return {
      show: false,
      status: "success",
      percent: 0,
      color: "#2d8cf0",
      failedColor: "#ed3f14"
    };
  },

  computed: {
    ...mapGetters([
      'getLoading'
    ]),

    styles() {
        let style = {
            width: `${this.percent}%`,
            backgroundColor: 
                this.status === "success" ? this.color : this.failedColor
        };
      return style;
    }
  },

  methods: {
    mostrarBarra(show) {
        this.show = show;
    },
    start() {
        this.mostrarBarra(true);
        this.percent = 0;
        _loadingInterval = setInterval(() => {
            this.percent = this.percent + 25;
        }, 250)
    },
    stop() {
        clearInterval(_loadingInterval);
        this.percent = 100;
        setTimeout(() => {
            this.mostrarBarra(false);
        }, 250);
    }
  },
  watch: {
      getLoading: function (val) {
        val ? this.start(): this.stop();
      }
  }
};
</script>

<style lang="scss">
.loading-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  & .inner {
    transition: width 0.2s linear;
    height: 5px;
  }

  & .color-primary {
    background-color: #2d8cf0;
  }

  & .color-error {
    background-color: #ed3f14;
  }
}
</style>
