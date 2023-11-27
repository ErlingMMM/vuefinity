<template>
  <li class="highscore-item">
    <span class="highscore-rank">{{ rank }}.</span>
    <span class="highscore-name">{{ name }}</span>
    <span class="highscore-score">{{ score }}</span>
  </li>
</template>

<script>
export default {
  props: {
    rank: Number,
    name: String,
    score: Number,
  }
}
</script>

<style scoped>
.highscore-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
  margin: 2%;
}

</style>
