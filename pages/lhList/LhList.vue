<template>
	<view class="wrap">
		<u-navbar back-text="返回" title="龙虎榜"></u-navbar>
		<view>
			<u-calendar v-model="show" :mode="model" @change="dateChange"></u-calendar>
			<u-button @click="show = true">{{ date }}</u-button>
		</view>
		<view class="">
			<u-dropdown>
				<u-dropdown-item v-model="value1" :title="title1" :options="reasons" @change="tabChange1"></u-dropdown-item>
				<u-dropdown-item v-model="value2" :title="title2" :options="sorts" @change="tabChange2"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="u-content">
			<!-- 			<u-cell-group>
				<u-cell-item v-for="(item, index) in list" :key="index" :arrow="false">
					<view slot="title">
						<view>{{ item.gupiaodaima }} {{ item.gupiaomingcheng }} {{ item.shoupanjia }} {{ item.chengjiaoe }}</view>
					</view>
				</u-cell-item>
			</u-cell-group> -->
			<myTable :colums="colums" :list ="list" />
			<u-loading color="red" :show="loading" :size="40"></u-loading>
		</view>
	</view>
</template>

<script>
const label = {
	title1: '上榜理由',
	title2: '排序'
};
const colums = [{
	title:'股票名称'
},{
	title:'收盘价'
},{
	title:'涨跌幅'
},{
	title:'成交额'
}]
import myTable from '../../components/table.vue'
export default {
	data() {
		return {
			colums:colums,
			list: [],
			date: '',
			show: false,
			model: 'date',
			value1: 1,
			reasons: [],
			value2: 1,
			sorts: [{ value: 1, label: '升序' }, { value: 2, label: '降序' }],
			loading: true
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
		title1() {
			let reason = this.reasons.filter(item => {
				return item.value == this.value1;
			});
			return reason.length > 0 ? reason[0].label : label.title1;
		},
		title2() {
			let reason = this.sorts.filter(item => {
				return item.value == this.value2;
			});
			return reason.length > 0 ? reason[0].label : label.title2;
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('nav.components')
		});
	},
	created() {
		this.date = this.getCurrentDate();
		this.getReason();
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
		getList() {
			this.list = [];
			this.$u
				.post('/stock_sina_lhb_detail_daily/', {
					date: this.date,
					zhibiao: this.title1
				})
				.then(data => {
					this.loading = false;
					console.log(data);
				
					let data1 = data.map((item)=>{
						let {gupiaomingcheng,shoupanjia,duiyingzhi,chengjiaoe} = item
						return {gupiaomingcheng,shoupanjia,duiyingzhi,chengjiaoe}
					})
					data1 = this.sortData(data1, 'duiyingzhi', this.value2);
					this.list = data1;
				})
				.catch(data => {
					this.loading = false;
					console.log(data);
				});
		},
		getReason() {
			this.$u
				.post('/stock_sina_lhb_detail_zhibiao/', {
					date: this.date
				})
				.then(data => {
					console.log(data);
					let reasons = [];
					data.forEach((item, index) => {
						let obj = {};
						obj.value = index + 1;
						obj.label = item;
						reasons.push(obj);
					});
					this.reasons = reasons;
					this.getList();
				})
				.catch(data => {
					console.log(data);
				});
		},
		tabChange1() {
			let reason = this.reasons.filter(item => {
				return item.value === this.value1;
			});
			this.getList();
		},
		tabChange2() {
			console.log(arguments);
			let _this = this;
			if (this.list.length != 0) {
				this.list = this.sortData(this.list, 'duiyingzhi', this.value2);
			}
		},
		dateChange(date) {
			this.date = date.result;
			this.getReason();
		},
		sortData(data, key, desc) {
			return data.sort(function(a, b) {
				if (desc == 1) {
					return a[key] - b[key];
				} else {
					return b[key] - a[key];
				}
			});
			r;
		}
	},
	components:{
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
</style>
