<template>
  <el-dialog
    v-model="localEditDialog"
    title="Edit ToDo"
    width="500"
    modal-class="edit-dialog"
  >
    <el-input
      v-model="newLabel"
      style="width: 100%; margin: 24px 0"
      placeholder="Please Input"
      class="input-todo"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button class="btn" @click="closeDialog">Cancel</el-button>
        <el-button class="btn btn-save" @click="confirmDialog">
          Save
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { toRaw } from "vue";

export default {
  emits: ["updateTodoList"],
  props: {
    todoEdit: {
      type: Array,
      required: true,
    },
    editDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newLabel: "",
    };
  },
  watch: {
    todoEdit: {
      handler() {
        this.newLabel = toRaw(this.todoEdit.todoLabel);
      },
      deep: true,
    },
    localEditDialog(newVal) {
      this.$emit("update:editDialog", newVal);
    },
  },
  computed: {
    localEditDialog: {
      get() {
        return this.editDialog;
      },
      set(value) {
        this.$emit("update:editDialog", value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.localEditDialog = false;
    },
    confirmDialog() {
      const { active, todoId } = this.todoEdit;
      const update = {
        active,
        todoId,
        todoLabel: this.newLabel,
      };

      this.$emit("updateTodoList", update);
      this.localEditDialog = false;
    },
  },
};
</script>

<style scoped>
.btn {
  border-radius: 24px;
  height: 40px;
  width: 80px;
}
.btn-save {
  background-color: #ff8b13;
  border-color: #ff8b13;
  color: #fff;
}
.input-todo ::v-deep .el-input__wrapper {
  height: 40px;
  border-radius: 36px;
  background-color: #fff;
  border-color: #ececee;
  position: relative;
}
</style>

<style>
.edit-dialog .el-dialog {
  width: 80% !important;
  max-width: 500px;
  border-radius: 24px !important;
  padding: 24px;
}
</style>
