<template>
	<u-table  border-color="transparent" padding="20rpx">
		<u-tr class="u-tr">
			<u-th class="u-th" v-for="(item,index) in colums" :key="`th${index}`">{{ item.title }}</u-th>
		</u-tr>
		<u-tr class="u-tr" v-for="(item, index) in list" :key="`tr${index}`">
			<u-td class="u-td" v-for="(value,key) in item" :key="`td${key}`">
				{{ value }}
			</u-td>
		</u-tr>
	</u-table>
</template>

<script>
	export default{
		name:'myTable',
		props:["colums","list"],
		methods:{
			toGuDetail(){
				console.log(123)
			}
		},
		filters:{
			filterValue(value){
				if(value.isPercents){
					return value + '%'
				}else{
					return value
				}
			}
		}
	}
</script>

<style>
</style>
