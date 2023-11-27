<template>
    <user-list></user-list>
  </template>
  
  <script>
  import UserList from '../components/UserList.vue';
  
  export default {
    name: 'AdminPage',
    components: {
        UserList
    },
  }
  </script>