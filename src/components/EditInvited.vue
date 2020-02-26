<template>
  <a-spin :spinning="spinning">
    <div style="padding: .5em;">
      <a-row>
        <a-col :span="8">
          <h1 class="text-center">
            <a-button type="primary" icon="arrow-left" @click="() => goToHome()">Return</a-button>
          </h1>
        </a-col>
        <a-col :span="8">
          <h1 class="text-center">Edit un invité</h1>
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
              <a-form-item :style="{ display: 'inline-block', width: 'calc(20% - 16px)' }">
                <a-select
                  style="width: 100%"
                  v-decorator="[
                'gender',
                {
                  rules: [
                    { required: true, message: 'Please select gender!' }
                  ],
                  initialValue: 'mr'
                }
              ]"
                  placeholder="Gender"
                  @change="handleChange"
                >
                  <a-select-option
                    v-for="item in gender"
                    :key="item.value"
                    :value="item.value"
                  >{{item.text}}</a-select-option>
                </a-select>
              </a-form-item>
              <span :style="{ display: 'inline-block', width: '20px', textAlign: 'center' }">/</span>
              <a-form-item :style="{ display: 'inline-block', width: 'calc(40% - 12px)' }">
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
              <span :style="{ display: 'inline-block', width: '20px', textAlign: 'center' }">/</span>
              <a-form-item :style="{ display: 'inline-block', width: 'calc(40% - 12px)' }">
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
  </a-spin>
</template>
<script>
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
  },
  {
    text:
      "Atelier 4 : Convergence digitale du monde financier et des assurances",
    value: 4
  },
  {
    text:
      "Atelier 5 : La transition numérique : opportunités pour la profession et gestion dématérialisée du cabinet",
    value: 5
  },
  {
    text:
      "Atelier 6 : Stratégie du gouvernement en matière de transition numérique et digitalisation de l’administration publique",
    value: 6
  },
  {
    text: "Atelier 7 : les incubateurs de performances digitales",
    value: 7
  },
  {
    text: "Atelier 8 : Industrie 4.0 : quels enjeux pour la Tunisie",
    value: 8
  },
  {
    text:
      "Atelier 9 (Profession comptable): l’IFAC : activités et apport pour la profession - Le télé-traitement et les prix de transfert",
    value: 9
  },
  {
    text:
      "Atelier 10 (convergence télécom): Apport de Tunisie Télécom en matière de digitalisation: la nouvelle offre de service TT",
    value: 10
  }
];
export default {
  name: "EditInvited",
  data() {
    return {
      invited: {},
      selectedItems: [],
      gender: [
        {
          text: "M.",
          value: "mr"
        },
        {
          text: "Mme",
          value: "mrs"
        },
        {
          text: "Mlle",
          value: "ms"
        }
      ],
      form: this.$form.createForm(this),
      spinning: true
    };
  },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o.value));
    }
  },
  created() {
    this.invited = this.$route.params.id;
    this.spinning = false;
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        return {
          gender: this.$form.createFormField({
            value: this.invited.gender || "mr"
          }),
          firstname: this.$form.createFormField({
            value: this.invited.firstname
          }),
          lastname: this.$form.createFormField({
            value: this.invited.lastname
          }),
          company: this.$form.createFormField({
            value: this.invited.company
          }),
          phone: this.$form.createFormField({
            value: this.invited.phone + ''
          }),
          email: this.$form.createFormField({
            value: this.invited.email
          }),
          quality: this.$form.createFormField({
            value: this.invited.quality
          }),
          workshop: this.$form.createFormField({
            value: this.invited.workshop
          })
        };
      }
    });
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
          this.$message.loading("Action in progress..", 1);
          router.push({
            name: "ShowInvited",
            params: { id: Object.assign({}, values) }
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