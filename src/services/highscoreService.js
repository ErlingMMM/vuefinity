import { ref } from 'vue';

const highscoreService = (function() {
  const top10 = ref([]);
  const top10ControllerUrl = "https://vuefinity20231121154528.azurewebsites.net/api/v1/User/top10";

  // Immediately-invoked function to get top 10 users
  const fetchTop10 = async () => {
    try {
      const response = await fetch(top10ControllerUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      top10.value = await response.json();
    } catch (error) {
      console.error('Error fetching top 10:', error);
    }
  };

  // Get top 10 highscores
  const getTop10 = () => top10;

  return {
    fetchTop10,
    getTop10
  };

}());

export default highscoreService;