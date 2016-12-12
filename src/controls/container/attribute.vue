<style lang="stylus">
span.attribute-key-name
  color:#8BBDD2
</style>
<template>
<span v-if="hasValue">
<span class="attribute-key-name">{{keyName}}</span>
<span>=</span>
<span>"</span>
<span>{{value}}</span>
<span>"</span>
</span>
</template>

<script>
export default {
    name: "Attribute",
    props: ["keyName", "value"],
    data: function() {
        return {}
    },
    computed: {
        hasValue: function() {
            return this.value !== "";
        }
    }
}
</script>
