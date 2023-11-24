<template>
  <div class="leaderboard-container">
    <header class="leaderboard-header">
      <h1>Highscores</h1>
      <button @click="startNewGame" class="start-game-button">Start nytt spill</button>
    </header>

    <ul class="highscore-list">
      <highscore-item
        v-for="(user, i) in users"
        :key="i"
        :name="user.name"
        :score="user.score"  
        class="highscore-entry"
      ></highscore-item>
    </ul>

    <button @click="startNewGame" class="start-game-button">Start nytt spill</button>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import HighscoreItem from './HighscoreItem.vue';
import highscoreService from '../services/highscoreService.js';

export default {
  components: {
    HighscoreItem
  },

  methods: {
    startNewGame() {
      this.$router.push({ name: 'home' });
    }
  },

  setup() {
    const users = ref([]);

    const init = async () => {
      await highscoreService.fetchTop10(); 
      users.value = highscoreService.getTop10().value;
    };

    init(); 

    return {
      users,
    };
  }
};
</script>

<style scoped>
.leaderboard-container {
  text-align: center;
  max-width: 600px; /* Set the max width for the leaderboard */
  margin: 0 auto; /* Center the leaderboard */
}

.leaderboard-header {
  margin-bottom: 1rem;
}

.leaderboard-header img {
  max-width: 200px; /* Adjust as needed */
  margin-bottom: 1rem;
}

.highscore-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.highscore-entry {
  margin-bottom: 0.5rem; 
  font-size: 1.2rem; 
}

.start-game-button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #F87200; 
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.start-game-button:hover {
  background-color: #FF8C29; 
}

</style>

  