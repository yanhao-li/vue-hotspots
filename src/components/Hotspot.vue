<template>
  <div
    class="hotspot"
    :class="{'hotspot--animated': hotspotAnimating}"
    @animationend="hotspotAnimating = false"
    @dblclick="onDblClick"
    @mousedown.stop.self="$emit('mousedown')"
  >
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      hotspotAnimating: false,
    }
  },
  methods: {
    onDblClick() {
      this.hotspotAnimating = true
      setTimeout(() => this.$emit('open'), 300);
    }
  }
}
</script>

<style scoped>
  .hotspot {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .hotspot:hover {
    transform: translateX(-50%) translateY(-50%) scale(1.5);
    transform-origin: center center;
    transition: transform 0.2s;
  }

  .hotspot.hotspot--animated {
    animation-name: hotspotScale;
    animation-duration: 0.5s;
  }

  @keyframes hotspotScale {
    20% {
      transform: scale(10);
    }

    75% {
      opacity: 0.8;
      transform: scale(50);
    }

    to {
      opacity: 0.8;
      transform: scale(100);
    }
  }
</style>