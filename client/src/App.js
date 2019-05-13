import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Alert from 'react-s-alert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    ]
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
    let pickedDate = ''
    if (dueDate !== ''){
      const date = new Date(Date.parse(dueDate))
      pickedDate = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
    }

    this.setState({
      title: '',
      content: '',
      dueDate: '',
      todos: todos.concat({
        id: this.id++,
        title: title,
        dueDate: pickedDate,
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
  }
  handleDate = (date) => {
    Alert.info('<h4>삭제<h4>', {
      position: 'top-right',
      effect: 'slide',
      html: true
    });
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
  }
  handleUpdate = (id) => {
    const { todos } = this.state
    const nextTodos = [...todos]
    const itemIdx = nextTodos.findIndex(item => item.id === id)
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
          <form onSubmit={(e) => {e.preventDefault(); console.log(e.target.children[1].children[0].value)}}>
          <h1>Update</h1>
            <div>
              <input type="text" name="title" autoComplete="off"></input>
              <textarea></textarea>
              <DatePicker
                // selected={dueDate}
                // onChange={onDate}
              />
              <input type="submit"></input>
            </div>
            <button onClick={onClose}>close</button>
            <button onClick={(e) => {
                console.log(e.target)
                onClose()
            }}>save</button>
          </form>
          </div>
        )
      }
    })
  }
  render() {
    const { title, content, dueDate, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handlePriority,
      handleDate,
      handleUpdate
    } = this;

    return (
      <div>
        <TodoListTemplate form={
        <Form
          title={title}
          content={content}
          dueDate={dueDate}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          onDate={handleDate}
        />}>
          <TodoItemList
            todos={todos}
            onToggle={handleToggle}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
            onPriority={handlePriority}
          />
        </TodoListTemplate>
        <Alert stack={true} timeout={3000} />
      </div>
    );
  }
}

export default App;
