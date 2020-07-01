<template>
  <div  class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
     <b-form @submit="onSubmit" >
      <b-form-group  v-for="input in testForm" :key="input.lable"  :label="input.lable">
        <b-form-input
      
          v-model="input.locality_ids"
          :placeholder="input.placeholder"
        ></b-form-input>
      </b-form-group>


      <b-form-group  label="Id:">
        <b-form-input
    
          v-model="form.locality_id"
          placeholder="Enter location id"
        ></b-form-input>
      </b-form-group>
       <b-form-group label="Location Country:">
        <b-form-input
         
          v-model="form.locality__country__value_en"
          placeholder="Enter country"
        ></b-form-input>
      </b-form-group>
       <b-form-group label="Location Debth:">
        <b-form-input
     
          v-model="form.locality__depth"
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
      drillCoreColumns: ["locality_id","drillcore_en","locality__country__value_en","depository__value_en","locality__depth","year", "storage__location"],
      form: {
          locality_id: null,
          locality__country__value_en: null,
          locality__depth: null,
        },

      testForm: [
        {
       
          lable: "Location Id",
          placeholder: "Enter Location Id",
          locality_ids: null,
        },
           {
          lable: "Ugh",
          placeholder: "Fancy",
          locality_ids: null,
        },
           {
          lable: "Location sId",
          placeholder: "mjauu",
          locality_ids: null,
        }
      ]
    }
  },

  methods:{
     init(){
      fetch('https://api.geocollections.info/drillcore/?fields=id,locality_id,drillcore_en,locality__depth,locality__country__value_en,depository__value_en,year,storage__location&paginate_by=10&page=1')
      .then(response => response.json().then(data => this.drillCoreData = data.results))
      .catch(err=> console.error(err));
    },

     getbasedOnId(filter){
       if(filter) {
       const fields = "fields=id,locality_id,drillcore_en,locality__depth,locality__country__value_en,depository__value_en,year,storage__location"
    console.log(filter)
      fetch(`https://api.geocollections.info/drillcore/?${filter}${fields}`)
      .then(response => response.json().then(data => this.drillCoreData = data.results))
      .catch(err=> console.error(err));} else {
         this.init()
      }
    },
       onSubmit(evt) {
        evt.preventDefault()
        //
 
        const filters = [];

        for (const property in this.form) {
          if(this.form[property]) {
            filters.push(`${property}=${this.form[property]}&`)
          }
        }
       this.getbasedOnId(filters.join(""))
      }
    
  },
  mounted(){
   this.init()
   console.log(this.drillCoreData)
    
  }
};
</script>
