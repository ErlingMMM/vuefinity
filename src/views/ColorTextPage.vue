<template>
    <section class="shapes-container">
      <!-- The generated shapes and instructions will be appended here -->
    </section>
  </template>
  
  <script>
  export default {
    mounted() {
      const images = [
        'BlueTriangle',
        'OrangeTriangle',
        'GreenTriangle',
        'BlueCircle',
        'OrangeCircle',
        'GreenCircle',
      ];
  
      this.shuffleArray(images);
  
      const instructionElement = document.createElement('p');
      const shapesContainer = document.querySelector('.shapes-container');
      shapesContainer.appendChild(instructionElement);
  
      for (let i = 0; i < images.length; i++) {
        this.generateRandomShape(images[i], instructionElement);
      }
    },
    methods: {
      generateRandomShape(imageName, instructionElement) {
        // Create the image element
        const imgElement = new Image();
        imgElement.src = require(`@/assets/${imageName}.png`);
        imgElement.width = 100; // Set the width to 100 pixels
        imgElement.height = 100; // Set the height to 100 pixels
  
        // Extract color and shape information from the image name
        const color = imageName.includes('Blue') ? 'Blue' : imageName.includes('Orange') ? 'Orange' : 'Green';
        const shape = imageName.includes('Circle') ? 'Circle' : 'Triangle';
  
        // Update the instruction element
        instructionElement.innerHTML = `Click the <span style="color: ${this.getTextColor(color)}">${color}</span> ${shape}`;
  
        // Append the image to the container
        const shapesContainer = document.querySelector('.shapes-container');
        shapesContainer.appendChild(imgElement);
      },
      shuffleArray(array) {
        // Shuffle the array in-place using Fisher-Yates algorithm
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      },
      getTextColor(color) {
        // Customize the text colors based on your design
        return color === 'Blue' ? 'green' : color === 'Orange' ? 'blue' : 'orange';
      },
    },
  };
  </script>
  
  <style scoped>
  .shapes-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-content: center;
  }
  
  /* Adjust the styling based on your design */
  img {
    border-radius: 50%; /* For circles */
  }
  
  p {
    margin: 10px;
  }
  </style>
  