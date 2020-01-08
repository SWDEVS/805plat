<template>
  <div>
	<Xheader title="商铺信息" :back="true"></Xheader>
	 <Xcont :header="true">
	 	<div class="detail_content">
	 		<div class="info">
	 			<div class="info_l">
	 				<img :src="shop_detail.small_pic">
	 			</div>
	 			<div class="info_r">
	 				<p class="title ellipsis">{{shop_detail.company_name}}</p>
        			<div class="shop_address">
        				<i></i>
        				<span class="ellipsis">{{shop_detail.address}}</span>
        			</div>
        			<div class="introduce">
        				<div class="box">{{shop_detail.second_info ? shop_detail.second_info : `暂无主打菜品`}}</div>
        			</div>
        			<div class="desc">
        				<span>{{shop_detail.company_info}}</span>
        			</div>
	 			</div>
	 		</div>
	 		<section v-for="(item,index) in shop_detail.coups" :key="item.id">
		 		<div class="shop_coupon">
		 			<div class="coupon_l">
		 				<p>￥<span>{{Number(item.price)}}</span></p>
		 			</div>
		 			<div class="coupon_c" @click="showDetail(item)">
		 				<div class="time">
		 					<span>使用期限</span>
		 					<span>{{item.day}}天</span>
		 				</div>
		 				<div class="conditions">
		 					<span>{{item.full == 0 ? '无门槛':`满${item.full}可用`}}</span>
		 				</div>
		 				<div class="pack_up">
		 					<span>{{item.show? '点击收起':'点击展开'}}</span>
		 					<i :class="[item.show ? 'up':'down']"></i>
		 				</div>
		 			</div>
		 			<div class="coupon_r" @click="getCoupon(item.id)">
		 				<div class="diamond">
		 					<i></i>
		 					<span>{{item.use_num}}</span>
		 				</div>
		 				<div class="exchange">立即兑换</div>
		 			</div>
		 		</div>
		 		<transition name="expand">
		 		<div class="coupon_detail" v-if="item.show">
		 			<div class="instructions">
		 				<span>兑换说明</span>
		 				<span>已兑 {{item.total - item.valid_num}}</span>
		 				<span>剩余 {{item.valid_num}}</span>
		 			</div>
		 			<div class="cond_detail clearfix">
		 				<div class="cond_l">有效期:</div>
		 				<div class="cond_r">{{item.day}}天</div>
		 			</div>
		 			<div class="cond_detail clearfix">
		 				<div class="cond_l">使用时间:</div>
		 				<div class="cond_r">{{item.use_date}}</div>
		 			</div>
		 			<div class="cond_detail clearfix">
		 				<div class="cond_l">使用范围:</div>
		 				<div class="cond_r">{{item.use_range}}</div>
		 			</div>
		 			<div class="cond_detail clearfix">
		 				<div class="cond_l">使用规则:</div>
		 				<div class="cond_r" v-html="line2br(item.use_rule)"></div>
		 			</div>
		 		</div>
		 		</transition>
	 		</section>
	 	</div>
	 </Xcont>
  </div>
</template>
<script>

