<template>
    <div>
        <nav-head></nav-head>
        <nav-bread>
            <span>goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showPriceFilter">Filter by</a>
                </div>
                <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show':filterby}">
                    <dl class="filter-price">
                    <dt>Price:</dt>
                        <dd v-for="(item,index) in priceFilter" :key="index">
                            <a href="javascript:void(0)" :class="{cur:currentIndex==index}" @click="setPriceFilter(index)">
                                <section v-if="index==0">
                                    All
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
                                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                                </div>
                                <div c lass="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.productPrice}}</div>
                                    <div class="btn-area">
                                    <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>    
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import "@/assets/css/base.css";
import "@/assets/css/login.css";
import "@/assets/css/product.css";
import NavHead from "@/components/navheader.vue";
import NavBread from "@/components/navbread.vue";
import NavFooter from "@/components/navfooter.vue";
import axios from "axios";
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
      filterby: false
    };
  },
  components: {
    NavHead,
    NavBread,
    NavFooter
  },
  mounted: function() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      axios.get("/goods").then(result => {
        let res = result.data;
        this.goodsList = res.result.list;
      });
    },
    setPriceFilter(index) {
      this.currentIndex = index;
      this.filterby = false;
    },
    showPriceFilter() {
      this.filterby = true;
    }
  }
};
</script>
