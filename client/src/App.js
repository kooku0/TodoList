import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Popup from './components/Popup'
import Alert from 'react-s-alert';

class App extends Component {

  id = 3;
  priority = 3;
  state = {
    title: '',
    content: '',
    dueDate: '',
    todos: [
      { id: 0, title: ' 리액트 소개0', content: '단방향 바인딩', dueDate: '', checked: false },
      { id: 1, title: ' 리액트 소개1', content: '단방향 바인딩', dueDate: '', checked: true },
      { id: 2, title: ' 리액트 소개2', content: '단방향 바인딩', dueDate: '', checked: false }
    ],
    popup: {
      flag: false,
      state: '',
      updateID: -1
    }
  }
  handlePriority = (id, arrow) => {
    const { todos } = this.state
    const nextTodos = [...todos]
    const itemIdx = nextTodos.findIndex(item => item.id === id)
    
    if (arrow === 'up') {
      if (itemIdx === 0) return
      else {
        nextTodos[itemIdx].id = itemIdx - 1
        nextTodos[itemIdx - 1].id = itemIdx
      }
    }
    else {
      if (itemIdx === todos.length - 1) return
      else {
        nextTodos[itemIdx].id = itemIdx + 1
        nextTodos[itemIdx + 1].id = itemIdx
      }
    }
    nextTodos.sort((a, b) => {
      if(a.id > b.id) return 1
      else return -1
    })
    
    this.setState({
      todos: nextTodos
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { title, content, dueDate, todos } = this.state
    if (title === '' || content === '') {
      Alert.warning('<h4>빈칸을 채우세요<h4>title과 content는 필수', {
        position: 'top-right',
        effect: 'slide',
        html: true
      });
      return
    }
    // let pickedDate = ''
    // if (dueDate !== ''){
    //   const date = new Date(Date.parse(dueDate))
    //   pickedDate = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
    // }

    this.setState({
      title: '',
      content: '',
      dueDate: '',
      todos: todos.concat({
        id: this.id++,
        title: title,
        dueDate: dueDate,
        content: content,
        checked: false,
        priority: this.priority++
      })
    });
    Alert.info('<h4>등록<h4>', {
      position: 'top-right',
      effect: 'slide',
      html: true
    });
    this.handleClose()
  }
  handleDate = (date) => {
    this.setState({
      dueDate: date
    })
  }
  handleKeyPress = (e) => {
    //눌려진 키가 Enter면 handlerCreate 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    console.log(this.state.todos)
    const { todos } = this.state;

    //파라미터로 받은 id를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    //기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
    Alert.info('<h4>삭제<h4>', {
      position: 'top-right',
      effect: 'slide',
      html: true
    });
  }
  handleUpdate = () => {
    const { title, content, dueDate, todos, popup } = this.state
    if (title === '' || content === '') {
      Alert.warning('<h4>빈칸을 채우세요<h4>title과 content는 필수', {
        position: 'top-right',
        effect: 'slide',
        html: true
      });
      return
    }
    let nextTodos = [...todos]
    console.log(nextTodos)
    console.log(popup)
    const todo = nextTodos.find(item => item.id === popup.updateID)
    todo.title = title
    todo.content = content
    todo.dueDate = dueDate

    this.setState({
      title: '',
      content: '',
      dueDate: '',
      todos: nextTodos
    });
    Alert.success('<h4>수정<h4>', {
      position: 'top-right',
      effect: 'slide',
      html: true
    });
    this.handleClose()
  }
  handleOpen = (id) =>{
    const nextPopup = {...this.state.popup}
    if (typeof(id) === "object") {
      nextPopup.flag = true
      nextPopup.state = 'create'
      this.setState({
        popup: nextPopup
      })
    }
    else {
      const todo = this.state.todos.find(item => item.id === id)
      nextPopup.flag = true
      nextPopup.state = 'update'
      nextPopup.updateID = id
      this.setState({
        title: todo.title,
        content: todo.content,
        dueDate: todo.dueDate,
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
      dueDate: '',
      popup: nextPopup
    })
  }
  render() {
    const { title, content, dueDate, todos, popup } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handlePriority,
      handleDate,
      handleUpdate,
      handleOpen
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
            dueDate={dueDate}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            onDate={handleDate}
            onUpdate={handleUpdate}
          />
        }
      </div>
    );
  }
}

export default App;
