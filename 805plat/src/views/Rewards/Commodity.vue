<template>
	<div class="commody_list">
		<!-- 卡 -->
		<div class="card_list">
			<div class="card" :class="item.className" v-for="(item,index) in card_list" @click="toPage(item)"></div>
		</div>
		<div class="goods_list">
			<!-- <div class="tab-container" v-if="tabs.length > 0">
	          <cube-tab-bar class="tab-rank" v-model="selectedLabel" show-slider inline @click="clickHandler">
	            <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.label">
	              <div class="tab-title" slot="default">{{item.value}}</div>
	            </cube-tab>
	          </cube-tab-bar>
	        </div> -->
	        <cube-scroll-nav-bar :current="selectedLabel" :labels="tabs" @change="clickHandler" />
	        <div class="goods">
	        	<div class="img_box" v-for="(item,index) in goodsList" :key="item.goods_id" @click="goDetail(item.goods_code)">
	        		<img :src="item.goods_cover">
	        		<p class="ellipsis">{{item.goods_name}}</p>
	        		<p class="ellipsis">{{item.use_num | formatNumberRgx}}积分</p>
	        	</div>	
	        </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Stitle from "@/components/units/separate_title.vue";
	export default{
		name:"commodity",
		data(){
			return {
				card_list:[{
					id:0,
					name:'话费/流量',
					className:'card_1',
					path: '/rewards/phone'
				},{
					id:1,
					name:'京东E卡',
					className:'card_2',
					path: '/rewards/ecard'
				},{
					id:2,
					name:'中石油加油卡',
					className:'card_3',
					path: '/rewards/oilcard'
				},{
					id:3,
					name:'购物卡',
					className:'card_4',
					path: '/rewards/shoppingcard'
				}],
				selectedLabel: "",
			    tabs: [],//商品分类列表
			    allTab:[],
			    goodsList:[] //商品列表
			}
		},
		methods:{
			async getCates(){
				let res = await this.$post(this.$api.cates, "");
				if (res && res._status == '200'){
					let tabs = ['全部商品'];
					let allTab = [{
						id: '0',
						value: '全部商品'
					}]
					for(let item of res.list){
						let obj = {
							id: item.id,
							value: item.cate_name
						}
						tabs.push(item.cate_name);
						allTab.push(obj);
					}
					this.tabs = tabs;
					this.allTab = allTab;
					this.selectedLabel = "全部商品";
				}
			},
			async gethotCates(){
				let res = await this.$post(this.$api.gethotcates, "");
				if (res && res._status == '200'){
					
				}
			},
			async getshopList(id){
				let res = await this.$get(this.$api.list, {
					cateid: id
				});
				if (res && res._status == '200'){
					this.goodsList = res.list;
				}
			},
			clickHandler:function(label){
				this.getshopList(this.getId(label));
			},
			goDetail:function(id){
				 this.$router.push({
	            	name:"Goodsdetail",
	            	params:{
	            		id: id
	            	}
	            });
			},
			toPage:function(item){
				this.$router.push(item.path);
			},
			getId:function(value){
				let id = "0";
				for(let item of this.allTab){
					if(item.value == value){
						id = item.id;
						break;
					}
				}
				return id;
			}
		},
		created(){
			this.getCates();
			this.gethotCates();
			this.getshopList('0');
		},
		mounted(){
			
		},
		components:{
			Stitle
		}
	}
	
</script>
<style lang="stylus" scoped>
.commody_list{
	margin-top: 15px;
	height: calc(100vh - 214px);
	overflow: auto;
	.card_list{
		width: $width-content;
		border-radius: $size-radius;
		background: #fff;
		margin: 0 auto;
		margin-top: 10px;
		display: flex;
		justify-content:space-between;
		align-items:center;
		overflow: hidden;
		padding: 20px 0;
		margin-bottom: 20px;
		.card{
			width: 161px;
			height: 132px;
		}
		.card_1{
			background: url('assets/images/Rewards/06.png') no-repeat;	
			background-size: 100% 100%;
		}
		.card_2{
			background: url('assets/images/Rewards/05.png') no-repeat;
			background-size: 100% 100%;
		}
		.card_3{
			background: url('assets/images/Rewards/03.png') no-repeat;
			background-size: 100% 100%;
		}
		.card_4{
			background: url('assets/images/Rewards/02.png') no-repeat;
			background-size: 100% 100%;
		}
	}
	.goods_list{
		width: $width-content;
		border-radius: $size-radius;
		background: #fff;
		margin: 0 auto;
		overflow: hidden;
		.goods{
			height: calc(100vh - 506px);
			background: #fff;
			overflow: auto;
			.img_box{
				width: 50%;
				float: left;
				margin-bottom: 25px;
				img{
					display: block;
					width: 180px;
					height: 180;
					margin: 0 auto;
					border-radius: $size-radius;
					margin-bottom: 10px;
				}
				p{
					font-size: $size-s;
					text-align: center;
					height: 40px;
					line-height: 40px;
				}
				p:nth-child(2){
					color: #464646;
				}
				p:nth-child(3){
					color: #ff8201;
				}
			}
		}
	}
}
	
</style>