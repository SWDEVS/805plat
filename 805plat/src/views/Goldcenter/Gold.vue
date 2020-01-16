<template>
	<div>
		<Xheader title="任务中心" :back="true"></Xheader>
		<Xcont :header="true">
			<div class="content">
				<div class="title">
					<div class="head">
						<img :src="userInfo.face_src">
						<span>{{userInfo.nick_name}}</span>
					</div>
					<div class="box" @click="navigate('/mine/bean')">
						<!-- <span class="name">金豆</span> -->
						<i class="yuan"></i>
						<span class="num">{{userInfo.ingot|formatNumberRgx}}</span>
						<i class="right"></i>
					</div>
					<div class="box" @click="navigate('/mine/point')">
						<!-- <span class="name">积分</span> -->
						<i class="point"></i>
						<span class="num">{{userInfo.ticket|formatNumberRgx}}</span>
						<i class="right"></i>
					</div>
				</div>
				<div class="banner">
					<p class="sign">连续签到{{sign_day}}天</p>
					<p class="tips">忘记签到会重新开始哦~</p>
					<div class="days">
						<div class="day_box" v-for="(item,index) in sign_list" :key="item.sign">
							<div class="day_t">
								<div class="double" v-if="item.content != ''">
									<span>{{item.content}}</span>
								</div>
							</div>
							<div class="day_con">
								<div class="loading" v-if="item.status == 2" @click="sign(item.sign)"></div>
								<div class="day_c">
									<p :class="[item.status == 1 ? 'active':'','num']">{{item.send_num}}</p>
									<div class="reward">
										<i class="finished" v-if="item.status == 1"></i>
										<i :class="bindCladdName[item.send_type]" v-else-if="item.status == 2"></i>
										<i :class="bindCladdName[item.send_type]" v-else></i>
									</div>
								</div>
							</div>
							<div class="day_b">
								<p :class="[item.status == 1 ? 'active':'']">{{item.is_today == 1 ? '今' : item.sign}}天</p>
							</div>
						</div>
					</div>
				</div>
				<div class="fish" @click="toFish()"></div>
				<div class="task">
					<i></i>
					<span>日常任务</span>
				</div>
				<div class="task_list" v-for="(item,index) in activelist" :key="item.id">
					<div class="task_l">
						<img src="@/assets/images/Gold/jb_icon_fenxiang.png">
					</div>
					<div class="task_c">
						<div class="task_title">
							<span class="ellipsis">{{item.content}}</span>
							<div class="reward">
								<i :class="bindCladdName[item.send_type]"></i>
								<p class="num">+{{item.send_num}}</p>
							</div>
						</div>
						<div class="progress">
							<div class="tip">
								<i v-bind:style="{width: GetPercent(item.res_num,item.need_num)+'%'}"></i>
							</div>
							<p><span>{{item.res_num}}</span>/{{item.need_num}}</p>
						</div>
					</div>
					<div class="task_r">
						<a href="javascript:;" class="complete" @click="toShare()" v-if="item.status == 0"></a>
						<a href="javascript:;" class="recive" @click="receiveActive(item.id)" v-if="item.status == 2"></a>
						<a href="javascript:;" class="finished" v-if="item.status == 1"></a>
					</div>
				</div>
			</div>
		</Xcont>
	</div>
</template>
<script type="text/javascript">
	import Xheader from "@/components/layout/Xheader.vue";
	import Xcont from "@/components/layout/Xcontent.vue";
	export default{
		name:"",
		data(){
			return {
				health: 0,
				userInfo:"",//个人信息
				sign_day: 0,//签到的第几天
				sign_list:[],//签到列表
				bindCladdName:{
					1: 'yuan',
					2: 'point',
					3: 'ticket'
				},
				activelist:[],//任务列表
			}
		},
		components: {
			Xheader,
			Xcont
		},
		methods:{
			async getuserinfo(){
				let res = await this.$post(this.$api.getuserinfo, "");
				if (res && res._status == '200') {
					this.userInfo = res;
				}
			},
			navigate:function(path) {
		      	this.$router.push(path);
		    },
		    async getsignlist(){
				let res = await this.$post(this.$api.getsignlist, "");
				if (res && res._status == '200') {
					this.sign_day = res.con_signe_days;
					this.sign_list = res.sign_config;
				}
			},
			async sign(id){
				let res = await this.$post(this.$api.sign, {
					id: id
				});
				if (res && res._status == '200') {
					this.openDialog('success','签到成功');
					this.getuserinfo();
					this.getsignlist();
				}
			},
			toFish:function(){
				window.location.href = "https://www.chengzijianzhan.com/tetris/page/6766529259344232462/";
			},
			async getActivelist(){
				let res = await this.$post(this.$api.activelist, "");
				if (res && res._status == '200') {
					this.activelist = res.list;
				}
			},
			GetPercent:function(num, total) {
			    num = parseFloat(num);
			    total = parseFloat(total);
			    if (isNaN(num) || isNaN(total)) {
			        return "0";
			    }
			    return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
			},
		    toShare:function(){
		    	let _this = this;
		    	this.openDialog('warn','','请在公众号“积分获得”中打开并分享“满贯捕鱼体验版”',function(){
		    		_this.share();
			        _this.$wx.closeWindow();
		    	});
		    },
		    async share() {
		        let config = await this.$post(this.$api.share, "");
		    },
		    async receiveActive(id){
		    	let res = await this.$post(this.$api.receiveActive, {
		    		id:id
		    	});
		    	if (res && res._status == '200') {
					this.openDialog('success','领取成功');
					this.getActivelist();
					this.getuserinfo();
				}
		    }
		},
		created(){
			this.getuserinfo();
			this.getsignlist();
			this.getActivelist();
		},
		mounted(){

		}
	}
	
