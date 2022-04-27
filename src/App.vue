<template>
  <v-app>
    <v-content>
      <v-container>
            <Header/>
            <transition name="slide" mode="out-in">
            </transition>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: { Header },
  created(){
    this.$store.dispatch('initStocks');
  }
};
</script>

<style>
  @keyframes slide-in {
    from { transform: translate(-30px); opacity: 0;}
    to { transform: translate(0px); opacity: 1;}
  }
  @keyframes slide-out {
    from { transform: translate(0px); opacity: 1;}
    out { transform: translate(-30px); opacity: 0;}
  }
  .slide-enter-active {
    animation: slide-in 0.3s ease;
  }
</style>

