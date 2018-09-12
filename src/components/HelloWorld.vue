<template>
  <div class="hello">
    <Counter v-bind:number="number" v-on:add="add" v-on:reduce="reduce"></Counter>
  </div>
</template>

<script>
import Counter from "./Counter.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      number: 10
    };
  },
  methods: {
    add() {
      this.number++;
    },
    reduce() {
      this.number--;
    }
  },
  components: {
    Counter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
