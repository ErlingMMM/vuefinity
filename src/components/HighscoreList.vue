<template>
  <div class="leaderboard-container">
    <header class="leaderboard-header">
      
      <h1>Highscores</h1>
    </header>
    <ul class="highscore-list">
      <highscore-item
        v-for="(user, index) in users"
        :key="index"
        :name="user.name"
        :score="user.score"
        :email="user.email"          
        class="highscore-entry"
      ></highscore-item>
    </ul>
  </div>
</template>
  
<script>
import HighscoreItem from './HighscoreItem.vue';
import userService from '../services/userService.js';

export default {
  setup() {
    const users = userService.getTop10(); // <-- Må byttes til getTop10

    return {
      users
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

  