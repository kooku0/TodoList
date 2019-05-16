import axios from 'axios';
import Alert from 'react-s-alert';

export async function CreateTodo (todo) {
  let response;
  await axios.post(`http://localhost:8080/api/todos`, {
    ...todo
  })
  .then(res => {
    response = res.data;
  })
  .catch(error => {
      console.log(error);
      Alert.error(`<h4>Create Todo 에러</h4> ${error}`, {
      position: 'top-right',
      effect: 'slide',
      html: true
      });
  })
  return response;
}

export async function GetTodos () {
  let response;
  await axios.get('http://localhost:8080/api/todos')
  .then(res => {
    response = res.data;
  })
  .catch(error => {
      console.log(error);
      Alert.error(`<h4>GET Todos 에러</h4> ${error}`, {
      position: 'top-right',
      effect: 'slide',
      html: true
      });
  })
  return response;
}

export async function UpdateTodo (_id, todo) {
  let response;
  await axios.put(`http://localhost:8080/api/todos/${_id}`, {
    ...todo
  })
  .then(res => {
    response = res.data;
  })
  .catch(error => {
      console.log(error);
      Alert.error(`<h4>Update Todo 에러</h4> ${error}`, {
      position: 'top-right',
      effect: 'slide',
      html: true
      });
  })
  return response;
}

export async function DeleteTodo (_id) {
  let response;
  await axios.delete(`http://localhost:8080/api/todos/${_id}`)
  .then(res => {
    response = res.data;
  })
  .catch(error => {
      console.log(error);
      Alert.error(`<h4>Delete Todo 에러</h4> ${error}`, {
      position: 'top-right',
      effect: 'slide',
      html: true
      });
  })
  return response;
}