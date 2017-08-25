<template>
    <div class="wapper">
        <v-head></v-head>
		<div>
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
		<v-footer></v-footer>
		
    </div>
</template>
<script>
	import vHead from './Header.vue'
	import vFooter from './Footer.vue'
	export default {
	  components: {
	    vHead, vFooter
	  }
}
</script>