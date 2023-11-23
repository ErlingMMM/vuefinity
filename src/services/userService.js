import { ref } from 'vue';

const userService = (function() {

  const highscores = ref([]);

  const userControllerUrl = "https://vuefinity20231121154528.azurewebsites.net/api/v1/User";

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

  // Update a user score by ID
  const putUser = async (id, userData) => {
    try {
      const response = await fetch(`${userControllerUrl}/${id}/updateScore`, {
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
      const index = highscores.value.findIndex(user => user.id === id);
      if (index !== -1) {
        highscores.value[index] = updatedUser;
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return {
    getAll,
    postUser,
    putUser,
  };

}());

export default userService;



  