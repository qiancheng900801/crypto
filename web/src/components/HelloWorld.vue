<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import crypto from "crypto";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    jiemi() {
      this.$axios.get("jieshou").then(res => {
        console.log(res.data);
        let secret = "yqc";
        let decipher = crypto.createDecipher("aes192", secret);
        let dec = decipher.update(res.data, "hex", "utf8"); //编码方式从hex转为utf-8;
        dec += decipher.final("utf8"); //编码方式从utf-8;
        console.log(dec);
      });
    },
    add(){
      this.$axios.get('add').then(res=>{
        console.log(res)
      })
    }
  },
  created() {
    this.jiemi();
    // this.add();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

