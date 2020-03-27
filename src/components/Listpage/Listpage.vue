<template>
  <div class="listpage">
    <h1>List page</h1>
    <h2>{{ getProfile.space }}</h2>
    <div v-for="task in getTasks" v-bind:key="task.id">
      <ItemLink v-bind:task="task" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ItemLink from './ItemLink.vue';

export default {
  name: 'Listpage',
  components: {
    ItemLink,
  },
  methods: {
    ...mapActions(['fetchTasks']),
  },
  computed: mapGetters(['getTasks', 'getProfile']),
  created() {
    this.fetchTasks();
  },
};
</script>