import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
export default {
  name: "Rewards",
  components: {
	Xheader,
	Xcont
  },
  data() {
	return {
	  name: "",
	  shopId:'',//店铺id
	  shop_detail:"",//店铺详情
	  show: false
	};
  },
  created(){
  	this.shopId = this.$route.params.id;
  	this.couplist(this.shopId);
  },
  methods: {
  	async couplist(id) {
        let res = await this.$get(this.$api.couplist, {
        	ditch_num: id
        });
        if (res && res._status == '200') {
        	// 计算优惠券使用数量
            for(let item of res.list[0].coups){
            	item.show = false;
            }
            this.shop_detail = res.list[0];	
        }
    },
    showDetail:function(item){
    	for(let int of this.shop_detail.coups){
    		if(int.id != item.id){
    			int.show = false;
    		}
    	}
    	item.show = !item.show;
    },
    async getCoupon(id){
    	let res = await this.$post(this.$api.receivecoup, {
        	coupid: id
        });
        if (res && res._status == '200'){
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
			          
			        },
			        onCancel: () => {
			         
			        }
			      }).show()
        	}else{
        		this.$createDialog({
			        type: 'alert',
			        icon: 'cubeic-right',
			        showClose: true,
			        title: '领取成功',
			        content:'是否前往优惠券列表查看?',
			        onConfirm: () => {
			        	this.$router.push('/mine/Coupon');
			        }
			     }).show()
        	}
        }
    },
    line2br:function(text) {
		return text.split('\n').join('<br/>');
	}
  }
};
</script>
<style lang="stylus" scoped>
.detail_content{
	width: 690px;
	height: auto;
	margin:0 auto;
	margin-top: 14px;
	.info{
		width: 100%;
		height: auto;
		background: #fff;
		border-radius: $size-radius;
		padding: 24px 0 24px 24px;
		overflow: hidden;
		margin-bottom: 24px;
		.info_l{
			width: 164px;
			height: 164px;
			float: left;
			border-radius: $size-radius;
			margin-right: 14px;
			overflow: hidden;
			img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.info_r{
			float: left;
			.title{
				font-size: 26px;
				color: #555;
				width: 350px;
				margin-bottom: 9px;
			}
			.shop_address{
				i{
					display: block;
					width:20px;
					height: 29px;
					background: url('assets/images/T_gps.png') no-repeat;
					background-size: 100% 100%;
					margin-right: 5px; 
				}
				display: flex;
				align-items:center;
				margin-bottom: 8px;
				span{
					display: block;
					width: 380px;
					font-size: 24px;
					color: #838383;
				}
			}
			.introduce{
				display: flex;
				height: 40px;
				align-items:center;
				justify-content:space-between;
				margin-bottom: 12px;
				.box{
					width: 270px;
				}
				span{
					color: #a6a6a6;
					font-size: 20px;
				}
			}
			.box{
				height: 40px;
				background: #eee;
				text-align: center;
				color: #838383;
				font-size: 20px;
				line-height: 40px;
				float: left;
				margin-right: 10px;
			}
			.desc{
				width: 465px;
				font-size: 24px;
				color: #838383;
				line-height: 1.4;
			}
		}
	}
	section{
		margin-bottom: 24px;
	}
	.shop_coupon{
		position: static;
		z-index: 10;
		width: 686px;
		height: 207px;
		background: url('assets/images/Rewards/T_youhuiquan.png') no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		.coupon_l{
			min-width: 187px;
			float: left;
			padding-top: 33px;
			margin-right: 26px;
			text-align: right;
			p{
				color: #d6250c;
				font-size: 60px;
				span{
					font-size: 100px;
				}
			}
		}
		.coupon_c{
			max-width: 260px;
			padding-top: 33px;
			color: #d6250c;
			float: left;
			.time{
				font-size: 26px;
				margin-bottom: 35px;
				span:nth-child(1){
					margin-right: 30px;
				}
			}
			.conditions{
				font-size: 30px;
				margin-bottom: 30px;
			}
			.pack_up{
				display: flex;
				align-items:center;
				span{
					font-size: 20px;
					opacity: .5;
					margin-right: 15px;
				}
				i{
					width: 34px;
					height: 13px;
					display: block;
				}
				.up{
					background: url('assets/images/Rewards/T_jiantou_s.png') no-repeat;
					background-size: 100% 100%;
				}
				.down{
					background: url('assets/images/Rewards/T_jiantou_x.png') no-repeat;
					background-size: 100% 100%;
				}
			}
			
			
		}
		.coupon_r{
			width: 210px;
			float: right;
			padding-top: 45px;
			color: #a55520;
			.diamond{
				display: flex;
				align-items:center;
				justify-content:center;
				font-size: 28px;
				margin-bottom: 35px;
				i{
					display: block;
					width: 36px;
					height: 30px;
					background: url('assets/images/Rewards/T_jf01_br.png') no-repeat;
					background-size: 100% 100%;
					margin-right: 10px;
				}
			}
			.exchange{
				text-align: center;
				font-size: 32px;
			}
		}
	}
	.coupon_detail{
		width: 640px;
		background: #fff;
		border-radius: 0 0 16px 16px;
		margin: 0 auto;
		padding: 30px;
		.instructions{
			font-size: 26px;
			color: #555;
			margin-bottom: 25px;
			span:nth-child(1){
				margin-right: 230px;
			}
			span:nth-child(2){
				font-size: 24px;
				color: #a6a6a6;
				margin-right: 50px;
			}
			span:nth-child(3){
				font-size: 24px;
				color: #a6a6a6;
			}

		}
		.cond_detail{
			width: 100%;
			margin-bottom: 20px;
			.cond_l{
				width: 120px;
				float: left;
				font-size: 24px;
				color: #727272;
				height: 40px;
				line-height: 40px;
			}
			.cond_r{
				max-width: 400px;
				float: left;
				font-size: 24px;
				color: #838383;
				line-height: 40px;
			}
		}
		
	}
}
.expand-enter-active{
	height: 351px;;
	overflow: hidden;
	transition: all 1s;
}
.expand-leave-active{
	// height: 0px;
	// overflow: hidden;
	// transition: all 1s;
}
.expand-enter, .expand-leave{
	height: 0;
	opacity: 0;
}
</style>