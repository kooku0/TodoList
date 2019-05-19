import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import TodoItemList from './components/TodoItemList';
import Popup from './components/Popup'
import Form from './components/Form';
import * as API from './util/TodoAPI'

import Alert from 'react-s-alert';

class App extends Component {

  // _id = 3;
  priority = 0;
  state = {
    title: '',
    content: '',
    deadline: '',
    todos: [
      // { _id: 0, title: ' 리액트 소개0', content: '단방향 바인딩', deadline: '', checked: false, priority: 0 },
      // { _id: 1, title: ' 리액트 소개1', content: '단방향 바인딩', deadline: '', checked: true, priority: 1 },
      // { _id: 2, title: ' 리액트 소개2', content: '단방향 바인딩', deadline: '', checked: false, priority: 2 }
    ],
    popup: {
      flag: false,
      state: '',
      updateID: -1
    }
  }
  async componentDidMount () {
    let response = await API.GetTodos()
    if (response.err === undefined){
      console.log(response)
      
      await response.forEach(todo => {
        this.deadlineCheck(todo.deadline, todo.title)
        this.priority = todo.priority > this.priority ? todo.priority : this.priority
        return todo.deadline === undefined ? todo.deadline = '' : todo.deadline = new Date(todo.deadline)
      });
      this.priority++
      await response.sort((a, b) => {
        if(a.priority > b.priority) return 1
        else return -1
      })
      await this.setState({
        todos: response
      })
    }
  }
  handlePriority = async (_id, arrow) => {
    const { todos } = this.state
    const nextTodos = [...todos]
    const itemIdx = nextTodos.findIndex(item => item._id === _id)
    if (arrow === 'up') {
      if (itemIdx === 0) return
      else {
        const tmp = nextTodos[itemIdx].priority
        nextTodos[itemIdx].priority = nextTodos[itemIdx - 1].priority
        nextTodos[itemIdx - 1].priority = tmp
        await API.UpdateTodo(nextTodos[itemIdx]._id, {...nextTodos[itemIdx], priority: nextTodos[itemIdx].priority})
        await API.UpdateTodo(nextTodos[itemIdx - 1]._id, {...nextTodos[itemIdx - 1], priority: nextTodos[itemIdx - 1].priority})
      }
    }
    else {
      if (itemIdx === todos.length - 1) return
      else {
        const tmp = nextTodos[itemIdx].priority
        nextTodos[itemIdx].priority = nextTodos[itemIdx + 1].priority
        nextTodos[itemIdx + 1].priority = tmp
        await API.UpdateTodo(nextTodos[itemIdx]._id, {...nextTodos[itemIdx], priority: nextTodos[itemIdx].priority})
        await API.UpdateTodo(nextTodos[itemIdx + 1]._id, {...nextTodos[itemIdx + 1], priority: nextTodos[itemIdx + 1].priority})
      }
    }
    await nextTodos.sort((a, b) => {
      if(a.priority > b.priority) return 1
      else return -1
    })
    
    await this.setState({
      todos: nextTodos
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = async () => {
    const { title, content, deadline, todos } = this.state
    if (title === '' || content === '') {
      Alert.warning('<h4>빈칸을 채우세요</h4>title과 content는 필수', {
        position: 'top-right',
        effect: 'slide',
        html: true
      });
      return
    }
    await this.handleClose()
    let response = await API.CreateTodo({title: title, content: content, deadline: deadline===''?null:deadline, checked: false, priority: this.priority++})
    await console.log(response)
    if (response.result === 1) {
      await this.setState({
        todos: todos.concat({
          ...response.todo,
          deadline: response.todo.deadline === undefined ? '' : new Date(response.todo.deadline)
        })
      })
      await Alert.info('<h4>등록</h4>', {
        position: 'top-right',
        effect: 'slide',
        html: true
      });
      await this.deadlineCheck(response.todo.deadline, response.todo.title)
    }
  }
  removeDate = () => {
    this.setState({
      deadline: ''
    })
  }
  handleDate = (date) => {
    this.setState({
      deadline: date
    })
  }
  handleKeyPress = (e) => {
    //눌려진 키가 Enter면 handlerCreate 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = async (_id) => {
    const { todos } = this.state;

    //파라미터로 받은 id를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo._id === _id);
    const selected = todos[index]; // 선택한 객체

    const response = await API.UpdateTodo(selected._id, {...selected, checked: !selected.checked})
    if (response.error === undefined) {
      const nextTodos = [...todos]; // 배열을 복사

      //기존의 값들을 복사하고, checked 값을 덮어쓰기
      nextTodos[index] = {
        ...selected,
        checked: !selected.checked
      };
  
      await this.setState({
        todos: nextTodos
      });
    }
  }

  handleRemove = async (_id) => {
    await API.DeleteTodo(_id)
    const { todos } = this.state;
    
    await this.setState({
      todos: todos.filter(todo => todo._id !== _id)
    });
    await Alert.info('<h4>삭제</h4>', {
      position: 'top-right',
      effect: 'slide',
      html: true
    });
  }
  handleUpdate = async () => {
    const { title, content, deadline, todos, popup } = this.state
    if (title === '' || content === '') {
      Alert.warning('<h4>빈칸을 채우세요</h4>title과 content는 필수', {
        position: 'top-right',
        effect: 'slide',
        html: true
      });
      return
    }
    await this.handleClose()
    let response = await API.UpdateTodo(popup.updateID, {title, content, deadline: deadline===''?null:deadline})
    if (response.error === undefined) {
      let nextTodos = [...todos]
      const todo = await nextTodos.find(item => item._id === popup.updateID)
      todo.title = title
      todo.content = content
      todo.deadline = deadline
      await this.setState({
        title: '',
        content: '',
        deadline: '',
        todos: nextTodos
      });
      await Alert.success('<h4>수정</h4>', {
        position: 'top-right',
        effect: 'slide',
        html: true
      });
      await this.deadlineCheck(todo.deadline, todo.title)
    }
  }
  deadlineCheck = (deadline, title) => {
    if (Date.parse(deadline) < Date.now()) {
      Alert.warning(`<h4>${title}</h4>의 마감일이 지났습니다.`, {
        position: 'top-right',
        effect: 'slide',
        html: true
      });
    }
  }
  handleOpen = (_id) =>{
    const nextPopup = {...this.state.popup}
    if (typeof(_id) === "object") {
      nextPopup.flag = true
      nextPopup.state = 'create'
      this.setState({
        popup: nextPopup
      })
    }
    else {
      const todo = this.state.todos.find(item => item._id === _id)
      nextPopup.flag = true
      nextPopup.state = 'update'
      nextPopup.updateID = _id
      this.setState({
        title: todo.title,
        content: todo.content,
        deadline: todo.deadline,
        popup: nextPopup
      })
    }
  }
  handleClose = () => {
    const { popup } = this.state
    const nextPopup = {...popup}
    nextPopup.flag = false
    nextPopup.state = ''
    nextPopup.updateID = -1
    this.setState({
      title: '',
      content: '',
      deadline: '',
      popup: nextPopup
    })
  }
  render() {
    const { title, content, deadline, todos, popup } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handlePriority,
      handleDate,
      handleUpdate,
      handleOpen,
      removeDate
    } = this;

    return (
      <div>
        <TodoListTemplate form={
        <Form
          onOpen={handleOpen}
        />}>
          <TodoItemList
            todos={todos}
            onToggle={handleToggle}
            onRemove={handleRemove}
            onOpen={handleOpen}
            onPriority={handlePriority}
          />
        </TodoListTemplate>
        <Alert stack={true} timeout={3000} />
        {
          popup.flag &&
          <Popup
            popup={popup}
            title={title}
            content={content}
            deadline={deadline}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            onDate={handleDate}
            onUpdate={handleUpdate}
            removeDate={removeDate}
          />
        }
      </div>
    );
  }
}

export default App;
