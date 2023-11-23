<template>
  <reaction-time></reaction-time>
</template>

<script>
import ReactionTime from '../components/ReactionTime.vue';

export default {
  name: 'ReactionTimePage',
  components: {
    ReactionTime,
  },
  computed: {
    AvgReactionTime() {
      // Calculate average reaction time
      const storedUserHighScore = localStorage.getItem('score');
      const userHighScore = storedUserHighScore ? parseFloat(storedUserHighScore, 10) : 0;

      const totalReactionTime = (userHighScore / 5) + this.$root.reactionTime;
      return totalReactionTime;
    },
  },

  watch: {
    AvgReactionTime(newValue) {
      // Update UserHighScore in local storage
      localStorage.setItem('score', newValue);
    },
  },
}
</script>
