<template>
	<view>
		<u-navbar :is-back="false" title="" :background="background">
			<view class="slot-wrap"><u-search placeholder="股票代码" :show-action="false" :disabled="true" @click="searchClick"></u-search></view>
		</u-navbar>
		<view class="content">
			<u-swiper :list="list"></u-swiper>
			<u-grid :col="3">
				<u-grid-item>
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">图片</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">沙漏</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">图片</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">沙漏</view>
				</u-grid-item>
			</u-grid>
			<view class="">
				<u-cell-group>
					<u-cell-item icon="setting-fill" title="指数" @click="linkTo(1)"></u-cell-item>
					<u-cell-item icon="setting-fill" title="个股" @click="linkTo(2)"></u-cell-item>
					<u-cell-item icon="integral-fill" title="龙虎榜" value="新版本" @click="linkTo(3)"></u-cell-item>
					<u-cell-item icon="setting-fill" title="资金流" @click="linkTo(4)"></u-cell-item>
					<u-cell-item icon="setting-fill" title="业绩表" @click="linkTo(4)"></u-cell-item>
					<u-cell-item icon="setting-fill" title="大宗交易" @click="linkTo(4)"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			background: {
				backgroundColor: '#fff'
			},
			list: [
				{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			]
		};
	},
	computed: {
		getIcon() {
			return path => {
				return 'https://cdn.uviewui.com/uview/example/' + path + '.png';
			};
		}
	},
	onShow() {
		// uni.setNavigationBarTitle({
		// 	title: this.$t('nav.home')
		// });
	},
	created() {
		this.getGuList()
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
		linkTo(type){
			let path = ''
			switch(type){
				case 1:
					path = 'pages/pointer/pointerList'
					break
				case 2:
					path = 'pages/stock/stockList'
					break
				case 3:
					path = 'pages/lhList/LhList'
					break
				case 4:
					path = 'pages/stock/zijinList'
					break
			}
			this.$u.route({
				url: path
			});
		},
		getGuList(){
			this.$u.api.getGuList()
			this.$u.api.getPointerList()
		},
		searchClick(){
			this.$u.route({
				url: 'pages/search/search'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.grid-text {
	font-size: 28rpx;
	margin-top: 4rpx;
	color: $u-type-info;
}
.slot-wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	/* 如果您想让slot内容占满整个导航栏的宽度 */
	// flex: 1;
	/* 如果您想让slot内容与导航栏左右有空隙 */
	/* padding: 0 30rpx; */
}
</style>
