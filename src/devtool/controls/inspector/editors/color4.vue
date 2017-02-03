<style lang="stylus">

</style>
<template>
<div class="color4-editor">
  <Chrome :v-model="color"/>
</div>
</template>

<script>
import {Chrome} from "vue-color";
export default {
  props:["attribute"],
  components:{
    Chrome
  },
  data:function(){
    return {
      color:{}
    }
  }
}
</script>
