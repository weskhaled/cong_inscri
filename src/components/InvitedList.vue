<template>
  <div class="list-invited">
    <a-card title="List des invités" :bodyStyle="{'padding': 0}">
      <span slot="extra">
        <a-button type="primary" icon="user-add" @click="() => addInvited()">Ajouter un invités</a-button>
        <a-button icon="sync" @click="() => fetch()" :loading="loading">Refresh Data</a-button>
      </span>
      <a-row>
        <a-col :span="24">
          <a-table
            :dataSource="data"
            :columns="columns"
            :loading="loading"
            :pagination="pagination"
            :scroll="{ x: 1500 }"
            @change="handleTableChange"
            ref="invitedTable"
          >
            <div
              slot="filterDropdown"
              slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
              style="padding: 8px"
            >
              <a-input
                v-ant-ref="c => searchInput = c"
                :placeholder="`Search ${column.dataIndex}`"
                :value="selectedKeys[0]"
                @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="() => handleSearch(selectedKeys, confirm)"
                style="width: 188px; margin-bottom: 8px; display: block;"
              />
              <a-button
                type="primary"
                @click="() => handleSearch(selectedKeys, confirm)"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
              >Search</a-button>
              <a-button
                @click="() => handleReset(clearFilters)"
                size="small"
                style="width: 90px"
              >Reset</a-button>
            </div>
            <a-icon
              slot="filterIcon"
              slot-scope="filtered"
              type="search"
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
            <template slot="name" slot-scope="text, record">
              <span v-if="searchText">
                <template
                  v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                >
                  <mark
                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                    :key="i"
                    class="highlight"
                  >{{fragment}}</mark>
                  <template v-else>{{fragment}}</template>
                </template>
              </span>
              <template v-else>{{record.firstname}} - {{record.lastname}}</template>
            </template>
            <template slot="customRender" slot-scope="text">
              <span v-if="searchText">
                <template
                  v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                >
                  <mark
                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                    :key="i"
                    class="highlight"
                  >{{fragment}}</mark>
                  <template v-else>{{fragment}}</template>
                </template>
              </span>
              <template v-else>{{text}}</template>
            </template>
            <template slot="tags" slot-scope="workshop">
              <a-tag v-for="tag in workshop" :color="'green'" :key="tag">{{tag}}</a-tag>
            </template>
            <template slot="actions" slot-scope="text, record">
              <a-tooltip placement="topRight" :title="`Imprimer un badge`">
                <a-button
                  style="margin-right: 5px;"
                  type="primary"
                  shape="circle"
                  icon="printer"
                  @click="details(record)"
                ></a-button>
              </a-tooltip>
              <a-tooltip placement="topRight" :title="`Modifier l'invité ${record.firstname}`">
                <a-button type="primary" shape="circle" icon="edit" @click="editInvited(record)"></a-button>
              </a-tooltip>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "InvitedList",
  data() {
    return {
      ref: firebase.collection("inviteds"),
      data: [],
      pagination: {
        defaultPageSize: 15
      },
      loading: false,
      filteredInfo: null,
      sortedInfo: null,
      searchText: ""
    };
  },
  mounted() {
    this.fetch();
  },
  computed: {
    columns() {
      let { sortedInfo, filteredInfo } = this;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [
        {
          title: "Name",
          dataIndex: "firstname",
          key: "firstname",
          fixed: "left",
          width: 200,
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "firstName"
          },
          onFilter: (value, record) =>
            record.firstname
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
          filteredValue: filteredInfo.firstname || [],
          sorter: (a, b) => a.firstname.length - b.firstname.length,
          sortOrder: sortedInfo.columnKey === "firstname" && sortedInfo.order
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
          fixed: "left",
          width: 150,
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.phone
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
          filteredValue: filteredInfo.phone || [],
          sorter: (a, b) => a.phone.length - b.phone.length,
          sortOrder: sortedInfo.columnKey === "phone" && sortedInfo.order
        },
        {
          title: "Etablissement",
          dataIndex: "company"
        },
        {
          title: "Qualité",
          dataIndex: "quality"
        },
        {
          title: "EMail",
          dataIndex: "email",
          key: "email",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.email
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
          filteredValue: filteredInfo.email || [],
          sorter: (a, b) => a.email.length - b.email.length,
          sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order
        },
        {
          title: "Atelier",
          dataIndex: "workshop",
          scopedSlots: { customRender: "tags" },
          width: 320
        },
        {
          title: "Actions",
          dataIndex: "key",
          scopedSlots: { customRender: "actions" },
          fixed: "right",
          width: 120
        }
      ];
      return columns;
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
    },
    clearFilters() {
      this.searchText = "";
      this.filteredInfo = null;
      this.columns.forEach(c => (c.filteredValue = []));
    },
    clearAll() {
      this.searchText = "";
      this.sortedInfo = null;
      this.filteredInfo = null;
      this.columns.forEach(c => (c.filteredValue = []));
    },
    handleSearch(selectedKeys, confirm) {
      confirm();
      this.searchText = selectedKeys[0];
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    fetch() {
      this.clearAll();
      this.data = [];
      this.loading = true;
      this.ref
        .orderBy("firstname")
        .get()
        .then(snap => {
          const pagination = { ...this.pagination };
          snap.docs.forEach(doc => {
            this.data.push({
              key: doc.id,
              firstname: doc.data().firstname,
              lastname: doc.data().lastname,
              email: doc.data().email,
              phone: doc.data().phone,
              company: doc.data().company,
              quality: doc.data().quality,
              workshop: doc.data().workshop
            });
          });
          this.loading = false;
          this.pagination = pagination;
        });
    },
    addInvited() {
      router.push({ name: "AddInvited" });
    },
    editInvited(invited) {
      router.push({ name: "EditInvited", params: { id: invited.key } });
    },
    details(invited) {
      router.push({ name: "ShowInvited", params: { id: invited.key } });
    }
  }
};
</script>
<style scoped>
.list-invited {
  padding: 1rem;
}
.ant-card-extra button + button {
  margin: 0 0.2rem;
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>