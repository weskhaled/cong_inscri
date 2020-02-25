<template>
  <img :src="qrCode" width="100%" height="100%">
</template>

<script>
import * as QRious from 'qrious';

export default {
  name: 'QRCode',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      QRCodeValue: '',
    }
  },
  computed: {
    // a computed getter
    qrCode: function () {
      return new QRious({
        value: JSON.stringify(this.value),
        size: 200}).toDataURL();
    }
  },
  methods: {
  },
  created() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
