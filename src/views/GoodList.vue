<template>
    <div>这是商品列表页面
        <router-link to="/goods/title">标题</router-link>
        <router-link to="/goods/image">图片</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>
