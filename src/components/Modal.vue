<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">系统提示</div>
              <button class="md-close" @click="colseModal">关闭</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                  <slot name="message"></slot>
              </div>
              <div class="login-wrap">
                  <slot name="btnGroup"></slot>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="colseModal"></div>
    </div>
</template>
<script>
    export default {
        props:['mdShow'],
        data(){
            return {

            }
        },
        methods:{
            colseModal(){
                this.$emit('close');
            }
        }
    }
</script>
