<template>
    <article class="highscore-item mx-auto">
        <div class="header w-100 p-2">
            <h3>{{ Name }}</h3>
            <p>{{ Email }}</p>
            <h5>Score: {{ Score }}</h5>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        name: String,
        score: Number,
        email: String,
    }
}
</script>

<style scoped>
.highscore-item {
  width: 50%; /* Adjust width as needed */
  border: 1px solid #ddd; /* Optional border */
  border-radius: 8px; /* Optional rounded corners */
  overflow: hidden; /* Ensures no content spills out */
  margin: 1rem auto; /* Center the item with a margin */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for depth */
}

.header {
  background-color: #f8f8f8; /* Light grey background */
  padding: 1rem; /* Padding around the content */
  text-align: center; /* Center the text */
}

/* Add other styles as needed */
</style>
