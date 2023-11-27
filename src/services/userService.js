import { ref } from 'vue';

const userService = (function() {

  const users = ref([]);
  const userControllerUrl = "https://vuefinity20231121154528.azurewebsites.net/api/v1/User";
  const currentUser = ref(null);
  
  console.log(users.value);

  // Immediately-invoked function to get all users
  (async () => {
    try {
      const response = await fetch(userControllerUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      users.value = await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  })();

  const getAll = () => users;

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
      users.value.push(newUser);
    } catch (error) {
      console.error('Error posting user:', error);
    }
  };

  const getCurrentUser = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('No user email found in localStorage');
      return null;
    }
    try {
      const response = await fetch(`${userControllerUrl}/ByEmail/${encodeURIComponent(userEmail)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = await response.json();
      currentUser.value = userData; 
      return userData;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
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
};

const deleteAllUsers = async () => {
  try {
    const response = await fetch(`${userControllerUrl}/deleteAllUsers`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Directly set the value without triggering reactivity update
    users.value = [];
  } catch (error) {
    console.error('Error deleting all users:', error);
  }
};

//putUser(email, updatedUserData);

  return {
    postUser,
    putUser,
    getAll,
    deleteAllUsers,
    getCurrentUser,
    currentUser: () => currentUser,
  };

}());

export default userService;



  