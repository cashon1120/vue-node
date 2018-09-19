<template>
    <div>
        <nav-head></nav-head>
        <nav-bread>
            <span>下单成功</span>
        </nav-bread>
        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2">
                    <span>check out</span>
                </h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
                <ul>
                    <li class="cur">
                        <span>选择地址</span>
                    </li>
                    <li class="cur">
                        <span>订单确认</span>
                    </li>
                    <li class="cur">
                        <span>支付</span>
                    </li>
                    <li class="cur">
                        <span>订单信息</span>
                    </li>
                </ul>
            </div>

            <div class="order-create">
                <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
                <div class="order-create-main">
                    <h3>恭喜! <br>您的订单已成功提交!</h3>
                    <p>
                        <span>订单ID：{{orderId}}</span>
                        <span>订单金额：{{orderTotal | currency('$')}}</span>
                    </p>
                    <div class="order-create-btn-wrap">
                        <div class="btn-l-wrap">
                            <router-link to="cartList" class="btn btn--m">我的购物车</router-link>
                        </div>
                        <div class="btn-r-wrap">
                            <router-link to="/" class="btn btn--m">商品首页</router-link>
                        </div>
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
      orderId: "",
      orderTotal: ""
    };
  },
  components: {
    NavHead,
    NavBread,
    NavFooter,
    Modal
  },
  mounted() {
    this.Axios.get("/users/orderDetail", {
      params: {
        orderId: this.$route.query.orderId
      }
    }).then(response => {
      let res = response.data;
      if (res.status == 0) {
        this.orderId = res.result.orderId;
        this.orderTotal = res.result.orderTotal;
      }
    });
  }
};
</script>