<template>
	<view class="wrap">
		<u-navbar back-text="返回">
			<view><u-search placeholder="股票代码" @change="onSearch" v-model="value"></u-search></view>
		</u-navbar>
		<view class="u-content">
			<u-cell-group>
				<u-cell-item v-for="(item,index) in stockList" :key="index" :arrow="false">
					<view slot="title">{{item.mingcheng}}</view>
					<view slot="label">{{item.daima}}</view>
					<view slot="right-icon">{{item.zuixinjia}}  {{item.zhangdiefu}}
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
let timeIndex = 0
export default {
	data() {
		return {
			value:'',
			stockList: this.$store.state.guList
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
			title: this.$t('nav.components')
		});
	},
	created() {},
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
		onSearch() {
			if(timeIndex){
				clearTimeout(timeIndex)
				timeIndex = 0
			}
			timeIndex = setTimeout(()=>{
				this.stockList = [];
				let stockList = [];
				if (this.value.trim() !== '') {
					stockList = this.$store.state.guList;
				}
				this.stockList = stockList.filter((item)=>{
					return (item.mingcheng.indexOf(this.value) !== -1 || item.daima.indexOf(this.value) !== -1)
				})
			},300)
		}
	},
	components:{
	}
};
</script>

<style lang="scss" scoped>
.u-cell-icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 8rpx;
}
</style>
