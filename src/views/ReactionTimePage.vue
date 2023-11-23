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
      const totalReactionTime = this.$root.UserHighScore + this.$root.reactionTime;
      return totalReactionTime / 5;
    },
  },

  watch: {
    AvgReactionTime(newValue) {
      // Update UserHighScore
      this.$root.UserHighScore = newValue;
    },
  },
}

</script>
  