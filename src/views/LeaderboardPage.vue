<template>
  <highscore-list :current-user="currentUser"></highscore-list>
</template>

<script>
import HighscoreList from '../components/HighscoreList.vue';
import highscoreService from '../services/highscoreService.js';
import userService from '../services/userService.js';

export default {
  name: 'LeaderboardPage',
  components: {
    HighscoreList,
  },
  data() {
    return {
      currentUser: null,
      topThree: [],
    };
  },
  async created() {
    await this.fetchCurrentUser();
    await this.checkIfCurrentUserIsTopThree();
  },
  methods: {
    async fetchCurrentUser() {
      this.currentUser = await userService.getCurrentUser();
      if (!this.currentUser) {
        console.error('No current user data available');
      }
    },
    async checkIfCurrentUserIsTopThree() {
      if (!this.currentUser) {
        console.error('Cannot check top three - no current user');
        return;
      }
      await highscoreService.fetchTop10();
      this.topThree = highscoreService.getTop10().value.slice(0, 3);
      const currentUserInTopThree = this.topThree.some(
        user => user.email === this.currentUser.email
      );
      if (currentUserInTopThree) {
        this.startConfetti();
      }
    },
    startConfetti() {
      this.$confetti.start();
      setTimeout(() => {
        this.$confetti.stop();
      }, 5000);
    },
  },
};
</script>
