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
    HighscoreItem
  },
  async created() {
    this.top10 = await highscoreService.getTop10();

    // Check if the current user is in the top 3
    const currentUserEmail = 'current_user_email'; // Replace with the actual user email
    const isTop3 = this.top10.slice(0, 3).some(user => user.email === currentUserEmail);

    // Trigger confetti explosion if the current user is in the top 3
    if (isTop3) {
      confetti();
    }
  },
};
</script>