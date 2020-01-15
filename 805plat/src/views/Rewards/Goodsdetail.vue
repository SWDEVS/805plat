<template>
	<div>
	    <Xheader title="商品详情" :back="true"></Xheader>
	    <Xcont :header="true">
	    	<div class="container">
	    		<div class="banner">
	    			<img :src="goods_detail.goods_cover">
	    		</div>
	    		<div class="title">
	    			<div class="tit_l">
	    				<span class="name">{{goods_detail.goods_name}}</span>
	    			</div>
	    			<div class="tit_r">
	    				<span class="point">{{goods_detail.discount_num ? goods_detail.discount_num : 0 | formatNumberRgx}}积分</span>
	    			</div>
	    		</div>
	    		<div class="title">
	    			<div class="tit_l">
	    				<span class="remaining">剩{{goods_detail.surplus_num}}份</span>
	    			</div>
	    			<div class="tit_r">
	    				<span class="yuan">参考价:{{goods_detail.goods_price}}元</span>
	    			</div>
	    		</div>
	    		<div class="line"></div>
	    		<p class="introduce">商品介绍</p>
	    		<div class="text" v-html="goods_detail.goods_desc"></div>
	    		<p class="introduce">兑换说明</p>
	    		<div class="text" v-html="goods_detail.global_value"></div>
	    		<!-- 按钮 -->
				<div class="btn" @click="luckyDraw()">
					<cube-button :primary="true">开始兑换</cube-button>
				</div>
	    	</div>
	    	<cubePop :infomation="info" ref="extendPopup"></cubePop>
	    </Xcont>
	</div>
</template>
<script type="text/javascript">
	import Xheader from "@/components/layout/Xheader.vue";
	import Xcont from "@/components/layout/Xcontent.vue";
	import cubePop from "@/views/Rewards/Goodsaddress.vue";
	import { showToastTxtOnly } from "@/common/plugins/filters.js";
	export default{
		name:"",
		data(){
			return {
				goods_code:'',//商品码
				goods_detail:{}, //商品详情
				info:{}, //个人信息
				showPup: false
			}
		},
		methods:{
			async getDetail(){
				let res = await this.$get(this.$api.goodsdetail,{
					goods_code: this.goods_code
				});
				if(res && res._status == '200'){
					this.goods_detail = res.data;
				}
			},
			async getuserbaseinfo(){
				let res = await this.$post(this.$api.getuserbaseinfo,"");
				if(res && res._status == '200'){
					if(!res.userExt.address || !res.userExt.phone){
						let _this = this;
				    	this.openDialog('error','未绑定手机号和联系地址','是否前往完善账号?',function(){
					        _this.$router.push('/mine/setting');
				    	});
					    return false;
					}
					this.isCheck();
				}
			},
			async isCheck(){
				let res = await this.$post(this.$api.convertgoods,{
					code: this.goods_detail.goods_code,
					price: this.goods_detail.goods_price,
					usenum: this.goods_detail.use_num,
					is_check: 1
				});
				if(res && res._status == '200'){
					let _this = this;
					if(res.pay_money && res.pay_money != ''){
				    	this.openDialog('error','积分不足',`您的积分还缺少${res.after_ticket}</br>需补足￥${res.pay_money}换购`,function(){
					        _this.createorder(_this.goods_detail.goods_id,4);
				    	});
					}else{
					    this.openDialog('warn','提示',`兑换将花费"${this.goods_detail.use_num}积分"`,function(){
					        _this.confirmGoods();
				    	});
					}
				}
			},
			async confirmGoods(){
				let res = await this.$post(this.$api.convertgoods,{
					code: this.goods_detail.goods_code,
					price: this.goods_detail.goods_price,
					usenum: this.goods_detail.use_num,
				});
				if(res && res._status == '200'){
					let info = {
						name: res.name,
						phone: res.phone,
						orderno: res.orderno,
						address: res.address
					}
					this.info = info;
					this.$refs.extendPopup.show();
				}
			},
			luckyDraw:function(){//兑换
				this.getuserbaseinfo();
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
		            that.luckyDraw();
		        } else {
		            showToastTxtOnly('充值失败');
		        }
		      });
		    }
		},
		created(){
			this.goods_code = this.$route.params.id;
			this.getDetail();
		},
		components:{
			Xheader,
			Xcont,
			cubePop
		}
	}
	
</script>
<style lang="stylus" scoped>
	.container{
		overflow: auto;
		padding: 0 20px;
		.banner{
			width: 100%;
			height: 350px;
			display: flex;
			justify-content:center;
			align-items:center;
			img{
				display: block;
				width: 268px;
				height: 268px;
			}
		}
		.title{
			display: flex;
			justify-content:space-between;
			align-items:center;
			margin-bottom: 15px;
			.tit_l{
				.name{
					color: #232323;
					font-size: 36px;
				}
				.remaining{
					font-size: 28px;
					color: #999;
				}
				
			}
			.tit_r{
				.point{
					color: #dd8201;
					font-size: 36px;
				}
				.yuan{
					font-size: 28px;
					color: #999;
					text-decoration: line-through;
				}
				
			}
		}
		.line{
			width: 100%;
			height: 1px;
			background: #ebebeb;
		}
		.introduce{
			color: #232323;
			font-size: 28px;
			padding: 30px 0 20px 0;
		}
		.text{
			color: #999;
			font-size: 24px;
			line-height: 40px;
		}
		.btn{
			margin: 50px 0;
			button{
				width: 450px;
				height: 70px;
				margin:0 auto;
				font-size: 28px;
				border-radius: 10px;
				background-image: linear-gradient(#ff704c, #ff3231);
			}
		}
	}
</style>