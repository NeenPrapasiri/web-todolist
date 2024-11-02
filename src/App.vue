<template>
  <div id="app">
    <el-col :span="24">
      <todo-list></todo-list>
    </el-col>
  </div>
</template>

<script>
import TodoList from "./components/TodoList/TodoList";

export default {
  name: "App",
  components: {
    TodoList,
  },
};
</script>

<style>
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: rgb(250, 239, 227);
}
</style>
