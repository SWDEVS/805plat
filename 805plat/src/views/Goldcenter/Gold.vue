<template>
	<div>
		<Xheader title="金币中心" :back="true"></Xheader>
		<Xcont :header="true">
			<div class="content">
				<div class="title">
					<div class="head">
						<img src="../../assets/images/ingot.png">
						<span>用户昵称</span>
					</div>
					<div class="box">
						<span class="name">元宝</span>
						<i class="yuan"></i>
						<span class="num">99999</span>
						<i class="right"></i>
					</div>
					<div class="box">
						<span class="name">积分</span>
						<i class="point"></i>
						<span class="num">99999</span>
						<i class="right"></i>
					</div>
				</div>
				<div class="banner">
					<p class="sign">连续签到3天</p>
					<p class="tips">忘记签到会重新开始哦~</p>
					<div class="days">
						<div class="day_box" v-for="item in 7">
							<div class="day_t">
								<span>翻倍</span>
							</div>
							<div class="day_c">
								<p class="num">18</p>
								<div class="reward">
									<i class="finished"></i>
								</div>
							</div>
							<div class="day_b">
								<p>1天</p>
							</div>
						</div>
					</div>
				</div>
				<div class="fish"></div>
				<div class="task">
					<i></i>
					<span>日常任务</span>
				</div>
				<div class="task_list">
					<div class="task_l">
						<img src="@/assets/images/Gold/jb_icon_fenxiang.png">
					</div>
					<div class="task_c">
						<div class="task_title">
							<span>分享满贯捕鱼体验版</span>
							<div class="reward">
								<i class="point"></i>
								<p class="num">+888</p>
							</div>
						</div>
						<div class="progress">
							<div class="tip">
								<i v-bind:style="{width: health+'%'}"></i>
							</div>
							<p><span>0</span>/1</p>
						</div>
					</div>
					<div class="task_r">
						<a href="javascript:;" class="recive"></a>
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
				health: 90

			}
		},
		components: {
			Xheader,
			Xcont
		},
		methods:{

		},
		created(){

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
					background: url('assets/images/Gold/jb_qipao.png') no-repeat;	
					background-size: 100% 100%;
					margin: 0 auto;
					margin-bottom: 10px;
					span{
						display: block;
						height: 30px;
						text-align: center;
						line-height: 30px;
						color: #fff;
						font-size: 20px;
					}
				}
				.day_c{
					width: 80px;
					height: 100px;
					background: #eee;
					border-radius: 10px;
					padding-top: 8px;
					text-align: center;
					margin-bottom: 11px;
					.num{
						font-size: 22px;
						color: #acacac;
						margin-bottom: 11px;
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
				.day_b{
					text-align: center;
					p{
						font-size: 22px;
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
				}
				.reward{
					width: 120px;
					height: 40px;
					background: url('assets/images/Gold/jb_jiangli_di.png') no-repeat;
					background-size: 100% 100%;	
					display: flex;
					align-items: center;
					justify-content: space-around;
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