<template>
    <div class="leaderboard-container">
      <header class="leaderboard-header">
        <!-- The logo image is commented out, make sure to uncomment and use the correct path if needed -->
        <!-- <img src="@/assets/experis-logo.png" alt="Experis Academy Logo" /> -->
        <h1>Highscores</h1>
      </header>
      <ul class="highscore-list">
        <highscore-item
          v-for="(user, index) in highscores"
          :key="index"
          :userId="user.id"
          :username="user.name"
          :score="user.highscore"
          :email="user.email"          
          class="highscore-entry"
        ></highscore-item>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import HighscoreItem from './HighscoreItem.vue';
  import userService from '../services/userService.js';
  
  export default {
    components: {
      HighscoreItem
    },
    setup() {
      const highscores = ref([]);
  
      const fetchHighScores = async () => {
        try {
          const users = await userService.getAll(); // Ensure this is a method that returns a Promise
          highscores.value = users.map(user => ({
            id: user.id,
            name: user.name,
            highscore: user.highscore, // Ensure this property name is consistent with your backend
            email: user.email,
          }));
        } catch (error) {
          console.error('Error fetching highscores:', error);
        }
      };
  
      fetchHighScores(); // Invoke the fetch method
  
      return {
        highscores
      };
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

  