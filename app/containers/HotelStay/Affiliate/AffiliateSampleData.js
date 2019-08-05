export const anchorTable = [
  {
    name: "affiliateId",
    label: "Affiliate ID",
    initialValue: "",
    hidden: true
  },
  {
    name: "affiliateName",
    label: "Affiliate Name",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "representativeName",
    label: "Representative Name",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "affiliateType",
    label: "Affiliate Type",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  // {
  //   name: "dateOfRegistration",
  //   label: "Date of Registration",
  //   initialValue: null,
  //   width: "auto",
  //   hidden: false
  // }
];

export const dataApi = [
  {
    affiliateContents: [],
    affiliateId: 1,
    affiliateName: "Singapore Tourism Board",
    affiliateStatus: "PENDING",
    affiliateType: "GOVERNMENT",
    bids: [],
    businessAddress: "Tourism Court, 1 Orchard Spring Lane, 247729",
    contactNumber: "64565789",
    email: "tanchinkwow@stb.gov",
    isPremium: true,
    organizationEntityNumber: "T08GB0059L",
    representativeName: "Mr. Tan Chin Kwok"
  },
  {
    affiliateContents: [],
    affiliateId: 2,
    affiliateName: "Changi Airport Group",
    affiliateStatus: "PENDING",
    affiliateType: "GOVERNMENT",
    bids: [],
    businessAddress: "60, AIRPORT BOULEVARD, #46-37, CHANGI AIRPORT TERMINAL 2, SINGAPORE 819643",
    contactNumber: "86083522",
    email: "ivantan@changiairport.com",
    isPremium: true,
    organizationEntityNumber: "200910817N",
    representativeName: "Mr. Ivan Tan"
  }
];
