<template>
  <el-row>
    <el-col>
      <el-row>
        <el-col :span="24" align="center">
          <div class="todo-list">
            <p class="top-label">To-Do List 📋</p>
            <el-row class="flex">
              <el-input
                v-model="newTodo"
                style="width: 100%; margin: 0 0px 24px 0"
                placeholder="Please Input"
                class="input-todo"
              />
              <el-button class="btn-add" @click="addTodoList()">ADD</el-button>
            </el-row>
            <todo-box
              :todoList="todoList"
              @fetchTodoList="fetchTodoList"
            ></todo-box>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import TodoBox from "./TodoBox.vue";
import { getTodoListApi, createTodoApi } from "@/api/todo-list";

export default {
  name: "App",
  components: {
    TodoBox,
  },
  data() {
    return {
      newTodo: "",
      todoList: [],
    };
  },
  mounted() {
    this.fetchTodoList();
  },
  methods: {
    async fetchTodoList() {
      try {
        const result = await getTodoListApi();
        this.todoList = result.data.data;
        this.sortTodos();
      } catch (error) {
        this.todoList = [];
      }
    },
    async addTodoList() {
      this.newTodo = this.newTodo.trim();
      await createTodoApi(this.newTodo);
      this.fetchTodoList();
      this.newTodo = "";
    },
    sortTodos() {
      this.todoList.sort((a, b) => {
        if (a.active !== b.active) {
          return a.active - b.active;
        }
        return new Date(b.create_dt) - new Date(a.create_dt);
      });
    },
  },
};
</script>
<style scoped>
.flex {
  display: flex;
  flex-wrap: nowrap;
}
.top-label {
  font-size: 36px;
  color: #2a63dd;
  font-weight: 700;
}

.todo-list {
  margin-top: 60px;
  width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}
.btn-add {
  height: 42px;
  width: 80px;
  position: absolute;
  right: 0px;
  border-radius: 36px;
  background-color: #ff8b13;
  border-color: #ff8b13;
  color: #fff;
}
.input-todo ::v-deep .el-input__wrapper {
  height: 40px;
  border-radius: 36px;
  background-color: #ececee;
  border-color: #ececee;
  position: relative;
}
</style>
