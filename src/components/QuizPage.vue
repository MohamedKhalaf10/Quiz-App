<template>
  <main v-if="questions !== ''">
    <h1>Simple Quiz</h1>
    <div class="box">
      <!-- Start Quiz -->
      <div v-if="counter <= numberOfQuestions - 1" class="timer">
        <span class="time" :style="{ width: percentageofTimer }"></span>
        <span v-if="timer === 0" class="time-up">Time's Up</span>
      </div>
      <div v-if="counter <= numberOfQuestions - 1" class="question">
        {{ questions[counter].question }}
      </div>
      <ul v-if="counter <= numberOfQuestions - 1" class="choices">
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
      <div v-if="counter <= numberOfQuestions - 1" class="progress">
        <span class="indicator" :style="{ width: percentageOfIndicator }">
        </span>
        <span class="num"> {{ counter + 1 }}/{{ numberOfQuestions }}</span>
      </div>
      <!-- End Quiz -->
      <!-- Start Result -->
      <h2 v-if="counter > numberOfQuestions - 1">Results</h2>
      <div v-if="counter > numberOfQuestions - 1" class="results">
        <span class="correct-num"
          >Correct Answers: <span>{{ this.correctAnswers }}</span></span
        >
        <span class="wrong-num"
          >Wrong Answers:
          <span>{{ numberOfQuestions - correctAnswers }}</span></span
        >
      </div>
      <!-- End Result -->
      <button v-if="selectedAnswer || timer === 0 || finished" @click="nextQ()">
        {{ buttonText }}
      </button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      timer: 100,
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
        }
      }
    },
    nextQ() {
      this.timer = 100;
      if (this.counter <= this.numberOfQuestions - 1) {
        this.countDown();
        this.selectedAnswer = false;
        this.counter++;
      } else {
        this.counter = 0;
        this.correctAnswers = 0;
      }
    },
    countDown() {
      let timeCounter = setInterval(() => {
        this.timer--;
        if (this.timer === 0 || this.selectedAnswer) {
          clearInterval(timeCounter);
          if (this.timer === 0) {
            this.selectedAnswer = this.questions[this.counter].correctAnswer;
          } else {
            this.timer++;
          }
        }
      }, 100);
    },
  },
  computed: {
    percentageofTimer() {
      return (this.timer / 100) * 100 + "%";
    },
    questions() {
      return this.$store.state.questions;
    },
    numberOfQuestions() {
      return this.questions.length;
    },
    percentageOfIndicator() {
      return ((this.counter + 1) / this.numberOfQuestions) * 100 + "%";
    },
    buttonText() {
      if (this.counter < this.numberOfQuestions - 1) {
        return "Next >";
      } else if (this.counter === this.numberOfQuestions - 1) {
        return "Finish";
      } else {
        return "Play Again";
      }
    },
    finished() {
      return this.counter === this.numberOfQuestions;
    },
  },
  created() {
    this.$store.dispatch("fetchQuestions");
    this.countDown();
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
  .timer {
    margin-bottom: 20px;
    font-weight: bold;
    width: 100%;
    text-align: right;
    .time {
      display: block;
      height: 5px;
      width: 100px;
      margin: 5px;
      border-radius: 10px;
      background-color: #303f9f;
      transition: 0.3s;
    }
    .time-up {
      color: red;
    }
  }
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
  .results {
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
  .progress {
    align-self: center;
    font-weight: bold;
    text-align: center;
    width: 100%;

    .indicator {
      display: block;
      height: 3px;
      margin: 5px auto;
      background-color: #303f9f;
      transition: 0.3s;
      border-radius: 10px;
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
