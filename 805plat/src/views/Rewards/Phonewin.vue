<template>
    <cube-popup type="extend-popup" ref="popup" :mask="true">
    	<div class="address">
    		<div class="title">{{content}}</div>
    		<p>手机号码:</p>
    		<div class="box">
    			<cube-input v-model="phone" placeholder="请输入手机号码" type="number" :maxlength="11"></cube-input>
    		</div>
    		<p class="tip">此次兑换将花费"<span>{{use_num | formatNumberRgx}}积分</span>"</p>
			<div class="btn">
				<cube-button :primary="true" @click="changeGoods()">确 定</cube-button>
			</div>
			<i class="close" @click="hide()"></i>
    	</div>
    </cube-popup>
</template>
<script type="text/javascript">
const COMPONENT_NAME = 'cube-extend-popup'
var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
export default {
    name: COMPONENT_NAME,
    props: {
        content: {
            type: String
        },
        infomation:{
        	type: Object
        }
    },
    data(){
    	return{
    		phone:'',//电话
    		orderno:'',//码
    		use_num:'',
    		goods_price:''
    	}
    },
    watch:{
    	infomation:{
    		handler(newValue,oldValue){
    			let obj = newValue;
    			this.phone = obj.phone;
    			this.orderno = obj.goods_code;
    			this.use_num = obj.use_num;
    			this.goods_price = obj.goods_price;
    		},
    		immediate: true,
    		deep: true
    	}
    },
    methods: {
        show() {
            this.$refs.popup.show();
        },
        hide() {
            this.$refs.popup.hide()
            this.$emit('hide')
        },
        checkForm:function(){
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
			return true;
        },
        async changeGoods(){
        	if(!this.checkForm()) return false;
        	let res = await this.$post(this.$api.convertgoods,{
        		code: this.orderno,
				price: this.goods_price,
				usenum: this.use_num,
				phone: this.phone,
				card: 1
        	});
        	if(res && res._status == '200'){
        		this.hide();
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
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cube-extend-popup {
	.address{
		width: 550px;
		background: #fff;
		height: auto;
		border-radius: 16px;
		padding: 20px 20px 10px 20px;
		position: relative;
		.title{
			text-align: center;
			font-size: 36px;
			padding: 20px 0;
		}
		p{
			color: #666;
			font-size: 24px;
			padding: 10px 0;
		}
		.box{
			height: auto;
			margin-bottom: 20px;
			input{
				font-size: 28px;
				height: 60px;
				border: none;
				
			}
			textarea{
				font-size: 24px;
				resize: none;
			}
		}
		.tip{
			font-size: 24px;
			text-align: center;
			span{
				color: #ff8201;
			}
		}
		.btn{
			margin: 30px 0;
			button{
				width: 400px;
				height: 70px;
				margin:0 auto;
				font-size: 28px;
				border-radius: 10px;
				background-image: linear-gradient(#ff704c, #ff3231);
			}
		}
		.close{
			display: block;
			width: 40px;
			height: 40px;
			background: url('assets/images/common/dialog-close.png') no-repeat;
			background-size: 100% 100%;
			position: absolute;
			right: 10px;
			top: 10px;
		}
	}

}
</style>