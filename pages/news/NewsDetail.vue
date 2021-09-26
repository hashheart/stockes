<template>
	<view class="wrap">
		<u-navbar back-text="返回" title="资讯"></u-navbar>
		<view class="u-content">
			<view>{{ title }}</view>
			<u-parse :html="content"></u-parse>
			<view>{{ datetime }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			datetime: '',
			content: '',
			title:''
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
	created() {
		console.log(this)
		let query = this.$route.query
		this.datetime = query.datetime
		this.content = query.content
		this.title = query.title
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
		}
	}
};
</script>

<style lang="scss" scoped>
.u-content {
	padding: 20rpx;
	color: $u-content-color;
	font-size: 32rpx;
	line-height: 1.8;

	// 标签形式无效
	p {
		color: $u-tips-color;
	}
}
</style>
