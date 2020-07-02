<template>
  <div class="detail">
    <div class="button-wrapper">
      <router-link to="/">
        <b-button variant="primary">Back</b-button></router-link
      >
    </div>
    <h2>{{ heading }}</h2>
    <div class="table-wrapper">
      <b-table stacked :items="drillCoreDetail"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      heading: null,
      drillCoreDetail: null
    };
  },
  methods: {
    getDrillCoreDetailData() {
      fetch(
        `https://api.geocollections.info/drillcore/${this.$route.params.id}`
      )
        .then(response =>
          response
            .json()
            .then(
              data => (
                (this.drillCoreDetail = data.results),
                (this.heading = data.results[0].drillcore_en)
              )
            )
        )
        .catch(err => console.error(err));
    }
  },
  created() {
    this.getDrillCoreDetailData();
  }
};
</script>

<style lang="less">
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  .button-wrapper {
    width: 100%;
    display: flex;
    text-align: center;
    margin-bottom: 32px;
  }
  .table-wrapper {
    max-width: 800px;
    width: 100%;
  }
}
</style>
