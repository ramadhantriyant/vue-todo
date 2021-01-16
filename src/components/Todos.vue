<template>
  <h1>To Do</h1>
  <form @submit.prevent="addTodo">
    <input type="text" placeholder="New To Do" v-model="newTodo">
    <input type="submit" value="Submit">
  </form>
  <table>
    <thead>
      <tr>
        <th scope="col">Time</th>
        <th scope="col">To Do</th>
        <th scope="col">Done?</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todo in todos" :key="todo.id">
        <td>{{ todo.time }}</td>
        <td>{{ todo.todo }}</td>
        <td>{{ todo.done }}</td>
        <td>
          <button @click="done(todo.id)">
            Done
          </button>
          <button @click="deleteTodo(todo.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import TodoDataService from '../services/TodoDataService'
import { watch, onMounted, ref } from 'vue'

export default {
  setup() {
    const todos = ref([])
    const newTodo = ref('')

    watch(todos, () => {
      // getTodo()
      todos.value.forEach((todo) => {
        console.log(`todo: ${todo.todo}`)
      })
    })

    function getTodo() {
      TodoDataService.getAll().then(res => {todos.value = res.data})
    }
    function addTodo() {
      TodoDataService.create({'todo': newTodo.value}).then(getTodo())
      newTodo.value = ''
    }
    function done(id) {
      TodoDataService.update({id: id}).then(getTodo())
    }
    function deleteTodo(id) {
      TodoDataService.delete({id: id}).then(getTodo())
    }

    onMounted(() => {
      getTodo()
    })

    return {
      todos,
      newTodo,
      getTodo,
      addTodo,
      done,
      deleteTodo
    }
  }
};
</script>

<style>
table {
  width: 50%;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
th, td {
  border: 1px solid black;
}
</style>
