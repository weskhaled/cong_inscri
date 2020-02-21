import VueRouter from "vue-router";

import AddInvited from "@/components/AddInvited";
import InvitedList from "@/components/InvitedList";
import ShowInvited from "@/components/ShowInvited";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "InvitedList",
      component: InvitedList
    },
    {
      path: "/add-invited",
      name: "AddInvited",
      component: AddInvited
    },
    {
      path: "/show-invited/:id",
      name: "ShowInvited",
      component: ShowInvited
    }
  ]
});
