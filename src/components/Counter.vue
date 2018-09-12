<template>
    <div>
        <button @click="add">+</button>
        <button @click="reduce">-</button>
        <p><span>{{number}}</span></p>
    </div>
</template>
<script>
    export default {
        props:["number"],
        data(){
            return {

            }
        },
        methods:{
            add(){
                this.$emit("add")
            },
            reduce(){
                this.$emit("reduce")
            }
        }
    }
</script>
