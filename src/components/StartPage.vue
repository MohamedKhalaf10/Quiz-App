<template>
  <div class="main">
    <h1>Welcome to Super Awsome Quiz</h1>
    <div class="quizes-list">
      <label>Select a Quiz</label>
      <input
        list="quizzes"
        name="quiz"
        required
        v-model="selectedQuizName"
        @change="selectQuiz"
      />
      <datalist id="quizzes">
        <option
          v-for="quiz in quizzes"
          :value="quiz.name"
          :key="quiz.id"
        ></option>
      </datalist>
    </div>
    <button @click="startQuiz()">Start</button>
    <span class="start-counter" v-if="startCount">{{ startCounter }}</span>
    <footer>
      <a href="https://github.com/MohamedKhalaf10/Quiz-App">
        Check GitHub Repo</a
      >
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedQuizName: null,
      startCounter: 3,
      startCount: false,
    };
  },
  methods: {
    selectQuiz() {
      this.$store.state.quizzes.forEach((quiz) => {
        if (quiz.name === this.selectedQuizName) {
          this.$store.state.selectedQuiz = quiz;
        }
      });
    },
    startQuiz() {
      if (this.selectedQuizName) {
        this.$store.dispatch("setQuestions");
        setTimeout(() => {
          this.$emit("start-quiz");
        }, 3000);
        this.startCount = true;
        let interval = setInterval(() => {
          this.startCounter--;
          if (this.startCounter === 0) {
            clearInterval(interval);
          }
        }, 1000);
      } else {
        window.alert("Please, Select A Quiz!");
      }
    },
  },
  computed: {
    quizzes() {
      return this.$store.state.quizzes;
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
  text-align: center;
  font-weight: bold;

  h1 {
    width: 400px;
    margin-bottom: 70px;
  }
  .quizes-list {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    label {
      font-size: 20px;
    }
    input {
      border: none;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 10px 10px 10px 5px #b4b4b4;
      text-align: center;
      font-weight: bold;
      font-size: 15px;
      color: #2c3e50;
      &:focus {
        outline: none;
      }
    }
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
  .start-counter {
    margin-top: 20px;
    font-size: 40px;
    color: red;
  }
  footer {
    margin-top: 40px;
    a {
      text-decoration: none;
      color: red;
    }
  }
}
</style>
