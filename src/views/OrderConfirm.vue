<template>
    <div>
        <nav-head></nav-head>
        <nav-bread>
            <span>订单确认</span>
        </nav-bread>
        <div class="container">
            <div class="checkout-order">
                <div class="page-title-normal">
                    <h2 class="page-title-h2">
                        <span>订单确认</span>
                    </h2>
                </div>
                <!-- process step -->
                <div class="check-step">
                    <ul>
                        <li class="cur">
                            <span>选择地址</span>
                        </li>
                        <li class="cur">
                            <span>订单确认</span>
                        </li>
                        <li>
                            <span>支付</span>
                        </li>
                        <li>
                            <span>订单信息</span>
                        </li>
                    </ul>
                </div>

                <!-- order list -->
                <div class="page-title-normal checkout-title">
                    <h2>
                        <span>订单内容</span>
                    </h2>
                </div>
                <div class="item-list-wrap confirm-item-list-wrap">
                    <div class="cart-item order-item">
                        <div class="cart-item-head">
                            <ul>
                                <li>产品信息</li>
                                <li>价格</li>
                                <li>数量</li>
                                <li>总价</li>
                            </ul>
                        </div>
                        <ul class="cart-item-list">
                            <li v-for="(item,index) in cartList" :Key="index" v-if="item.checked==1">
                                <div class="cart-tab-1">
                                    <div class="cart-item-pic">
                                        <img :src="'/static/'+item.productImage" :alt="item.productName">
                                    </div>
                                    <div class="cart-item-title">
                                        <div class="item-name">{{item.productName}}</div>

                                    </div>
                                </div>
                                <div class="cart-tab-2">
                                    <div class="item-price">{{item.salePrice | currency('$')}}</div>
                                </div>
                                <div class="cart-tab-3">
                                    <div class="item-quantity">
                                        <div class="select-self">
                                            <div class="select-self-area">
                                                <span class="select-ipt">×{{item.productNum}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-tab-4">
                                    <div class="item-price-total">{{item.salePrice*item.productNum | currency('$')}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Price count -->
                <div class="price-count-wrap">
                    <div class="price-count">
                        <ul>
                            <li>
                                <span>总价:</span>
                                <span>{{subTotal | currency('$')}}</span>
                            </li>
                            <li>
                                <span>优惠券:</span>
                                <span>{{shipping | currency('$')}}</span>
                            </li>
                            <li>
                                <span>优惠:</span>
                                <span>{{discount | currency('$')}}</span>
                            </li>
                            <li>
                                <span>优惠总价:</span>
                                <span>{{tax | currency('$')}}</span>
                            </li>
                            <li class="order-total-price">
                                <span>支付金额:</span>
                                <span>{{orderTotal | currency('$')}}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="order-foot-wrap">
                    <div class="prev-btn-wrap">
                        <router-link class="btn btn--m" to="/address">上一步</router-link>
                    </div>
                    <div class="next-btn-wrap">
                        <button class="btn btn--m btn--red" @click="payMent">下单支付</button>
                    </div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import NavHead from "@/components/navheader.vue";
import NavBread from "@/components/navbread.vue";
import NavFooter from "@/components/navfooter.vue";
import Modal from "@/components/modal.vue";
export default {
  data() {
    return {
      subTotal: 0,
      orderTotal: 0,
      shipping: 100,
      discount: 200,
      tax: 400,
      cartList: []
    };
  },
  components: {
    NavHead,
    NavBread,
    NavFooter,
    Modal
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.Axios.get("/users/cartList").then(response => {
        let res = response.data;
        if (res.status == 0) {
          this.cartList = res.result;
          this.cartList.forEach(item => {
            if (item.checked == 1) {
              this.subTotal += item.salePrice * item.productNum;
            }
            this.orderTotal =
              this.subTotal + this.shipping - this.discount + this.tax;
          });
        }
      });
    },
    payMent() {
      this.Axios.post("/users/payMent", {
        addressId: this.$route.query.addressId,
        orderTotal: this.orderTotal
      }).then(response => {
        let res = response.data;
        if (res.status == 0) {
          this.$router.push({
            path: "/orderSuccess",
            query: { orderId: res.result.orderId }
          });
        }
      });
    }
  }
};
</script>