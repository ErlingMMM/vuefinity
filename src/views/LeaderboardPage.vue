<template>
  <highscore-list></highscore-list>
</template>

<script>
import HighscoreList from '../components/HighscoreList.vue';

export default {
  name: 'LeaderboardPage',
  components: {
      HighscoreList,
  },
}
</script>