import {
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid   />,
    subItems: [
      {
        key: "dashboard-subpage-1",
        label: "Subpage 11" ,
        path: "/subpage-1",
        icon: <HiOutlineViewGrid  />,
      },
      {
        key: "dashboard-subpage-2",
        label: "Subpage 12",
        path: "/subpage-2",
        icon: <HiOutlineViewGrid  />,
      },
      {
        key: "dashboard-subpage-3",
        label: "Subpage 12",
        path: "/subpage-3",
        icon: <HiOutlineViewGrid  />,
      },
    ],
  },
  {
    key: "customers",
    label: "Customers",
    path: "/customers",
    icon: <HiOutlineUsers  />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/orders",
    icon: <HiOutlineShoppingCart  />,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <HiOutlineDocumentText  />,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/messages",
    icon: <HiOutlineAnnotation  />,
  },
];
