<template>
	<view class="wrap">
		<u-navbar :is-back="false">
			<view><u-search placeholder="股票代码" @change="onSearch" v-model="value"></u-search></view>
		</u-navbar>
		<view class="u-content">
			<u-cell-group>
				<u-cell-item v-for="(item, index) in zixuanList" :key="index" @click="toStockDetail(item)">
					<view slot="title">{{ item.mingcheng }}</view>
					<view slot="label">{{ item.daima }}</view>
					<view slot="right-icon">{{ item.zuixinjia }} {{ item.zhangdiefu }}</view>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
let timeIndex = 0;
export default {
	data() {
		return {
			value: ''
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
		},
		zixuanList() {
			let codes = this.$store.state.zixuanList;
			let sockets = this.$store.state.guList;
			return sockets.filter(item => {
				return codes.indexOf(item.daima) != -1;
			});
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('nav.components')
		});
	},
	created() {
		this.$store.commit('getZixuanList');
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
		toStockDetail(data) {
			this.$u.route(
				{
					url: 'pages/stock/stockDetail',
					params:{code:data.daima,name:data.mingcheng}
				}
			);
		}
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