</script>
<style lang="stylus" scoped>
.content{
	width: 100%;
	height: 100%;
	background: url('assets/images/Gold/T_bg01.png') no-repeat;	
	background-size: 100% auto;
	padding: 16px;
	.title{
		height: 66px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 17px;
		.head{
			display: flex;
			align-items: center;
			img{
				display: block;
				width: 60px;
				height: 60px;
				border-radius: 30px;
				margin-right: 16px;
			}
			span{
				color: #fff;
				font-size: 24px;
			}
		}
		.box{
			display: flex;
			align-items: center;
			span{
				color: #fff;
			}
			.name{
				font-size: 24px;
			}
			.num{
				font-size: 24px;
			}
			.yuan{
				display: block;
				width: 34px;
				height: 29px;
				background: url('assets/images/Gold/T_bg_yb.png') no-repeat;	
				background-size: 100% 100%;
				margin: 0 10px;
			}
			.point{
				display: block;
				width: 35px;
				height: 29px;
				background: url('assets/images/Gold/T_bg_jf.png') no-repeat;	
				background-size: 100% 100%;
				margin: 0 10px;
			}
			.right{
				display: block;
				width: 14px;
				height: 26px;
				background: url('assets/images/Gold/T_bg_more.png') no-repeat;	
				background-size: 100% 100%;
				margin: 0 0 0 10px;
			}
		}	
	}
	.banner{
		width: 690px;
		height: 300px;
		background: #fff;
		border-radius: 18px;
		padding: 23px 20px 0 20px;
		margin-bottom: 24px;
		.sign{
			font-size: 28px;
			color: #5f5f5f;
			margin-bottom: 14px;
		}
		.tips{
			font-size: 22px;
			color: #acacac;
			margin-bottom: 14px;
		}
		.days{
			display: flex;
			justify-content: space-between;
			.day_box{
				width: 80px;
				height: auto;
				.day_t{
					width: 70px;
					height: 39px;
					margin: 0 auto;
					margin-bottom: 10px;
					.double{
						width: 100%;
						height: 100%;
						background: url('assets/images/Gold/jb_qipao.png') no-repeat;
						background-size: 100% 100%;
						span{
							display: block;
							height: 30px;
							text-align: center;
							line-height: 30px;
							color: #fff;
							font-size: 20px;
						}
					}
				}
				.day_con{
					width: 80px;
					height: 100px;
					position: relative;
					margin-bottom: 11px;
					.loading{
						width: 120px;
						height: 140px;
						background-size: 100% 100%;
						animation: move 1s infinite;
						position: absolute;
						left: -20px;
						top: -20px;
					}
					@keyframes move{	
						0%{
							background: url('assets/images/Gold/jb_light_01.png') no-repeat;
							background-size: 100% 100%;
						}
						6%{
							background: url('assets/images/Gold/jb_light_02.png') no-repeat;
							background-size: 100% 100%;
						}
						12%{
							background: url('assets/images/Gold/jb_light_03.png') no-repeat;
							background-size: 100% 100%;
						}
						18%{
							background: url('assets/images/Gold/jb_light_04.png') no-repeat;
							background-size: 100% 100%;
						}
						24%{
							background: url('assets/images/Gold/jb_light_05.png') no-repeat;
							background-size: 100% 100%;
						}
						30%{
							background: url('assets/images/Gold/jb_light_06.png') no-repeat;
							background-size: 100% 100%;
						}
						36%{
							background: url('assets/images/Gold/jb_light_07.png') no-repeat;
							background-size: 100% 100%;
						}
						42%{
							background: url('assets/images/Gold/jb_light_08.png') no-repeat;
							background-size: 100% 100%;
						}
						48%{
							background: url('assets/images/Gold/jb_light_09.png') no-repeat;
							background-size: 100% 100%;
						}
						56%{
							background: url('assets/images/Gold/jb_light_10.png') no-repeat;
							background-size: 100% 100%;
						}
						62%{
							background: url('assets/images/Gold/jb_light_11.png') no-repeat;
							background-size: 100% 100%;
						}
						68%{
							background: url('assets/images/Gold/jb_light_12.png') no-repeat;
							background-size: 100% 100%;
						}
						74%{
							background: url('assets/images/Gold/jb_light_13.png') no-repeat;
							background-size: 100% 100%;
						}
						80%{
							background: url('assets/images/Gold/jb_light_14.png') no-repeat;
							background-size: 100% 100%;
						}
						86%{
							background: url('assets/images/Gold/jb_light_15.png') no-repeat;
							background-size: 100% 100%;
						}
						92%{
							background: url('assets/images/Gold/jb_light_16.png') no-repeat;
							background-size: 100% 100%;
						}
						97%{
							background: url('assets/images/Gold/jb_light_17.png') no-repeat;
							background-size: 100% 100%;
						}
						100%{
							background: url('assets/images/Gold/jb_light_18.png') no-repeat;
							background-size: 100% 100%;
						}
					}
					.day_c{
						width: 80px;
						height: 100px;
						background: #eee;
						border-radius: 10px;
						padding-top: 8px;
						text-align: center;
						.num{
							font-size: 22px;
							color: #5f5f5f;
							margin-bottom: 11px;
						}
						.active{
							color: #acacac;
						}
						.reward{
							height: 45px;
							display: flex;
							justify-content: center;
							align-items: center;
							.finished{
								display: block;
								width: 45px;
								height: 45px;
								background: url('assets/images/Gold/jb_icon_ylq.png') no-repeat;	
								background-size: 100% 100%;
							}
							.yuan{
								display: block;
								width: 43px;
								height: 38px;
								background: url('assets/images/Gold/jb_icon_yb.png') no-repeat;	
								background-size: 100% 100%;
							}
							.point{
								display: block;
								width: 46px;
								height: 38px;
								background: url('assets/images/Gold/jb_icon_jf.png') no-repeat;	
								background-size: 100% 100%;
							}
							.ticket{
								display: block;
								width: 42px;
								height: 37px;
								background: url('assets/images/Gold/jb_icon_yhq.png') no-repeat;	
								background-size: 100% 100%;
							}
						}
						
					}
				}
				.day_b{
					text-align: center;
					p{
						font-size: 22px;
						color: #5f5f5f;
					}
					.active{
						color: #acacac;
					}
				}
			}
		}
	}
	.fish{
		width: 690px;
		height: 200px;
		background: url('assets/images/Gold/jb_banner.png') no-repeat;	
		background-size: 100% 100%;
		margin-bottom: 30px;
	}
	.task{
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 4px;
		margin-bottom: 30px;
		i{
			display: block;
			width: 10px;
			height: 40px;
			background: url('assets/images/Gold/jb_seg.png') no-repeat;	
			background-size: 100% 100%;
			margin-right: 20px;
		}
		span{
			font-size: 28px;
			color: #5f5f5f;
		}
	}
	.task_list{
		width: 690px;
		height: 150px;
		background: #fff;
		border-radius: 16px;
		padding: 0 28px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.task_l{
			img{
				display: block;
				width: 100px;
				height: 99px;
			}
		}
		.task_c{
			.task_title{
				display: flex;
				align-items: center;
				margin-bottom: 16px;
				span{
					font-size: 24px;
					color: #5f5f5f;
					margin-right: 14px;
					display: block;
					width: 230px;
				}
				.reward{
					width: 120px;
					height: 40px;
					background: url('assets/images/Gold/jb_jiangli_di.png') no-repeat;
					background-size: 100% 100%;	
					display: flex;
					align-items: center;
					justify-content: space-around;
					.yuan{
						display: block;
						width: 27px;
						height: 24px;
						background: url('assets/images/Gold/jb_icon_yb_s.png') no-repeat;
						background-size: 100% 100%;	
					}
					.point{
						display: block;
						width: 28px;
						height: 24px;
						background: url('assets/images/Gold/jb_icon_jf_s.png') no-repeat;
						background-size: 100% 100%;	
					}
					.ticket{
						display: block;
						width: 26px;
						height: 23px;
						background: url('assets/images/Gold/jb_icon_yhq_s.png') no-repeat;
						background-size: 100% 100%;	
					}
					.num{
						color: #a55520;
						font-size: 24px;
					}

				}
			}
			.progress{
				display: flex;
				align-items: center;
				.tip{
					width: 150px;
					height: 8px;
					background: #eee;
					margin-right: 15px;
					i{
						display: block;
						height: 8px;
						background: #fde03c;
					}
				}
				p{
					font-size: 24px;
					color: #5f5f5f;
					span{
						color: #fd8176;
					}
				}
				
			}

		}
		.task_r{
			a{
				display: block;
			}
			.complete{
				width: 140px;
				height: 50px;
				background: url('assets/images/Gold/jb_btn_qwc.png') no-repeat;
				background-size: 100% 100%;	
			}
			.recive{
				width: 140px;
				height: 50px;
				background: url('assets/images/Gold/jb_btn_lq.png') no-repeat;
				background-size: 100% 100%;	
			}
			.finished{
				width: 143px;
				height: 126px;
				background: url('assets/images/Gold/wancheng.png') no-repeat;
				background-size: 100% 100%;	
			}

		}
	}
}
	
</style>