<template>
  <div  class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
     <b-form @submit="onSubmit" >
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.id"
          required
          placeholder="Enter location id"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <b-table v-if="drillCoreData" striped hover :items="drillCoreData" :fields= "drillCoreColumns"></b-table>
  

  </div>
</template>

<script>



export default {
  name: "Home",
  components: {
  },
 data() {
    return {
      drillCoreData: null,
      drillCoreColumns: ["locality_id","drillcore_en","locality__country__value_en","depository__value_en","depth","year", "storage__location"],
      form: {
          id: null,
        },
    }
  },

  methods:{
    mjau () {
     console.log(this.drillCoreData)
    },
     init(){
      fetch('https://api.geocollections.info/drillcore/?fields=id,locality_id,drillcore_en,depth,locality__country__value_en,depository__value_en,year,storage__location&paginate_by=10&page=1')
      .then(response => response.json().then(data => this.drillCoreData = data.results))
      .catch(err=> console.error(err));
    },
       onSubmit(evt) {
        evt.preventDefault()
        console.log(this.form.id)
      }
    
  },
  mounted(){
   this.init()
   console.log(this.drillCoreData)
    
  }
};
</script>
