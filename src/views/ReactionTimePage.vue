<template>
    <section>
      <reaction-time @testComplete="handleTestComplete"></reaction-time>
    </section>
  </template>
  
  <script>
  import ReactionTime from '../components/ReactionTime.vue';
  
  export default {
    name: 'ReactionTimePage',
    components: {
      ReactionTime,
    },
    data() {
      return {
        testCount: 0, // Initialize the test count
      };
    },
    methods: {
  handleTestComplete() {
    // Increment the test count
    this.testCount++;

    console.log('Test count:', this.testCount);

    if (this.testCount === 2) {
      console.log('Redirecting to color-text-page');
      const colorTextPage = { name: 'color-text' };
      this.$router.push(colorTextPage);
    }
  },
},

  };
  </script>
  