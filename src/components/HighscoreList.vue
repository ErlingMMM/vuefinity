<template>
  <div class="leaderboard-container">
    <header class="leaderboard-header">
      <h1>Highscores</h1>
    </header>
    <div class="list-headers">
      <h3>Rank</h3>
      <h3>Name</h3>
      <h3>Score</h3>
    </div>

    <ol class="highscore-list">  
      <highscore-item
        v-for="(user, index) in users"
        :key="user.id"
        :rank="index + 1"
        :name="user.name"
        :score="user.score"
      ></highscore-item>
    </ol>

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
  max-width: 60%;
  margin: 0 auto;
  padding-bottom: 5%;
}

.list-headers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
}

.leaderboard-header {
  margin-bottom: 1rem;
}

.highscore-list {
  list-style-type: decimal;
  padding-left: 0; 
  margin-left: 1em; 
}

.highscore-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
}

.highscore-rank {
  font-weight: bold;
}

.highscore-name {
  flex-grow: 1;
  text-align: left;
}

.highscore-score {
  min-width: 4rem;
  text-align: right;
}

.start-game-button {
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 4%;
  padding-right: 4%;
  font-size: 1rem;
  cursor: pointer;
  background-color: #F87200;
  color: #fff;
  border: none;
  border-radius: 20px;
}

.start-game-button:hover {
  background-color: #FF8C29;
}

</style>

  