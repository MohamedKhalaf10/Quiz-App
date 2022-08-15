import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    quizzes: "",
    selectedQuiz: null,
    questions: "",
    numberOfQuestions: null,
    counter: 0,
    correctAnswers: 0,
  },
  mutations: {
    SET_QUIZZES(state, quizzes) {
      state.quizzes = quizzes;
    },
    SET_QUESTIONS(state) {
      state.questions = state.selectedQuiz.questions;
    },
    SET_NUMBER_OF_QUESTIONS(state) {
      state.numberOfQuestions = state.selectedQuiz.questions.length;
    },
    INCREASE_COUNTER_BY_ONE(state) {
      state.counter++;
    },
    INCREASE_CORRECT_ANSWERS(state) {
      state.correctAnswers++;
    },
    RESTART_COUNTER_AND_CORRECT_ANSWERS(state) {
      state.counter = 0;
      state.correctAnswers = 0;
    },
  },
  actions: {
    fetchQuizzes({ commit }) {
      axios
        .get("https://mohamedkhalaf10.github.io/Quiz-App/QuizAppApi.json")
        .then((response) => {
          commit("SET_QUIZZES", response.data.quizzes);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
    setQuestions({ commit }) {
      commit("SET_QUESTIONS");
      commit("SET_NUMBER_OF_QUESTIONS");
    },
    increaseCounter({ commit }) {
      commit("INCREASE_COUNTER_BY_ONE");
    },
    increaseCorrectAnswers({ commit }) {
      commit("INCREASE_CORRECT_ANSWERS");
    },
    restartCounterAndCorrectAnswers({ commit }) {
      commit("RESTART_COUNTER_AND_CORRECT_ANSWERS");
    },
  },
});
