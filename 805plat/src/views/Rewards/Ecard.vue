<template>
	<div>
		<Xheader title="京东E卡" :back="true"></Xheader>
		<Xcont :header="true">
			<div class="container">
		        <div class="cont_box clearfix">
		        	<ul class="clearfix">
		        		<li v-for="(item,index) in goodsList" :key="index">
		        			<div class="imgs" @click="exchangeGoods(item)">
		        				<div class="title">剩{{item.surplus_num}}份</div>
		        				<p class="reward">{{Number(item.goods_price)}}<i>元</i></p>
		        				<div class="point">{{item.use_num | formatNumberRgx}}积分</div>
		        			</div>
		        		</li>
		        	</ul>
		        	<div class="no-data" v-if="goodsList.length == 0">兑换未开启</div>
		        </div>
		        <div class="goods-tip">
		            <h5>温馨提示:</h5>
		            <p>1. 参与兑换即同意《805生活平台兑换协议》。</p>
		            <p>2. 兑换成功后，请在我的-商品订单记录中查看卡密，请登录京东网站进行充值；</p>
		            <p>3. 京东E卡是由京东商城发行的经预付卡备案的单用途商业预付卡，可在www.jd.com网站内使用，仅用于购买京东自营商品；</p>
		            <p>4. 京东E卡卡密升级时，可能延迟约10分钟发送卡密；</p>
		            <p>5. 京东E卡的其他规则以京东所公示的内容为准。</p>
		        </div>
			</div>
		</Xcont>
	</div>
	
</template>
<script type="text/javascript">
	import Xheader from "@/components/layout/Xheader.vue";
	import Xcont from "@/components/layout/Xcontent.vue";
	import { showToastTxtOnly } from "@/common/plugins/filters.js";
	export default{
		name:"Phonetraffic",
		data(){
			return {
			    goodsList:[]
			}
		},
		methods:{
			async getList(){
				let res = await this.$get(this.$api.listhot, {
					category: 'jdecard'
				});
				if (res && res._status == '200'){
					this.goodsList = res.list;
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
					if(res.pay_money && res.pay_money != ''){
						this.$createDialog({
					        type: 'confirm',
					        icon: 'cubeic-info',
					        title: '积分不足',
					        content: `您的积分还缺少${res.after_ticket}</br>需补足￥${res.pay_money}换购`,
					        confirmBtn: {
					          text: '确定',
					          active: true,
					          disabled: false,
					          href: 'javascript:;'
					        },
					        cancelBtn: {
					          text: '取消',
					          active: false,
					          disabled: false,
					          href: 'javascript:;'
					        },
					        onConfirm: () => {
					        	this.createorder(item.goods_id,4)
					        },
					        onCancel: () => {}
					    }).show()
					}else{
						this.$createDialog({
					        type: 'alert',
					        icon: 'cubeic-right',
					        showClose: true,
					        title: "提示",
					        content: `兑换将花费"${item.use_num}积分"`,
					        onConfirm: () => {
					        	this.confirmGoods(item);
					        }
					    }).show();
					}
				}
			},
			async confirmGoods(item){
				let res = await this.$post(this.$api.convertgoods,{
					code: item.goods_code,
					price: item.goods_price,
					usenum: item.use_num,
				});
				if(res && res._status == '200'){
					this.$createDialog({
				        type: 'alert',
				        icon: 'cubeic-right',
				        showClose: true,
				        title: "提交成功",
				        content: "商品将在1-3个工作日发送给您,请到'商品订单记录'中查看物流信息",
				        onConfirm: () => {
				        	this.$router.push('/order/Orderlist');
				        }
				    }).show();
				}
			},
			async createorder(product_id,product_type) {
				let that=this;
		        let order = await this.createOrder(product_id,product_type);
		        let orderconfig = await this.getorderconfig(order.orderno);
		        if (orderconfig.data.jsApiParameters) {
		          orderconfig = orderconfig.data.jsApiParameters;
		        } else {
		          showToastTxtOnly('创建订单失败');
		          return;
		        }
		        this.payup(orderconfig, async function(res) {
		        if (res.err_msg == "get_brand_wcpay_request:ok") {
		            showToastTxtOnly('充值成功');
		            that.exchangeGoods();
		        } else {
		            showToastTxtOnly('充值失败');
		        }
		      });
		    }
		},
		created(){
			this.getList();
		},
		mounted(){

		},
		components: {
			Xheader,
			Xcont
		}
	}
	
</script>
<style lang="stylus" scoped>
.container{
	padding: 20px 20px;
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