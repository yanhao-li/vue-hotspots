<template>
  <div id="vue-hotspots__container">
    <div
      id="app__overlay"
      @click.self="addHotspot"
      @mouseup="dragStop"
    >
      <Hotspot 
        v-for="hotspot in hotspots"
        :style="{ left: hotspot.x + '%', top: hotspot.y + '%' }" 
        :key="hotspot.id"
        :data="hotspot"
        @mousedown="dragStart(hotspot)"
        @open="showHotspotInfo = true"
      >
      </Hotspot>
    </div>
    <HotspotInfo 
      v-if="showHotspotInfo"
      @close="showHotspotInfo = false"
      @delete="deleteHotspot"
    >
      <slot name="form" :currentHotspot="currentHotspot"></slot>
    </HotspotInfo>
    <slot></slot>
  </div>
</template>

<script>
import shortid from 'shortid'
import Hotspot from './components/Hotspot.vue'
import HotspotInfo from './components/HotspotInfo.vue'

export default {
  name: 'VueHotspots',
  components: {
    Hotspot,
    HotspotInfo
  },
  data() {
    return {
      hotspots: [],
      isDragging: false,
      showHotspotInfo: false,
    }
  },
  props: {
    draggable: {
      type: Boolean,
      default: true,
    },
    model: {
      type: Object,
    },
    currentHotspot: {
      type: Object,
      required: true,
    }
  },
  mounted() {
    window.addEventListener('mouseup', this.dragStop);
    window.addEventListener('mousemove', this.dragging);
  },
  methods: {
    addHotspot(e) {
      this.hotspots = this.hotspots.concat({
        'id': shortid.generate(),
        ...this.getMousePos(e),
        ...this.model
      })
    },
    dragStart(hotspot) {
      this.isDragging = true;
      this.$emit('update:currentHotspot', hotspot);
    },
    dragging(e) {
      if (this.isDragging && this.draggable) {
        this.hotspots = this.hotspots.map((hotspot) => {
          if (hotspot.id === this.currentHotspot.id) {
            return {
              ...hotspot,
              ...this.getMousePos(e)
            }
          }
          return hotspot
        })
      }
    },
    dragStop() {
      this.isDragging = false;
    },
    deleteHotspot() {
      this.showHotspotInfo = false;
      this.hotspots = this.hotspots.filter((hotspot) => {
        return hotspot.id !== this.currentHotspot.id
      })
    },
    getMousePos(e) {
      // size of the entire element
      const rect = this.$el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      return {
        'x': x < 0 ? 0 : (x > 100 ? 100 : x),
        'y': y < 0 ? 0 : (y > 100 ? 100 : y)
      }
    }
  },
  watch: {
    hotspots() {
      this.$emit('update', this.hotspots)
    }
  },
}
</script>

<style scoped>
  #vue-hotspots__container {
    display: inline-block;
    position: relative;
    overflow: hidden;
    line-height: 0;
    border: 1px solid #e6e6e6;
  }

  #app__overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 14px;
    background-color: rgba(0, 0, 0, 0.5);
    user-select: none;
  }
</style>