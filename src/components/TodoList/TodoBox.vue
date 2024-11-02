<template>
  <div class="todo-box">
    <div
      v-for="(todo, index) in localTodoList"
      :key="todo.todoUuid"
      class="todo-item"
    >
      <div class="flex">
        <el-button
          :class="todo.active ? 'chack-done' : 'chack'"
          size="small"
          circle
          @click="toggleTodo(index)"
        >
          <el-icon color="white" v-if="todo.active"><Select /></el-icon>
        </el-button>
        <div
          class="todo-label-box"
          :class="{ completed: todo.active }"
          style="margin-left: 16px"
        >
          {{ todo.todoLabel }}
        </div>
      </div>
      <div>
        <el-button
          class="btn"
          circle
          @click="openEditDialog(index)"
          :disabled="todo.active"
          ><el-icon><EditPen /></el-icon
        ></el-button>
        <el-button class="btn btn-delete" circle @click="removeTodo(index)"
          ><el-icon><CloseBold /></el-icon
        ></el-button>
      </div>
    </div>
  </div>
  <dialog-edit
    v-model:editDialog="editDialog"
    :todoEdit="todoEdit"
    @updateTodoList="updateTodoList"
  />
</template>

<script>
import DialogEdit from "./dialogEdit.vue";
import { Select, EditPen, CloseBold } from "@element-plus/icons-vue";
import { toRaw } from "vue";
import { updateTodoApi, deleteTodoApi } from "@/api/todo-list";

export default {
  emits: ["fetchTodoList"],
  props: {
    todoList: {
      type: Array,
      required: true,
    },
  },
  components: {
    DialogEdit,
    Select,
    EditPen,
    CloseBold,
  },
  data() {
    return {
      editDialog: false,
      todoEdit: [],
      localTodoList: toRaw(this.todoList),
    };
  },
  watch: {
    todoList: {
      handler() {
        this.localTodoList = toRaw(this.todoList);
      },
      deep: true,
    },
  },

  methods: {
    openEditDialog(index) {
      this.todoEdit = this.localTodoList[index];
      this.editDialog = !this.editDialog;
    },
    async toggleTodo(index) {
      try {
        this.localTodoList[index].active = this.localTodoList[index].active
          ? 0
          : 1;
        await updateTodoApi(this.localTodoList[index]);
        this.$emit("fetchTodoList");
      } catch (error) {
        console.warn(error);
      }
    },
    async removeTodo(index) {
      await deleteTodoApi(this.localTodoList[index]);
      this.$emit("fetchTodoList");
    },
    async updateTodoList(newTodo) {
      newTodo.todoLabel = newTodo.todoLabel.trim();
      await updateTodoApi(newTodo);
      this.$emit("fetchTodoList");
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: nowrap;
}
.todo-list {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.completed {
  text-decoration: line-through;
  color: #aaa;
}
.todo-label-box {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 350px;
}

.btn {
  border: 0;
}
.btn-delete {
  color: #ff8b13;
}
.check {
  border: 1px solid #aaa;
}
.chack-done {
  background-color: #ff8b13;
  border-color: #ff8b13 !important;
}

.el-button:active {
  background-color: #ff8b13;
}
.el-button:hover {
  background-color: #fff;
}
</style>
