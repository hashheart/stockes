<template>
	<view>
		<u-icon v-if="inZixuan" name="plus-circle"  @click="appendCode"></u-icon>
		<u-icon v-else name="minus-circle" @click="deleteCode"></u-icon>
	</view>
</template>

<script>
	export default{
		data(){
			return {
			}
		},
		methods:{
			appendCode(){
				this.$store.commit('appendToZixuan',this.code)
			},
			deleteCode(){
				this.$store.commit('deleteZixuan',this.code)
			}
		},
		props:['code'],
		computed:{
			inZixuan(){
				let zixuanList = this.$store.state.zixuanList
				return zixuanList.indexOf(this.code)==-1 
			}
		}
	}
</script>

<style>
</style>
