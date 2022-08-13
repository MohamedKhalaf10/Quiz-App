<template>
  <h2>Results</h2>
  <div class="results">
    <span class="correct-num"
      >Correct Answers: <span>{{ this.correctAnswers }}</span></span
    >
    <span class="wrong-num"
      >Wrong Answers:
      <span>{{ numberOfQuestions - correctAnswers }}</span></span
    >
    <button @click="playAgain()">Play Again</button>
  </div>
</template>

<script>
export default {
  methods: {
    playAgain() {
      this.$store.dispatch("restartCounterAndCorrectAnswers");
    },
  },
  computed: {
    numberOfQuestions() {
      return this.$store.state.numberOfQuestions;
    },
    correctAnswers() {
      return this.$store.state.correctAnswers;
    },
  },
};
</script>

<style scoped lang="scss">
.results {
  display: flex;
  .correct-num {
    & > span {
      color: darkgreen;
      font-weight: bold;
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .wrong-num {
    & > span {
      color: darkred;
      font-weight: bold;
      font-size: 20px;
    }
  }
}
button {
  background-color: #303f9f;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 20px;
  font-weight: bold;
  margin-top: 50px;
  align-self: flex-end;
  cursor: pointer;
}
</style>
