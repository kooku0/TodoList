import React, { Component } from 'react';

class TodoItem extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (this.props.checked !== nextProps.checked) || (this.props.id !== nextProps.id);
  // }
  
  render() {
    const { title, content, dueDate, checked, id, onToggle, onRemove, onPriority } = this.props;
    
    // console.log(id);

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="arrows" onClick={(e) => {e.stopPropagation(); onPriority(id, "down")}}>
          <div className="arrow up" onClick={(e) => {e.stopPropagation(); onPriority(id, "up")}}/>
          <div className="arrow down"/>
        </div>
        <div className={`todo-text ${ checked ? 'checked' : '' }`}>
          { dueDate !== '' &&
            <div className="dueDate">{dueDate}</div>
          }
          <div><h5><strong>{title}</strong></h5></div>
          <div>{content}</div>
        </div>
        {
          checked && (<div className="check-mark" >✓</div>)
        }
        <div
          className="remove"
          onClick={(e) => {
            e.stopPropagation(); // onToggle 이 실행되지 않도록 함
            onRemove(id)
          }
        }>삭제</div>
        <div
          className="update"
          onClick={(e) => {
            e.stopPropagation(); // onToggle 이 실행되지 않도록 함
            onRemove(id)
          }
        }>수정</div>
        
      </div>
    );
  }
}

export default TodoItem;