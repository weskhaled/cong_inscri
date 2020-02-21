<template>
  <div style="padding: .5em;">
    <a-row>
      <a-col :span="8">
        <h1 class="text-center">
          <a-button type="primary" icon="arrow-left" @click="() => goToHome()">Return</a-button>
        </h1>
      </a-col>
      <a-col :span="8">
        <h1 class="text-center">Ajouter un invités</h1>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
    <a-row>
      <a-col :span="18" :offset="4">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item
            label="Nom / Prénom"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            style="margin-bottom:0;"
            required
          >
            <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
              <a-input
                style="width: 100%"
                v-decorator="[
                'firstname',
                {
                  rules: [
                    { required: true, message: 'Please input your first Name!' }
                  ]
                }
              ]"
              />
            </a-form-item>
            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">/</span>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
              <a-input
                style="width: 100%"
                v-decorator="[
                'lastname',
                {
                  rules: [
                    { required: true, message: 'Please input your last Name!' }
                  ]
                }
              ]"
              />
            </a-form-item>
          </a-form-item>
          <a-form-item label="Etablissement" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
                'company',
                {
                  rules: [
                    { required: true, message: 'Please input your Company!' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="Qualité" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
                'quality',
                {
                  rules: [
                    { required: true, message: 'Please input your Quality!' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="Téléphone" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
                'phone',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Phone Number!'
                    },
                    {
                      min: 8,
                      message: 'Please input your valid Phone Number!'
                    },
                    {
                      validator: validatePhoneNumber,
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="Adresse mail" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="Atelier" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select
              v-decorator="[
                'workshop',
                {
                  rules: [
                    { required: true, message: 'Please select your Workshop!' }
                  ]
                }
              ]"
              mode="multiple"
              placeholder="Select a Workshop"
              @change="handleChange"
            >
              <a-select-option
                v-for="item in filteredOptions"
                :key="item.value"
                :value="item.value"
              >{{item.text}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">Reset</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import firebase from "../Firebase";
import router from "../router";

const OPTIONS = [
  {
    text:
      "Atelier 1 : Fin Tech et Reg Tech un impératif stratégique pour le secteur financier : Quelles Opportunités ?",
    value: 1
  },
  {
    text:
      "Atelier 2: Transformation de la fonction finance et nouvelles technologies, focus sur la RPA et l’automatisation intelligente",
    value: 2
  },
  {
    text:
      "Atelier 3: SMART CITY comme levier de développement de nouveaux services performants",
    value: 3
  }
];
export default {
  name: "AddInvited",
  data() {
    return {
      ref: firebase.collection("inviteds"),
      selectedItems: [],
      form: this.$form.createForm(this),
      loading: false
    };
  },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o.value));
    }
  },
  methods: {
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          this.$message.loading("Action in progress..", 0);
          this.ref
            .where("phone", "==", values.phone)
            .get()
            .then(snapshot => {
              if (snapshot.empty) {
                this.ref
                  .add(values)
                  .then(() => {
                    this.$message.destroy();
                    this.$message.success("Ajouter un invités avec succès", 2);
                    this.loading = false;
                    this.goToHome();
                  })
                  .catch(error => {
                    this.$message.error(`Error adding document: ${error}`, 2);
                    this.loading = false;
                  });
                return;
              }

              snapshot.forEach(doc => {
                this.$message.destroy();
                this.$message.success(
                  `${doc.data().firstname}, déjà inscrit`,
                  3
                );
              });
            })
            .catch(err => {
              this.$message.error(`Error checking documents: ${err}`, 2);
            });
        }
      });
    },
    validatePhoneNumber(rule, value, callback) {
      if (value && isNaN(value)) {
        callback("Please input a valid Phone Number! ");
      }
      callback();
    },
    handleReset() {
      this.form.resetFields();
      this.selectedItems = [];
    },
    goToHome() {
      router.push({ name: "InvitedList" });
    }
  }
};
</script>
<style>
.text-center {
  text-align: center;
}
</style>