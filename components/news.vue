<template>
	<view>
		<u-cell-group>
			<u-cell-item v-for="(item,index) in newsList" :key="index"  @click="toNewsDetail(item)">
				<view slot="title">
					<view>{{item.title }}</view>
					<view>{{item.datetime}}</view>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
		name:'news',
		props:["newsList"],
		methods:{
			toNewsDetail(itemData){
				this.$u.route({
					url: '/pages/news/NewsDetail',
					params: itemData
				});
			}
		}
	}
</script>

<style>
</style>
