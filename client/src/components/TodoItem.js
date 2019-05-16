import React, { Component } from 'react';

class TodoItem extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (this.props.checked !== nextProps.checked) || (this.props._id !== nextProps._id);
  // }
  
  render() {
    const { title, content, deadline, checked, _id, onToggle, onRemove, onOpen, onPriority } = this.props;
    
    // console.log(_id);
    const dateFunc = () => {
      let pickedDate = ''
      console.log(deadline)
      if (deadline !== '') {
        const date = new Date(Date.parse(deadline))
        pickedDate = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
      }
      return pickedDate
    }
    return (
      <div className="todo-item" onClick={() => onToggle(_id)}>
        <div className="arrows" onClick={(e) => {e.stopPropagation(); onPriority(_id, "down")}}>
          <div className="arrow up" onClick={(e) => {e.stopPropagation(); onPriority(_id, "up")}}/>
          <div className="arrow down"/>
        </div>
        <div className={`todo-text ${ checked ? 'checked' : '' }`}>
          { deadline !== undefined &&
            <div className="deadline">{dateFunc()}</div>
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
            onRemove(_id)
          }
        }>삭제</div>
        <div
          className="update"
          onClick={(e) => {
            e.stopPropagation(); // onToggle 이 실행되지 않도록 함
            onOpen(_id)
          }
        }>수정</div>
        
      </div>
    );
  }
}

export default TodoItem;