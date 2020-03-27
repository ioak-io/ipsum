<template>
  <div class="oak-popover-menu" :class="style" v-bind:id="id">
    <div v-if="label" class="label" @click="toggle" :class="labelStyle">
      <div v-if="iconLeft" class="left-icon">
        <i class="material-icons">{{ iconLeft }}</i>
      </div>
      <div class="label-text">{{ label }}</div>
      <div class="right-icon">
        <i class="material-icons">{{ iconRight }}</i>
      </div>
    </div>
    <div v-else class="label-custom" @click="toggle">
      <slot name="label"></slot>
    </div>
    <div
      class="dropdown-content"
      v-bind:class="dropdownContentStyle"
      @click="toggle"
    >
      <div
        v-for="element in elements"
        v-bind:key="element.label"
        class="element"
        @click="element.action"
      >
        <i v-if="element.icon" class="material-icons">{{ element.icon }}</i
        >{{ element.label }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OakSelect',
  props: {
    id: String,
    label: String,
    data: String,
    elements: Array,
    labelVariant: String,
    theme: String,
    right: Boolean,
    iconLeft: String,
    iconRight: String,
    mobilize: Boolean,
  },
  data() {
    return {
      style: this.getStyle(),
      show: false,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    getStyle() {
      let style = this.theme ? this.theme : '';
      style += this.labelVariant ? ` ${this.labelVariant}` : '';
      style += this.width ? ` ${this.width}` : '';
      return style;
    },
    changeSelection(newValue) {
      event.target.name = this.id;
      event.target.value = newValue;
      this.$emit('change', event);
      this.toggle();
    },
  },
  computed: {
    dropdownContentStyle: function() {
      let style = this.show ? 'show' : 'hide';
      style += this.right ? ' right' : '';
      return style;
    },
    labelStyle: function() {
      let style = this.show ? 'active' : '';
      style += this.mobilize ? ' short-label' : '';
      return style;
    },
  },
  created() {
    window.addEventListener('click', e => {
      // console.log(e.target, document.getElementById(this.id), this.id);
      // console.log(
      //   document
      //     .getElementById(this.id)
      //     .querySelector('.oak-popover-menu-label').classList
      // );
      if (!document.getElementById(this.id)?.contains(e.target)) {
        this.show = false;
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.oak-popover-menu {
  --color-popover-theme: var(--color-default);
  &.primary {
    --color-popover-theme: var(--color-primary-1);
  }
  &.secondary {
    --color-popover-theme: var(--color-secondary-1);
  }
  &.tertiary {
    --color-popover-theme: var(--color-tertiary-1);
  }
  --color-label-normal: none;
  &.on {
    --color-label-normal: var(--color-popover-theme);
  }
  position: relative;
  box-sizing: border-box;
  user-select: none;
  .label {
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    padding: 0px 10px;
    border-radius: 4px;
    white-space: nowrap;
    background-color: var(--color-label-normal);
    display: flex;
    align-items: center;
    &.short-label {
      @media (max-width: 767px) {
        border-radius: 50%;
        height: 32px;
        width: 32px;
        padding: 0px;
        margin: 0px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        .label-text {
          display: none;
        }
        .left-icon,
        .right-icon {
          margin: 0px;
        }
      }
    }
    &.active,
    &:hover {
      background-color: var(--color-popover-theme);
    }
    .material-icons {
      line-height: 26px;
      vertical-align: middle;
    }
    .left-icon {
      margin-right: 6px;
      display: inline;
    }
    .right-icon {
      margin-left: 6px;
      display: inline;
    }
  }
  .label-custom {
    cursor: pointer;
  }
  .dropdown-content {
    position: absolute;
    padding: 8px 0px;
    background-color: var(--color-background-1);
    // box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    //   0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 0 1px rgba(111, 119, 130, 0.15),
      0 5px 20px 0 rgba(21, 27, 38, 0.08);
    border-radius: 4px;
    // max-width: 200px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
    .element {
      cursor: pointer;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0px 20px;
      height: 40px;
      line-height: 40px;
      &:hover {
        background-color: var(--color-popover-theme);
      }
      .material-icons {
        line-height: 32px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    &.show {
      display: block;
    }
    &.hide {
      display: none;
    }
    &.right {
      right: 0;
    }
  }
}
</style>
