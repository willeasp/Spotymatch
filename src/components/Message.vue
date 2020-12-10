<template>
  <div>
    <div>
      <p>{{ msg["msg"] }}</p>
      <p>{{ msg["type"] }}</p>
    </div>
  </div>
</template>

<script>
export default {
    props : {
            msg : {
                type: Object
            }
    },
    data() {
        return {
            timeout: null,
        }
    },
    methods:{

    },
    mounted (){
            this.timeout = setTimeout(() => {
                this.$store.dispatch("REMOVE_MSG", this.msg["id"])
            }
            , 2000);
    }
}
</script>

<style>

</style>