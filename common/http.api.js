// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let hotSearchUrl = '/ebapi/store_api/hot_search';
let indexUrl = '/ebapi/public_api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	let getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
		id: 2
	});

	// 此处使用了传入的params参数，一切自定义即可
	let getInfo = (params = {}) => vm.$u.post(indexUrl, params);

	let getGuList = (params = {}) => {
		let guList = localStorage.getItem('guList')
		let guListobj = JSON.parse(guList)
		if (!guListobj || guListobj.length == 0) {
			vm.$u.post('/stock_zh_a_spot/').then(data => {
				vm.$store.commit('$uStore', {
					name: 'guList',
					value: data,
					isLocal: true
				}, true)
			})
		} else {
			vm.$store.commit('$uStore', {
				name: 'guList',
				value: guListobj,
				isLocal: true
			})
		}
	}
	let getPointerList = (params = {}) => {
		vm.$u.post('/stock_zh_index_spot/').then(data => {
			vm.$store.commit('$uStore', {
				name: 'pointerList',
				value: data
			})
		})
	}
	let stock_circulate_stock_holder = (params = {}) => {
		return vm.$u.post('/stock_circulate_stock_holder/',params)
	}
	let stock_main_stock_holder = (params = {}) => {
		return vm.$u.post('/stock_main_stock_holder/',params)
	}
	let stock_a_lg_indicator = (params = {}) => {
		return vm.$u.post('/stock_a_lg_indicator/',params)
	}
	let stock_news_em = (params = {}) => {
		return vm.$u.post('/stock_news_em/',params)
	}
	vm.$u.api = {
		getSearch,
		getInfo,
		getGuList,
		getPointerList,
		stock_circulate_stock_holder,
		stock_main_stock_holder,
		stock_a_lg_indicator,
		stock_news_em
	}
};
// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下



export default {
	install
}
