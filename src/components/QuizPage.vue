<template>
  <main v-if="questions !== ''">
    <div class="quiz">
      <!-- Start Quiz -->
      <div class="timer">
        <span class="time" :style="{ width: percentageofTimer }"></span>
        <span v-if="timer === 0" class="time-up">Time's Up</span>
      </div>
      <div class="question">
        {{ questions[counter].question }}
      </div>
      <ul class="choices">
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
      <div class="progress">
        <span class="indicator" :style="{ width: percentageOfIndicator }">
        </span>
        <span class="num"> {{ counter + 1 }}/{{ numberOfQuestions }}</span>
      </div>
      <!-- End Quiz -->
      <button v-if="selectedAnswer || timer === 0" @click="nextQ()">
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
      selectedAnswer: false,
    };
  },
  methods: {
    answer(e) {
      if (!this.selectedAnswer) {
        this.selectedAnswer = e.target.id;
        if (this.questions[this.counter].correctAnswer === e.target.id) {
          this.$store.dispatch("increaseCorrectAnswers");
        }
      }
    },
    nextQ() {
      this.timer = 100;
      this.countDown();
      this.selectedAnswer = false;
      this.$store.dispatch("increaseCounter");
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
      return this.$store.state.numberOfQuestions;
    },
    counter() {
      return this.$store.state.counter;
    },
    correctAnswers() {
      return this.$store.state.correctAnswers;
    },
    percentageOfIndicator() {
      return ((this.counter + 1) / this.numberOfQuestions) * 100 + "%";
    },
    buttonText() {
      if (this.counter < this.numberOfQuestions - 1) {
        return "Next >";
      } else {
        return "Finish";
      }
    },
  },
  created() {
    this.countDown();
  },
};
</script>

<style scoped lang="scss">
.quiz {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
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
