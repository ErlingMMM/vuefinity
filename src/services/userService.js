export default async function userService() {
    async function getAllUsers() {
    try {
        const response = await fetch("http://localhost:8080/api/users");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

 async function postUser(user) {
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error posting user:', error);
    }
  }

  async function putUser(userId, userData) {
    try {
      const response = await fetch(`${"http://localhost:8080/api/users"}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  return {
    getAllUsers,
    postUser,
    putUser
  };
}


  