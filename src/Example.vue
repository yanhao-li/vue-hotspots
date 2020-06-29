<template>
  <div class="row">
    <VueHotspots
      @update="(hotspots) => hotspots1 = hotspots"
      :model="hotspot1Model"
      :currentHotspot.sync="currentHotspot"
    >
      <img 
        src="https://lp-cms-production.imgix.net/features/2019/06/camels-treasury-petra-jordan-ac93988c79b7.jpg?auto=format&fit=crop&q=40&sharp=10&vib=20&ixlib=react-8.6.4&w=2258"
        width="500"
      />
      <template v-slot:form>
        <label>Description:</label>
        <input v-model="currentHotspot.description"/>
      </template>
    </VueHotspots>
    <pre>{{ JSON.stringify(hotspots1, null, 2) }}</pre>
  </div>
</template>

<script>
import VueHotspots from './index.vue'

export default {
  name: 'Example',
  components: {
    VueHotspots
  },
  data() {
    return {
      hotspot1Model: {
        description: ''
      },
      currentHotspot: null,
      hotspots1: [],
    }
  },
}
</script>

<style scoped>
  .row {
    position: relative;
  }
  pre {
    width: 300px;
    background-color: aquamarine;
    max-height: 300px;
    overflow: scroll;
    text-align: left;
    float: right;
    padding: 10px;
    margin: 0;
  }
</style>
