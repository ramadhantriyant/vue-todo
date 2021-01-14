<template>
  <h1>To Do</h1>
  <form @submit.prevent="addTodo">
    <input type="text" placeholder="New To Do" v-model="newTodo">
    <button>Submit</button>
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
import axios from 'axios'
import { watch, onMounted, ref } from 'vue'

export default {
  setup() {
    const todos = ref([])
    const newTodo = ref('')

    watch(todos, () => {
      getTodo()
    })

    function getTodo() {
      axios.get('https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd')
      .then(res => {
        todos.value = res.data
      })
    }
    function addTodo() {
      axios.post('https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd', {'todo': newTodo.value})
      .then(newTodo.value = '')
    }
    function done(id) {
      axios.put('https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd', {id: id})
    }
    function deleteTodo(id) {
      axios.delete('https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd', {data: {id: id}})
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
