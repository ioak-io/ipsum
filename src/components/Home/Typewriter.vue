<template>
  <div class="typewriter typography-10">
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Typewriter',
  props: {
    text: String,
  },
};
</script>
<style lang="scss" scoped>
.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 6s steps(40, end) infinite,
    blink-caret 0.4s step-end infinite;
  .text {
    width: 300px;
    max-width: 80vw;
  }
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #db9e36;
  }
}
</style>
