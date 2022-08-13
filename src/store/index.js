import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    questions: "",
    numberOfQuestions: null,
    counter: 0,
    correctAnswers: 0,
  },
  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions;
    },
    SET_NUMBER_OF_QUESTIONS(state, number) {
      state.numberOfQuestions = number;
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
    fetchQuestions({ commit }) {
      axios
        .get("https://mohamedkhalaf10.github.io/Quiz-App/QuizAppApi.json")
        .then((response) => {
          commit("SET_QUESTIONS", response.data.results);
          commit("SET_NUMBER_OF_QUESTIONS", response.data.results.length);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
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
