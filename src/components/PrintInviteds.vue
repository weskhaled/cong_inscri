<template>
  <div>
    <a-row class="header p1">
      <a-col :span="8">
        <div class="text-center">
          <a-button type="primary" icon="arrow-left" @click="() => goToHome()">Return</a-button>
        </div>
      </a-col>
      <a-col :span="8">
        <h1 class="text-center">Badges de l'invitées</h1>
      </a-col>
      <a-col :span="8">
        <div class="text-center">
          <input id="upload" type="file" v-on:change="beforeUpload($event)" />
          <a-button type="primary" icon="printer" @click="() => print()">Print</a-button>
        </div>
      </a-col>
    </a-row>
    <a-spin :spinning="loading">
      <div class="page" size="A4">
        <a-row v-for="(i, key) in rowCount" :key="key" class="page-content">
          <a-col :span="12" v-for="invited in itemCountInRow(i)" :key="invited.key">
            <div class="print-card--wrp">
              <a-card hoverable>
                <img alt="example" src="../assets/badge.jpg" slot="cover" />
                <h1 class="text-capitalize">{{invited.firstname}} {{invited.lastname}}</h1>
                <h2 v-html="`${invited.company}`"></h2>
                <div class="card--qr-code">
                  <QRCode :value="invited" />
                </div>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>
<script>
import router from "../router";
import XLSX from "xlsx";

import QRCode from "./QRCode";

