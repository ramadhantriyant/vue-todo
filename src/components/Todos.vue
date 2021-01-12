<template>
  <h1>To Do</h1>
  <form v-on:submit.prevent="newTodo">
    <input type="text" id="todo" placeholder="New To Do" v-model="form.todo">
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

export default {
  data() {
    return {
      todos: [],
      form: {
        todo: ''
      }
    }
  },
  methods: {
    newTodo() {
      axios.post('https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd', this.form)
    },
    done(id) {
      axios.put('https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd', {id: id})
    },
    deleteTodo(id) {
      axios.delete('https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd', {data: {id: id}})
    }
  },
  mounted() {
    axios.get('https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd')
    .then(res => {
      this.todos = res.data
    })
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