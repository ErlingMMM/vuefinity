<template>
  <div class="leaderboard-container">
    <header class="leaderboard-header">
    <!--<img src="@/assets/experis-logo.png" alt="Experis Academy Logo" />-->
    <h1>Highscores</h1>
    </header>
    <ul class="highscore-list">
    <li v-for="(score, index) in highscores" :key="index">
      <span>{{ index + 1 }}. {{ score.username }}</span>
      <span>{{ score.points }}</span>
  </li>
    </ul>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      highscores: []
    };
  },

  created() {
    this.fetchHighScores();
  },

  methods: {
    async fetchHighScores() {
      try {
        const response = await fetch('');
        if (!response.ok) {
          throw new Error('Failed to fetch highscores');
        }
        this.highscores = await response.json();
      } catch (error) {
        console.error('Error fetching highscores:', error);
      }
    }
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
  