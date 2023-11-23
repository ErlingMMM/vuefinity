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
import HighscoreItem from './HighscoreItem.vue';
import highscoreService from '../services/highscoreService.js';

export default {
  setup() {
    const top10 = highscoreService.getTop10(); // <-- Må byttes til getTop10

    return {
      top10
    }
  },
  components: {
    HighscoreItem
  }
};
</script>
  
<style scoped>
.leaderboard-container {
  font-family: 'Arial', sans-serif;
  text-align: center;
}

.leaderboard-header {
  margin-bottom: 20px;
}

.leaderboard-header img {
  max-width: 150px; /* Adjust the size as needed */
  margin-bottom: 10px;
}

.highscore-list {
  list-style: none;
  padding: 0;
}

.highscore-list li {
  margin: 10px 0;
  font-size: 1.2rem;
}

.highscore-list li span:first-child {
  margin-right: 20px;
}
</style>

  