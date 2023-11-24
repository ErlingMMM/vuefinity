<template>
  <div class="leaderboard-container">
    <header class="leaderboard-header">
      <h1>Highscores</h1>
    </header>
    <ul class="highscore-list">
      <highscore-item
        v-for="(user, i) in top10"
        :key="i"
        :name="user.name"
        :score="user.score"
        :email="user.email"
        :phoneNumber="user.phoneNumber"
        class="highscore-entry"
      ></highscore-item>
    </ul>
  </div>
</template>

<script>
import HighscoreItem from '../components/HighscoreItem.vue';
import highscoreService from '../services/highscoreService.js';
import confetti from 'canvas-confetti'; // Import the canvas-confetti library

export default {
  data() {
    return {
      top10: [],
    };
  },
  components: {
      HighscoreList,
  },
};
</script>