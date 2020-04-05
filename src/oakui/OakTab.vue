<template>
  <div class="oak-tab">
    <div class="header" ref="header">
      <div
        v-for="item in meta"
        v-bind:key="item.slotName"
        class="tab typography-6"
        v-bind:class="activeTab === item.slotName ? 'active' : ''"
        @click="switchTab(item.slotName)"
      >
        <div class="icon">
          <i
            class="material-icons typography-8"
            v-bind:class="activeTab === item.slotName ? 'active' : ''"
            >{{ item.icon }}</i
          >
        </div>
        <div class="label">{{ item.label }}</div>

        <!-- <div class="tooltip">
          Hover over me
          <span class="tooltiptext">Tooltip text</span>
        </div> -->
      </div>
    </div>
    <div
      v-for="item in meta"
      v-bind:key="item.slotName"
      class="content"
      v-bind:class="item.slotName === activeTab ? 'active' : 'inactive'"
    >
      <slot v-bind:name="item.slotName" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'OakTab',
  props: {
    meta: Array,
  },
  data: function() {
    return {
      activeTab: '',
    };
  },
  mounted() {
    this.activeTab =
      this.meta && this.meta.length > 0 ? this.meta[0].slotName : '';
    console.log(document.getElementsByClassName('oak-tab')[0]);
    console.log(document.getElementsByClassName('oak-tab')[0].clientWidth);
    console.log(this.$refs.header.clientWidth);
  },
  methods: {
    switchTab: function(activeTab) {
      this.activeTab = activeTab;
    },
  },
};
</script>
<style lang="scss" scoped>
.oak-tab {
  display: flex;
  flex-direction: column;
  .header {
    user-select: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25px, 200px));
    @media (max-width: 767px) {
      grid-template-columns: repeat(auto-fit, minmax(25px, 50px));
    }
    // display: flex;
    // flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow-y: hidden;
    .tab {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      color: var(--color-foreground-2);
      white-space: nowrap;
      .material-icons {
        &.active {
          @media (max-width: 767px) {
            background-color: var(--color-background-1);
            border-radius: 6px;
          }
        }
        padding: 10px;
        vertical-align: middle;
      }
      &:hover {
        color: var(--color-forerground-1);
      }
      &.active {
        color: var(--color-primary-1);
      }
    }
    .label {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
  .content {
    &.active {
      display: block;
      animation: slide-up 0.3s ease;
    }
    &.inactive {
      display: none;
    }
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
