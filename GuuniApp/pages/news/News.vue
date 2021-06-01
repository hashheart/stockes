<template>
	<view class="wrap">
		<u-navbar :is-back="false" title="资讯"></u-navbar>
		<view class="content">
			<u-cell-group>
				<u-cell-item v-for="(item,index) in newsList" :key="index"  @click="toNewsDetail(item)">
					<view slot="title">
						<view>{{item.content | subStringContent}}</view>
						<view>{{item.datetime}}</view>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			newsList:[]
		};
	},
	computed: {
		getIcon() {
			return path => {
				return 'https://cdn.uviewui.com/uview/example/' + path + '.png';
			};
		},
		desc() {
			return this.$t('components.desc');
		} 
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('nav.news')
		});
	},
	created() {
		this.getNewsList()
	},
	methods: {
		openPage(path) {
			this.$u.route({
				url: path
			});
		},
		getGroupTitle(item) {
			return this.$i18n.locale == 'zh' ? item.groupName : item.groupName_en;
		},
		getFieldTitle(item) {
			return this.$i18n.locale == 'zh' ? item.title : item.title_en;
		},
		getNewsList(){
			// httpApi.post('/js_news/').then(res => {
			// 	this.list = res
			//   })
			 this.$u.post('/js_news/').then(data => {
				console.log(data);
				this.newsList = data;
			}).catch(data =>{
				console.log(data)
			})
		},
		toNewsDetail(itemData){
			this.$u.route({
				url: '/pages/news/NewsDetail',
				params: itemData
			});
		}
	},
	filters:{
		subStringContent:function(value){
			return value.substring(0,40)+'...'
		}
	}
};
</script>

<style lang="scss" scoped>
.u-card-wrap {
	background-color: $u-bg-color;
	padding: 1px;
}

.u-body-item {
	font-size: 32rpx;
	color: #333;
	padding: 20rpx 10rpx;
}

.u-body-item image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
	margin-left: 12rpx;
}
</style>
