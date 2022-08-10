<template>
  <QuizPage />
</template>

<script>
import QuizPage from "./components/QuizPage.vue";

export default {
  name: "App",
  components: {
    QuizPage,
  },
};
</script>

<style lang="scss">
body {
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
