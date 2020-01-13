<template>
	<div>
		<Xheader title="联系地址" :back="true"></Xheader>
		 <Xcont :header="true">
			 <template>
				<div class="set_con">
					<div class="set_child">
						<div class="set_l">
							<span>联系地址</span>
						</div>
						<div class="set_c">
							<textarea placeholder="请填写详细地址" v-model="address"></textarea>
						</div>
					</div>
					<!-- 按钮 -->
					<div class="btn">
						<cube-button :primary="true" @click="addAddress()">提 交</cube-button>
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
			address:''
		};
	},
	methods:{
		async addAddress(){
			// 判断地址不能为空
			if(this.address == ''){
				this.toast = this.$createToast({
			        txt: '请填写地址',
			        type: 'txt'
			    })
			    this.toast.show();
			    return false;
			}
			let res = await this.$post(this.$api.address,{
				address: this.address
			});
			if(res && res._status == '200'){
				this.toast = this.$createToast({
			        txt: res._msg,
			        type: 'txt',
			        time: 1000,
			        onTimeout: () => {
			          this.$router.push("/mine/setting");
			        }
			    })
			    this.toast.show();
			}
		}
	},
	created(){
		this.address = this.$route.params.address;
	},
	mounted(){

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
		overflow: hidden;
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
				textarea{
					border: none;
					width: 400px;
					height: 130px;
					resize: none;
					outline: none;
					font-size: $size-xs;
					color: $color-deep;
					padding-top: 50px;
					line-height: 1.5;
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
	}
</style>