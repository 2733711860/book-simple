<template>
  <div class="app">
  	<!-- <navigation>
	    <transition :name="$route.meta.aniName"> -->
	      <router-view class="app-router-view"></router-view>
	   <!-- </transition>
    </navigation> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: "app",
  methods: {
  }
}
</script>

<style>
	@import url("assets/css/transition.css"); /*vue路由切换特效，需要加以下样式才能生效*/
	*{
		padding: 0;
		margin: 0;
	}
	html,
  body,
  .app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .app {
    perspective: 1500px;
  }
  .app .app-router-view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    visibility: visible;
  }
</style>



