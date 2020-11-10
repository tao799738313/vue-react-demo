<template>
  <div style="text-align: left">
        <div v-for="item in arr" :key="item.id">
          <label>
            <input type="checkbox"  :checked="item.checked" @change="change(item.id)">
            {{item.name}}
          </label>
          <div style="margin-left: 18px">
              <VueTree :arr="item.arr" @ch="change"/>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'VueTree',
  props: {
    arr: Array,
      ch: Function
  },
  data(){
      return{

      }
  },
  mounted(){
     // console.log(this.arr)
     // console.log(this.checkArr)
  },
  methods: {
      change(id){
          this.$emit("ch",id)
      }
  },
  watch:{
      checkArr(){
         console.log(this.checkArr)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
