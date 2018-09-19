<template>
  <div>
    <nav-head></nav-head>
    <nav-bread>
      <span>我的购物车</span>
    </nav-bread>
    <div class="container">
      <div class="cart">
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>产品信息</li>
                <li>单价</li>
                <li>数量</li>
                <li>总价</li>
                <li>编辑</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(item,index) in cartList" :key="index">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascript:;" class="checkbox-btn item-check-btn" :class="{check:item.checked==1}" @click="editItem('checked',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="'/static/'+item.productImage">
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
                    <div class="select-self-area">
                      <a class="input-sub" @click="editItem('minus',item)">-</a>
                      <span class="select-ipt">{{item.productNum}}</span>
                      <a class="input-add" @click="editItem('add',item)">+</a>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.salePrice*item.productNum | currency('$')}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item.productId)">
                      删除
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascript:;" @click="toggleCheckAll">
                  <span class="checkbox-btn item-check-btn" :class="{check:checkAll}">
                    <svg class="icon icon-ok">
                      <use xlink:href="#icon-ok" />
                    </svg>
                  </span>
                  <span>全选</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                总价:
                <span class="total-price">{{totalPrice | currency('$')}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn--dis':countChecked==0}" @click="nextStep">确认下单</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :mdShow="mdCartShow" v-on:close="closeModal">
      <p slot="message">确定要删除该产品吗？</p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="delCart">确认</a>
        <a class="btn btn--m" href="javascript:;" @click="mdCartShow=false">关闭</a>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import "@/assets/css/checkout.css";
import NavHead from "@/components/navheader.vue";
import NavBread from "@/components/navbread.vue";
import NavFooter from "@/components/navfooter.vue";
import Modal from "@/components/modal.vue";
export default {
  data() {
    return {
      cartList: [],
      mdCartShow: false,
      delProductId: 0
    };
  },
  mounted() {
    this.init();
  },
  components: {
    NavHead,
    NavBread,
    NavFooter,
    Modal
  },
  computed: {
    checkAll() {
      return this.countChecked == this.cartList.length;
    },
    countChecked() {
      let count = 0;
      this.cartList.forEach(item => {
        if (item.checked == 1) {
          count++;
        }
      });
      return count;
    },
    totalPrice() {
      let money = 0;
      this.cartList.forEach(item => {
        if (item.checked == 1) {
          money += parseFloat(item.salePrice) * parseInt(item.productNum);
        }
      });
      return money;
    }
  },
  methods: {
    init() {
      this.Axios.get("/users/cartList").then(response => {
        let res = response.data;
        if (res.status == 0) {
          this.cartList = res.result;
        } else {
        }
      });
    },
    delCartConfirm(id) {
      this.mdCartShow = true;
      this.delProductId = id;
    },
    //删除
    delCart(id) {
      this.Axios.post("/users/cartDel", { productId: this.delProductId }).then(
        response => {
          let res = response.data;
          if (res.status == 0) {
            this.mdCartShow = false;
            this.init();
          }
        }
      );
    },
    //关闭模态框
    closeModal() {
      this.mdCartShow = false;
    },
    //编辑
    editItem(flag, item) {
      if (flag == "add") {
        item.productNum++;
      }
      if (flag == "minus") {
        if (item.productNum > 1) {
          item.productNum--;
        }
      }
      if (flag == "checked") {
        if (item.checked == "1") {
          item.checked = "0";
        } else {
          item.checked = "1";
        }
      }
      this.Axios.post("/users/cartEdit", {
        productId: item.productId,
        productNum: item.productNum,
        checked: item.checked
      }).then(response => {
        let res = response.data;
        if (res.status == 0) {
        }
      });
    },
    //全选
    toggleCheckAll() {
      let checkAll = !this.checkAll;
      this.cartList.forEach((item, index) => {
        item.checked = checkAll ? 1 : 0;
      });
      this.Axios.post("/users/checkAll", { checkAll: checkAll }).then(
        response => {
          let res = response.data;
          if (res.status == 0) {
          }
        }
      );
    },
    //跳转到下一步
    nextStep(){
      if (this.countChecked>0){
        this.$router.push('/address')
      }
    }
  }
};
</script>
