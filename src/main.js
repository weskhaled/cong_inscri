import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Row, Col, Card, Table, Tabs, Button, Form, Input, Icon, Select, Tag, Tooltip, message, Spin } from 'ant-design-vue';

Vue.component(Table.name, Table)
Vue.component(Table.Column.name, Table.Column)
Vue.component(Table.ColumnGroup.name, Table.ColumnGroup)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Card.name, Card)
Vue.component(Card.Meta.name, Card.Meta)
Vue.component(Card.Grid.name, Card.Grid)
Vue.component(Tabs.name, Tabs)
Vue.component(Tabs.TabPane.name, Tabs.TabPane)
Vue.component(Tabs.TabContent.name, Tabs.TabContent)
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Input.name, Input)
Vue.component(Icon.name, Icon)
Vue.component(Input.Search.name, Input.Search)
Vue.component(Tag.name, Tag)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Tag.CheckableTag.name, Tag.CheckableTag)
Vue.component(Spin.name, Spin)
Vue.prototype.$message = message

Vue.config.productionTip = false
Vue.use(VueRouter)
// Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
