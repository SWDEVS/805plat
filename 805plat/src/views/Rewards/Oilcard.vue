<template>
	<div>
		<Xheader title="中国石油加油卡" :back="true"></Xheader>
		<Xcont :header="true">
			<div class="container">
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
		        	<div class="no-data" v-if="goodsList.length == 0">兑换未开启</div>
		        </div>
		        <div class="goods-tip">
		            <h5>温馨提示:</h5>
		            <p>1. 参与兑换即同意《805生活平台兑换协议</a>》。</p>
		            <p>2. 本卡仅限为中国石化加油卡充值使用。如无加油卡，须办理加油卡并充值后方可进行加油消费。</p>
		            <p>3. 本卡可在中国石化所属售卡充值网点充值，也可登录中国石化加油站网站（www.sinopecsales.com）在线充值。</p>
		            <p>4. 持卡人应妥善保存卡片和密码，如因卡片和密码保管不当导致相关损失，责任自负。</p>
		            <p>5. 本卡不记名、不挂失、不提现，遗失不补办。</p>
		            <p>6. 请在卡背面标记的有效期内使用。</p>
		            <p>7. 中石化充值卡充值步骤：</p>
		            <p>1).登录中国石化网上营业厅http://www.sinopecsales.com/；</p>
		            <p>2).首页右侧选择“充值卡充值”，点击立即充值；</p>
		            <p>3).确认充值的主卡卡号，点击开始充值；</p>
		            <p>4).输入全国充值卡卡密（全数字20位），确认充值即可完成充值；</p>
		            <p>5).充值完成后可通过“我的加油卡”-“充值卡充值订单”查询充值情况。</p>
		            <p>8.同卡号、同登录账号充值间隔需3分钟，3分钟内连续充值会提示充值失败。同卡号充值建议一天不超过9次，次数过多容易导致加油卡被限制，无法再使用充值卡充值。</p>
		        </div>
			</div>
			<cubePop content="中国石油加油卡" :infomation="info" ref="extendPopup"></cubePop>
		</Xcont>
	</div>
	
</template>
<script type="text/javascript">
	import Xheader from "@/components/layout/Xheader.vue";
	import Xcont from "@/components/layout/Xcontent.vue";
	import cubePop from "@/views/Rewards/Phonewin.vue";
	import { showToastTxtOnly } from "@/common/plugins/filters.js";
	export default{
		name:"Phonetraffic",
		data(){
			return {
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
			async getList(){
				let res = await this.$get(this.$api.listhot, {
					category: 'syoilcard'
				});
				if (res && res._status == '200'){
					this.info.user_id = res.user_id;
					this.info.phone = res.phone;
					this.goodsList = res.list;
				}
			},
			async getuserbaseinfo(item){
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
					this.isCheck(item);
				}
			},
			exchangeGoods:function(item){
				this.getuserbaseinfo(item);
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
					        	this.createorder(item.goods_id,4);
					        },
					        onCancel: () => {}
					    }).show()
					}else{
						this.info.goods_code = item.goods_code;
						this.info.goods_price = item.goods_price;
						this.info.use_num = item.use_num;
						this.$refs.extendPopup.show();
					}
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
			Xcont,
			cubePop
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