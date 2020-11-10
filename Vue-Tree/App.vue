<template>
  <div id="app">
    <VueTree :arr="arr" @ch="change"/>
  </div>
</template>

<script>
import VueTree from './components/VueTree.vue'

export default {
  name: 'App',
  data(){
    return {
       lastId: {},
       state: "",
       obj: {},
       checkArr:["aa_bb003","cc_aa_bb002"],
       arr:[{
           id: "aa001",
           name: "aa001",
           arr: [{
               id: "aa_bb001",
               name: "aa_bb001"
           },{
               id: "aa_bb002",
               name: "aa_bb002"
           },{
               id: "aa_bb003",
               name: "aa_bb003"
           }]
       },{
           id: "bb001",
           name: "bb001",
           arr: [{
               id: "bb_bb001",
               name: "bb_bb001"
           }]
       },{
           id: "cc001",
           name: "cc001",
           arr: [{
               id: "cc_aa001",
               name: "cc_aa001",
               arr: [{
                   id: "cc_aa_aa001",
                   name: "cc_aa_aa001",
                   arr: [{
                       id: "cc_aa_aa_aa001",
                       name: "cc_aa_aa_aa001",
                   },{
                       id: "cc_aa_aa_aa002",
                       name: "cc_aa_aa_aa002",
                   },{
                       id: "cc_aa_aa_aa003",
                       name: "cc_aa_aa_aa003",
                   },{
                       id: "cc_aa_aa_aa004",
                       name: "cc_aa_aa_aa004",
                   }]
               },{
                   id: "cc_aa_bb002",
                   name: "cc_aa_bb002",
               }]
           },{
               id: "cc_bb002",
               name: "cc_bb002"
           }]
       }]
    }
  },
    mounted(){
        this.state = "mounted" // 数据加工
        this.trueXia(this.arr)
        for(var i in this.lastId){
            this.trueShang(i)
        }
        this.state = ""
    },
    methods:{
        change(id){
            var isChecked = this.obj[id].checked

            // 这里可以判断权限，或者可选择的最大人数等等
            var res = !isChecked
            this.$set(this.obj[id],"checked",res)

            if(res){
                //结果是选中
                this.trueXia(this.obj[id].arr,id)
                for(var i in this.lastId){
                    this.trueShang(i)
                }
            }else{
                // 结果是去除选中
                this.falseXia(this.obj[id].arr,id)
                this.falseShang(this.obj[id].shangId)
            }
        },
        falseXia(arr,shangId){
            arr = arr || [];
            var shang = this.obj[shangId] || {}
            arr.map((obj)=>{
                if(shang && !shang.checked){
                    this.$set(obj,"checked",false)
                }
                this.falseXia(obj.arr || [],obj.id)
            })
        },
        falseShang(shangId){
            console.log(shangId,this.obj[shangId])
          if(!shangId){
              return;
          }
          if(this.obj[shangId].checked){
              this.$set(this.obj[shangId],"checked",false)
          }
          this.falseShang(this.obj[shangId].shangId)
        },
        trueXia(arr,shangId){
          arr = arr || [];

          var shang = this.obj[shangId] || {}
            arr.map((obj)=>{
              if(this.state == "mounted"){
                  obj.shangId = shangId;
                  this.$set(this.obj, obj.id ,obj)
              }
              if(shang && shang.checked){
                  this.$set(obj,"checked",true)
              }else{
                  if(this.checkArr.includes(obj.id)){
                      this.$set(obj,"checked",true)
                  }
              }
              if(!obj.arr || obj.arr.length == 0){
                  if(this.state == "mounted"){
                      this.lastId[obj.id] = 1
                  }
              }else{
                  this.trueXia(obj.arr || [],obj.id)
              }

          })
        },
        trueShang(shangId){
            if(!shangId){
                return;
            }
           if(this.obj[shangId].checked){
                this.trueShang(this.obj[shangId].shangId)
           }else{
               var arr = this.obj[shangId].arr || []

                if(arr.length == 0){
                    // 递归
                    this.trueShang(this.obj[shangId].shangId)
                }else{
                    var num = 0;
                    arr.map((obj)=>{
                        if(obj.checked){
                            ++num
                        }
                    })
                    if(num == this.obj[shangId].arr.length){
                        // 说明子元素全选了
                        this.$set(this.obj[shangId],"checked",true)
                        // 递归
                        this.trueShang(this.obj[shangId].shangId)
                    }
                }
           }
        }
    },
  components: {
    VueTree
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
