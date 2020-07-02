<template>
  <div>
    <h1>Drill Core Data</h1>
    <b-form class="form" @submit="onSubmit" @reset="onReset">
      <div class="input-list">
        <b-form-group
          class="input"
          v-for="input in form"
          :key="input.key"
          :label="input.lable"
        >
          <b-form-input
            v-model="input.value"
            :placeholder="input.placeholder"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="button-group">
        <b-button type="reset" variant="secondary">Reset</b-button>
        <b-button type="submit" variant="primary">Filter</b-button>
      </div>
    </b-form>
    <b-table
      @row-clicked="expandAdditionalInfo"
      striped
      hover
      responsive
      :items="drillCoreData"
      :fields="fields"
    ></b-table>
    <b-pagination
      v-on:input="myClickedEventhandler"
      v-model="currentPage"
      :total-rows="drillCoreDataCount"
      :per-page="100"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import { tableFields, filterFormData } from "../services/Service";

export default {
  name: "Search",
  data() {
    return {
      filter: "",
      currentPage: 1,
      drillCoreData: null,
      drillCoreDataCount: null,
      fields: tableFields,
      form: filterFormData
    };
  },

  methods: {
    myClickedEventhandler(newPage) {
      this.getDrillCoreData(newPage);
      window.scrollTo(0, 0);
    },

    expandAdditionalInfo(event) {
      this.$router.push({ name: "Detail", params: { id: event.id } });
    },

    getDrillCoreData(page = 1) {
      fetch(
        `https://api.geocollections.info/drillcore/?paginate_by=100&page=${page}&${this.filter}fields=id,locality_id,drillcore_en,locality__depth,locality__country__value_en,depository__value_en,year,storage__location`
      )
        .then(response =>
          response
            .json()
            .then(
              data => (
                (this.drillCoreData = data.results),
                (this.drillCoreDataCount = data.count)
              )
            )
        )
        .catch(err => console.error(err));
    },

    onReset() {
      this.filter = "";
      this.currentPage = 1;
      this.getDrillCoreData();
    },

    onSubmit(event) {
      event.preventDefault();
      const filters = [];
      this.form.forEach(input => {
        if (input.value) {
          filters.push(`${input.key}=${input.value}&`);
        }
      });
      this.filter = filters.join("");
      this.getDrillCoreData();
    }
  },
  created() {
    this.getDrillCoreData();
  }
};
</script>

<style lang="less">
tr {
  cursor: pointer;
}
.pagination {
  justify-content: center;
  margin-top: 16px;
}
.form {
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .input-list {
    display: flex;
    flex-wrap: wrap;
  }
  .button-group {
    display: flex;
    margin-top: 4px;
    button:first-child {
      margin-right: 8px;
    }
  }
  .input {
    margin-right: 16px;
  }
  .form-group legend {
    padding: 0;
    display: flex;
    font-size: 14px;
  }
}
@media (max-width: 768px) {
  td {
    font-size: 14px;
  }
}
</style>
