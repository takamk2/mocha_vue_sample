<template>
  <div id="app">
    <AdviceMessage />
    <TodoContainer></TodoContainer>
  </div>
</template>

<script>
import AdviceMessage from './components/AdviceMessage'
import TodoContainer from './components/TodoContainer.vue'

export default {
  name: 'App',
  components: {
    TodoContainer,
    AdviceMessage,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
