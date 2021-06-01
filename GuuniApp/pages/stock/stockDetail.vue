<template>
	<view class="wrap">
		<u-navbar back-text="返回" :title="stockName">
		</u-navbar>
		<view>
			<view>
				
			</view>
			<view style="height:400rpx;"></view>
			<u-sticky><u-tabs ref="uTabs" :list="tablist" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs></u-sticky>
			<view v-if="current == 0">
				<u-cell-item icon="setting-fill" title="简概"></u-cell-item>
				<u-row gutter="16">
					<u-col span="6" v-for="(value, key) in stockIndicators" :key="key">
						<u-row>
							<u-col span="6">{{ labelTitles[key] }}</u-col>
							<u-col span="6">{{ value }}</u-col>
						</u-row>
					</u-col>
				</u-row>
			</view>
			<view v-if="current == 1">2</view>
			<view v-if="current == 2"><news :newsList="news" /></view>
			<view v-if="current == 3"></view>
			<view v-if="current == 4">
				<u-cell-item icon="setting-fill" title="主要股东"></u-cell-item>
				<myTable :colums="colums1" :list="tablelist1" />
			</view>
		</view>
	</view>
</template>

<script>
let timeIndex = 0;
const colums1 = [{ title: '股东名称' }, { title: '截止日期' }, { title: '持股比例' }, { title: '持股数量' }, { title: '平均持股' }];
const labelTitles = {'trade_date':'交易日','pe':'市盈率','pe_ttm':'市盈率(ttm)','pb':'市净率','ps':'市销率','ps_ttm':'市销率(ttm)','dv_ratio':'股息率','dv_ttm':'股息率(ttm)','total_mv':'总市值'}
import news from '../../components/news.vue';
import myTable from '../../components/table.vue';
export default {
	data() {
		return {
			code: this.$route.query.code,
			stockName: this.$route.query.name,
			value: '',
			labelTitles:labelTitles,
			stockIndicators: [],
			tablist: [{ name: '简况' }, { name: '公告' }, { name: '新闻' }, { name: '资金' }, { name: '股东股本' }],
			current: 0,
			news: [],
			colums1: colums1,
			tablelist1: []
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
		this.getIntroduction()
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
		getIntroduction() {
			let query = this.$route.query;
			let code = this.formatCode(query.code);
			let p = this.$u.api.stock_a_lg_indicator({ code });
			p.then(data => {
				let data1 = data[0];
				this.stockIndicators = data1;
			});
		},
		getNotice() {},
		getHolder() {
			let query = this.$route.query;
			let code = this.formatCode(query.code);
			let p1 = this.$u.api.stock_main_stock_holder({ code });
			Promise.all([p1]).then(result => {
				console.log(result);
				let data1 = result[0];
				let date = data1[0].jiezhiriqi;
				data1 = data1.filter(item => {
					return item.jiezhiriqi === date;
				});
				let data2 = data1.map(item => {
					let gudongmingcheng = item.gudongmingcheng;
					let jiezhiriqi = item.jiezhiriqi;
					let gubenxingzhi = item.gubenxingzhi;
					let chigubili = item['chigubili(%)'];
					let chigushuliang = item['chigushuliang(gu)'];
					return { gudongmingcheng, gubenxingzhi, jiezhiriqi, chigubili, chigushuliang };
				});
				this.tablelist1 = data2;
			});
		},
		getNews() {
			this.news = [];
			let query = this.$route.query;
			let code = this.formatCode(query.code);
			let p = this.$u.api.stock_news_em({ code });
			p.then(data => {
				let data1 = data.map(item => {
					let { public_time } = item;
					return { datetime: public_time, ...item };
				});
				this.news = data1;
			});
		},
		tabsChange(index) {
			this.current = index;
			switch (index) {
				case 0:
					this.getIntroduction();
					break;
				case 1:
					this.getNotice();
					break;
				case 2:
					this.getNews();
					break;
				case 3:
					break;
				case 4:
					this.getHolder();
					break;
			}
		},
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	},
	components: {
		news,
		myTable
	}
};
</script>

<style lang="scss" scoped>
.u-cell-icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 8rpx;
}
.slot-wrap {
	display: flex;
	align-items: center;
	/* 如果您想让slot内容占满整个导航栏的宽度 */
	/* flex: 1; */
	/* 如果您想让slot内容与导航栏左右有空隙 */
	/* padding: 0 30rpx; */
}
</style>
