<template>
	<div>
		<Xheader title="实名认证" :back="true"></Xheader>
		 <Xcont :header="true">
			 <template>
				<div class="set_con">
					<div class="set_child">
						<div class="set_l">
							<span>真实姓名</span>
						</div>
						<div class="set_c">
							<input type="text" name="" placeholder="请输入真实姓名">
						</div>
					</div>
					<div class="set_child">
						<div class="set_l">
							<span>身份证号码</span>
						</div>
						<div class="set_c">
							<input type="text" name="" placeholder="请输入身份证号码">
						</div>
					</div>
					<!-- 按钮 -->
					<div class="btn">
						<cube-button :primary="true">提交</cube-button>
					</div>
					<div class="tips">
						<span>&nbsp&nbsp&nbsp&nbsp按照文化部《网络游戏管理暂行办法》的有关要求及您的个人权益保障，网络游戏用户需要使用18岁以上有效身份证件进行实名认证，确保安全登录游戏。</span>
					</div>
				</div>
			 </template>
		 </Xcont>
	</div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
export default {
	name: "Setting",
	components: {
		Xheader,
		Xcont
	},
	data() {
		return {
			name: "",
			status: false,
			value:''
		};
	}
};
</script>
<style lang="stylus" scoped>
	.set_con{
		width: $width-content;
		height: calc(100% - 22px);
		background: #fff;
		border-radius: $size-radius;
		margin: 0 auto;
		margin-top: 11px;
		.set_child{
			width: 612px;
			height: 146px;
			border-bottom: 2px solid #d4d4d4;
			margin: 0 auto;
			padding: 0 5px;
			display: flex;
			align-items:center;
			.set_l{
				font-size: $size-xs;
				color: $color-deep;
				margin-right: 20px;
			}
			.set_c{
				flex: 1;
				input{
					border: none;
					outline: none;
					font-size: $size-xs;
					color: $color-deep;
				}
			}
			.set_r{
				margin-left: 15px;
				button{
					font-size: $size-xxs;
					width: 150px;
					height: 40px;
				}
			}
		}
		.btn{
			margin-top: 100px;
			button{
				width: 450px;
				height: 70px;
				margin:0 auto;
				font-size: 28px;
				border-radius: 10px;
				background-image: linear-gradient(#ff704c, #ff3231);
			}
		}
		.tips{
			padding: 0 30px;
			margin-top: 30px;
			span{
				color: #ff8846;
				line-height: 1.5;
				font-size: $size-xs;
			}
		}
	}
</style>