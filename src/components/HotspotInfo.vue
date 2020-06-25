<template>
  <div id="hotspot__info">
    <div v-if="showDeleteModal" id="delete__modal" @click.self="showDeleteModal = false">
      <div id="delete__modal__content">
        <p>This action cannot be undo.</p>
        <p>Are you sure?</p>
        <div class="btn__group">
          <button class="btn" style="margin-right: 10px" @click="showDeleteModal = false">Cancel</button>
          <button class="delete__btn btn" @click="onDeleteConfirm">Confirm</button>
        </div>
      </div>
    </div>
    <svg 
      id="close__btn"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      @click="onCloseBtnClick"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
    <slot></slot>
    <button class="btn delete__btn" @click="showDeleteModal = true">
      Delete this hotspot
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDeleteModal: false,
    }
  },
  methods: {
    onCloseBtnClick() {
      this.$emit('close')
    },
    onDeleteConfirm() {
      this.showDeleteModal = false;
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>
  #hotspot__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 50px 10px;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    line-height: 14px;
  }

  #close__btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .btn {
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    background-color: #fafbfc;
    border: 1px solid rgba(27,31,35,.15);
    padding: 5px 10px;
  }

  .delete__btn {
    color: #cb2431;
    font-weight: bold;
    width: 50%;
    margin-top: 50px;
  }

  .delete__btn:hover {
    color: #fff;
    background-color: #cb2431;
  }

  .btn__group {
    margin-top: 10px;
  }

  #delete__modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  #delete__modal__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50%;
    background-color: #fff;
  }

  #delete__modal__content > p {
    margin: 5px 0;
    font-size: 14px;
    line-height: 14px;
  }
</style>