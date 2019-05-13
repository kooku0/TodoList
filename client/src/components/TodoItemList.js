import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }
  
  render() {
    const { todos, onToggle, onRemove, onPriority } = this.props;

    const todoList = todos.map(
      ({id, title, content, dueDate, checked}) => (
        <TodoItem
          id={id}
          title={title}
          dueDate={dueDate}
          content={content}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          onPriority={onPriority}
          key={id}
        />
      )
    );

    return (
      <div>
        {todoList}
      </div>
    );
  }
}

export default TodoItemList;