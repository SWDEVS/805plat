<template>
	<div>
		<Xheader title="更换/绑定手机号" :back="true"></Xheader>
		 <Xcont :header="true">
			 <template>
				<div class="set_con">
					<section v-if="status">
						<div class="set_child">
							<div class="set_l">
								<span>手机号</span>
							</div>
							<div class="set_c">
								<span>{{bindphone}}</span>
							</div>
						</div>
						<!-- 按钮 -->
						<div class="btn">
							<cube-button :primary="true" @click="showClose()">更换绑定手机号</cube-button>
						</div>
					</section>
					<template v-else>
					<!-- <section v-if="bindStatus">
						<div class="set_child">
							<div class="set_l">
								<span>原手机号</span>
							</div>
							<div class="set_c">
								<span>15951425609</span>
							</div>
						</div>
						<div class="set_child">
							<div class="set_l">
								<span>短信验证码</span>
							</div>
							<div class="set_c">
								<input type="number" name="" placeholder="请输入验证码">
							</div>
							<div class="set_r">
								<cube-button :inline="true">获取验证码</cube-button>
							</div>
						</div>
						<div class="btn">
							<cube-button :primary="true">确 定</cube-button>
						</div>
					</section> -->
					<section>
						<div class="set_child">
							<div class="set_l">
								<span>+86</span>
							</div>
							<div class="set_c">
								<input type="number" v-model="phone" placeholder="请输入手机号码" maxlength="11">
							</div>
						</div>
						<div class="set_child">
							<div class="set_l">
								<span>短信验证码</span>
							</div>
							<div class="set_c">
								<input type="number" v-model="smscode" placeholder="请输入验证码" maxlength="6">
							</div>
							<div class="set_r">
								<cube-button  :disabled="!BtnStatus" :inline="true" @click="getCode()">{{textStatus? '获取验证码' : BtnStatus? '获取验证码':`${countDownTime}秒后获取`}}</cube-button>
							</div>
						</div>
						<!-- 按钮 -->
						<div class="btn">
							<cube-button :primary="true" @click="sendMsg()">确 定</cube-button>
						</div>
					</section>
					</template>
				</div>
			 </template>
		 </Xcont>
	</div>
</template>
<script>
import Xheader from "@/components/layout/Xheader.vue";
import Xcont from "@/components/layout/Xcontent.vue";
import {setCookie,getCookie} from "@/common/plugins/filters.js";
var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
export default {
	name: "Setting",
	components: {
		Xheader,
		Xcont
	},
	data() {
		return {
			bindphone:'',//已绑定的手机号码带星号
			phone:'',//手机号
			smscode:'',//验证码
			status: false,//判断是否绑定手机
			bindStatus: false,
			BtnStatus: false,//按钮状态
			textStatus: true,
			countDownTime: 60
		};
	},
	watch:{
		phone: function (value) {
			if(this.countDownTime != 60) return;
	        let val = myreg.test(value)
	        if (val) {
	        	//验证成功的
	        	this.BtnStatus = true;
	        } else {
	        	this.textStatus = true;
	            this.BtnStatus = false;
	        }
	    }
	},
	methods:{
		formDate:function(){
			if(this.phone == ''){
				this.toast = this.$createToast({
			        txt: '请输入手机号',
			        type: 'txt'
			    })
			    this.toast.show();
			    return false;
			}
			if(!myreg.test(this.phone)){
				this.toast = this.$createToast({
			        txt: '请输入正确的手机号',
			        type: 'txt'
			    })
			    this.toast.show();
			    return false;
			}
			if(this.smscode === ''){
				this.toast = this.$createToast({
			        txt: '请输入验证码',
			        type: 'txt'
			    })
			    this.toast.show();
			    return false;
			}
			return true;
		},
		async getCode(){
			// if(!this.formDate()) return false;
			let res = await this.$post(this.$api.finishsend,{
				mobile: this.phone
			});
			if(res && res._status == '200'){
				this.textStatus = false;
				let endMsRes = (new Date()).getTime() + 60000;
				setCookie('myEndTime', JSON.stringify(endMsRes),'6000');
				this.codeCountDown(endMsRes);
				this.toast = this.$createToast({
			        txt: res._msg,
			        type: 'txt',
			        time: 1000
			    })
			    this.toast.show();
			}
		},
		codeCountDown (endMsRes) {
	        this.BtnStatus = false;
	        this.countDownTime= Math.ceil((endMsRes - (new Date()).getTime()) / 1000)
	        let time = setTimeout(() => {
	        	this.countDownTime--
	          	if (this.countDownTime< 1) {
	          		this.textStatus = true;
	          		if(myreg.test(this.phone)){
	          			this.BtnStatus = true
	          		}
	           		this.countDownTime= 60
	            	clearTimeout(time)
	          	} else {
	          		this.textStatus = false;
	            	this.codeCountDown(endMsRes)
	          	}
	        }, 1000)
	    },
	    async sendMsg(){//确认修改
	    	if(!this.formDate()) return false;
	    	let res = await this.$post(this.$api.bindaccount,{
				phone: this.phone,
				smscode: this.smscode
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
	    },
	    showClose:function() {
		    this.$createDialog({
		        type: 'alert',
		        icon: 'cubeic-question',
		        showClose: true,
		        title: '提示',
		        content:'确定更换手机号码吗?',
		        onConfirm: () => {
		        	this.status = !this.status;
		        }
		     }).show()
    	}
	},
	created(){
		this.bindphone = this.$route.params.phone == undefined ? '' : this.$route.params.phone;
		if(this.bindphone){
			this.status = true;
		}
		let myEndTime= getCookie('myEndTime')
		this.codeCountDown(myEndTime)
	}
};
</script>
<style lang="stylus" scoped>
	.set_con{
		width: 668px;
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
				white-space: nowrap;
			}
			.set_c{
				flex: 1;
				font-size: $size-xs;
				color: $color-deep;
				input{
					border: none;
					outline: none;
				}
			}
			.set_r{
				// margin-left: 15px;
				button{
					font-size: $size-xs;
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