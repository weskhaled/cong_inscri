import VueRouter from "vue-router";

import AddInvited from "@/components/AddInvited";
import EditInvited from "@/components/EditInvited";
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
      path: "/edit-invited/:id",
      name: "EditInvited",
      component: EditInvited
    },
    {
      path: "/show-invited/:id",
      name: "ShowInvited",
      component: ShowInvited
    }
  ]
});
