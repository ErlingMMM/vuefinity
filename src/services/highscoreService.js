import { ref } from 'vue';

const highscoreService = (function() {

  const top10 = ref([]);
  const top10ControllerUrl = "https://vuefinity20231121154528.azurewebsites.net/api/v1/User/top10";
  
  console.log(top10.value);

  // Immediately-invoked function to get top 10 users
  (async () => {
    try {
      const response = await fetch(top10ControllerUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      top10.value = await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  })();

  // Get top 10 highscores
  const getTop10 = () => top10;

  return {
    getTop10
  };

}());

export default highscoreService;