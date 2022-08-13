<template>
  <StartPage @start-quiz="startQ()" v-if="!start" />
  <main v-else>
    <h1>Simple Quiz</h1>
    <div class="box">
      <QuizPage v-if="counter <= numberOfQuestions - 1 || counter === 0" />
      <ResultsPage v-else />
    </div>
  </main>
</template>

<script>
import QuizPage from "../components/QuizPage.vue";
import StartPage from "../components/StartPage.vue";
import ResultsPage from "../components/ResultsPage.vue";

export default {
  name: "App",
  components: {
    QuizPage,
    StartPage,
    ResultsPage,
  },
  data() {
    return {
      start: false,
    };
  },
  methods: {
    startQ() {
      this.start = true;
    },
  },
  computed: {
    numberOfQuestions() {
      return this.$store.state.numberOfQuestions;
    },
    counter() {
      return this.$store.state.counter;
    },
  },
  created() {
    this.$store.dispatch("fetchQuestions");
  },
};
</script>

<style lang="scss">
h1 {
  color: #303f9f;
  text-align: center;
}
.box {
  background-color: white;
  padding: 30px;
  text-align: left;
  border-radius: 6px;
  box-shadow: 5px 5px 10px #b4b4b4;
  width: 400px;
  @media (max-width: 767px) {
    width: 300px;
  }
}
</style>
