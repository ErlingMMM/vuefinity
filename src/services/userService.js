import { ref } from 'vue';

const userService = (function() {

  const highscores = ref([]);

  const userControllerUrl = "https://vuefinity20231121154528.azurewebsites.net/api/v1/User";
  const top10ControllerUrl = "https://vuefinity20231121154528.azurewebsites.net/api/v1/User/top10";
  


  // Immediately-invoked function to get all users
  (async () => {
    try {
      const response = await fetch(userControllerUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      highscores.value = await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  })();

  // Get all highscores
  const getAll = () => highscores;

  // Post a new user score
  const postUser = async (user) => {
    try {
      const response = await fetch(userControllerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newUser = await response.json();
      highscores.value.push(newUser);
    } catch (error) {
      console.error('Error posting user:', error);
    }
  };

  const putUser = async (email, userData) => {
    try {
      const response = await fetch(`${userControllerUrl}/${email}/updateScore`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newScore: userData.newScore }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const updatedUser = await response.json();
      const index = highscores.value.findIndex(user => user.email === email);
      if (index !== -1) {
        highscores.value[index] = updatedUser;
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Get top 10 highscores
  const getTop10 = async () => {
    try {
      const response = await fetch(top10ControllerUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const top10 = await response.json();
      console.log(JSON.stringify(top10) + " top10");
      // Update the highscores with the top 10 data
      highscores.value = top10;
    } catch (error) {
      console.error('Error fetching top 10:', error);
    }
  };


  return {
    getTop10,
    getAll,
    postUser,
    putUser,
  };

}());

export default userService;



  