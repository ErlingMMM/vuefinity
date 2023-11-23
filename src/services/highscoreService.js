import { ref } from 'vue';

const highscoreService = (function() {

  //const users = ref([]);
  const top10 = ref([]);

  //const userControllerUrl = "https://vuefinity20231121154528.azurewebsites.net/api/v1/User";
  const top10ControllerUrl = "https://vuefinity20231121154528.azurewebsites.net/api/v1/User/top10";
  
console.log(top10.value);

  // Immediately-invoked function to get all users
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

  // Get all highscores
  const getTop10 = () => top10;
  //const getAll = () => users;

  // Post a new user score
  /*const postUser = async (user) => {
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
      users.value.push(newUser);
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

    console.log('Response status:', response.status); // Log the HTTP response status

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedUser = await response.json();
    console.log('Updated user:', updatedUser); // Log the updated user

    const index = users.value.findIndex(user => user.email === email);
    if (index !== -1) {
      users.value[index] = updatedUser;
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};*/

//putUser(email, updatedUserData);


  // Get top 10 highscores
  const getTop10Users = async () => {
    try {
      const response = await fetch(top10ControllerUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const top10 = await response.json();
      console.log(JSON.stringify(top10) + " top10");
      // Update the highscores with the top 10 data
      top10.value = top10;
    } catch (error) {
      console.error('Error fetching top 10:', error);
    }
  };

  return {
    getTop10,
    getTop10Users
  };

}());

export default highscoreService;