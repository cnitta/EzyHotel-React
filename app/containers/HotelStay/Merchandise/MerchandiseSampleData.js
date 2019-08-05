export const anchorTable = [
  {
    name: "merchandiseId",
    label: "Merchandise ID",
    initialValue: "",
    hidden: true
  },
  {
    name: "name",
    label: "Merchandise Name",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "description",
    label: "Description",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "costPoints",
    label: "Cost Points",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "quantityOnHand",
    label: "Quantity",
    initialValue: null,
    width: "auto",
    hidden: false
  }
];

export const dataApi = [
  {
    costPoints: 300,
    description:
      "Our Exclusive Floral Bracelet for our exclusive members of Kent Ridge Hotel Group. Comes with the floral design of our diverse local flowers.",
    isTriggerOn: true,
    maxCostPriceLimit: 400,
    merchandiseId: 1,
    merchandiseStatus: "NOT_ON_SALE",
    name: "Exclusive Floral Bracelet",
    poTriggerLevel: 50,
    quantityOnHand: 100
  }
];
