<template>
  <section class="full-screen" :class="{ green: isGreen, red: !isGreen }" @click="checkReactionTime">
    <div v-if="!gameStarted || failed" class="start-message">
      <p>Trykk på skjermen for å starte spillet</p>
    </div>
    <div v-else-if="!isGreen && !success" class="message">vent på grønt</div>
    <div v-else-if="isGreen && !success" class="message">Klikk!</div>
    <div v-if="success" class="success-message">
      <p>Gratulerer! Du trykket riktig 5 ganger!</p>
      <button @click="goToColorTextPage">Go to the next test</button>
    </div>
    <div v-if="reactionTime && !failed && !success" class="reaction-time">Din reaksjonstid: {{ reactionTime }} ms</div>
    <div v-if="highScore && !failed && !success" class="high-score">High Score: {{ highScore }} ms</div>
    <div v-if="failed" class="fail-message">For tidlig! Trykk hvor som helst for å starte på nytt.</div>
  </section>
</template>

  
<script>
export default {
  data() {
    return {
      startTime: null,
      endTime: null,
      isGreen: false,
      reactionTime: null,
      highScore: this.getHighScore(),
      gameStarted: false,
      failed: false,
      correctClicks: 0,
      success: false,
    };
  },

  methods: {
    startGame() {
      this.failed = false;
      this.gameStarted = true;
      this.reactionTime = null;
      this.isGreen = false;
      this.changeColor();
      this.correctClicks = 0;
      //this.success = false; 
    },

    checkReactionTime() {
      if (this.success) {
        // Do nothing if the user has already completed the game successfully
        return;
      }
      if (!this.gameStarted || this.failed) {
        // If the game hasn't started or the user has failed by clicking too soon
        this.startGame();
      } else if (this.isGreen) {
        // Correct click: record the reaction time
        this.endTime = new Date().getTime();
        this.reactionTime = this.endTime - this.startTime;
        this.updateHighScore(this.reactionTime);
        this.$emit('testComplete');
        this.correctClicks++; // Increment correct clicks count
        if (this.correctClicks >= 5) {
          // Check if user has clicked correctly 5 times
          this.success = true;
          this.gameStarted = false;
        } else {
          this.isGreen = false;
          this.changeColor();
        }
      } else {
        // Incorrect click: clicked too soon
        this.failed = true;
        this.gameStarted = false;
        this.isGreen = false;
      }
    },

    goToColorTextPage() {
      this.$router.push({ name: 'color-text' });
    },

    changeColor() {
      setTimeout(() => {
        this.isGreen = true;
        this.startTime = new Date().getTime(); // Record the start time
      }, Math.floor(Math.random() * 5000) + 1000); // Random delay before the color changes
    },

    getHighScore() {
      const savedScore = localStorage.getItem('score') || null
      const score = parseFloat(savedScore)
      return score;
    },

    updateHighScore(newTime) {
      const savedScore = localStorage.getItem('score') || null
      const scoreFirsGame = parseFloat(savedScore)
      const updatedScore = (newTime / 5) + scoreFirsGame
      localStorage.setItem('score', updatedScore.toString());
    },
    handleTestComplete() {
      this.$emit('testComplete');
    },
  },
};
</script>
  
<style>
.full-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  transition: background-color 0.3s ease;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  user-select: none;
  /* Prevent user selection on double clicks */
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.start-message {
  font-size: 1.5rem;
  color: white;
  text-align: center;
  margin: 20px;
}

.message {
  font-size: 2rem;
  color: white;
  text-align: center;
  margin: 20px;
}

.reaction-time {
  color: white;
  font-size: 1.5rem;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.fail-message {
  color: yellow;
  font-size: 1.5rem;
  margin-top: 20px;
}

.success-message {
  color: #4CAF50;
  /* Green color for success */
  font-size: 1.5rem;
  text-align: center;
}
</style>
