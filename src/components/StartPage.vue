<template>
  <div class="main">
    <h1>Welcome to My Super Amazing Quiz</h1>
    <button @click="startQuiz()">Start</button>
    <span class="counter" v-if="startCount">{{ counter }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 3,
      startCount: false,
    };
  },
  methods: {
    startQuiz() {
      setTimeout(() => {
        this.$emit("start-quiz");
      }, 3000);
      this.startCount = true;
      let interval = setInterval(() => {
        this.counter--;
        if (this.counter === 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  text-align: center;
  font-weight: bold;

  h1 {
    width: 450px;
    margin-bottom: 30px;
  }
  button {
    background-color: #303f9f;
    color: white;
    border: none;
    padding: 30px 70px;
    font-size: 30px;
    border-radius: 10px;
    box-shadow: 10px 10px 10px 5px #b4b4b4;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      box-shadow: none;
      transform: scale(0.9);
    }
  }
  .counter {
    margin-top: 20px;
    font-size: 40px;
    color: red;
  }
}
</style>
