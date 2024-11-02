import createAxios from "@/helpers/axios.helper";
import { toRaw } from "vue";

const API = createAxios();

const getTodoListApi = () => {
  return API.get("todolist");
};

const createTodoApi = (data) => {
  const bodyData = {
    todoLabel: data,
  };
  return API.post(`todolist`, bodyData);
};

const updateTodoApi = (data) => {
  const { todoId, active, todoLabel } = toRaw(data);
  const bodyData = {
    active: active,
    todoLabel: todoLabel,
  };
  return API.patch(`todolist/${todoId}`, bodyData);
};

const deleteTodoApi = (data) => {
  const { todoId } = toRaw(data);
  return API.delete(`todolist/${todoId}`);
};

export { getTodoListApi, createTodoApi, updateTodoApi, deleteTodoApi };
