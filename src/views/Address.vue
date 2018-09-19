<template>
    <div>
        <nav-head></nav-head>
        <nav-bread>
            <span>地址选择</span>
        </nav-bread>
        <div class="container">
            <div class="checkout-addr">
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
                        <li>
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

                <!-- address list -->
                <div class="page-title-normal checkout-title">
                    <h2>
                        <span>收货地址</span>
                    </h2>
                </div>
                <div class="addr-list-wrap">
                    <div class="addr-list">
                        <ul>
                            <li v-for="(item,index) in showAddress" :key="index" :class="{check:index==checkedIndex}" @click="checkedIndex=index;selectedAddressId=item.addressId">
                                <dl>
                                    <dt>{{item.userName}}</dt>
                                    <dd class="address">{{item.streetName}}</dd>
                                    <dd class="tel">{{item.postCode}}</dd>
                                </dl>
                                <div class="addr-opration addr-del">
                                    <a href="javascript:;" class="addr-del-btn" @click.stop="delAddressConfirm(item.addressId)">
                                        删除
                                    </a>
                                </div>
                                <div class="addr-opration addr-set-default" v-if="!item.isDefault" @click="setDefault(item.addressId)">
                                    <a href="javascript:;" class="addr-set-default-btn">
                                        <i>设为默认</i>
                                    </a>
                                </div>
                                <div class="addr-opration addr-default" v-else>默认地址</div>
                            </li>
                            <li class="addr-new">
                                <div class="add-new-inner">
                                    <p>添加新地址</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="shipping-addr-more">
                        <a class="addr-more-btn up-down-btn" href="javascript:;" @click="setLimit" :class="{open:limit>3}">
                            more
                            <i class="i-up-down">
                                <i class="i-up-down-l"></i>
                                <i class="i-up-down-r"></i>
                            </i>
                        </a>
                    </div>
                </div>

                <!-- shipping method-->
                <div class="page-title-normal checkout-title">
                    <h2>
                        <span>配送方式</span>
                    </h2>
                </div>
                <div class="lemall-msg-info hidden">
                    <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
                </div>
                <div class="shipping-method-wrap">
                    <div class="shipping-method">
                        <ul>
                            <li class="check">
                                <div class="name">配送方式</div>
                                <div class="price">免配送费</div>
                                <div class="shipping-tips">
                                    <p>顺丰物流</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="next-btn-wrap">
                    <router-link  class="btn btn--m btn--red" style="width:20%;" :to="{path:'/orderConfirm',query:{addressId:selectedAddressId}}">下一步</router-link>
                </div>
            </div>
        </div>
        <modal :mdShow="mdShow" v-on:close="closeModal">
            <p slot="message">
                确定要删除该地址吗？
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="delAddressFn">确认</a>
                <a class="btn btn--m" href="javascript:;" @click="mdShow=false">取消</a>
            </div>
        </modal>
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
      addressList: [],
      limit: 3,
      checkedIndex: 0,
      mdShow: false,
      selectedAddressId:0,
      delAddressId: 0
    };
  },
  components: {
    NavHead,
    NavBread,
    NavFooter,
    Modal
  },
  computed: {
    showAddress() {
      return this.addressList.slice(0, this.limit);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.Axios.get("/users/address").then(response => {
        let res = response.data;
        if (res.status == 0) {
          this.addressList = res.result;
          this.selectedAddressId=this.addressList[0].addressId
        }
      });
    },
    setLimit() {
      if (this.limit == 3) {
        this.limit = this.addressList.length;
      } else {
        this.limit = 3;
      }
    },
    setDefault(addId) {
      this.Axios.post("/users/setDefault", { addressId: addId }).then(
        response => {
          if (response.data.status == 0) {
            this.addressList.forEach(item => {
              if (item.addressId == addId) {
                item.isDefault = true;
              } else {
                item.isDefault = false;
              }
            });
          }
        }
      );
    },
    closeModal() {
      this.mdShow = false;
    },
    delAddressConfirm(id) {
      this.mdShow = true;
      this.delAddressId = id;
    },
    delAddressFn() {
      this.Axios.post("/users/delAddress", {
        addressId: this.delAddressId
      }).then(response => {
        this.mdShow = false;
        this.addressList.forEach((item, index) => {
          if (item.addressId == this.delAddressId) {
            this.addressList.splice(index, 1);
          }
        });
      });
    }
  }
};
</script>