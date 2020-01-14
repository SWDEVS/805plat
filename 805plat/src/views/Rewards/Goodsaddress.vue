<template>
    <cube-popup type="extend-popup" ref="popup" :mask="true">
    	<div class="address">
    		<div class="title">收货信息</div>
    		<p>姓名:</p>
    		<div class="box">
    			<cube-input v-model="name" placeholder="请输入姓名"></cube-input>
    		</div>
    		<p>联系电话:</p>
    		<div class="box">
    			<cube-input v-model="phone" placeholder="请输入联系电话" type="number" :maxlength="11"></cube-input>
    		</div>
    		<p>收货地址:</p>
    		<div class="box">
    			<cube-textarea v-model="address" :autoExpand="true" placeholder="请输入联系地址"></cube-textarea>
    		</div>
    		<cube-checkbox v-model="checked">
			   保存地址
			</cube-checkbox>
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
    		name:'',//姓名
    		phone:'',//电话
    		address:'',//地址
    		orderno:'',//码
    		checked: true, //是否保存地址
    	}
    },
    watch:{
    	infomation:{
    		handler(newValue,oldValue){
    			let obj = newValue;
    			this.name = obj.name;
    			this.phone = obj.phone;
    			this.address = obj.address;
    			this.orderno = obj.orderno;
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
        	if(this.name === ''){
				this.toast = this.$createToast({
			        txt: '请输入姓名',
			        type: 'txt'
			    })
			    this.toast.show();
			    return false;
			}
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
			if(this.address === ''){
				this.toast = this.$createToast({
			        txt: '请输入收货地址',
			        type: 'txt'
			    })
			    this.toast.show();
			    return false;
			}
			return true;
        },
        async changeGoods(){
        	if(!this.checkForm()) return false;
        	let res = await this.$post(this.$api.convertgoodsExchange,{
        		receive_name: this.name,
				receive_phone: this.phone,
				receive_address: this.address,
				is_save: Number(this.checked),
				order_no: this.orderno
        	});
        	if(res && res._status == '200'){
        		this.hide();
        		this.$createDialog({
			        type: 'alert',
			        icon: 'cubeic-right',
			        showClose: true,
			        title: "提示",
			        content: "商品将在7个工作日邮寄给您,请到'商品订单记录'中查看物流信息",
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
			font-size: 30px;
			padding: 10px 0;
		}
		.box{
			height: auto;
			margin-bottom: 20px;
			input{
				font-size: 24px;
				height: 60px;
				border: none;
				
			}
			textarea{
				font-size: 24px;
				resize: none;
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