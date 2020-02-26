<template>
  <div>
    <a-row class="header p1">
      <a-col :span="8">
        <div class="text-center">
          <a-button type="primary" icon="arrow-left" @click="() => goToHome()">Return</a-button>
        </div>
      </a-col>
      <a-col :span="8">
        <h1 class="text-center">Badge de l'invité</h1>
      </a-col>
      <a-col :span="8">
        <div class="text-center">
          <a-button type="primary" icon="printer" @click="() => print()">Print</a-button>
        </div>
      </a-col>
    </a-row>
    <a-row class="badge">
      <a-col :span="24">
        <div class="card--wrp">
          <a-card hoverable>
            <img alt="example" src="../assets/badge.jpg" slot="cover" />
            <h1 class="text-capitalize" v-html="`${invited.firstname} ${invited.lastname}`"></h1>
            <h2 v-html="`${invited.company}`"></h2>
            <div class="card--qr-code">
              <QRCode :value="invited" />
            </div>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import QRCode from "./QRCode";
import router from "../router";

export default {
  name: "ShowInvited",
  components: {
    QRCode: QRCode
  },
  data() {
    return {
      key: "",
      invited: {}
    };
  },
  computed: {
    gender() {
      if (this.invited?.gender === "mrs") return "Mme";
      if (this.invited?.gender === "ms") return "Mlle";
      return "M.";
    }
  },
  created() {
    this.invited = this.$route.params.id;
  },
  methods: {
    goToHome() {
      router.push({ name: "InvitedList" });
    },
    print() {
      window.print();
    }
  }
};
</script>

<style>
.card--wrp {
  display: flex;
  align-items: center;
  height: 100vh;
}
.card--wrp .ant-card {
  width: 400px;
  margin: auto;
  height: 570px;
  position: relative;
}
.card--qr-code {
  display: inline-block;
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 120px;
}

.card--wrp .ant-card-cover img {
  height: 100%;
}
.card--wrp .ant-card-body h1 {
  font-size: 1.7rem;
  color: black;
}
.card--wrp .ant-card-body h2 {
  color: rgb(58, 58, 58);
  text-transform: capitalize;
  font-size: 1.3rem;
  margin-right: 100px;
}
.text-capitalize {
  text-transform: capitalize;
}
@media print {
  .header {
    display: none;
  }
}
</style>
