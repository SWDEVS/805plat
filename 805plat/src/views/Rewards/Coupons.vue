<template>
    <!-- 店铺列表 -->
    
    <div class="shop_list">
        <div class="shop_coupon" v-for="item in shopList" :key="item.ditch_num" @click="toShopdetail(item.ditch_num)">
            <div class="shop_l">
                <img :src="item.small_pic">
            </div>
            <div class="shop_r">
                <p class="title ellipsis">{{item.company_name}}</p>
                <div class="shop_address">
                    <i></i>
                    <span class="ellipsis">{{item.address}}</span>
                </div>
                <div class="introduce">
                    <div class="box">{{item.second_info ? item.second_info : `暂无主打菜品`}}</div>
                    <span>已兑{{item.use_num}}</span>
                </div>
                <div class="coupons">
                    <div class="box ellipsis" v-for="(int,ind) in item.coups" :key="ind">{{int.coup_name}}</div>
                </div>
            </div>
            <div class="angle">
                <span>￥{{item.price}}</br>省</span>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: "coupons",
    components: {},
    data() {
        return {
            name: "",
            shopList: [] //店铺数据列表
        };
    },
    methods: {
        toShopdetail: function(id) {
            this.$router.push({
            	name:"Shopdetail",
            	params:{
            		id: id
            	}
            });
        },
        async couplist() {
            let res = await this.$post(this.$api.couplist, "");
            if (res && res._status == '200') {
            	// 计算优惠券使用数量
                for(let item of res.list){
                	let use_num = 0;
                	let price = 0;
                	for(let int of item.coups){
                		use_num += Number(int.total) - Number(int.valid_num);
                		price += Number(int.price);
                	}
                	item.use_num = use_num;
                	item.price = price;
                }
                this.shopList = res.list;
            }
        }
    },
    created() {
        this.couplist();
    }
};
</script>
<style lang="stylus" scoped>
.shop_list{
	margin-top: 15px;
	height: calc(100vh - 214px);
	overflow: auto;
	.shop_coupon{
		width: 650px;
		height: 200px;
		border-radius: $size-radius;
		background: #fff;
		margin: 0 auto;
		padding: 18px 0 18px 18px;
		position: relative;
		margin-bottom: 24px;
		.shop_l{
			width: 164px;
			height: 164px;
			border-radius: $size-radius;
			float: left;
			margin-right: 18px;
			overflow: hidden;
			img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.angle{
			position: absolute;
			right:0;
			top: 0;
			width: 106px;
			height: 117px;
			background: url('assets/images/Rewards/T_jiaobiao.png') no-repeat;
			background-size: 100% 100%;
			text-align: right;
			padding: 5px $padding-s;
			span{
				color: #fff;
				font-size: 26px;
			}
		}
		.shop_r{
			float: left;
			.title{
				font-size: 26px;
				color: #555;
				width: 350px;
				height 30px;
				line-height 30px;
				margin-bottom: 5px;
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
					height 29px;
					line-height 29px;
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
			.coupons{
				height: 40px;
				.box{
					width: 130px;
				}
			}
		}
	}
}
</style>