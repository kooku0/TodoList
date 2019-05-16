import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }
  
  render() {
    const { todos, onToggle, onRemove, onPriority, onOpen } = this.props;

    const todoList = todos.map(
      ({_id, title, content, deadline, checked}) => (
        <TodoItem
          _id={_id}
          title={title}
          deadline={deadline}
          content={content}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          onPriority={onPriority}
          onOpen={onOpen}
          key={_id}
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