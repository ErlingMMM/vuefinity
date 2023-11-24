<template>
    <div class="users-container">
      <header class="users-header">
        
        <h1>Brukere</h1>
      </header>
      <ul class="user-list">
        <user-item
          v-for="(user, i) in allUsers"
          :key="i"
          :name="user.name"
          :score="user.score"
          :email="user.email"   
          :phoneNumber="user.phoneNumber"       
          class="user-entry"
        ></user-item>
      </ul>
    </div>
  </template>
    
  <script>
  import UserItem from './UserItem.vue';
  import userService from '../services/userService.js';
  
  export default {
    setup() {
      const allUsers = userService.getAll();
  
      return {
        allUsers
      }
    },
    components: {
      UserItem
    }
  };
  </script>
    
  <style scoped>
  .leaderboard-container {
    font-family: 'Arial', sans-serif;
    text-align: center;
  }
  
  .leaderboard-header {
    margin-bottom: 20px;
  }
  
  .leaderboard-header img {
    max-width: 150px; /* Adjust the size as needed */
    margin-bottom: 10px;
  }
  
  .user-list {
    list-style: none;
    padding: 0;
  }
  
  .user-list li {
    margin: 10px 0;
    font-size: 1.2rem;
  }
  
  .user-list li span:first-child {
    margin-right: 20px;
  }
  </style>
  
    