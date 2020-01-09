<template>
	<div>
		<Xheader title="话费/流量" :back="true"></Xheader>
		<Xcont :header="true">
			<div class="container">
				<div class="tab-container" v-if="tabs.length > 0">
			         <cube-tab-bar class="tab-rank" v-model="selectedLabel" show-slider inline @click="clickHandler">
			            <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.label">
			              <div class="tab-title" slot="default">{{item.value}}</div>
			            </cube-tab>
			         </cube-tab-bar>
		        </div>
		        <div class="cont_box clearfix">
		        	<ul class="clearfix">
		        		<li v-for="(item,index) in goodsList">
		        			<div class="imgs" @click="exchangeGoods(item)">
		        				<div class="title">剩{{item.surplus_num}}份</div>
		        				<p class="reward">{{Number(item.goods_price)}}<i>元</i></p>
		        				<div class="point">{{item.use_num | formatNumberRgx}}积分</div>
		        			</div>
		        		</li>
		        	</ul>
		        	<div class="no-data" v-if="goodsList.length == 0">{{selectedLabel? '流量':'话费'}}兑换未开启</div>
		        </div>
		        <div class="goods-tip">
		            <h5>温馨提示:</h5>
		            <p>1. 参与兑换即同意《805生活平台兑换协议》。</p>
		            <P>2. 如遇话费/流量充值长时间未到账，请先联系移动运营商，确认未到账，可通过“用户反馈”进行反馈。</P>
		            <p>3. 如遇话费/流量充值提示失败，还请耐心等待， 不同省市和地区的不同运营商不定时会进行充值维护，遇到此种情况，只需等待运营商维护完毕即可正常充值话费。</p>
		            <p>4. 请务必正确填写手机号码，如因手机号码填写错误导致的话费/流量充值失败，官方不会予以处理，还请知悉。</p>
		            <p>5. 您可以为自己或者家人朋友充值哦~</p>
		        </div>
			</div>
			<cubePop content="抽话费" :infomation="info" ref="extendPopup"></cubePop>
		</Xcont>
	</div>
	
</template>
<script type="text/javascript">
	import Xheader from "@/components/layout/Xheader.vue";
	import Xcont from "@/components/layout/Xcontent.vue";
	import cubePop from "@/views/Rewards/Phonewin.vue";
	export default{
		name:"Phonetraffic",
		data(){
			return {
				selectedLabel: 0,
			    tabs: [{
			    	label: 0,
			    	value:'话费充值'
			    },{
			    	label: 1,
			    	value:'手机流量'
			    }],//商品分类列表
			    allList:[],//所有的数据
			    goodsList:[],
			    info:{
			    	user_id:'',//用户id
			    	phone:'',//手机号
			    	goods_code:'',
			    	goods_price:'',
			    	use_num:''
			    }
			}
		},
		methods:{
			clickHandler:function(label){
				this.goodsList = this.classificationData(label);
			},
			async getList(){
				let res = await this.$get(this.$api.listhot, {
					category: 'telfare'
				});
				if (res && res._status == '200'){
					this.info.user_id = res.user_id;
					this.info.phone = res.phone;
					this.allList = res.list;
					this.goodsList = this.classificationData(this.selectedLabel);
				}
			},
			classificationData:function(type){
				let h_arr = [];
				let l_arr = [];
				for(let item of this.allList){
					if(item.goods_type == 1){
						h_arr.push(item);
					}else{
						l_arr.push(item);
					}
				}
				if(type == 0){
					return h_arr;
				}else{
					return l_arr;
				}
			},
			async getuserbaseinfo(){
				let res = await this.$post(this.$api.getuserbaseinfo,"");
				if(res && res._status == '200'){
					if(!res.userExt.phone){
						this.$createDialog({
					        type: 'alert',
					        icon: 'cubeic-wrong',
					        showClose: true,
					        title: '尚未绑定手机号',
					        content:'是否前往完善账号?',
					        onConfirm: () => {
					        	this.$router.push('/mine/setting');
					        }
					    }).show();
					    return false;
					}
					return true;
				}
			},
			exchangeGoods:function(item){
				if(!this.getuserbaseinfo()) return false;
				this.isCheck(item);
			},
			async isCheck(item){
				let res = await this.$post(this.$api.convertgoods,{
					code: item.goods_code,
					price: item.goods_price,
					usenum: item.use_num,
					is_check: 1
				});
				if(res && res._status == '200'){
					this.info.goods_code = item.goods_code;
					this.info.goods_price = item.goods_price;
					this.info.use_num = item.use_num;
					this.$refs.extendPopup.show();
				}
			}
		},
		created(){
			this.getList();
		},
		mounted(){

		},
		components: {
			Xheader,
			Xcont,
			cubePop
		}
	}
	
</script>
<style lang="stylus" scoped>
.container{
	padding: 0 20px;
	overflow: auto;
	.cont_box ul{
		width: 100%;
		margin-bottom: 20px;
		li{
			width: 33.33%;
			height: 236px;
			float: left;
			margin-bottom: 10px;
			.imgs{
				width: 195px;
				height: 236px;
				margin: 0 auto;
				.title{
					width: 100%;
					color: #fff;
					font-size: 24px;
					padding: 10px 0px 0 20px;;
				}
				.reward{
					width: 119px;
					height: 76px;
					margin-left: 26px;
					margin-top: 7px;
					-webkit-transform-origin: top right;
					-webkit-transform: rotateZ(-15deg);
					text-align: center;
					line-height: 76px;
					margin-bottom: 50px;
					font-size: 48px;
					i{
						font-size: 24px;
						font-style: normal;
					}
					
				}
				.point{
					font-size: 24px;
					height: 28px;
					text-align: center;
					line-height: 28px;
					color: #fff;

				}
			}
		}
		li:nth-child(5n+1) .imgs{
			background: url('assets/images/Rewards/icon01.png') no-repeat;	
			background-size: 100% 100%;
			.reward{
				color: #67bf9a;
			}
		}
		li:nth-child(5n+2) .imgs{
			background: url('assets/images/Rewards/icon02.png') no-repeat;	
			background-size: 100% 100%;
			.reward{
				color: #57abc0;
			}
		}
		li:nth-child(5n+3) .imgs{
			background: url('assets/images/Rewards/icon03.png') no-repeat;	
			background-size: 100% 100%;
			.reward{
				color: #e6ae55;
			}
		}
		li:nth-child(5n+4) .imgs{
			background: url('assets/images/Rewards/icon04.png') no-repeat;	
			background-size: 100% 100%;
			.reward{
				color: #cf5b58;
			}
		}
		li:nth-child(5n) .imgs{
			background: url('assets/images/Rewards/icon05.png') no-repeat;	
			background-size: 100% 100%;
			.reward{
				color: #5580cc;
			}
		}
		
	}
	.no-data{
		width: 100%;
		height: 200px;
		text-align: center;
		line-height: 200px;
		color: #999;
		font-size: 48px;
		font-weight: bold;
	}
	.goods-tip{
		padding: 15px;
		font-size: 24px;
		h5{
			font-size: 28px;
			margin-bottom: 10px;
			color: #5b5b5b;
		}
		p{
			color: #999;
			line-height: 1.6;
			margin-left: 0.25rem;
			text-indent: -0.25rem;
		}
	}
}
	
</style>