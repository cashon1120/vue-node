<template>
    <div>
        <nav-head></nav-head>
        <nav-bread>
            <span>商品列表</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                <span class="sortby">排序：</span>
                <a href="javascript:void(0)" class="default" :class="{cur:sortFlag==0}"  @click="sortyByPrice(0)">默认</a>
                <a href="javascript:void(0)" class="price" :class="{cur:sortFlag!=0}" @click="sortyByPrice(1)">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showPriceFilter">价格</a>
                </div>
                <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show':filterby}">
                    <dl class="filter-price">
                    <dt>价格:</dt>
                        <dd v-for="(item,index) in priceFilter" :key="index">
                            <a href="javascript:void(0)" :class="{cur:currentIndex==index}" @click="setPriceFilter(index)">
                                <section v-if="index==0">
                                    全部
                                </section>
                                <section v-else>
                                    {{item.priceStart}} - {{item.priceEnd}}
                                </section>
                            </a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,index) in goodsList" :key="index">
                                <div class="pic">
                                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt="" :key="item.productImage"></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                    <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div v-infinite-scroll="loadMore" class="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                            <span v-if="hasMoreData">加载中，请稍后...</span>
                            <span v-else>没有更多数据啦！</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">
            请先登录！
          </p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
          </div>
        </modal>    
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
          <p slot="message">
           加入成功
          </p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShowCart=false">继续购物</a>
            <router-link class="btn btn--m" to="cartList">查看购物车</router-link>
          </div>
        </modal>   
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import "@/assets/css/base.css";
import "@/assets/css/product.css";
import NavHead from "@/components/navheader.vue";
import NavBread from "@/components/navbread.vue";
import NavFooter from "@/components/navfooter.vue";
import Modal from "@/components/modal.vue";
export default {
  data() {
    return {
      goodsList: [],
      priceFilter: [
        {
          price: "all"
        },
        {
          priceStart: 0,
          priceEnd: 100
        },
        {
          priceStart: 100,
          priceEnd: 500
        },
        {
          priceStart: 500,
          priceEnd: 1000
        },
        {
          priceStart: 1000,
          priceEnd: 2000
        }
      ],
      currentIndex: 0,
      filterby: false,
      sortFlag: 0,
      page: 1,
      pageSize: 8,
      busy: true,
      hasMoreData: true,
      mdShowCart:false,
      mdShow: false
    };
  },
  components: {
    NavHead,
    NavBread,
    NavFooter,
    Modal
  },
  mounted: function() {
    this.getGoodsList();
  },
  methods: {
    //加入购物车
    addCart(productId) {
      this.Axios.post("/goods/addCart", { productId: productId }).then(res => {
        if (res.data.status == "0") {
          this.mdShowCart=true;
        } else {
          this.mdShow = true;
        }
      });
    },
    //获取产品列表
    getGoodsList(flag) {
      this.hasMoreData = true;
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag,
        priceArea: this.currentIndex
      };
      this.Axios.get("/goods/list", { params: param }).then(result => {
        let res = result.data;
        if (res.status == "0") {
          if (flag) {
            this.goodsList = this.goodsList.concat(res.result.list);
            if (res.result.count < 8) {
              this.hasMoreData = false;
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            this.goodsList = res.result.list;
            this.busy = false;
          }
        } else {
          console.log(res.msg);
        }
      });
    },
    //价格筛选
    setPriceFilter(index) {
      if (index == this.currentIndex) ruturn;
      this.currentIndex = index;
      this.page = 1;
      this.filterby = false;
      this.getGoodsList();
    },
    //响应式布局显示价格筛选导航
    showPriceFilter() {
      this.filterby = true;
    },
    //价格排序
    sortyByPrice(type) {
      this.page = 1;
      this.busy = false;
      if (type == 0) {
        this.sortFlag = 0;
      } else {
        if (this.sortFlag == 1) {
          this.sortFlag = -1;
        } else {
          this.sortFlag = 1;
        }
      }
      this.getGoodsList();
    },
    //加载更多
    loadMore() {
      alert;
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
    //关闭模态框
    closeModal() {
      this.mdShow = false;
      this.mdShowCart=false;
    }
  }
};
</script>
