import React from 'react';

const TodoListTemplate = ({form, children}) => {
  return (
    <main className="todo-list-template">
      <div className="title">
        <strong>TODO LIST</strong>
      </div>
      <section className="todos-wrapper">
        { children }
      </section>
      <section className="form-wrapper">
        {form}
      </section>
    </main>
  );
};

export default TodoListTemplate;