export default {
  name: "PrintInviteds",
  components: {
    QRCode: QRCode
  },
  data() {
    return {
      data: [],
      loading: true
    };
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.data.length / 4);
    }
  },
  mounted() {
    this.fetch();
    // this.data.push(
    //   {
    //     key: "qqqqq",
    //     firstname: "qqqqq",
    //     lastname: "qqqqq",
    //     email: "qqqqq@eee.com",
    //     phone: "15475544",
    //     company: "qqqqq",
    //     gender: "ms",
    //     quality: "qqqqq",
    //     workshop: [1, 2]
    //   },
    //   {
    //     key: "wwww",
    //     firstname: "wwww",
    //     lastname: "wwww",
    //     email: "wwww@eee.com",
    //     phone: "15475544",
    //     company: "wwww",
    //     gender: "mrs",
    //     quality: "wwww",
    //     workshop: [1, 2]
    //   },
    //   {
    //     key: "eeeee",
    //     firstname: "eeeee",
    //     lastname: "eeeee",
    //     email: "eeeee@eee.com",
    //     phone: "15475544",
    //     company: "eeeee",
    //     gender: "mrs",
    //     quality: "eeeee",
    //     workshop: [1, 3]
    //   },
    //   {
    //     key: "tttt",
    //     firstname: "rrrr",
    //     lastname: "rrrr",
    //     email: "rrrr@eee.com",
    //     phone: "15475544",
    //     company: "rrrr",
    //     quality: "rrrr",
    //     gender: "mrs",
    //     workshop: [1, 2, 3]
    //   },
    //   {
    //     key: "yyyy",
    //     firstname: "rrrr",
    //     lastname: "rrrr",
    //     email: "rrrr@eee.com",
    //     phone: "15475544",
    //     company: "rrrr",
    //     quality: "rrrr",
    //     gender: "mrs",
    //     workshop: [1, 2, 3]
    //   },
    //   {
    //     key: "uuuu",
    //     firstname: "uuu",
    //     lastname: "uuu",
    //     email: "rrrr@eee.com",
    //     phone: "15475544",
    //     company: "rrrr",
    //     quality: "rrrr",
    //     gender: "mrs",
    //     workshop: [1, 2, 3]
    //   },
    //   {
    //     key: "iiiii",
    //     firstname: "iiii",
    //     lastname: "rrrr",
    //     email: "rrrr@eee.com",
    //     phone: "15475544",
    //     company: "rrrr",
    //     quality: "rrrr",
    //     gender: "mrs",
    //     workshop: [1, 2, 3]
    //   },
    //   {
    //     key: "aaaa",
    //     firstname: "sssss",
    //     lastname: "ssss",
    //     email: "rrrr@eee.com",
    //     phone: "15475544",
    //     company: "rrrr",
    //     quality: "rrrr",
    //     gender: "mrs",
    //     workshop: [1, 2, 3]
    //   },
    //   {
    //     key: "ddddd",
    //     firstname: "dddd",
    //     lastname: "ddddd",
    //     email: "rrrr@eee.com",
    //     phone: "15475544",
    //     company: "rrrr",
    //     quality: "rrrr",
    //     gender: "mrs",
    //     workshop: [1, 2, 3]
    //   }
    // );
    // this.loading = false;
  },
  filters: {
    gender: function(value) {
      if (!value) return "M.";
      if (value === "mrs") return "Mme";
      if (value === "ms") return "Mlle";
    }
  },
  methods: {
    fetch() {
      this.data = [];
      this.loading = true;
      if (JSON.parse(localStorage.getItem("data"))) {
        this.data = JSON.parse(localStorage.getItem("data"));
        this.loading = false;
      }
    },
    beforeUpload(event) {
      console.log(event);
      let file = event.target.files[0];
      let reader = new FileReader();
      let self = this;
      reader.onload = function(event) {
        let data = event.target.result;
        let workbook = XLSX.read(data, {
          type: "binary"
        });

        // Here is your object
        let XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets["Feuil1"]
        );
        XL_row_object.shift();
        XL_row_object.filter(inv => inv.__EMPTY_5).map((ele, i) => {
          self.data.push({
            key: i,
            firstname: ele.__EMPTY_1,
            lastname: ele.__EMPTY_2,
            email: ele.__EMPTY_6,
            phone: ele.__EMPTY_5,
            company: ele.__EMPTY_3,
            quality: ele.__EMPTY_4,
            workshop: ele.__EMPTY_7
              ? ele.__EMPTY_7
                  .replace(/\s\s+/g, " ")
                  .split("Atelier")
                  .filter(Number)
                  .map(Number)
              : []
          });
        });
        localStorage.setItem("data", JSON.stringify(self.data));
        self.loading = false;
      };

      reader.onerror = function(ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);

      return false;
    },
    editInvited(invited) {
      router.push({ name: "EditInvited", params: { id: invited.key } });
    },
    details(invited) {
      router.push({ name: "ShowInvited", params: { id: invited.key } });
    },
    goToHome() {
      router.push({ name: "InvitedList" });
    },
    print() {
      window.print();
    },
    itemCountInRow: function(index) {
      return this.data.slice((index - 1) * 4, index * 4);
    }
  }
};
</script>
<style scoped>
body {
  background: rgb(204, 204, 204);
}
.page {
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
}
.page[size="A4"] {
  width: 21cm;
  height: 29.7cm;
}
.page[size="A4"][layout="landscape"] {
  width: 29.7cm;
  height: 21cm;
}
.page[size="A3"] {
  width: 29.7cm;
  height: 42cm;
}
.page[size="A3"][layout="landscape"] {
  width: 42cm;
  height: 29.7cm;
}
.page[size="A5"] {
  width: 14.8cm;
  height: 21cm;
}
.page[size="A5"][layout="landscape"] {
  width: 21cm;
  height: 14.8cm;
}
.print-card--wrp {
  display: flex;
  align-items: center;
  padding: 0.1rem;
}
.print-card--wrp .ant-card {
  width: 400px;
  margin: auto;
  height: 570px;
  position: relative;
}
.print-card--wrp .ant-card-body h2 {
  color: rgb(58, 58, 58);
  text-transform: capitalize;
  font-size: 1rem;
  margin-right: 95px;
}
.card--qr-code {
  display: inline-block;
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 120px;
}
@media print {
  .page {
    margin: 0;
    box-shadow: 0;
  }
  .page-content {
    page-break-after: always;
  }
  .header {
    display: none;
  }
}
</style>