export const tableFields = [
  {
    key: "locality_id",
    label: "Locality ID"
  },
  {
    key: "drillcore_en",
    label: "Drill core"
  },
  {
    key: "locality__country__value_en",
    label: "Locality country"
  },
  {
    key: "depository__value_en",
    label: "Depository"
  },
  {
    key: "locality__depth",
    label: "Locality depth"
  },
  {
    key: "year",
    label: "Year"
  },
  {
    key: "storage__location",
    label: "Storage Location"
  }
];

export const filterFormData = [
  {
    lable: "Location Id",
    placeholder: "e.g. 867",
    key: "locality_id",
    value: null
  },
  {
    lable: "Country",
    placeholder: "e.g. Estonia",
    key: "locality__country__value_en",
    value: null
  },
  {
    lable: "Locality Depth",
    placeholder: "e.g. 155.2",
    key: "locality__depth",
    value: null
  },
  {
    lable: "Year",
    placeholder: "e.g. 1983",
    key: "year",
    value: null
  },
  {
    lable: "Storage location",
    placeholder: "e.g. h2i (GIT)",
    key: "storage__location",
    value: null
  }
];
