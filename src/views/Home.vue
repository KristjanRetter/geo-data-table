<template>
  <div class="home">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group v-for="input in form" :key="input.key" :label="input.lable">
        <b-form-input v-model="input.value" :placeholder="input.placeholder"></b-form-input>
      </b-form-group>
       <b-button type="reset" variant="secondary">Reset</b-button>
      <b-button type="submit" variant="primary">Submit</b-button>
           
    </b-form>
      <b-pagination
      v-if="drillCoreData"
      v-on:input="myClickedEventhandler"
      v-model="currentPage"
      :total-rows="drillCoreDataCount"
      :per-page="100"
      aria-controls="my-table"
    ></b-pagination>
    <b-table v-if="drillCoreData" striped hover :items="drillCoreData" :fields="drillCoreColumns"></b-table>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      suurus: "10",
      filter: "",
      currentPage: 1,
      drillCoreData: null,
      drillCoreDataCount: null,
      drillCoreColumns: [
        "locality_id",
        "drillcore_en",
        "locality__country__value_en",
        "depository__value_en",
        "locality__depth",
        "year",
        "storage__location",
      ],
      form: [
        {
          lable: "Country",
          placeholder: "Country",
          key: "locality__country__value_en",
          value: null,
        },
        {
          lable: "Debth",
          placeholder: "Debth",
          key: "locality__depth",
          value: null,
        },
        {
          lable: "Location Id",
          placeholder: "mjauu",
          key: "locality_id",
          value: null,
        },
      ],
    };
  },

  methods: {
    myClickedEventhandler(newPage) {
      this.getData(newPage)
      console.log(event)
    },

    getData(page=1) {
   
    const fields="fields=id,locality_id,drillcore_en,locality__depth,locality__country__value_en,depository__value_en,year,storage__location"
      fetch(`https://api.geocollections.info/drillcore/?paginate_by=100&page=${page}&${this.filter}${fields}`)
        .then((response) => response.json().then((data) => (this.drillCoreData = data.results, this.drillCoreDataCount = data.count)))
        .catch((err) => console.error(err));
    },
    onReset() {
      this.filter = ""
      this.currentPage = 1;
      this.getData();
    },
    onSubmit(evt) {
      evt.preventDefault();
      const filters = []
      this.form.forEach((input) => {
        if (input.value) {
          filters.push(`${input.key}=${input.value}&`);
        }
      });
      this.filter = filters.join("")
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
