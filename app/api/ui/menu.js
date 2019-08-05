module.exports = [
  {
    key: "commoninfra",
    name: "Commons",
    icon: "ios-paper-outline",
    child: [
      {
        key: "Accounts",
        name: "Accounts",
        link: "/app/user-accounts"
      },
      {
        key: "Logging",
        name: "Logging",
        link: "/app/logs"
      }
    ]
  },
  {
    key: "Hotel Property",
    name: "Hotel Property",
    icon: "ios-podium-outline",
    child: [
      {
        key: "Hotel Management",
        name: "Hotel Management",
        title: true
      },
      {
        key: "Hotel Management",
        name: "Hotel Management",
        link: "/app/hotels"
      },
      {
        key: "Room Management",
        name: "Room Management",
        title: true
      },
      {
        key: "Room Management",
        name: "Room Management",
        link: "/app/hotel-rooms"
      },
      {
        key: "Room Type Management",
        name: "Room Type Management",
        link: "/app/hotel-room-types"
      },
      {
        key: "Facility Management",
        name: "Facility Management",
        title: true
      },
      {
        key: "Facility Management",
        name: "Facility Management",
        link: "/app/hotel-facilities"
      }
      // {
      //   key: 'Hotel Testing',
      //   name: 'Hotel Testing',
      //   link: '/app/hotel-test'
      // }
    ]
  },
  {
    key: "Human Resource",
    name: "HRM",
    icon: "ios-people-outline",
    child: [
      {
        key: "Staff Management",
        name: "Staff Management",
        link: "/app/staff"
      },
      {
        key: "Staff Profile",
        name: "Staff Profile",
        link: "/app/individualStaff/"
      },
      //{
      //key: "Training Management",
      //name: "Training Management",
      //link: "/app/trainings"
      //},
      //{
      //key: "Leave Management",
      //name: "Leave Management",
      //link: "/app/leave"
      //},
      {
        key: "Individual Leave",
        name: "Individual Leave",
        link: "/app/Userleave/"
      },
      {
        key: "Leave Approval",
        name: "Leave Approval",
        link: "/app/LeaveApproval/"
      },
      {
        key: "Work Management",
        name: "Work Management",
        link: "/app/work-roster"
      }
    ]
  },
  {
    key: "Sales",
    name: "Sales",
    icon: "logo-usd",
    child: [
      {
        key: "Sales Activity",
        name: "Sales Activity",
        title: true
      },
      {
        key: "Call Reports",
        name: "Call Reports",
        link: "/app/call-reports"
      },
      {
        key: "Call Guidelines",
        name: "Call Guidelines",
        link: "/app/call-guidelines"
      },
      {
        key: "Hotel Price Rates",
        name: "Hotel Price Rates",
        title: true
      },
      {
        key: "Room Price Rates",
        name: "Room Price Rates",
        link: "/app/superior-room"
      },
      {
        key: "Facility Price Rates",
        name: "Facility Price Rates",
        link: "/app/meeting-room"
      },

      {
        key: "Convention Bookings",
        name: "Convention Bookings",
        title: true
      },
      {
        key: "Convention Availability",
        name: "Convention Availability",
        link: "/app/meeting-availability"
      },
      {
        key: "Reserve Facility",
        name: "Reserve Facility",
        link: "/app/reserve-facility"
      },
      {
        key: "Marketing",
        name: "Marketing",
        title: true
      },
      {
        key: "Sales Package",
        name: "Sales Package",
        link: "/app/sales-package"
      },
      {
        key: "Reporting",
        name: "Reporting",
        title: true
      },
      {
        key: "Sales Performance",
        name: "Sales Performance",
        link: "/app/sales-performance"
      }
    ]
  },
  {
    key: "Front Desk",
    name: "Front Desk",
    icon: "ios-call-outline",
    child: [
      {
        key: "Room Allocation Management",
        name: "View Room Allocation",
        link: "/app/room-allocation"
      },
      {
        key: "Check In",
        name: "Check In",
        link: "/app/check-in"
      },

      {
        key: "Check Out",
        name: "Check Out",
        link: "/app/check-out"
      },

      {
        key: "Room Number",
        name: "Edit Room Allocations",
        link: "/app/edit-room"
      },

      {
        key: "Room Stat",
        name: "View Room Status",
        link: "/app/view-room-status"
      },
      {
        key: "Payment Management",
        name: "Payment Management",
        title: true
      },
      {
        key: "Payment (Sales)",
        name: "Payment (Sales)",
        link: "/app/view-invoice"
      },
      {
        key: "Payment (Room Service)",
        name: "Payment (Room Service)",
        link: "/app/view-room-orders"
      },
      {
        key: "Loyalty Program",
        name: "Loyalty Program",
        title: true
      },
      {
        key: "Loyalty Program Management",
        name: "Loyalty Program",
        link: "/app/loyalty-program"
      }
    ]
  },
  {
    key: "Housekeeping",
    name: "Housekeeping",
    icon: "ios-basket",
    child: [
      {
        key: "Forecasting/Scheduling",
        name: "Forecasting/Scheduling",
        title: true
      },
      {
        key: "Forecast",
        name: "Forecast",
        link: "/app/forecast"
      },
      {
        key: "Schedule",
        name: "Schedule",
        link: "/app/schedule"
      },
      {
        key: "Est. Cleaning Time",
        name: "Est. Cleaning Time",
        link: "/app/estimated-cleaning-time"
      },
      {
        key: "Housekeeping Tracking",
        name: "Housekeeping Tracking",
        title: true
      },
      {
        key: "Housekeepers Status",
        name: "Housekeepers Status",
        link: "/app/status-screen"
      },
      {
        key: "Rooms Status",
        name: "Rooms Status",
        link: "/app/room-status-screen"
      },
      {
        key: "Personnel Activity",
        name: "Personnel Activity",
        title: true
      },
      {
        key: "Personnel Dashboard",
        name: "Dashboard",
        link: "/app/personnel-dashboard"
      },
      {
        key: "Activity List",
        name: "Activity List",
        link: "/app/activity-list"
      },
      {
        key: "Guest Request",
        name: "Guest Request",
        title: true
      },
      {
        key: "All Requests",
        name: "All Requests",
        link: "/app/all-requests"
      },
      {
        key: "Room Service",
        name: "Room Service",
        title: true
      },
      {
        key: "Menu Items",
        name: "Menu Items",
        link: "/app/menu-items"
      },
      {
        key: "Room Service Orders",
        name: "Room Service Orders",
        link: "/app/room-service-order"
      },
      {
        key: "Room Service Delivery",
        name: "Room Service Delivery",
        link: "/app/room-service-delivery"
      }
    ]
  },
  {
    key: "Pre/Post Arrival",
    name: "Pre/Post Arrival",
    icon: "ios-desktop-outline",
    child: [
      {
        key: "Booking Management",
        name: "Booking Management",
        link: "/app/bookings"
      }
    ]
  },
  {
    key: "Hotel Stay",
    name: "Hotel Stay",
    icon: "ios-game-controller-a-outline",
    child: [
      {
        key: "Device Management",
        name: "Device Management",
        title: true
      },
      {
        key: "Device Management",
        name: "Device Management",
        link: "/app/devices"
      },
      // {
      //   key: "Device Management",
      //   name: "Device Maintenance",
      //   link: ""
      // },
      {
        key: "Affiliate Advertising Management",
        name: "Affiliate Advertising",
        title: true
      },
      {
        key: "Affiliate Advertising Management",
        name: "Affiliate Management",
        link: "/app/affiliate-advertising/affiliate"
      },
      {
        key: "Affiliate Advertising Management",
        name: "Affiliate Content Management",
        link: "/app/affiliate-advertising/affiliate-content"
      },
      {
        key: "Hotel Merchandise Management",
        name: "Hotel Merchandise Management",
        title: true
      },
      {
        key: "Hotel Merchandises Management",
        name: "Hotel Merchandises",
        link: "/app/hotel-merchandise"
      }
      // {
      //   key: "Customers Experience Management",
      //   name: "Customers Experience",
      //   title: true
      // }
      // {
      //   key: "Customers Experience Management",
      //   name: "Customers Experience",
      //   link: "/app/customer-recommendations"
      // }
    ]
  },
  {
    key: "Hotel Metrics",
    name: "Hotel Metrics",
    icon: "ios-stats-outline",
    child: [
      {
        key: "Performance Metrics",
        name: "Performance Metrics Dashboard",
        link: "/app/hotel-performance-dashboard"
      },
      {
        key: "Projection Forecasting",
        name: "Projection Forecasting",
        link: "/app/projection-forecasting"
      }
    ]
  },
  {
    key: "Housekeeping",
    name: "Housekeeping",
    icon: "ios-basket",
    child: [
      {
        key: "Personnel Activity",
        name: "Personnel Activity",
        title: true
      },
      {
        key: "Personnel Dashboard",
        name: "Dashboard",
        link: "/app/personnel-dashboard"
      },
      {
        key: "Activity List",
        name: "Activity List",
        link: "/app/activity-list"
      }
    ]
  },
  {
    key: "Housekeeping",
    name: "Housekeeping",
    icon: "ios-basket",
    child: [
      {
        key: "Room Service",
        name: "Room Service",
        title: true
      },
      {
        key: "Menu Items",
        name: "Menu Items",
        link: "/app/menu-items"
      },
      {
        key: "Room Service Orders",
        name: "Room Service Orders",
        link: "/app/room-service-order"
      },
      {
        key: "Room Service Delivery",
        name: "Room Service Delivery",
        link: "/app/room-service-delivery"
      }
    ]
  }
  // {
  //   key: "Hotel Metrics",
  //   name: "Hotel Metrics",
  //   icon: "ios-stats-outline",
  //   child: [
  //     {
  //       key: "Performance Metrics",
  //       name: "Performance Metrics Dashboard",
  //       link: "/app/hotel-performance-dashboard"
  //     },
  //     {
  //       key: "Projection Forecasting",
  //       name: "Projection Forecasting",
  //       link: "/app/projection-forecasting"
  //     }
  //   ]
  // }
];
