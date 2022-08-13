<template>
  <nav>
    <router-link :to="{ name: 'HomePage' }">Home</router-link> |
    <router-link :to="{ name: 'CreateQuiz' }">Create New Quiz</router-link>
  </nav>
  <router-view />
</template>

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
    text-align: center;
  }

  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #303f9f;
      }
    }
  }
}
</style>
