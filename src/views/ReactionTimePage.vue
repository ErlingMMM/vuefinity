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

      const totalReactionTime = userHighScore + this.$root.reactionTime;
      console.log(this.$root.reactionTime + " this.$root.reactionTime");
      console.log(userHighScore + " userHighScore");
      console.log(totalReactionTime + " totalReactionTime");
      return totalReactionTime / 5;
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
