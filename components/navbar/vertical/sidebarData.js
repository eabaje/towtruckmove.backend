const menuItemsPublic = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Renew your Subscription",
    path: `/user-subscription/${user.UserId}`,
    icon: "first fas fa-users",
  },
];

const menuItemsAudit = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Activation",
    path: `/user-subscription/${user.UserId}`,
    icon: "first fas fa-users",
  },
];

const menuItemsDriver = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Find Shipments",
    path: `/shipment/?companyId=${user.CompanyId}`,
    icon: "first fas fa-car",
  },

  {
    title: "Driver Management",
    icon: "first fas fa-users",
    submenu: [
      {
        title: "Update Driver Profile",
        path: `/driver/driver-action/?driverId=${user.UserId}`,
      },
      {
        title: " View Assigned Vehicle To Driver",
        path: `/vehicle/?userid=${user.UserId}`,
      },
    ],
  },
  {
    title: "Trip History",
    path: `/trip/?userId=${user.UserId}`,
    icon: "first fas fa-road",
  },
];

const menuItemsShipper = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Ship Vehicles",
    icon: "first fas fa-car",
    submenu: [
      {
        title: "Post a Vehicle/Shipment",
        path: `/shipment/shipment-action`,
      },
      {
        title: "My Shipment(s)",
        path: `/shipment/?userId=${user.UserId}`,
      },

      {
        title: "Archived Shipment(s)",
        path: `/shipment/archive-shipment/?userId=${user.UserId}`,
      },
    ],
  },
  {
    title: "Connect with Carriers",
    path: `/company/?companyType=carrier`,
    icon: "first fas fa-users",
  },
];

const menuItemsCarrier = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "List all Shipments",
    path: `/shipment/?companyId=${user.CompanyId}`,
    icon: "first fas fa-car",
  },

  {
    title: "Carrier",
    icon: "first fas fa-truck",
    submenu: [
      {
        title: "List carrier Info",
        path: `/carrier/?companyId=${user.CompanyId}`,
      },
      {
        title: "Create carrier Info",
        path: `/carrier/carrier-action`,
      },

      {
        title: "Vehicle List",
        path: `/vehicle/?companyId=${user.CompanyId}`,
      },
    ],
  },

  {
    title: "Driver Management",
    icon: "first fas fa-users",
    submenu: [
      {
        title: "List Drivers",
        path: `/driver/?companyId=${user.CompanyId}`,
      },
      {
        title: "Create Driver Profile",
        path: `/driver/driver-action`,
      },
    ],
  },
  {
    title: "Trip History",
    path: `/trip/?companyId=${user.CompanyId}`,
    icon: "first fas fa-road",
  },
];

const menuItemsAdmin = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Ship Vehicles",
    icon: "first fas fa-car",
    submenu: [
      {
        title: "List all Assigned Shipment",
        path: `/shipment/?role=admin`,
      },
      {
        title: "List all sent/delivered Shipment",
        path: `/shipment/?role=admin`,
      },
    ],
  },
  {
    title: "Carrier",
    icon: "first fas fa-truck",
    submenu: [
      {
        title: "List carrier Info",
        path: `/carrier/`,
      },
      {
        title: "View Drivers",
        path: ` /driver/`,
      },

      {
        title: "View Requests",
        path: `/shipment/shipment-interest-list`,
      },

      {
        title: "View All Company record(s)",
        path: `/company/`,
      },
    ],
  },
  {
    title: "Trip History",
    path: "/trip/",
    icon: "first fas fa-road",
  },
  {
    title: "Manage Subscription ",
    icon: "first fas fa-gift",
    submenu: [
      {
        title: "List All Subscription Types",
        path: `/subscription/`,
      },
      {
        title: "Create Subscription",
        path: `/subscription/subscription-action`,
      },
    ],
  },
  {
    title: "Settings ",
    icon: "first fas fa-cog",
    submenu: [
      {
        title: "View list user",
        path: `/user/`,
      },
      {
        title: "View Payment Transaction",
        path: `/payment/`,
      },
    ],
  },
];

export {
  menuItemsPublic,
  menuItemsAudit,
  menuItemsDriver,
  menuItemsCarrier,
  menuItemsAdmin,
  menuItemsShipper,
};
