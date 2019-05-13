import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({title, content, dueDate, onChange, onCreate, onKeyPress, onDate}) => {
  return (
    <div className="form">
      <div className="inputForm">
        <input
          name="title"
          value={title}
          onChange={onChange}
          onKeyPress={onKeyPress}
          autoComplete="off"
          placeholder="title..."
        />
        <input
          name="content"
          value={content}
          onChange={onChange}
          onKeyPress={onKeyPress}
          autoComplete="off"
          placeholder="content..."
        />
        <DatePicker
          selected={dueDate}
          onChange={onDate}
        />
      </div>
      <div className="create-button" onClick={onCreate}>
        <div>추가</div>
      </div>
    </div>
  );
};

export default Form;