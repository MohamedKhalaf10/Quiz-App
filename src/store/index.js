import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    questions: "",
  },
  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions;
    },
  },
  actions: {
    fetchQuestions({ commit }) {
      axios
        .get("https://mohamedkhalaf10.github.io/Quiz-App/QuizAppApi.json")
        .then((response) => {
          commit("SET_QUESTIONS", response.data.results);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
  },
});
