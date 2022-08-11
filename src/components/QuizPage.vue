<template>
  <main v-if="questions !== ''">
    <h1>Simple Quiz</h1>
    <div class="box">
      <!-- Start Quiz -->
      <div v-if="counter <= 2" class="question">
        {{ questions[counter].question }}
      </div>
      <ul v-if="counter <= 2" class="choices">
        <li
          v-for="choice in questions[counter].choices"
          :key="choice.id"
          :id="choice.id"
          @click="answer($event)"
          :class="{
            on: !selectedAnswer,
            'correct-ans':
              questions[counter].correctAnswer === choice.id && selectedAnswer,
            'wrong-ans':
              questions[counter].correctAnswer !== choice.id &&
              selectedAnswer === choice.id,
          }"
        >
          {{ choice.text }}
        </li>
      </ul>
      <!-- End Quiz -->
      <!-- Start Result -->
      <h2 v-if="counter > 2">Results</h2>
      <div v-if="counter > 2" class="results">
        <span class="correct"
          >Correct Answers:
          <span
            style="
              color: darkgreen;
              font-weight: bold;
              font-size: 20px;
              margin-right: 10px;
            "
            >{{ this.correctAnswers }}</span
          ></span
        >
        <span class="wrong"
          >Wrong Answers:
          <span style="color: darkred; font-weight: bold; font-size: 20px">{{
            3 - this.correctAnswers
          }}</span></span
        >
      </div>
      <!-- End Result -->
      <button v-if="selectedAnswer || finished" @click="nextQ()">
        {{ buttonText }}
      </button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      selectedAnswer: false,
      correctAnswers: 0,
    };
  },
  methods: {
    answer(e) {
      if (!this.selectedAnswer) {
        this.selectedAnswer = e.target.id;
        if (this.questions[this.counter].correctAnswer === e.target.id) {
          this.correctAnswers++;
          console.log(this.correctAnswers);
        }
      }
    },
    nextQ() {
      if (this.counter <= 2) {
        this.selectedAnswer = false;
        this.counter++;
      } else {
        this.counter = 0;
        this.correctAnswers = 0;
      }
    },
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    },
    buttonText() {
      if (this.counter < 2) {
        return "Next >";
      } else if (this.counter === 2) {
        return "Finish";
      } else {
        return "Play Again";
      }
    },
    finished() {
      return this.counter === 3;
    },
  },
  created() {
    this.$store.dispatch("fetchQuestions");
  },
};
</script>

<style scoped lang="scss">
h1 {
  color: #303f9f;
  text-align: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  padding: 30px;
  text-align: left;
  border-radius: 6px;
  box-shadow: 5px 5px 10px #b4b4b4;
  width: 400px;
  .question {
    font-weight: bold;
    font-size: 20px;
  }
  .choices {
    list-style: none;
    padding: 0;
    width: 100%;
    li {
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 10px 0 10px 15px;
      margin-bottom: 10px;
      transition: 0.3s;
    }
    .correct-ans {
      background-color: lightgreen;
    }
    .wrong-ans {
      background-color: lightcoral;
    }
    .on {
      cursor: pointer;
      &:hover {
        background-color: #eee;
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
    align-self: flex-end;
    cursor: pointer;
  }
}
</style>
