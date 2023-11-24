<template>
  <section class="shapes-container">
    <div class="image-container">
      <!-- Placeholder for the images -->
    </div>
    <p class="instruction-text">
      <!-- Instruction text will be placed here -->
    </p>
    <p class="countdown-text">
      <!-- Countdown text will be placed here -->
    </p>
    <p class="score-text">
      <!-- Score text will be placed here -->
    </p>
  </section>
</template>

<script>
import userService from '@/services/userService';

export default {
  data() {
    return {
      points: 0,
      correctImage: '',
      countdown: 30,
      userEmail: '',
      gameEnded: false,
    };
  },
  mounted() {
  this.userEmail = this.$route.params.userEmail;
  this.generateNewShapes();
  this.startCountdown();
  setInterval(() => {
    this.$nextTick(() => {
      this.updateCountdown();
    });
  }, 1000);
},
  methods: {
    generateRandomShape(imageName, imageContainer) {
      const imgElement = new Image();
      imgElement.src = require(`@/assets/${imageName}.png`);
      imgElement.width = 200;
      imgElement.height = 200;

      imgElement.addEventListener('click', () => {
        this.handleImageClick(imageName);
      });

      imageContainer.appendChild(imgElement);
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },

    getTextColor(color) {
      return color === 'Blue' ? '#F87200' : color === 'Orange' ? '#72A89B' : '#4DAADD';
    },

    getColorFromName(imageName) {
      return imageName.includes('Blue') ? 'Blue' : imageName.includes('Orange') ? 'Orange' : 'Green';
    },

    handleImageClick(clickedImage) {
      if (this.gameEnded) return;

      if (clickedImage === this.correctImage) {
        this.points += 5; // Correct shape, +5 points
        console.log('Correct');
      } else {
        this.points -= 2; // Wrong shape, -2 points
        console.log('Incorrect click. Try again.');
      }

      // Update local storage with the new points
      localStorage.setItem('points', this.points.toString());

      this.generateNewShapes();
    },

    updateCountdown() {
  this.$nextTick(() => {
    const countdownElement = document.querySelector('.countdown-text');
    if (countdownElement) {
      countdownElement.textContent = `Time Left: ${this.countdown} seconds`;
    }
  });
},

    generateNewShapes() {
      if (this.gameEnded) return; // Do nothing if the game has ended

      const images = [
        'BlueTriangle',
        'OrangeTriangle',
        'GreenTriangle',
        'BlueCircle',
        'OrangeCircle',
        'GreenCircle',
      ];

      this.shuffleArray(images);

      const instructionElement = document.querySelector('.instruction-text');
      const countdownElement = document.querySelector('.countdown-text');
      const scoreElement = document.querySelector('.score-text');
      const imageContainer = document.querySelector('.image-container');

      // Clear previous content
      instructionElement.innerHTML = '';
      countdownElement.textContent = '';
      scoreElement.textContent = '';
      imageContainer.innerHTML = '';

      // Choose a random shape to be the correct one
      const correctIndex = Math.floor(Math.random() * images.length);
      this.correctImage = images[correctIndex];

      // Display all shapes
      images.forEach((imageName) => {
        this.generateRandomShape(imageName, imageContainer);
      });

      // Display instruction with the correct shape highlighted
      const color = this.getColorFromName(this.correctImage);
      const shape = this.correctImage.includes('Circle') ? 'Circle' : 'Triangle';

      const instructionText = `<span style="font-size: 48px; font-weight: bold; text-align: center; width: 100%;">Click the <span style="color: ${this.getTextColor(color)}">${color}</span> ${shape}</span>`;
      instructionElement.innerHTML = instructionText;

      // Display countdown
      this.updateCountdown();

      // Display score
      scoreElement.textContent = `Score: ${this.points}`;
    },

    startCountdown() {
      const intervalId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          this.updateCountdown();
        } else {
          console.log('Game Over! Total Points:', this.points);

          // Update user's high score
          const userEmail = localStorage.getItem('userEmail');
          const storedUserHighScore = localStorage.getItem('score');
          console.log('storedUserHighScore', storedUserHighScore)
          const userHighScore = storedUserHighScore ? parseFloat(storedUserHighScore, 10) : 0;
          console.log('userHighScore', userHighScore)
          console.log('this.points', this.points)

          // Push the sum of points (converted to integer) to the API
          userService.putUser(userEmail, { newScore: parseInt(userHighScore * this.points, 10) });
          console.log('User high score updated!');

          this.gameEnded = true;

          // Clear the interval using the stored ID
          clearInterval(intervalId);
          this.$router.push({ name: 'leaderboard' });
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.shapes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

img {
  border-radius: 50%;
  cursor: pointer;
}

.instruction-text {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  width: 100%;
}

.countdown-text {
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
  width: 100%;
  color: #000; /* Black text */
}

.score-text {
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
  width: 100%;
}
</style>
