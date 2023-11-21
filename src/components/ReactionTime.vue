<template>
    <section>
        <h1>Reaction Time Game</h1>
        <p>Click on the box below as soon as it turns green.</p>
        <div id="colorBlock" class="color-block" :class="{ green: isGreen, red: !isGreen }" @click="checkReactionTime"></div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      startTime: null,
      endTime: null,
      isGreen: false,
    };
  },
  methods: {
    checkReactionTime() {
      if (this.isGreen) {
        this.endTime = new Date().getTime();
        let reactionTime = this.endTime - this.startTime;
        alert(`Your reaction time is ${reactionTime} milliseconds.`);
        this.isGreen = false;
        this.changeColor();
      }
    },
    changeColor() {
      setTimeout(() => {
        this.isGreen = true;
        this.startTime = new Date().getTime();
      }, Math.floor(Math.random() * 5000) + 1000); // Changes color between 1 to 5 seconds randomly
    },
  },
  mounted() {
    this.changeColor();
  },
};

</script>

<style>
    .color-block {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  transition: background-color 0.3s ease;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

</style>