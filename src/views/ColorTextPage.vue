<template>
    <section class="shapes-container">
      <!-- The generated shapes and instructions will be appended here -->
      <div class="image-container">
        <!-- Placeholder for the images -->
      </div>
      <p class="instruction-text">
        <!-- Instruction text will be placed here -->
      </p>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        points: 0,
        correctImage: '',
      };
    },
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
  
      const instructionElement = document.querySelector('.instruction-text');
      const imageContainer = document.querySelector('.image-container');
  
      for (let i = 0; i < images.length; i++) {
        this.generateRandomShape(images[i], instructionElement, imageContainer);
      }
    },
    methods: {
        generateRandomShape(imageName, instructionElement, imageContainer) {
  // Create the image element
  const imgElement = new Image();
  imgElement.src = require(`@/assets/${imageName}.png`);
  imgElement.width = 300; // Set the width to 300 pixels
  imgElement.height = 300; // Set the height to 300 pixels

  // Extract color and shape information from the image name
  const color = imageName.includes('Blue') ? 'Blue' : imageName.includes('Orange') ? 'Orange' : 'Green';
  const shape = imageName.includes('Circle') ? 'Circle' : 'Triangle';

  // Update the instruction element
  instructionElement.innerHTML = `<span style="font-size: 48px; font-weight: bold; text-align: center; width: 100%;">Click the <span style="color: ${this.getTextColor(color)}">${color}</span> ${shape}</span>`;

  // Set the correct image for comparison
  this.correctImage = imageName;

  // Add a click event listener to the image
  imgElement.addEventListener('click', () => {
    this.handleImageClick(imageName);
  });

  // Append the image to the image container
  imageContainer.appendChild(imgElement);

  // Shuffle the images after setting the correct image
  const allImages = Array.from(imageContainer.children);
  this.shuffleArray(allImages);
  imageContainer.innerHTML = ''; // Clear the container

  // Append the shuffled images back to the container
  allImages.forEach((image) => {
    imageContainer.appendChild(image);
  });
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
      handleImageClick(imageName) {
  // Check if the clicked image corresponds to the correct text
  if (imageName === this.correctImage) {
    // Award points and generate a new set of shapes
    this.points += 100;
    console.log('Correct'); // Add this line to log "correct"
    this.generateNewShapes();
  } else {
    // Incorrect click, handle as needed
    console.log('Incorrect click. Try again.');
  }
},
generateNewShapes() {
  // Clear the contents of the image container
  const imageContainer = document.querySelector('.image-container');
  imageContainer.innerHTML = '';

  // Reset points and generate a new set of shapes
  this.points = 0;
  const images = [
    'BlueTriangle',
    'OrangeTriangle',
    'GreenTriangle',
    'BlueCircle',
    'OrangeCircle',
    'GreenCircle',
  ];

  this.shuffleArray(images);

  const instructionElement = document.querySelector('.instruction-text');
  // Note: imageContainer is now cleared, so no need to pass it as an argument
  for (let i = 0; i < images.length; i++) {
    this.generateRandomShape(images[i], instructionElement, imageContainer);
  }
},
    },
  };
  </script>
  
  <style scoped>
  .shapes-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px; /* Adjust the margin based on your design */
  }
  
  .image-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-content: center;
    margin-top: 20px; /* Adjust the margin based on your design */
  }
  
  /* Adjust the styling based on your design */
  img {
    border-radius: 50%; /* For circles */
    cursor: pointer; /* Add pointer cursor for better UX */
  }
  
  .instruction-text {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    width: 100%;
  }
  </style>
  